# Feature Design: Customer Review Submission & Approval Pipeline

End-to-end design for letting customers submit reviews on allsurfacefix.com, having them approved via the dswayze.dev dashboard, and displaying approved reviews back on the live site.

> **Status:** Design doc — not implemented yet. Review and adjust before code lands.

## Goals

- Customers can submit a review without creating an account
- Submissions are pending until you (Dustin) explicitly approve them
- Approved reviews appear on the `/reviews` page and the homepage featured section
- The pipeline mirrors the existing gallery flow so the dashboard UI is consistent
- Spam protection is layered (honeypot + manual approval) without adding friction for real customers

## Non-goals (for v1)

- Customer accounts / login
- Editing or deleting reviews after publication (will require a manual SQL update for now)
- Star-rating filters on the public page
- Verification via email confirmation link (deferred — manual approval is the actual gate)

---

## Architecture

```
   Customer browser
   (allsurfacefix.com/leave-review)
        |
        | POST { customer_name, rating, text, email?, ... }
        v
   allsurfacefix.com /api/submit-review  (Vercel function)
        |
        | POST + INGEST_API_KEY header
        v
   dswayze.dev /api/ingest-review        (Vercel function)
        |
        | INSERT (approved = false, created_at = now())
        v
   Supabase: reviews table

   ─── async ───────────────────────────────────────────────

   You: dswayze.dev/dashboard/reviews
        |
        | clicks Approve / Reject
        v
   dswayze.dev API updates row (approved = true, approved_at = now())

   ─── render ──────────────────────────────────────────────

   Visitor browser
   (allsurfacefix.com/reviews or homepage)
        |
        | useReviews() hook
        v
   Supabase JS client: SELECT * WHERE approved = true ORDER BY display_order
        |
        v
   ReviewCard components
```

The shape exactly parallels the existing gallery pipeline. The only differences:

- The submitter is the **customer**, not the business owner (so the form is on the public site, not behind an upload token)
- No file uploads (text-only)
- Approval has fewer fields to verify (no image to crop / categorise)

---

## Supabase: schema and RLS

