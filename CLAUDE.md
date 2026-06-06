# Millhouse Built — Project Brief for Claude

## What this is
Custom home builder website for Hunter Kelley (owner/builder) and Jayla Kelley (designer).
Live at: **millhousebuilt.com** (hosted on Vercel, auto-deploys from GitHub push)
Repo: **github.com/landdaddy/millhousewebsite** (public)
Local path: **~/Documents/Codex/millhousewebsite**

## Business details
- ROC 365485 · 602.901.6044 · hello@millhousebuilt.com
- Based in Coolidge, AZ. Serves East Valley + Pinal County
- Calendly: https://calendly.com/hunter-millhousebuilt/millhouse-meeting
- Instagram: @millhousebuilt (Behold feed ID: NlcWDfBByUWFG2zgDyAt)
- Facebook account is disabled — Meta API path is blocked

## Tech stack
- Static HTML/CSS/JS — no framework, no build step
- `styles.css` — all styles (3500+ lines, CSS variables at top)
- `script.js` — mobile nav, hero carousel, scroll reveals, Behold Instagram fetch, journal filters, consultation modal, Behold badge remover
- Fonts: Cormorant Garant (editorial serif) + Inter (sans) via Google Fonts
- Instagram feed: Behold.so widget (free plan, feed-id NlcWDfBByUWFG2zgDyAt)

## How to deploy
```bash
cd ~/Documents/Codex/millhousewebsite && git add -A && git commit -m "description" && git push
```
Vercel picks it up in ~60 seconds. Hard refresh with Cmd+Shift+R to see changes.

## Site structure
```
index.html          — Homepage (hero carousel, journal grid, process steps, Instagram)
studio.html         — Design studio / Jayla's process
field-notes.html    — Process + FAQ (has FAQ schema)
journal.html        — Blog index (Studio McGee-style card grid with filter tabs)
contact.html        — Build page (has consultation modal before Calendly)
gilbert.html        — City landing page (×7 cities)
chandler.html
queen-creek.html
san-tan-valley.html
coolidge.html
florence.html
casa-grande.html
posts/             — 23+ blog posts
assets/            — Images, generated photos
```

## What's been done (as of June 2026)
- Full SEO pass: canonical URLs (no-www), OG tags, keywords, FAQ schema, city pages
- Google Search Console verified, sitemap submitted
- 7 city landing pages (400-500 words each, local SEO)
- 23 blog posts: build guides, design content, recipes (Shea McGee style)
- Journal page: Studio McGee card layout, Cormorant Garant titles, filter tabs (All/Build/Design/Living/Recipe)
- Consultation modal on contact page (intercepts Calendly, warm prep screen)
- Instagram feed via Behold.so widget (no business account needed)
- Behold badge hidden via JS (removeBeholdBadge function in script.js)
- Mobile pass: 3-line hamburger, bottom-sheet modal, article typography, journal hero full-bleed
- Article page typography: Cormorant Garant h1/h2, clean back button, full-bleed hero images

## Pending / known issues
- **Canonical mismatch**: HTML says millhousebuilt.com (no-www) but Vercel redirects to www.millhousebuilt.com. Need to either fix in Vercel dashboard (remove www redirect) or change all canonicals back to www.
- **GBP**: Only 3 reviews. Address has no street number. Photos not uploaded. 4th of July hours not confirmed.
- **Google Analytics**: Not set up yet (GBP dashboard is nagging about this)
- **Instagram token**: Free Behold plan shows "Made with Behold" badge. JS tries to remove it but may not catch shadow DOM. Upgrade to paid Behold (~$19/mo) to remove permanently.
- **Blog images**: Some cards use Unsplash IDs that may look generic. Need real photography shoot for cards.
- **process-sunday-sweep.png**: Removed from homepage, replaced with Unsplash. Still exists in assets/ — not used anymore.

## Design language
- **Colors**: --paper #f6f0e7, --ink #312f2a, --blue #17324a, --cream #fffaf2
- **Serif**: "Cormorant Garant" (headers, blog titles, hero copy)
- **Sans**: Inter (body, nav, meta)
- **Tone**: Warm, unhurried, editorial. Like a smart craftsman who doesn't oversell.
- **Don't**: use own photos as journal card images (per Hunter), use hyphens in new post filenames (use underscores), add Behold branding

## Photo inventory (assets/)
Photos NOT used on main site pages (safe for cards/posts):
- process-old-world-wood.jpg — lemons, ceramic pitcher, striped linen, plaster (gorgeous, Studio McGee)
- process-old-world-wide.jpg — same scene, landscape crop
- studio-white-oak-detail.jpg — design table with plans, brass, lemons
- your-photos/DSC_5721.jpg — copper roasting pan on checkered wood
- your-photos/IMG_6935.JPG — pale pine boards (construction)

Photos ON main site pages (don't reuse as card images):
- millhouse-hero-patio.png, millhouse-hero-build-better.png, millhouse-hero-journal-table.png
- jayla-kelley-studio*.jpg (all 3 versions)
- your-photos/DSC_5610.jpg, DSC_5629.jpg, DSC_5732.jpg
- your-photos/Tezza-3450.JPG, Tezza-4590.JPG

## Session management tip
Start any new Cowork session by saying:
"Read CLAUDE.md in my millhousewebsite folder and continue the project."
The folder ~/Documents/Codex/millhousewebsite should already be connected.
