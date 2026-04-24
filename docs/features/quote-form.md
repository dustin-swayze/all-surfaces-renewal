# Feature: Quote Form

The `/quote` page is the primary conversion surface on the site — the single feature most likely to generate actual business. This doc covers how it works end-to-end, how spam is handled, how to test, and what to do if something breaks.

## What was built

- A controlled React form on the `/quote` page collecting name, phone, email, service type, location, project description, and preferred contact method.
- Client-side validation for required fields, with a graceful error message.
- Submission to **Formspree**, which relays the data as an email to the business inbox.
- A **two-layer spam trap**: a browser-side honeypot that discards bot submissions silently, plus Formspree's server-side filtering (Akismet + honeypot detection).
- A **console-logging fallback** for local development when no Formspree endpoint is configured — the UX still works without requiring a live endpoint.
- An inbox-friendly submission: custom subject line with the customer's name and phone, and a `Reply-To` header so replying to the email goes directly to the customer (when they provide an email).

## Files involved

| File | Role |
| --- | --- |
| `src/components/QuoteForm.tsx` | The form component — state, validation, submission, success/error rendering |
| `src/pages/Quote.tsx` | Wraps the form with page header, contact info sidebar, and SEO metadata |
| `src/data/services.ts` | Populates the "Service needed" dropdown — any service added there appears as an option |
| `src/data/site.ts` | Reads `VITE_FORMSPREE_ENDPOINT` from env |
| `.env` | Holds the actual Formspree endpoint (not committed) |

## How it works — flow diagram

```
Customer fills form on /quote
          │
          ▼
Validate required fields (browser)
          │
          ▼
Honeypot check ─── bot? ── yes ── silently "succeed" (drop submission)
          │
          │ real user
          ▼
Endpoint configured? ── no ── log to console, show success (dev fallback)
          │
          │ yes
          ▼
POST to Formspree with:
   • all form fields
   • _subject: "New quote request from {name} ({phone})"
   • _replyto: customer email (if provided)
   • _gotcha: (blank honeypot)
          │
          ▼
Formspree filters spam, relays as email
          │
          ▼
allsurfacesrenewal@gmail.com inbox
```

## Key concepts

### Controlled form

Every input's `value` is bound to a React state field (`form` state), and every change handler calls `setForm(...)` to update it. This gives the component full control over what's in each field — we can validate, reset, or inspect the form state at any time.

```tsx
const [form, setForm] = useState<QuoteRequest>(initialForm);

const update = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) => {
  setForm((prev) => ({ ...prev, [key]: value }));
};

<input value={form.name} onChange={(e) => update('name', e.target.value)} />
```

The `QuoteRequest` interface in `src/types/index.ts` is the source of truth — adding a field there means the form state shape picks it up.

### Honeypot spam protection

A hidden `<div>` with a text input named `_gotcha` — visible in the DOM, but hidden from humans with `aria-hidden` and `className="hidden"`. Real users can't see or interact with it; automated bots that scrape forms and fill every field *do* fill it. When the form submits, we check if `_gotcha` is non-empty, and if so, we **silently return success without sending anything**. The bot "thinks" it worked (no learning signal) and the business inbox stays clean.

`_gotcha` is also Formspree's standard honeypot field name — so even if a bot slips past our client-side check, Formspree's server-side filter catches it. Double layer.

### Formspree integration

Formspree is a third-party form service that accepts HTTP POST requests and relays them as email. The endpoint URL (set in `.env` as `VITE_FORMSPREE_ENDPOINT`) is the specific form's inbox. The URL looks like:

```
https://formspree.io/f/mwvaybwq
```

Free tier is 50 submissions/month, which is plenty for a small business. Formspree handles:

- Delivery to the configured inbox (in our case `allsurfacesrenewal@gmail.com`)
- Spam filtering via Akismet and `_gotcha`
- Dashboard of submissions (log in at formspree.io)
- Email notifications with a clear subject line (ours uses `_subject`)
- Reply-to routing (ours uses `_replyto` when email is present)

