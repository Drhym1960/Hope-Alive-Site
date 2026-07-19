# BLOG-GUIDE — Hope Alive Children Spring Foundation
**Last updated:** 2026-07-19

This guide explains how to create, edit, and publish blog articles on the HACS Foundation website.

---

## Overview

Blog articles are stored as Markdown files (`.md`) with YAML frontmatter in:

```
artifacts/hacs-foundation/src/content/blog/
```

The blog system uses **Vite's glob import** to load all `.md` files at build time. There is no database, no CMS, and no external service. Adding a new article is as simple as adding a new `.md` file.

---

## File Naming Convention

File names must:
- Use only lowercase letters, numbers, and hyphens
- Match the article's intended URL slug
- End with `.md`

Examples:
```
how-to-help-orphans-and-vulnerable-children.md  → /blog/how-to-help-orphans-and-vulnerable-children
why-education-support-matters.md                → /blog/why-education-support-matters
```

---

## Frontmatter Reference

Every blog article must start with a YAML frontmatter block between `---` markers. Here is a complete example:

```yaml
---
slug: my-article-slug
title: My Article Title (used as H1 and in the page header)
seoTitle: My Article Title | Hope Alive Children Spring Foundation
description: One or two sentences summarising the article (used as the meta description and as the lead paragraph).
seoDescription: Same as description, or a slightly different version optimised for search engines.
date: 2026-07-19
updatedDate: 2026-07-19
author: HACS Foundation Editorial Team
category: Child Welfare
featuredImage: /opengraph.jpg
imageAlt: A brief description of the image (for screen readers and SEO)
draft: false
---
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | URL-safe identifier (lowercase, hyphens only). Must match the filename. |
| `title` | Yes | Article title — shown as H1 on the page. |
| `seoTitle` | No | Title for `<title>` tag. Defaults to `{title} \| Hope Alive Children Spring Foundation`. |
| `description` | Yes | Short description used as meta description and as the lead paragraph on the article page. |
| `seoDescription` | No | Separate SEO-optimised description. Defaults to `description`. |
| `date` | Yes | Publication date in `YYYY-MM-DD` format. |
| `updatedDate` | No | Date of last significant update. Defaults to `date`. |
| `author` | No | Author name. Defaults to `HACS Foundation Editorial Team`. |
| `category` | Yes | Article category. Must be one of the defined categories (see below). |
| `featuredImage` | No | Path to featured image. Defaults to `/opengraph.jpg`. |
| `imageAlt` | No | Alt text for featured image. |
| `draft` | No | Set to `true` to exclude from the blog index and sitemap. Defaults to `false` (published). |

### Categories

The following categories are currently in use. Use one of these exactly (case-sensitive):

- `Child Welfare`
- `Donor Guidance`
- `Education`
- `Partnerships`
- `Community Action`

To add a new category, update the `CATEGORIES` array in `artifacts/hacs-foundation/src/pages/Blog.tsx`.

---

## Markdown Syntax

Articles are written in standard Markdown. The following elements are supported:

### Headings

```markdown
## This becomes an H2 (use for main sections)
### This becomes an H3 (use for subsections)
```

Do not use `#` (H1) in article bodies — the article title is rendered as H1 automatically.

### Text Formatting

```markdown
**Bold text**
*Italic text*
```

### Links

```markdown
[Link text](https://www.hacsfoundation.com/donate)
[Internal link](/programs)
```

### Lists

```markdown
- Unordered item one
- Unordered item two

1. Ordered item one
2. Ordered item two
```

### Horizontal Rule

```markdown
---
```

---

## Content Guidelines

### Accuracy
- Only include factual information that can be verified against HACS Foundation's own records or the repository's verified information.
- Do not invent statistics (e.g. "we've helped over 10,000 children" — unless verified).
- Do not name individual children, staff members, or partners without their explicit consent.

