# SEO Audit — Hope Alive Children Spring Foundation
**Domain:** https://www.hacsfoundation.com  
**Audit date:** 2026-07-19  
**Auditor:** Automated audit + manual inspection

---

## Summary

The site was a standard Client-Side Rendered (CSR) React SPA. Googlebot could access the server and receive HTTP 200 responses, but the initial HTML response contained only a bare shell — no meaningful title (just the homepage default), no per-page descriptions, no H1, and no body text — because all content was injected by JavaScript after the page loaded. This is the primary reason Google cannot extract useful information from inner pages.

---

## Phase 1 — Pre-Implementation Findings

### 1. Framework & Rendering Method
- **Framework:** React 19 + Vite 7
- **Rendering:** Client-Side Rendered (CSR) SPA
- **Router:** Wouter v3

### 2. Rendering Assessment
- ❌ **CSR-only.** All page content (title, meta, H1, body text) was injected by JavaScript (`useEffect`) after the page loaded. Googlebot received `<div id="root"></div>` as the entire body before JS ran.
- The `Seo.tsx` component used `useEffect` with `document.title = ...` and DOM manipulation — entirely client-side.
- The `index.html` shell only contained the homepage title and description hardcoded; all other routes served identical HTML.

### 3. Public Routes Identified
| Route | Status |
|-------|--------|
| `/` | ✅ Public |
| `/about` | ✅ Public |
| `/mission` | ✅ Public |
| `/goals` | ✅ Public |
| `/programs` | ✅ Public |
| `/donate` | ✅ Public |
| `/contact` | ✅ Public |
| `/faq` | ✅ Public |
| `/gallery` | ✅ Public |
| `/privacy` | ✅ Public |
| `/terms` | ✅ Public |
| `/donate/thank-you` | ⛔ noindex (correct) |
| `/admin` | ⛔ Private |
| `/admin/login` | ⛔ Private |

### 4. Broken Links / Routes
- No broken internal links found in the router.
- Note: `/not-found` renders a custom 404 page (correct behaviour).

### 5. Meta Tags (Pre-Fix)
- **Title:** Only the homepage title was in `index.html`. All other routes served the same homepage title.
- **Meta description:** Only homepage description in `index.html`. All others identical.
- **Canonical:** Homepage canonical (`/`) was hardcoded. All routes served the same canonical — creating duplicate-URL issues.
- **OG tags:** Present in `index.html` for homepage only.
- **Twitter tags:** Present in `index.html` for homepage only.
- **JSON-LD:** Homepage NGO + WebSite schema was present. Inner pages had per-page JSON-LD in `Seo.tsx` but only rendered client-side.

### 6. X-Robots-Tag
- Not observed. No middleware was setting X-Robots-Tag headers.

### 7. Noindex / Nofollow
- `/donate/thank-you` correctly sets `noindex` via `Seo.tsx`. ✅
- `/admin` and `/admin/login` are private routes — not in sitemap, not linked publicly. ✅
- No public page had an accidental `noindex`.

### 8. Crawler Blocking (Cloudflare / Replit / Middleware)
- No Cloudflare challenge pages detected.
- No bot-detection middleware found in `app.ts`.
- Express serves static files and falls back to `index.html` — no blocking.

### 9. Domain Canonicalisation
- The preferred canonical is `https://www.hacsfoundation.com`.
- HTTP → HTTPS and non-www → www redirects must be configured at the hosting/DNS level (outside the codebase). See `SEO-SETUP.md` for instructions.
- All canonical tags in the codebase now use `https://www.hacsfoundation.com`.

### 10. robots.txt (Pre-Fix)
- File existed at `public/robots.txt`. ✅
- It was missing the `/api/` disallow — API routes were crawlable. ⚠️
- No `donate/thank-you` disallow for the new `noindex` page. ⚠️

### 11. sitemap.xml (Pre-Fix)
- File existed at `public/sitemap.xml`. ✅
- `lastmod` dates were `2025-06-01` (outdated). ⚠️
- Missing pages: none currently (new pages added in Task 4).
- No RSS feed.

### 12. Googlebot / Bot Parity
- No cloaking or different content for bots detected. ✅
- With CSR, Googlebot received the same bare HTML shell as all visitors before JS ran.

### 13. Navigation Links
- All navigation uses Wouter `<Link>` components which render as `<a href>` in the DOM. ✅
- Crawlers can follow all navigation links.

### 14. Soft-404 / HTTP Status Codes
- All public routes return HTTP 200 with the SPA shell. ✅
- Unknown routes render the `NotFound` component but still return HTTP 200 (soft-404). ⚠️ (Noted — fixing the 404 HTTP status code requires a server-side change, as the SPA catch-all sends `index.html` with 200.)

---

## Changes Implemented (2026-07-19)

