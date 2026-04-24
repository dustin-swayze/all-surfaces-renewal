# Project Build Brief: All Surfaces Renewal and Repair Website

## 1. Project Overview

**Project Name:** All Surfaces Renewal and Repair Website  
**Business:** All Surfaces Renewal and Repair  
**Purpose:** Build a simple, modern, mobile-friendly website for a surface repair and renewal business that specializes in restoring bathtubs, countertops, sinks, bathrooms, and similar surfaces.

The website should function as a professional online presence for the business. Its main goal is to help potential customers understand the services offered, view examples of past work, read reviews, and request a quote.

Most of the business information, service descriptions, photos, and reviews will be adapted from the business’s Facebook page.

---

## 2. Primary Goals

The website should:

1. Clearly explain what All Surfaces Renewal and Repair does.
2. Display professional contact information.
3. Allow customers to request a quote.
4. Showcase before-and-after photos of completed work.
5. Display customer reviews/testimonials.
6. Look modern, clean, trustworthy, and mobile-friendly.
7. Be easy to maintain and update.
8. Serve as a portfolio project demonstrating React, TypeScript, and modern web development practices.

---

## 3. Target Audience

The target audience includes:

- Homeowners needing bathtub, sink, countertop, or bathroom surface repair.
- Landlords and property managers who need affordable surface restoration between tenants.
- Realtors preparing homes for sale.
- Small businesses or commercial property owners needing surface refinishing or repair.
- Customers comparing repair/refinishing against full replacement.

The website should communicate that surface renewal can be more affordable and less disruptive than full replacement.

---

## 4. Proposed Tech Stack

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- Optional: React Router for multi-page navigation

### Backend / Form Handling Options

For the MVP, the site can start as mostly static with a contact/quote form.

Possible quote form options:

1. **Simple form service** such as Formspree, Netlify Forms, or EmailJS.
2. **Custom backend** using Django or FastAPI.
3. **Supabase** for storing quote requests and customer submissions.

Recommended MVP path:

- Start with React + TypeScript + Vite + Tailwind.
- Use a simple contact/quote form integration first.
- Add a backend later only if needed.

### Deployment

Possible deployment options:

- Vercel
- Netlify
- AWS later if the site becomes more advanced

Recommended MVP path:

- Use Vercel or Netlify for fast deployment.
- Keep the project simple, low-cost, and easy to update.

---

## 5. Website Structure

### Recommended Pages

#### Home Page

The homepage should immediately communicate what the business does and encourage the visitor to request a quote.

Suggested sections:

- Hero section with strong headline
- Short business description
- Call-to-action buttons: “Get a Free Quote” and “View Our Work”
- Service highlights
- Before-and-after preview
- Review/testimonial preview
- Contact information

Example hero copy:

> Professional bathtub, countertop, sink, and surface renewal without the cost of full replacement.

CTA buttons:

- Get a Free Quote
- View Before & After Photos

---

#### Services Page

This page should explain the main services offered.

Potential service categories:

- Bathtub repair and refinishing
- Countertop resurfacing
- Sink repair and refinishing
- Bathroom surface restoration
- Chip, crack, and stain repair
- Fiberglass and porcelain repair
- Surface recoloring or refinishing

Each service section should include:

- Short explanation
- Common customer problems it solves
- Benefits of repair versus replacement
- Optional before/after image

---

#### Gallery / Before & After Page

This page should showcase completed work.

Features:

- Grid of before-and-after images
- Categories or filters if needed later
- Captions describing the job
- Mobile-friendly image layout
- Optional lightbox image viewer

Possible categories:

- Bathtubs
- Countertops
- Sinks
- Bathrooms
- Repairs

MVP version:

- Static image gallery using local images.

Future version:

- Admin dashboard for uploading new project photos.

---

#### Reviews Page

This page should display customer reviews and testimonials.

Features:

- Review cards
- Customer name or initials
- Star rating if available
- Short testimonial quote
- Optional source label, such as Facebook review

