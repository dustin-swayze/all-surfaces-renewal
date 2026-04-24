# Local Development

How to get the site running on your computer.

## Prerequisites

- **Node.js 20 or newer** — https://nodejs.org
- **Git** — https://git-scm.com
- A code editor (VS Code recommended)

Verify with:

```bash
node --version    # should print v20.x or higher
npm --version
git --version
```

## One-time setup

```bash
git clone <your-github-repo-url>
cd "All Surfaces Renewal and Repair"
npm install
cp .env.example .env
```

Open `.env` and fill in your real values (see [Environment variables](#environment-variables) below).

## Running the site

```bash
npm run dev
```

This starts the Vite dev server (usually at http://localhost:5173). The page hot-reloads when you edit any file.

## Building for production

```bash
npm run build
```

Outputs a production bundle to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Environment variables

All variables are declared in `.env.example`. Copy that file to `.env` and fill in your values. `.env` is gitignored — never commit it.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_NAME` | Business name shown in the navbar and footer |
| `VITE_CONTACT_PHONE` | Phone number shown in the footer and contact page |
| `VITE_CONTACT_EMAIL` | Email address shown in the footer and contact page |
| `VITE_FACEBOOK_URL` | Link to the business Facebook page |
| `VITE_SERVICE_AREA` | Short service area description (e.g. "Serving Greater Boise") |
| `VITE_FORMSPREE_ENDPOINT` | Formspree POST URL for quote form submissions |

All `VITE_*` variables are read at build time and **exposed to the browser**. Do not put secrets in them.

## Setting up Formspree

The quote form posts to Formspree, which emails submissions to the business owner.

1. Create a free account at https://formspree.io
2. Create a new form — set the destination email to the owner's inbox
3. Copy the form endpoint URL (it looks like `https://formspree.io/f/abcd1234`)
4. Paste it into `.env` as `VITE_FORMSPREE_ENDPOINT`

Formspree's free tier handles:

- **Spam filtering** (honeypot + Akismet)
- **Email notifications** to the owner
- **Submission history** in the Formspree dashboard

The quote form also ships with its own honeypot field as a first line of defense — a hidden input that real users won't fill in. If a bot fills it, the form silently pretends success without sending anything.

If `VITE_FORMSPREE_ENDPOINT` is empty (e.g. in local dev before you've set it up), the form falls back to logging the submission to the browser console so you can still test the UX.

## Common issues

**`npm install` fails with permission errors on Windows.** Make sure the project folder is **not** inside OneDrive. OneDrive sync can interfere with Node's file locking. Move the folder somewhere like `C:\Users\YourName\projects\`.

**Port 5173 is in use.** Vite will automatically pick the next free port — check the terminal output for the actual URL.

**Changes to `tailwind.config.js` don't show up.** Restart the dev server. Config files are only read on startup.