### Fallback for local dev

If `VITE_FORMSPREE_ENDPOINT` is blank (e.g. a fresh developer who hasn't set up their `.env` yet), the form still "works" — it logs the submission to the browser console and shows the success state. This lets us iterate on the form UX without being blocked on credentials.

## Setting up Formspree (from scratch)

Already done for this project, but for the record:

1. Sign up at https://formspree.io with the business email
2. **+ New Form** → name it (e.g. "All Surfaces — Quote Requests")
3. The destination email defaults to your account email — make sure it's the one the owner actually reads
4. Copy the form endpoint from the form's page (starts with `https://formspree.io/f/`)
5. Paste it into `.env` as `VITE_FORMSPREE_ENDPOINT`
6. Paste the same value into Vercel → Settings → Environment Variables
7. First real submission triggers a confirmation email from Formspree — click the activation link once

## Testing

### Locally

```bash
npm run dev
```

Go to http://localhost:5173/quote. Fill in the form. Check:

- Required field validation works if you leave them blank
- Submitting posts to Formspree (check the Network tab in DevTools) or logs to console if the endpoint is blank
- The success state renders after a successful submission
- The "Submit another request" button resets the form

### In production

After any change to the form, do a **live end-to-end test on allsurfacefix.com**:

1. Fill in the form with your own contact info and a recognizable description
2. Submit
3. Check the `allsurfacesrenewal@gmail.com` inbox — the email should arrive within a minute
4. Hit **Reply** on that email — the compose window should have **your** email in the To field (not a Formspree address), confirming the `_replyto` header is working

## Common questions

### Can I add a new field to the form?

Yes. Three steps:

1. Add the field to the `QuoteRequest` type in `src/types/index.ts`.
2. Add the field to `initialForm` in `QuoteForm.tsx`.
3. Add the `<Field>` + input in the form's JSX.

The POST to Formspree uses `...form` (spread) so any field you add flows through automatically and appears in the email.

### Can I change what counts as a required field?

Yes. The `required` prop on each `<input>`/`<select>`/`<textarea>` controls browser-side validation, and the `if (!form.name || !form.phone || ...)` guard in `handleSubmit` is the JS-side check. Adjust both together.

### Can customers attach photos?

Not yet. Formspree's free tier doesn't support file uploads. Paid tiers ($10/month) do. Adding file uploads would also require updating the form's `Content-Type` from `application/json` to `multipart/form-data`. Listed in the project brief as a future feature.

### How do I see a history of submissions?

Log in at https://formspree.io → pick the form → **Submissions** tab. Every submission is logged there even if the email gets lost.

### How do I change the email the submissions go to?

Two places — Formspree's dashboard (**Settings → Notifications → Email**) and the destination doesn't need to match anything in our code. No `.env` change needed for an email change.

## Troubleshooting

### Submissions aren't arriving

1. Check Formspree dashboard **Submissions** tab — if they're there, the issue is email delivery. Check spam folder, verify the destination email in Formspree settings.
2. If Formspree has no submissions logged, the issue is before Formspree — check the browser Network tab during submit to see if the POST succeeded, and check that `VITE_FORMSPREE_ENDPOINT` is set correctly in both local `.env` and Vercel env vars.

### All submissions are going to spam

Normal for a new Formspree form until a few legitimate submissions prove it isn't spam. Add `no-reply@formspree.io` to the contact list to help Gmail/Outlook learn.

### Test submissions work but real ones don't

Almost always means you tested in local dev (fallback path) but didn't verify on the live site after setting up the env var on Vercel. Test again against allsurfacefix.com specifically.

## Future improvements

- **File uploads** for customer-supplied photos of the surface
- **SMS notification** to the owner's phone (Formspree has webhook support — could trigger a Zapier workflow)
- **Auto-reply** to the customer confirming their request was received (Formspree autoresponders, paid tier)
- **Saved drafts** in localStorage if the user navigates away mid-form
- **Calendar booking** as a next-step CTA after a successful submission
