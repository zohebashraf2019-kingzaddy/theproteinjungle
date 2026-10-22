# The Protein Jungle — website

Static site (HTML/CSS/JS, no build step) for The Protein Jungle, Sparks NV. Deploys on Vercel as-is.

- `index.html` — page layout and copy
- `menu-data.js` — **edit menu items, prices and photos here**
- `styles.css`, `main.js` — styling and interactions
- `assets/img/menu/` — product photos (480×480 .webp); `assets/video/` — looping reels + poster frames

## Things to update later
- **Order link**: `ORDER_URL` in `menu-data.js` plus the `the-protein-jungle.square.site` links in `index.html`
- **Contact form**: posts to FormSubmit → theproteinjungle@gmail.com. The first submission sends an activation email to that inbox; click "Activate" once and messages flow from then on.
- **Missing photos**: drop a square image into `assets/img/menu/` and set `img` on that item.

Local preview: `npx serve .`