MVP version:

- Manually add reviews from Facebook.

Future version:

- Pull reviews from Google Business Profile or Facebook if practical.

---

#### Get a Quote Page

This is one of the most important pages.

The quote form should collect:

- Customer name
- Phone number
- Email address
- Service needed
- Project description
- City/location
- Preferred contact method
- Optional photo upload if supported

MVP version:

- Form sends an email to the business owner.

Future version:

- Store quote requests in a database.
- Add admin dashboard to view and manage quote requests.
- Allow customers to upload photos.

---

#### Contact Page

This page should include:

- Business name
- Phone number
- Email address
- Service area
- Facebook link
- Quote request button
- Optional embedded map if there is a public business location

If the business is service-area based and does not have a public storefront, avoid displaying a private address.

---

## 6. Design Direction

The site should feel:

- Clean
- Professional
- Trustworthy
- Modern
- Local-service oriented
- Easy to navigate

Suggested visual style:

- Light background
- Deep blue, charcoal, gray, or neutral tones
- Accent color such as teal, blue, or orange
- Rounded cards
- Strong before-and-after imagery
- Clear buttons
- Mobile-first layout

The visual style should avoid feeling too generic or overly flashy. The work photos should be the star of the site.

---

## 7. Core Features for MVP

### MVP Features

1. Responsive navigation bar
2. Mobile-friendly homepage
3. Services overview
4. Before-and-after gallery
5. Reviews/testimonials section
6. Contact information display
7. Quote request form
8. Footer with contact links and Facebook link
9. Basic SEO metadata
10. Fast-loading image optimization

---

## 8. Future Features

Possible later features:

1. Admin dashboard for adding gallery photos
2. Admin dashboard for managing quote requests
3. Customer photo uploads for quotes
4. Blog or educational articles
5. Google Reviews integration
6. Facebook post/gallery integration
7. Service area landing pages for SEO
8. Online booking or appointment request system
9. Before-and-after image slider component
10. Automated quote request email notifications

---

## 9. Suggested Components

The React application should be broken into reusable components.

Recommended components:

- `Navbar`
- `HeroSection`
- `ServiceCard`
- `BeforeAfterCard`
- `GalleryGrid`
- `ReviewCard`
- `QuoteForm`
- `ContactInfo`
- `Footer`
- `CTASection`
- `PageHeader`

Optional later components:

- `ImageLightbox`
- `BeforeAfterSlider`
- `AdminPhotoUpload`
- `QuoteRequestTable`

---

## 10. Basic Data Models

For the MVP, data can be stored in local TypeScript files.

### Service

```ts
interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
}
```

### Gallery Item

```ts
interface GalleryItem {
  id: string;
  title: string;
  category: 'bathtub' | 'countertop' | 'sink' | 'bathroom' | 'repair' | 'other';
  beforeImage: string;
  afterImage: string;
  description?: string;
}
```

### Review

```ts
interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  source?: 'Facebook' | 'Google' | 'Website' | 'Other';
}
```

### Quote Request

```ts
interface QuoteRequest {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  location?: string;
  description: string;
  preferredContactMethod: 'phone' | 'email' | 'text';
}
```

---

## 11. SEO Goals

The website should be optimized for local search.

Important SEO phrases may include:

- bathtub repair
- bathtub refinishing
- countertop repair
- countertop resurfacing
- sink repair
- bathroom surface repair
- surface renewal
- surface restoration
- affordable bathroom repair
- repair instead of replace

Once the business service area is confirmed, add location-specific phrases such as:

- bathtub repair in [city]
- countertop refinishing in [city]
- bathroom surface restoration near [city]

Each page should have:

- Clear page title
- Meta description
- H1 heading
- Descriptive image alt text
- Fast-loading images

---

## 12. Content Needed From Facebook Page

Information to gather from the Facebook page:

1. Business description
2. Contact phone number
3. Email address, if listed
4. Service area
5. Business hours, if listed
6. Photos of past work
7. Before-and-after examples
8. Customer reviews
9. Common wording the business already uses
10. Logo or brand imagery, if available

Do not copy customer reviews or photos without permission if there are copyright/privacy concerns. For a real client website, confirm the business owner approves the content.

---

## 13. AI-Assisted Development Workflow

This project should be built using AI as a coding assistant, not as an unsupervised developer.

Recommended workflow:

1. Create the project brief.
2. Generate the initial React + TypeScript + Vite project.
3. Add Tailwind CSS.
4. Build the page layout and routing.
5. Add static content and placeholder images.
6. Add the quote form.
7. Add real business content from Facebook.
8. Test mobile responsiveness.
9. Optimize images and SEO.
10. Deploy the site.
11. Review with the business owner.
12. Iterate based on feedback.

---

## 14. Master Prompt for Claude Code / Codex

Use this as the starting prompt when asking an AI coding assistant to build the project.

```text
I am building a modern business website for a company called All Surfaces Renewal and Repair.

The business repairs and renews bathtubs, countertops, sinks, bathrooms, and other surfaces. The website should help customers understand the services, view before-and-after images, read reviews, and request a quote.

Tech stack:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router if needed

Build goals:
- Clean, modern, professional design
- Fully responsive/mobile-friendly layout
- Homepage with hero section, services preview, before-and-after preview, reviews preview, and quote CTA
- Services page
- Before-and-after gallery page
- Reviews page
- Get a Quote page with a working form structure
- Contact page
- Reusable components
- Data stored in local TypeScript files for now
- Clear folder structure
- Basic SEO-friendly page structure

Please first inspect the existing project structure. Then propose the files you plan to create or modify before making changes.

After implementing, summarize what you changed and tell me exactly how to run and test the project locally.
```

---

## 15. Example Feature Prompt: Build the Homepage

```text
Build the homepage for All Surfaces Renewal and Repair.

Requirements:
- Hero section with business name, headline, short description, and two CTA buttons
- Services preview section with cards for bathtub repair, countertop repair, sink repair, and bathroom restoration
- Before-and-after preview section using placeholder images
- Reviews preview section with 3 testimonial cards
- Final CTA section encouraging users to request a quote
- Fully responsive using Tailwind CSS
- Use reusable components where appropriate
- Keep the design clean, modern, and professional

Before coding, explain which components/files you will create or modify.
After coding, explain how to test the homepage locally.
```

---

## 16. Example Feature Prompt: Build the Quote Form

```text
Create a Get a Quote page for All Surfaces Renewal and Repair.

The form should collect:
- Name
- Phone number
- Email address
- Service needed
- Project location/city
- Project description
- Preferred contact method

Requirements:
- Use React and TypeScript
- Use controlled form inputs
- Add basic validation for required fields
- Show a success message after submission
- For now, log the form data to the console instead of sending it to a backend
- Style the form with Tailwind CSS
- Make it mobile-friendly

Before coding, explain the implementation plan.
After coding, summarize what changed and how to test it.
```

---

## 17. Example Feature Prompt: Build the Gallery

```text
Build a before-and-after gallery page for All Surfaces Renewal and Repair.

Requirements:
- Display gallery items from a local TypeScript data file
- Each item should show a before image, after image, title, category, and short description
- Use a responsive grid layout
- Add category filters for bathtub, countertop, sink, bathroom, and repair
- Use placeholder images for now
- Make the layout clean and mobile-friendly

Before coding, explain the component structure.
After coding, explain how to add new gallery items later.
```

---

## 18. Development Milestones

### Milestone 1: Project Setup

- Create React + TypeScript + Vite app
- Install and configure Tailwind CSS
- Set up folder structure
- Add routing
- Create base layout

### Milestone 2: Static Website MVP

- Homepage
- Services page
- Gallery page
- Reviews page
- Contact page
- Quote page

### Milestone 3: Content Replacement