### Child Privacy and Dignity
- Never include identifying information about specific children.
- Do not describe individual children's circumstances in ways that could cause them harm if they or their community read the article.
- Follow the principles in our [Child Safeguarding Policy](/child-safeguarding).

### Word Count
- Target: **800–1,300 words** per article.
- Articles shorter than 500 words may be considered thin content by search engines.
- Articles longer than 1,500 words should be broken up with clear headings.

### Structure
- Start with a `## Summary` section (2–4 sentences).
- Use `## H2` headings for each main section (aim for 4–8 sections).
- End with a clear call to action linking to `/donate`, `/volunteer`, or another relevant page.
- Include at least 2–3 internal links to other pages on the site.

### Tone
- Informative and respectful.
- Avoid language that sensationalises child poverty or suffering.
- Write for a general adult audience — clear, straightforward language without jargon.

---

## Draft Articles

To write an article without publishing it, set `draft: true` in the frontmatter:

```yaml
draft: true
```

Draft articles:
- Are excluded from the blog index page
- Are excluded from the sitemap
- Are excluded from the RSS feed
- **Are still accessible** at their direct URL if someone knows the slug — they are not password-protected

To publish a draft, change `draft: true` to `draft: false` and rebuild the site.

---

## Publishing an Article

1. Create the `.md` file in `artifacts/hacs-foundation/src/content/blog/`
2. Write the content following the guidelines above
3. Set `draft: false` (or omit the `draft` field)
4. Add the article URL to `artifacts/hacs-foundation/public/sitemap.xml`
5. Run the build to regenerate the prerendered HTML:
   ```bash
   pnpm --filter @workspace/hacs-foundation run build
   ```
6. Verify the article appears at `/blog/{slug}`
7. Deploy the site

---

## Updating the Sitemap

After publishing a new article, add its URL to `artifacts/hacs-foundation/public/sitemap.xml`:

```xml
<url>
  <loc>https://www.hacsfoundation.com/blog/your-article-slug</loc>
  <lastmod>2026-07-19</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.6</priority>
</url>
```

See the full sitemap file for the correct format.

---

## Updating the RSS Feed

The RSS feed at `/feed.xml` is generated by `prerender.mjs` at build time. It automatically includes all published posts. No manual update is needed — just rebuild.

---

## Folder Structure

```
artifacts/hacs-foundation/
├── src/
│   ├── content/
│   │   └── blog/                    ← Blog article Markdown files
│   │       ├── how-to-help-orphans-and-vulnerable-children.md
│   │       └── ...
│   ├── lib/
│   │   └── blog.ts                  ← Blog data loader (TypeScript)
│   └── pages/
│       ├── Blog.tsx                 ← Blog index page (/blog)
│       └── BlogPost.tsx             ← Individual article page (/blog/:slug)
├── public/
│   ├── sitemap.xml                  ← XML sitemap (update manually for new posts)
│   └── feed.xml                     ← RSS feed (generated at build time)
└── prerender.mjs                    ← Build-time prerender script (generates static HTML)
```

---

## Frequently Asked Questions

**Can I add images to articles?**
Yes. Place image files in `artifacts/hacs-foundation/public/` and reference them as `/your-image.jpg`. Remember to add an appropriate `imageAlt` description. Always ensure you have the rights to use any image, and follow the child photography guidelines in the safeguarding policy.

**Can I change the blog URL structure?**
The current structure is `/blog/{slug}`. Changing this would require updates to `App.tsx`, `Blog.tsx`, `BlogPost.tsx`, `prerender.mjs`, and `sitemap.xml`. Only change this if there is a strong reason, as URL changes can affect search engine rankings.

**What happens when there are more than 9 articles?**
The blog index automatically paginates at 9 articles per page. Pagination links appear at the bottom of the index.

**How do I check that my article is prerendered correctly?**
After running the build, inspect the generated HTML file:
```bash
cat artifacts/hacs-foundation/dist/public/blog/your-slug/index.html | grep -E "<title>|<h1>|<meta name=\"description\""
```
