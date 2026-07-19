# SEO Setup Guide — Hope Alive Children Spring Foundation
**Domain:** https://www.hacsfoundation.com  
**Last updated:** 2026-07-19

---

## 1. Canonical Domain

The preferred canonical domain is:

```
https://www.hacsfoundation.com
```

All pages use this as their canonical URL. All internal links, sitemaps, and structured data use this domain.

---

## 2. Key SEO Files

| File | URL | Description |
|------|-----|-------------|
| `public/robots.txt` | `https://www.hacsfoundation.com/robots.txt` | Crawler permissions |
| `public/sitemap.xml` | `https://www.hacsfoundation.com/sitemap.xml` | XML sitemap for search engines |
| `prerender.mjs` | (build-time script) | Generates static HTML with metadata per route |

---

## 3. Domain Canonicalisation (Required — Hosting Level)

You must configure 301 redirects at your hosting provider or DNS/CDN (e.g. Cloudflare, Nginx, Replit, Netlify, Vercel).

### Required redirects:
```
http://hacsfoundation.com/*         → https://www.hacsfoundation.com/*  (301)
http://www.hacsfoundation.com/*     → https://www.hacsfoundation.com/*  (301)
https://hacsfoundation.com/*        → https://www.hacsfoundation.com/*  (301)
```

### On Cloudflare (if used):
1. Go to your Cloudflare dashboard → select `hacsfoundation.com`
2. Go to **Rules → Redirect Rules**
3. Add a rule: "If hostname does not contain `www`" → redirect to `https://www.hacsfoundation.com$request_uri` (301)
4. Go to **SSL/TLS** → set to "Full (strict)" to ensure HTTPS everywhere

### On Nginx:
```nginx
server {
    listen 80;
    server_name hacsfoundation.com www.hacsfoundation.com;
    return 301 https://www.hacsfoundation.com$request_uri;
}

server {
    listen 443 ssl;
    server_name hacsfoundation.com;
    return 301 https://www.hacsfoundation.com$request_uri;
}
```

---

## 4. Google Search Console Setup

### Step 1 — Add the property
1. Go to https://search.google.com/search-console
2. Click **Add property**
3. Choose **URL prefix** and enter `https://www.hacsfoundation.com`

### Step 2 — Verify ownership (HTML meta tag method)
1. Google will give you a meta tag like:  
   `<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />`
2. Copy the `content` value (the long string after `content=`)
3. In your hosting environment, set the environment variable:  
   ```
   GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Rebuild and redeploy the site:
   ```bash
   pnpm --filter @workspace/hacs-foundation run build
   ```
5. The meta tag will appear in every prerendered HTML page's `<head>`
6. Return to Search Console and click **Verify**

### Step 3 — Submit the sitemap
1. In Search Console, go to **Sitemaps**
2. Enter `https://www.hacsfoundation.com/sitemap.xml`
3. Click **Submit**

### Step 4 — Request indexing for key pages
1. In Search Console, use the **URL Inspection** tool
2. Enter each important URL (home, about, donate, programs, contact)
3. Click **Request Indexing**

---

## 5. Google Analytics Setup (Optional)

1. Create a GA4 property at https://analytics.google.com
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Set the environment variable:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Rebuild and redeploy. The GA4 script will be injected into every page.

---

## 6. Inspecting URLs

### Check that a URL is indexable:
```bash
# Check HTTP status and headers
curl -I https://www.hacsfoundation.com/about

# Check the HTML response for meta tags
curl -s https://www.hacsfoundation.com/about | grep -E "<title>|<meta name=\"description\"|<link rel=\"canonical\""

# Simulate Googlebot
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  -L https://www.hacsfoundation.com/about | grep -E "<title>|<h1>|<meta"

# Check robots.txt
curl https://www.hacsfoundation.com/robots.txt

# Check sitemap
curl https://www.hacsfoundation.com/sitemap.xml
```

### Check that prerendering is working:
After rebuilding, inspect `artifacts/hacs-foundation/dist/public/about/index.html`:
```bash
cat artifacts/hacs-foundation/dist/public/about/index.html | grep -E "<title>|<h1>|<meta name=\"description\""
```

---

## 7. Diagnosing "Crawled — currently not indexed"

This status means Google visited the page but chose not to index it. Common causes and fixes:

| Cause | Fix |
|-------|-----|
| Thin or low-quality content | Add more useful, original content (minimum ~300 words) |
| Duplicate content with another URL | Fix canonical tags; ensure 301 redirects are in place |
| Page takes too long to load | Optimise images, reduce JavaScript bundle size |
| No internal links to the page | Add links from other indexed pages |
| Page was recently published | Wait 1–4 weeks after submission; re-request indexing |
| Blocked by robots.txt | Check `robots.txt` disallow rules |

**Action steps:**
1. Open Search Console → URL Inspection → paste the URL
2. Check the "Coverage" section for any specific reason
3. Click "Request indexing" after fixing the issue

---

## 8. Diagnosing "Discovered — currently not indexed"

This status means Google found the URL (via sitemap or internal link) but has not yet crawled it.

| Cause | Fix |
|-------|-----|
| Crawl budget issue (too many pages) | Reduce number of pages in sitemap; improve page quality |
| New site with low authority | Build backlinks from relevant sites; share on social media |
| Server was slow when Googlebot visited | Check hosting uptime and response time |
| Sitemap only recently submitted | Wait 1–4 weeks |

**Action steps:**
1. Ensure the URL is in the sitemap
2. Ensure the URL is linked from other pages on the site (internal links)
3. Use URL Inspection → Request Indexing
4. Check server response time

---

## 9. Sitemap Maintenance

The sitemap at `public/sitemap.xml` is a static file. It must be updated manually when new pages are added.

**When to update:**
- After adding new pages (see Task 4: content expansion)
- After publishing new blog posts
- After removing or redirecting pages

**How to update:**
1. Edit `artifacts/hacs-foundation/public/sitemap.xml`
2. Add or remove `<url>` entries
3. Update the `<lastmod>` date of changed pages to today's date
4. Rebuild and redeploy

Note: Task 4 will introduce an automated sitemap generation system for blog posts.

---

## 10. Prerender Script Reference

The `prerender.mjs` script runs automatically after every `vite build`. It reads the compiled `dist/public/index.html` and generates a separate HTML file for each public route with unique metadata and static content.

**To run manually:**
```bash
cd artifacts/hacs-foundation
vite build  # or: pnpm --filter @workspace/hacs-foundation run build
node prerender.mjs
```

**Environment variables read by the script:**
| Variable | Purpose |
|----------|---------|
| `GOOGLE_SITE_VERIFICATION` | Injects Google Search Console verification meta tag |
| `VITE_GA_MEASUREMENT_ID` | Injects Google Analytics 4 script |

**Output:** `dist/public/{route}/index.html` for each public route.