- Replace placeholder text with real business information
- Add real before-and-after images
- Add real reviews
- Add logo/branding if available

### Milestone 4: Polish

- Mobile testing
- Image optimization
- SEO metadata
- Accessibility improvements
- Contact/quote form integration

### Milestone 5: Deployment

- Deploy to Vercel or Netlify
- Connect domain if available
- Test production site
- Review with business owner

---

## 19. Success Criteria

The MVP is successful when:

1. A customer can quickly understand what the business does.
2. The site looks professional on desktop and mobile.
3. The customer can easily contact the business.
4. The customer can request a quote.
5. Before-and-after images clearly show the quality of work.
6. Reviews build trust.
7. The site can be updated without major code rewrites.
8. The project can be shown as a portfolio example of modern React + TypeScript development.

---

## 20. Notes for Development

Keep the first version simple. Do not overbuild the backend before the site has real content and clear business needs.

The highest-value pieces are:

1. Strong homepage
2. Clear quote request flow
3. Good before-and-after gallery
4. Mobile-friendly design
5. Trust-building reviews

Once those are working, then consider admin tools, database storage, and advanced integrations.

---

## 21. Documentation Requirement (CRITICAL)

This project must include **high-quality, ongoing technical documentation** as part of the development process. Documentation is not optional—it is a core deliverable of the project.

The documentation will serve three purposes:

1. **AI Context:** Provide clear, structured context for tools like Claude Code and ChatGPT Codex.
2. **Learning Resource:** Help the developer understand React, TypeScript, and modern web architecture.
3. **Portfolio Evidence:** Demonstrate professional-level engineering practices and technical communication.

---

## 22. Documentation Standards

All features and major changes must include documentation covering:

### 1. What Was Built
- High-level explanation of the feature
- What problem it solves
- Where it appears in the application

### 2. How It Works
- Component structure
- Data flow (props, state, API calls if applicable)
- Key logic explained in plain English

### 3. Files and Structure
- Files created or modified
- Folder structure explanation
- Why this structure was chosen

### 4. Key Code Concepts
- Explanation of important React/TypeScript concepts used
- Examples:
  - useState / useEffect
  - Props and typing
  - Controlled forms
  - Component composition

### 5. How to Run and Test
- How to start the app locally
- How to navigate to the feature
- How to verify it works

### 6. Future Improvements
- What could be improved later
- What would be needed to scale it

---

## 23. Documentation Format

Documentation should be written in Markdown and stored in a `/docs` folder in the project.

Suggested structure:

```
/docs
  /features
    homepage.md
    services.md
    gallery.md
    quote-form.md
  /architecture
    project-structure.md
    routing.md
    state-management.md
  /setup
    local-development.md
    deployment.md
```

Each feature should have its own document.

---

## 24. AI Prompt Requirement for Documentation

Every time a feature is built using AI (Claude Code, Codex, or ChatGPT), the prompt must include:

```text
After implementing the feature, generate documentation that includes:
- What was built
- How it works
- Files created/modified
- Key concepts used
- How to test it
- Future improvements

Write the documentation in a clean, professional Markdown format suitable for a /docs folder.
```

---

## 25. Documentation Style Guidelines

Documentation should be:

- Clear and concise
- Written in plain English first, then technical detail
- Structured with headings and bullet points
- Easy for a future developer (or your future self) to understand
- Professional enough to show in a portfolio

Avoid:

- Overly academic explanations
- Copy-pasting raw AI output without editing
- Leaving undocumented components or logic

---

## 26. Success Criteria for Documentation

Documentation is successful when:

1. You can revisit the project months later and understand it quickly
2. Another developer could onboard without confusion
3. AI tools can use the documentation as reliable context
4. The project demonstrates both technical and communication skill

---

## 27. Key Principle

> If it is built, it is documented.

Every meaningful feature, component, and architectural decision should have at least a lightweight explanation.

This will significantly increase the long-term value of the project for:

