# Laptop Setup — Working on the Project from a Second Machine

Step-by-step instructions for setting up a fresh laptop so you can work on the site from either device without losing work. Assumes the project is already running on your desktop (covered in [`local-development.md`](./local-development.md)).

> **The core rule:** GitHub is the single source of truth. Desktop and laptop both pull from / push to the same repo. You never copy files between machines directly.

---

## Part 1: One-time laptop setup

Do this once on the laptop. Takes about 20-30 minutes depending on download speeds.

### Step 1 — Install the required software

All of these are free.

1. **Git** — https://git-scm.com/download/win
   - Run the installer, accept defaults
   - This also installs **Git Bash**, which is the terminal we'll use
2. **Node.js** (LTS version) — https://nodejs.org
   - Install the LTS (not Current), accept defaults
   - Make sure "Add to PATH" is checked during install
3. **VS Code** — https://code.visualstudio.com
   - Any editor works, but VS Code is what the project is set up for
4. **Claude Desktop** — https://claude.ai/download
   - Sign in with the same account you used on the desktop
   - All your conversations and Claude Projects will sync automatically (see [Part 4](#part-4-claude-continuity-across-devices) for details)

### Step 2 — Verify the installs

Open Git Bash (there's a shortcut on the desktop after Git is installed) and run:

```bash
node --version
npm --version
git --version
```

All three should print version numbers. If any say "command not found," close and reopen Git Bash. If still broken, the installer didn't add the tool to the PATH — reinstall that one.

### Step 3 — Tell Git who you are

In Git Bash:

```bash
git config --global user.name "Dustin Swayze"
git config --global user.email "dswayze@gmail.com"
```

(Use whatever name you want to appear on commits.)

### Step 4 — Pick a projects folder and clone the repo

Pick a location on your laptop for all your code. **Don't use `Desktop` or any OneDrive-synced folder** — OneDrive can corrupt `node_modules`. A good choice is `C:\Users\YourName\projects\`.

In Git Bash:

```bash
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/Dustin-Swayze/all-surfaces-renewal.git
cd all-surfaces-renewal
```

If this prompts for credentials, paste your GitHub personal access token. If you don't have one on the laptop yet, generate a new one at https://github.com/settings/tokens/new (scopes: `repo`), and use `git-push-laptop` as the name so you can tell it apart from the desktop token.

### Step 5 — Install dependencies

```bash
npm install
```

Takes about a minute. This reads `package.json` and creates a fresh `node_modules/` folder with all the libraries. Do **not** try to copy `node_modules` from your desktop — always run `npm install` fresh on each machine.

### Step 6 — Recreate the `.env` file

The `.env` file is deliberately **not** in git (it's listed in `.gitignore`) because it holds environment-specific values. You need to recreate it on the laptop manually, using the same values as the desktop.

**Option A — Copy from the desktop.** On the desktop, open the `.env` file in any editor, select all, copy. On the laptop, in the project folder:

```bash
touch .env
code .env       # or open it in any editor
```

Paste the contents, save.

**Option B — Re-enter from scratch.** Copy `.env.example` and fill in the values:

```bash
cp .env.example .env
code .env
```

Then fill in each variable. The values you need are:

| Variable | Value |
| --- | --- |
| `VITE_SITE_NAME` | `All Surfaces Renewal and Repair` |
| `VITE_CONTACT_PHONE` | `(423) 863-7041` |
| `VITE_CONTACT_EMAIL` | `allsurfacesrenewal@gmail.com` |
| `VITE_FACEBOOK_URL` | `https://www.facebook.com/allsurfacefix` |
| `VITE_SERVICE_AREA` | `Serving the Tri-Cities and the surrounding areas` |
| `VITE_BUSINESS_HOURS` | `Mon–Fri, 8 AM – 5 PM (or by appointment)` |
| `VITE_LOGO_URL` | `/images/logo.png` |
| `VITE_FORMSPREE_ENDPOINT` | *(from the Vercel dashboard — see below)* |

To get the Formspree endpoint: log in to Vercel → `all-surfaces-renewal` project → **Settings → Environment Variables** → find `VITE_FORMSPREE_ENDPOINT` → click the eye icon to reveal → copy.

### Step 7 — Start the dev server

```bash
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). The site should look identical to what's on the desktop and on `allsurfacefix.com`.

You're set up.

---

## Part 2: Daily work routine

### Before you start working on either machine

```bash
cd ~/projects/all-surfaces-renewal
git pull
```

This fetches any commits made on the other machine since you last worked here. Running this before you start work is the single most important habit — it prevents merge conflicts.

If `git pull` reports "Already up to date," great.

If `git pull` reports changes, `npm install` again in case any dependencies changed:

```bash
npm install
```

Then:

```bash
npm run dev
```

### Before you stop working (or switch to the other machine)

**Always commit and push before you leave a machine.** Uncommitted work doesn't exist on the other side.

```bash
git status                          # see what you changed
git add .                            # stage everything
git commit -m "Describe the change"  # save the snapshot
git push                             # upload to GitHub
```

If `git status` shows nothing, you're clean — nothing to commit, nothing to push. Safe to switch.

### What to do if you made changes on two machines without pushing

This creates a merge conflict. It's fixable but annoying. Prevention > fixing. If it happens:

1. On the machine where you're sitting, run `git pull`.
2. Git will tell you there are conflicts and list files.
3. Open the conflicted files — Git marks the conflicts with `<<<<<<<`, `=======`, `>>>>>>>` markers.
4. Manually edit the file to keep the version you want.
5. `git add <file>` to mark the conflict resolved.
6. `git commit` to finish the merge.
7. `git push`.

If you're unsure, ask me (in Claude) — I can walk through any specific conflict.

---

## Part 3: Accessing the external services from the laptop

### Vercel

Log in at https://vercel.com with the same GitHub account. All your projects and deploy history will already be there. No setup needed on the laptop side.

### Formspree

Log in at https://formspree.io with the `allsurfacesrenewal@gmail.com` account. All forms and submissions are already there.

### GoDaddy

Log in at https://account.godaddy.com. Nothing to set up.

### Google Search Console

Log in at https://search.google.com/search-console with the Google account that verified the domain.

### Claude

See Part 4 below.

---

## Part 4: Claude continuity across devices

Short answer: **yes, install Claude on the laptop, sign in with the same account, and all your conversations and Claude Projects sync automatically.**

What this means in practice:

- **This conversation** (and every other conversation) shows up on the laptop under the same Project.
- **Claude Projects** — the "All Surfaces Renewal and Repair" project itself — is synced. The project instructions, uploaded files (like the project brief), and chat history all appear on the laptop.
- **What does NOT sync automatically:** your local code files, your `.env` file, your local git clone. Those are per-machine and must be set up via the steps in Part 1.

### The full picture when switching machines

| What | Syncs automatically? | How to get it on the laptop |
| --- | --- | --- |
| Conversation history with Claude | Yes | Sign in to Claude Desktop |
| Claude Project instructions and files | Yes | Sign in to Claude Desktop |
| GitHub code (committed) | No | `git clone` then `git pull` regularly |
| `.env` file | No | Recreate manually ([Step 6](#step-6--recreate-the-env-file)) |
| `node_modules/` | No | `npm install` |
| Vercel dashboard access | Yes (via GitHub login) | Sign in at vercel.com |
| Formspree dashboard access | Yes (cloud service) | Sign in at formspree.io |

### Picking up where you left off

At the start of a new session:

1. Open Claude Desktop on whichever machine
2. Open the **All Surfaces Renewal and Repair** project
3. You'll see all prior conversations — scroll to the most recent to see where we left off
4. Or start a new conversation within the project — the project instructions (the build brief) are automatically included, so I always have context even in a fresh chat

### Keeping Claude's context sharp across long gaps

When you come back to the project after a break (a week+), it helps to give me a 1-2 sentence state summary at the start of the new conversation:

> *"Picking up on All Surfaces Renewal and Repair. Site is deployed to allsurfacefix.com, last thing we did was add real gallery photos. Now I want to [whatever]."*

This saves me from re-inferring the current state from the conversation history.

---

## Part 5: Common issues

### `npm install` fails with EACCES or permission errors

The project folder is inside OneDrive or a similar sync service. Move it to `C:\Users\YourName\projects\` and try again.

### Git push fails with "Repository not found"

The token in `~/.git-credentials` is stale or the token doesn't have `repo` scope. Generate a new token and re-run the `echo` command we used on the desktop setup, adjusted for the laptop.

### Dev server starts but the site shows wrong phone / email / etc.

The `.env` file is missing a value, or the dev server wasn't restarted after editing `.env`. Fix: `Ctrl+C` the dev server, double-check the `.env` values, then `npm run dev` again.

### The site works locally but the live site is outdated

You haven't pushed your commits to GitHub yet. Run `git status` — anything listed there hasn't shipped. Then `git add . && git commit -m "..." && git push`.

### The live site doesn't reflect an env var change

Env var changes in Vercel don't auto-redeploy. Go to Vercel → Deployments → three-dot menu on the latest → **Redeploy**.

---

## Quick reference — laptop session

Start of session:
```bash
cd ~/projects/all-surfaces-renewal
git pull
npm run dev
```

End of session (before switching machines):
```bash
git add .
git commit -m "Describe the change"
git push
```

Everything else lives in Claude, Vercel, Formspree, GitHub — all synced via cloud accounts.
