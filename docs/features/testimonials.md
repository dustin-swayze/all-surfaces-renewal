# Adding Approved Testimonials

A practical guide for getting customer reviews onto the site, with the permission process, data format, and step-by-step walkthrough all in one place.

> **If the testimonial hasn't been explicitly approved by the customer in writing, don't publish it.** Publishing unapproved reviews — even flattering ones — is a legal and reputational risk. This guide assumes you already have that approval saved somewhere.

---

## Part 1: Getting approval (the part that happens before any code)

### What "approved" means

1. **Explicit, written permission.** A text message or email saying something like *"yes, you can use my review on your website"* is enough. Save the customer's message — a screenshot of the conversation is fine.
2. **Approval of the exact wording.** If you paraphrase or shorten what the customer said, send them the final text and get them to say "yes, that's fine to use." Otherwise you're putting words in their mouth.
3. **Approval of the attribution.** Ask whether they want their full name, first name + last initial, or initials only. First name + last initial (e.g. "Sarah M.") is the standard for a small business — enough to feel real, not enough to expose the customer's full identity on the public internet.

### A suggested approval workflow

After a job finishes well and the customer seems happy, send them a short message:

> *"Glad you're happy with how it turned out! Would you be willing to let me use a short quote from you on my website? I'll send you the exact wording for approval first. You can choose how you're credited — full name, first name plus last initial, or however you prefer."*

If they say yes:

> *"Thanks! Here's what I was going to use: [1-2 sentences based on what they said]. Credit would be [their preferred attribution]. Let me know if anything needs to change — or just say 'looks good' and I'll put it up."*

Save both messages (request + their approval) in a folder called **Testimonials approvals**. This is your paper trail if anyone ever challenges a review.

### What to collect for each review

Before adding it to the site, have these six things written down:

- The customer's preferred attribution (e.g. "Sarah M.")
- The approved quote text
- Star rating — usually 5, but use their real sentiment
- Where the review originated — Facebook, Google, a text to you, a Yelp review, etc.
- The date of approval
- A copy of their written approval message

---

## Part 2: Adding the review to the site

### The one file you edit

All reviews live in a single file:

```
src/data/reviews.ts
```

When the array is empty, the Reviews page shows a "Testimonials coming soon" placeholder and the homepage hides the reviews preview section. As soon as there's at least one entry, both swap to show the real reviews — no other code changes needed.

### The data shape

Each review is one object with these fields:

```ts
interface Review {
  id: string;                                            // unique — any string
  customerName: string;                                  // "Sarah M." (or full name if permitted)
  rating: number;                                        // 1 through 5
  text: string;                                          // the quote
  source?: 'Facebook' | 'Google' | 'Website' | 'Other';  // optional
}
```

### Step-by-step

1. **Open `src/data/reviews.ts`** in your code editor.

2. **Find the `reviews` array.** It looks like this when empty:

   ```ts
   export const reviews: Review[] = [];
   ```

3. **Add entries between the square brackets**, one object per review:

   ```ts
   export const reviews: Review[] = [
     {
       id: 'r1',
       customerName: 'Sarah M.',
       rating: 5,
       text: 'They saved us from replacing our entire tub. Looks brand new and the whole job took less than a day.',
       source: 'Facebook',
     },
     {
       id: 'r2',
       customerName: 'Mike R.',
       rating: 5,
       text: 'Professional, on time, and reasonably priced. Our kitchen counters look incredible.',
       source: 'Website',
     },
   ];
   ```

4. **Save the file.** If the dev server is running, the site hot-reloads — you'll see the new cards on `/reviews` immediately. No restart needed.

5. **Commit and push** to deploy to production:

   ```bash
   git add src/data/reviews.ts
   git commit -m "Add approved testimonial from Sarah M."
   git push
   ```

   Vercel auto-deploys in about 60 seconds. The new review is live on `allsurfacefix.com`.

### Rules to keep in mind

- **Every `id` must be unique.** Typical pattern: `r1`, `r2`, `r3`, or `sarah-m-2025`, whatever makes it easy to find later.
- **Commas matter.** Each field inside an object ends with a comma. Each object (except the last one, optionally) ends with a comma after its closing brace.
- **Double-quote or single-quote is fine, but keep it consistent inside each string.** If the review text itself contains quotes, escape them with a backslash (`\'`) or use the other type of quote for the wrapper.
- **Don't put line breaks inside the text string** — write it as one line. If the review is long, that's fine; the card will wrap it automatically on the page.

### Example with tricky text

If the customer's quote contains an apostrophe or special character:

```ts
{
  id: 'r3',
  customerName: 'Linda J.',
  rating: 5,
  text: "It's like having a brand-new bathroom — I couldn't believe the difference.",
  source: 'Facebook',
},
```

Notice the wrapper uses double-quotes because the text contains an apostrophe. That's the easiest way to avoid escaping.

---

## Part 3: Managing reviews over time

### Editing a review

If a customer later asks you to change their attribution or the wording, just open the file, find their entry (by `id` or `customerName`), edit the field, and push.

### Removing a review

Delete the entire object (from `{` to `},`). Make sure you don't leave a trailing comma floating around.

If you remove the last review, the Reviews page will automatically switch back to the "coming soon" placeholder.

### Featured reviews on the homepage

The homepage shows the first three reviews from the array. If you want to change which three appear, just reorder the entries — put the best ones at the top of the array.

### Ordering

The order reviews appear on `/reviews` matches their order in the array. Put the strongest reviews first.

---

## Quick reference — the common case

A customer named Sarah has approved the quote "Looks brand new!" via text, wants to be credited as "Sarah M.", and gave it to you directly:

1. Open `src/data/reviews.ts`.
2. Add inside the array:
   ```ts
   {
     id: 'r1',
     customerName: 'Sarah M.',
     rating: 5,
     text: 'Looks brand new!',
     source: 'Website',
   },
   ```
3. Save.
4. Run:
   ```bash
   git add src/data/reviews.ts
   git commit -m "Add testimonial from Sarah M."
   git push
   ```
5. Wait ~60 seconds. Review is live on allsurfacefix.com.

That's it.