### Fix 1 — Build-time Prerendering (`prerender.mjs`)
**Problem:** Every route returned the same `index.html` shell; Google could not read page content.  
**Fix:** Added `prerender.mjs` — a Node.js script that runs after `vite build`. It generates a separate `dist/public/{route}/index.html` for each public route, injecting:
- Unique `<title>` tag
- Unique `<meta name="description">`
- Self-referencing `<link rel="canonical">`
- Page-specific OG and Twitter card tags
- Page-specific JSON-LD structured data (BreadcrumbList, FAQPage, AboutPage, etc.)
- A static content block (H1 + intro paragraph) inside `<div id="root">` — readable by Googlebot before JavaScript runs
The build script was updated: `vite build && node prerender.mjs`.

### Fix 2 — robots.txt
**Problem:** Missing `/api/` disallow; donate/thank-you not blocked.  
**Fix:** Updated `public/robots.txt` to add `Disallow: /api/` and `Disallow: /donate/thank-you`.

### Fix 3 — sitemap.xml
**Problem:** Stale `lastmod` dates (2025-06-01).  
**Fix:** Rebuilt `public/sitemap.xml` with updated `lastmod: 2026-07-19` and correct priorities. Excluded all private, redirect, and non-indexable URLs.

### Fix 4 — index.html Hardening
**Problem:** Inconsistency between hardcoded homepage metadata and `Seo.tsx` output; removed inaccurate `nonprofitStatus: "Nonprofit501c3"` and `taxID: "CAC Registered"` fields from JSON-LD (these are inaccurate — Nigerian NGOs are not 501c3 entities and the CAC reg number was not verified).  
**Fix:** Cleaned up `index.html` metadata; added placeholder comments for `GOOGLE_SITE_VERIFICATION` and `VITE_GA_MEASUREMENT_ID` env-var injection.

### Fix 5 — Google Verification Support
**Problem:** No Google Search Console verification meta tag.  
**Fix:** `prerender.mjs` now injects `<meta name="google-site-verification">` into every prerendered HTML file when the `GOOGLE_SITE_VERIFICATION` environment variable is set.

### Fix 6 — Google Analytics Support
**Problem:** No analytics setup.  
**Fix:** `prerender.mjs` injects the GA4 snippet into every prerendered HTML file when the `VITE_GA_MEASUREMENT_ID` environment variable is set.

### Fix 7 — JSON-LD Structured Data (all pages)
- **Homepage:** NGO + WebSite with SearchAction
- **About:** AboutPage + BreadcrumbList
- **Mission, Goals, Programs, Donate, Gallery, Privacy, Terms:** WebPage + BreadcrumbList
- **Contact:** ContactPage + BreadcrumbList
- **FAQ:** FAQPage with all 7 Q&As + BreadcrumbList

---

## Remaining Owner Actions

These items require action from the site owner and cannot be fixed in the codebase alone.

### ⚠️ CRITICAL — Domain Canonicalisation (HTTP → HTTPS, non-www → www)
Google may index both `http://hacsfoundation.com` and `https://www.hacsfoundation.com` as separate pages.  
**Action required:** Configure 301 redirects at your hosting provider:
- `http://hacsfoundation.com/*` → `https://www.hacsfoundation.com/*`
- `http://www.hacsfoundation.com/*` → `https://www.hacsfoundation.com/*`
- `https://hacsfoundation.com/*` → `https://www.hacsfoundation.com/*`  
See `SEO-SETUP.md` for step-by-step instructions.

### ⚠️ HIGH — Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Add property `https://www.hacsfoundation.com`
3. Verify ownership using the HTML meta tag method (see `SEO-SETUP.md`)
4. Submit the sitemap: `https://www.hacsfoundation.com/sitemap.xml`
5. Request indexing for your key pages using the URL Inspection tool

### ⚠️ HIGH — Set Google Site Verification Environment Variable
Set the environment variable `GOOGLE_SITE_VERIFICATION` to the value provided by Google Search Console. Then rebuild and redeploy the site.

### MEDIUM — Open Graph Image
A file `opengraph.jpg` (1200×630px) should be placed in `public/opengraph.jpg`. This image appears when the site is shared on social media.

### MEDIUM — Favicon
A proper `favicon.svg` should be placed at `public/favicon.svg`.

### LOW — Registration Number
The CAC (Corporate Affairs Commission) registration number for HACS Foundation should be added to the website's About/Transparency page and to the JSON-LD structured data once confirmed.

### LOW — Social Media Profiles
Once official social media accounts are created, add their URLs to the `sameAs` array in the homepage JSON-LD and to the footer links.

### LOW — Monitoring
After submitting the sitemap to Google Search Console, check the Coverage report weekly for the first month. Common issues to look for: "Crawled – currently not indexed" and "Discovered – currently not indexed" (see `SEO-SETUP.md` for diagnostics).