- Learning
- Maintenance
- Portfolio presentation
- Future AI-assisted development

---

## 28. Multi-Device Development Workflow

The project should be set up so development can happen from both a desktop and a laptop without confusion, duplicated work, or lost changes.

The recommended approach is to use **GitHub as the source of truth**.

The desktop and laptop should each have their own local copy of the project, but both should push to and pull from the same GitHub repository.

### Core Rule

> GitHub is the shared home base. Each computer is just a local workspace.

Do not pass project folders back and forth manually with USB drives, Dropbox, OneDrive, or zip files. Use Git.

---

## 29. Recommended Device Setup

Each computer should have:

- Git installed
- Node.js installed
- VS Code installed
- GitHub account connected
- Claude Code and/or Codex available if being used
- The project cloned from GitHub

Recommended folder location:

```bash
~/projects/all-surfaces-renewal
```

On Windows, a good folder path is:

```text
C:/Users/YourName/projects/all-surfaces-renewal
```

If using WSL, keep the project inside the Linux filesystem, such as:

```bash
/home/dustin/projects/all-surfaces-renewal
```

Avoid developing from OneDrive-synced folders because they can create file locking or sync issues with Node projects.

---

## 30. Standard Work Session Routine

Before starting work on either computer:

```bash
git pull
npm install
npm run dev
```

After finishing work:

```bash
git status
git add .
git commit -m "Describe the change clearly"
git push
```

Before switching to the other device, make sure all work is committed and pushed.

On the second device:

```bash
git pull
npm install
npm run dev
```

This keeps the laptop and desktop in sync.

---

## 31. Commit Message Guidelines

Use clear commit messages that explain what changed.

Good examples:

```bash
git commit -m "Add homepage hero section"
git commit -m "Create quote form layout"
git commit -m "Add gallery data structure"
git commit -m "Document local development setup"
git commit -m "Fix mobile navbar spacing"
```

Avoid vague messages like:

```bash
git commit -m "stuff"
git commit -m "changes"
git commit -m "fix"
```

---

## 32. Branching Strategy

For the MVP, keep the workflow simple.

Recommended branches:

- `main` — stable working version
- feature branches — optional for larger changes

Example feature branch workflow:

```bash
git checkout -b feature/gallery-page
# make changes
git add .
git commit -m "Build gallery page"
git push -u origin feature/gallery-page
```

For solo development, it is acceptable to work directly on `main` at first, as long as commits are frequent and tested.

As the project becomes more serious, use feature branches and pull requests.

---

## 33. Environment Variables

Sensitive values should not be committed to GitHub.

Use a `.env` file locally and commit an example file instead.

Commit this:

```bash
.env.example
```

Do not commit this:

```bash
.env
```

Example `.env.example`:

```bash
VITE_SITE_NAME="All Surfaces Renewal and Repair"
VITE_CONTACT_EMAIL="example@email.com"
VITE_CONTACT_PHONE="555-555-5555"
```

The `.gitignore` file should include:

```bash
node_modules/
dist/
.env
```

---

## 34. AI Tool Usage Across Devices

When using Claude Code, Codex, or ChatGPT:

1. Always pull the latest code before asking AI to make changes.
2. Ask AI to inspect the existing structure before coding.
3. Keep AI tasks small and specific.
4. Review all changes before committing.
5. Run the app locally before pushing.
6. Commit and push completed changes before switching devices.
7. Update documentation after every meaningful change.

Recommended AI instruction:

```text
Before making changes, inspect the current project structure and summarize the files you expect to modify.
After making changes, update the relevant documentation in /docs.
Do not remove or rewrite unrelated files.
```

---

## 35. Multi-Device Success Criteria

The workflow is successful when:

1. The project can be opened from either desktop or laptop.
2. Both computers can run the same app locally.
3. Changes are synced through GitHub.
4. No work is lost when switching devices.
5. Documentation stays updated with the code.
6. The project remains easy to deploy later.

