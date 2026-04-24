# Project Documentation

This folder is the ongoing documentation for the **All Surfaces Renewal and Repair** website. Every meaningful feature, component, and architectural decision should have at least a short write-up here.

> If it is built, it is documented.

## Structure

```
/docs
  project-brief.md             ← The original brief (do not edit, reference only)
  /architecture
    project-structure.md       ← Folder layout and why
    routing.md                 ← How pages are wired up
  /features
    (add a markdown file per feature as it ships)
  /setup
    local-development.md       ← How to run the site locally
    deployment.md              ← How to deploy to Vercel / Netlify
```

## Writing docs

Each feature doc should cover:

1. **What was built** — the feature in plain English
2. **How it works** — components, data flow, important logic
3. **Files and structure** — what was created or modified, and why
4. **Key concepts** — React / TypeScript ideas worth explaining
5. **How to run and test** — exact steps to verify it works
6. **Future improvements** — what could be better later

Keep it practical. A future developer (or your future self) should be able to onboard from these docs alone.