### Table: `reviews`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `customer_name` | `text` | NOT NULL, length 1–80 |
| `rating` | `int2` | NOT NULL, CHECK between 1 and 5 |
| `text` | `text` | NOT NULL, length 10–2000 |
| `email` | `text` | Nullable; collected for follow-up only, never displayed publicly |
| `source` | `text` | NOT NULL DEFAULT `'Website'`; CHECK in (`'Facebook'`,`'Google'`,`'Website'`,`'Other'`) |
| `approved` | `boolean` | NOT NULL DEFAULT `false` |
| `featured` | `boolean` | NOT NULL DEFAULT `false`; controls homepage featured-section eligibility |
| `display_order` | `int4` | NOT NULL DEFAULT `0`; controls ordering on /reviews (lower = earlier) |
| `submitter_ip` | `text` | Nullable; captured server-side from the request, used for rate-limit detection |
| `created_at` | `timestamptz` | NOT NULL DEFAULT `now()` |
| `approved_at` | `timestamptz` | Nullable; set when approved transitions to true |
| `approved_by` | `text` | Nullable; admin identifier (Dustin's user ID or email) |
| `notes` | `text` | Nullable; private dashboard-only notes (e.g. "verified in Travis's job log") |
| `site` | `text` | NOT NULL; for multi-tenant filtering (e.g. `'allsurfacefix.com'`). Matches the existing `gallery_items.site` column. |
| `project_type` | `text` | Nullable; the customer-selected project category (Bathtub, Countertop, etc.) |

### Migration SQL

```sql
create extension if not exists "pgcrypto";

create extension if not exists "pgcrypto";

create table public.reviews (
  id              uuid primary key default gen_random_uuid(),
  site            text not null,
  customer_name   text not null check (char_length(customer_name) between 1 and 80),
  rating          int2 not null check (rating between 1 and 5),
  text            text not null check (char_length(text) between 10 and 2000),
  email           text,
  project_type    text,
  source          text not null default 'Website'
                  check (source in ('Facebook','Google','Website','Other')),
  approved        boolean not null default false,
  featured        boolean not null default false,
  display_order   int4 not null default 0,
  submitter_ip    text,
  created_at      timestamptz not null default now(),
  approved_at     timestamptz,
  approved_by     text,
  notes           text
);

create index reviews_site_approved_idx on public.reviews (site, approved, display_order);
create index reviews_created_idx       on public.reviews (created_at desc);

alter table public.reviews enable row level security;

-- Public read: only approved rows for whichever site is asking
create policy "Public can read approved reviews"
  on public.reviews for select
  using (approved = true);

-- Anonymous INSERT is intentionally NOT allowed at the DB level.
-- All writes happen via dswayze.dev's /api/reviews/ingest endpoint
-- using the service role key.

-- service_role automatically bypasses RLS
```

### Why no anonymous INSERT policy?

Two reasons:

1. **Server-side validation** — the dswayze.dev function can rate-limit by IP, sanitize input, and reject malformed payloads before they hit the table. A direct anonymous INSERT policy could be abused by a bad actor calling the Supabase REST API directly with crafted payloads.
2. **Single writer pattern** — same as the gallery. If we ever want to add fields, change validation, or hook in side effects (Slack notifications, etc.), there's exactly one place to change it.

---

## dswayze.dev: ingest endpoint and dashboard

### `/api/ingest-review` (new endpoint)

A Vercel function on dswayze.dev that:

- Accepts POST with JSON body `{ customer_name, rating, text, email?, submitter_ip? }`
- Validates the `INGEST_API_KEY` header matches the env var (same key used by the existing quote-lead ingest)
- Validates body shape and string lengths
- Inserts into Supabase `reviews` using the service_role key — `approved` defaults to `false`
- Returns `{ ok: true }` or `{ ok: false, error }`

### Dashboard: reviews tab

Add a new tab to the existing dashboard alongside Gallery uploads:

- **Pending list** — reviews where `approved = false`, ordered by `created_at desc`. Each row shows the rating (stars), customer name, text, source, IP (for spam triage), and submitted-at timestamp.
- **Approved list** — reviews where `approved = true`, with the same fields plus a `featured` toggle and a `display_order` numeric input.
- **Per-row actions:**
  - **Approve** — sets `approved = true`, `approved_at = now()`, `approved_by = <your id>`. Optionally edit `customer_name` and `text` first (typo fixes). The dashboard UI should make edits visible (e.g., italics) so you can confirm.
  - **Reject** — soft-delete or hard-delete. I'd recommend **hard-delete** for spam/junk to keep the table clean, since rejected reviews have no audit value here.
  - **Toggle featured** — only enabled for approved rows. Featured rows are the ones shown on the homepage preview section.
  - **Adjust display_order** — for reordering on `/reviews`.
- **Privacy note in UI** — when displaying reviews, show the email as a small `mailto:` link only to you (admin), so you can reach out for clarification or correction permission. Never expose `email` in any public API response.

### Why hard-delete on reject?

Reviews aren't legally significant records (unlike financial data). A spam submission has zero downstream value once removed. Soft-delete creates clutter in the table over time and makes "what's approved" queries needlessly complex.

If you ever want a softer policy (e.g. you accidentally rejected a real review), you can add a `rejected_at` column later. For v1, hard-delete on reject is the cleaner choice.

---

## allsurfacefix.com: submission form and display

### New page: `/leave-review`

A dedicated page (better than a modal or section because: shareable URL — Travis can text customers a direct link — and SEO benefits from a focused page).

Form fields:

| Field | Required | Notes |
|---|---|---|
| Your name | Yes | 1–80 chars |
| Rating | Yes | 1–5 stars (radio or interactive star UI) |
| Review | Yes | 10–2000 chars |
| Email | Optional | Collected for follow-up only, never displayed |
| Project type | Optional | Dropdown using the same service categories as the quote form |
| `_gotcha` | (hidden) | Honeypot, identical to the quote form |

After submit:

- Show a confirmation state: "Thanks! Your review has been submitted and will appear once approved. We typically review submissions within 1-2 business days."
- Reset the form
- Don't promise *when* it'll appear (gives you control) but reassure that it's not lost

### `/api/submit-review` (Vercel function on allsurfacefix.com)

Mirrors `/api/submit-quote`:

```typescript
// Pseudo-code
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { customer_name, rating, text, email, _gotcha } = req.body;

  // Honeypot check
  if (_gotcha) return res.status(200).json({ ok: true }); // silent success

  // Basic validation (length, types, range)
  if (!validate(...)) return res.status(400).json({ ok: false, error: 'Invalid input' });

  // Forward to dswayze.dev
  const ingestRes = await fetch('https://dswayze.dev/api/ingest-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Ingest-Key': process.env.INGEST_API_KEY!,
    },
    body: JSON.stringify({
      customer_name,
      rating,
      text,
      email,
      submitter_ip: req.headers['x-forwarded-for'] ?? null,
    }),
  });

  if (!ingestRes.ok) return res.status(502).json({ ok: false, error: 'Ingest failed' });
  return res.status(200).json({ ok: true });
}
```

### Display: `useReviews` hook

Parallel to `useGalleryItems`:

```ts
// src/hooks/useReviews.ts
export function useReviews() {
  // Fetch from Supabase: SELECT * FROM reviews WHERE approved = true ORDER BY display_order, created_at DESC
  // Falls back to the static reviews.ts array if Supabase env vars are missing or the query fails
  // Returns { reviews, loading, error }
}
```

The existing `src/data/reviews.ts` becomes the **fallback**. When real reviews are live, the static file can either be emptied (the empty-state placeholder kicks in if Supabase is also empty) or kept as a list of "anchor" testimonials shown when nothing else is available.

### Where the entry points live on the site

- **Footer** — small "Leave a review" link in the Quick Links column
- **Reviews page** — prominent CTA at the top: "Were we great? Leave a review." button linking to `/leave-review`
- **Quote form success state** — small text after a successful submission: "Already worked with us? [Leave a review](/leave-review)" (subtle — only shown when someone is requesting a *new* quote, so it's contextually wrong; consider this opt-in only)

I'd skip the third one for v1 — wrong audience for a "leave a review" prompt.

---

## Spam protection layers

1. **Honeypot field** in the form — caught client-side, identical to the quote form's `_gotcha`
2. **Rate limiting** in `/api/submit-review` — keep it simple: 1 review per IP per hour (in-memory or via a `submitter_ip` table query). Refuse with HTTP 429.
3. **Length validation** — server-side, reject anything outside the 10–2000 char range
4. **Profanity filter (optional, deferred)** — could integrate `bad-words` npm package or similar; for v1 manual approval is sufficient
5. **Manual approval** — the actual gate. You read every review before it goes live.

---

## Environment variables

No new variables needed on **allsurfacefix.com** — `INGEST_API_KEY` already exists.

On **dswayze.dev**, ensure these are set in Vercel:

| Variable | Notes |
|---|---|
| `INGEST_API_KEY` | Already exists (used by the quote-lead ingest) — same value reused |
| `SUPABASE_SERVICE_ROLE_KEY` | Already exists (used for gallery writes) — same value reused |
| `SUPABASE_URL` | Already exists |

---

## Implementation phases

Each phase ends with something testable, so we can ship incrementally.

### Phase 1: Supabase schema (you, ~5 min)
- Run the migration SQL in your Supabase project's SQL editor
- Verify the table exists and RLS is enabled
- Manually insert one approved test review to verify the read path

### Phase 2: dswayze.dev ingest endpoint (you or me with your help, ~30 min)
- Add `/api/ingest-review.ts` that validates the key and inserts to Supabase
- Test with a `curl` POST to confirm rows land with `approved=false`

### Phase 3: dswayze.dev dashboard UI (you, ~1-2 hr)
- Add "Reviews" tab to the dashboard
- List pending and approved reviews
- Approve / Reject / Featured / Reorder actions
- This is the most code on the dswayze.dev side

### Phase 4: allsurfacefix.com submission form + API (me, ~1 hr)
- New `/leave-review` route + `LeaveReviewPage`
- New `/api/submit-review` function
- Add footer link and `/reviews` page CTA
- Document in `docs/features/leave-review.md`

### Phase 5: allsurfacefix.com display (me, ~30 min)
- New `src/hooks/useReviews.ts`
- Refactor `Reviews.tsx` and `Home.tsx` to use the hook with the static fallback
- Document in `docs/features/reviews-display.md`

### Phase 6: end-to-end test (us, ~15 min)
- Submit a real review via the live site
- Confirm it lands in Supabase pending
- Approve it via the dashboard
- Confirm it appears on `/reviews` and homepage

### Phase 7: messaging & process (you, ongoing)
- Add a "Leave a review" link to Travis's standard end-of-job text/email
- Optionally: add a small QR code on his business card / receipts pointing to `/leave-review`

---

## Open questions / things to decide before phase 1

1. **Star UI:** simple radio buttons (1-5), or interactive hover-to-fill stars? Hover stars are nicer; radio buttons are 30 seconds of work.
2. **"Featured" model:** is the homepage featured section "the first N approved reviews ordered by `display_order`," or does it require an explicit `featured = true` flag? I lean explicit-flag for control; either works.
3. **Email field:** required or optional? My recommendation is optional — most happy customers won't bother and you don't want to lose them.
4. **Rejection deletion:** confirm hard-delete is fine for v1. (vs. soft-delete with a `rejected_at` column)
5. **What "source" gets defaulted for reviews submitted via the site form?** I have it as `'Website'` in the schema; reasonable. Open to renaming if you'd rather.
