import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/submit-review
 *
 * Server-side handler for the All Surfaces "Leave a Review" form.
 * Runs as a Vercel serverless function — the INGEST_API_KEY never
 * reaches the browser.
 *
 * 1. Validates the honeypot (drops bot submissions silently).
 * 2. Validates field shape and lengths.
 * 3. POSTs to the portfolio review-ingest endpoint → saves the review
 *    to Supabase with `approved = false` for manual review on the
 *    dswayze.dev dashboard.
 *
 * The customer's view: form submits → quick "thanks, we'll review it"
 * confirmation. Reviews appear publicly only after manual approval.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Record<string, string>;

  // ── Honeypot check ────────────────────────────────────────────────────────
  if (body._gotcha && body._gotcha.trim() !== "") {
    // Silently succeed so bots don't learn
    return res.status(200).json({ success: true });
  }

  // ── Read + validate fields ───────────────────────────────────────────────
  const customerName = (body.customer_name || "").trim();
  const ratingNum = Number(body.rating);
  const text = (body.text || "").trim();
  const email = (body.email || "").trim();
  const projectType = (body.project_type || "").trim();

  if (!customerName || customerName.length > 80) {
    return res.status(400).json({ error: "Name is required (max 80 characters)." });
  }
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }
  if (!text || text.length < 10 || text.length > 2000) {
    return res.status(400).json({ error: "Review text must be 10–2000 characters." });
  }
  if (email && email.length > 200) {
    return res.status(400).json({ error: "Email is too long." });
  }

  // ── Forward to portfolio review ingest ────────────────────────────────────
  const ingestKey = process.env.INGEST_API_KEY;
  if (!ingestKey) {
    console.error("[submit-review] INGEST_API_KEY is not set");
    // Return success to the user; we'll catch the missing key in logs
    return res.status(200).json({ success: true });
  }

  try {
    const submitterIp =
      (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ?? null;

    const ingestRes = await fetch(
      `https://dswayze.dev/api/reviews/ingest?source=allsurfacefix.com&key=${encodeURIComponent(ingestKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          rating: ratingNum,
          text,
          email: email || null,
          project_type: projectType || null,
          submitter_ip: submitterIp,
          source: "Website",
          site: "allsurfacefix.com",
        }),
      }
    );
    if (!ingestRes.ok) {
      console.error(`[submit-review] Ingest endpoint returned ${ingestRes.status}`);
    }
  } catch (err) {
    console.error(`[submit-review] Ingest fetch failed: ${String(err)}`);
  }

  // Always return success to the user — partial backend failures shouldn't
  // surface as form errors. Issues are visible in Vercel function logs.
  return res.status(200).json({ success: true });
}
