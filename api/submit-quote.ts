import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/submit-quote
 *
 * Server-side handler for the All Surfaces quote form.
 * Runs as a Vercel serverless function — the INGEST_API_KEY never
 * reaches the browser.
 *
 * 1. Validates the honeypot (drops bot submissions silently)
 * 2. POSTs to the portfolio ingest endpoint → saves lead to Supabase
 * 3. Forwards to Formspree → sends email notification to owner
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

  // ── Required fields ───────────────────────────────────────────────────────
  const { name, phone, email, serviceType, location, description, preferredContactMethod } = body;

  if (!name || !phone || !serviceType || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const errors: string[] = [];

  // ── 1. Send to portfolio lead ingest endpoint ─────────────────────────────
  const ingestKey = process.env.INGEST_API_KEY;
  if (!ingestKey) {
    console.error("[submit-quote] INGEST_API_KEY is not set");
  } else {
    try {
      const ingestRes = await fetch(
        `https://dswayze.dev/api/leads/ingest?source=allsurfacefix.com&key=${encodeURIComponent(ingestKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email: email || null,
            message: [
              `Service: ${serviceType}`,
              location ? `Location: ${location}` : null,
              `Preferred contact: ${preferredContactMethod}`,
              `\n${description}`,
            ]
              .filter(Boolean)
              .join("\n"),
          }),
        }
      );
      if (!ingestRes.ok) {
        errors.push(`Ingest endpoint returned ${ingestRes.status}`);
      }
    } catch (err) {
      errors.push(`Ingest fetch failed: ${String(err)}`);
    }
  }

  // ── 2. Forward to Formspree for email notification ────────────────────────
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
  if (!formspreeEndpoint) {
    console.warn("[submit-quote] FORMSPREE_ENDPOINT is not set — skipping email");
  } else {
    try {
      const payload: Record<string, string> = {
        name,
        phone,
        email: email || "",
        serviceType,
        location: location || "",
        description,
        preferredContactMethod,
        _subject: `New quote request from ${name} (${phone})`,
      };
      if (email) payload._replyto = email;

      const formspreeRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!formspreeRes.ok) {
        errors.push(`Formspree returned ${formspreeRes.status}`);
      }
    } catch (err) {
      errors.push(`Formspree fetch failed: ${String(err)}`);
    }
  }

  if (errors.length > 0) {
    console.error("[submit-quote] Errors:", errors);
  }

  // Always return success to the user — partial backend failures shouldn't
  // show an error to the customer who filled out the form.
  return res.status(200).json({ success: true });
}
