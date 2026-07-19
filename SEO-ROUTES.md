# SEO Routes — Hope Alive Children Spring Foundation
**Last updated:** 2026-07-19  
**Canonical domain:** https://www.hacsfoundation.com

This document lists every public route with its SEO configuration.

---

## Public Indexable Routes

| Route | Canonical URL | Title | Meta Description | Indexable | In Sitemap | Priority |
|-------|--------------|-------|-----------------|-----------|-----------|---------|
| `/` | `https://www.hacsfoundation.com/` | HACS Foundation \| Supporting Orphaned & Vulnerable Children in Nigeria | Hope Alive Children Spring Foundation (HACS Foundation) provides shelter, education, healthcare, and love to orphaned and vulnerable children in Benue State, Nigeria. Giving Love a Chance. | ✅ | ✅ | 1.0 |
| `/about` | `https://www.hacsfoundation.com/about` | About HACS Foundation — Who We Are \| Hope Alive Children Spring Foundation | Hope Alive Children Spring Foundation is a CAC-registered Nigerian NGO in Makurdi, Benue State, dedicated to providing shelter, education, healthcare, and love to orphaned and vulnerable children. | ✅ | ✅ | 0.9 |
| `/mission` | `https://www.hacsfoundation.com/mission` | Our Mission & Vision — Transforming Children's Lives in Nigeria \| Hope Alive Children Spring Foundation | The mission of Hope Alive Children Spring Foundation is to provide compassionate care to orphaned and vulnerable children in Nigeria, restoring their dignity and empowering their future. | ✅ | ✅ | 0.9 |
| `/goals` | `https://www.hacsfoundation.com/goals` | Goals & Objectives — Building a Future for Nigeria's Children \| Hope Alive Children Spring Foundation | Explore the 10 strategic goals of Hope Alive Children Spring Foundation: providing shelter, education, healthcare, nutrition, skills training, and advocacy for orphaned and vulnerable children. | ✅ | ✅ | 0.8 |
| `/programs` | `https://www.hacsfoundation.com/programs` | Programs & Services — Feeding, Education, Healthcare & More \| Hope Alive Children Spring Foundation | Hope Alive Children Spring Foundation runs 6 life-changing programs for orphaned children in Nigeria: daily feeding, education support, free healthcare, safe shelter, skills training, and psychosocial support. | ✅ | ✅ | 0.9 |
| `/donate` | `https://www.hacsfoundation.com/donate` | Donate to Support Vulnerable Children \| Hope Alive Children Spring Foundation | Donate to Hope Alive Children Spring Foundation and help orphaned and vulnerable children in Nigeria. Give securely by card (Stripe), PayPal, KoraPay, or bank transfer. | ✅ | ✅ | 1.0 |
| `/contact` | `https://www.hacsfoundation.com/contact` | Contact HACS Foundation — Get in Touch \| Hope Alive Children Spring Foundation | Contact Hope Alive Children Spring Foundation in Makurdi, Benue State, Nigeria. Call 08036238076 or email hacsfoundation10@gmail.com. | ✅ | ✅ | 0.8 |
| `/faq` | `https://www.hacsfoundation.com/faq` | Frequently Asked Questions \| Hope Alive Children Spring Foundation | Get answers to common questions about Hope Alive Children Spring Foundation: how to donate, child sponsorship, volunteering, how your donation is used, and how to partner with our NGO in Nigeria. | ✅ | ✅ | 0.7 |
| `/gallery` | `https://www.hacsfoundation.com/gallery` | Gallery — Moments of Joy, Care & Hope \| Hope Alive Children Spring Foundation | See the real impact of HACS Foundation in photos: joyful children, community outreach, gift distributions, and daily life in Makurdi, Benue State, Nigeria. | ✅ | ✅ | 0.7 |
| `/privacy` | `https://www.hacsfoundation.com/privacy` | Privacy Policy \| Hope Alive Children Spring Foundation | Privacy Policy for Hope Alive Children Spring Foundation — how we collect, use, and protect your personal information when you visit hacsfoundation.com or make a charitable donation. | ✅ | ✅ | 0.3 |
| `/terms` | `https://www.hacsfoundation.com/terms` | Terms of Use \| Hope Alive Children Spring Foundation | Terms of Use for the Hope Alive Children Spring Foundation website — conditions for accessing hacsfoundation.com and making charitable donations. | ✅ | ✅ | 0.3 |

---

## Non-Indexable Routes

| Route | Reason | robots meta | In Sitemap |
|-------|--------|------------|-----------|
| `/donate/thank-you` | Post-payment confirmation page | `noindex, nofollow` | ❌ |
| `/admin` | Private admin dashboard | Not linked publicly | ❌ |
| `/admin/login` | Private admin login | Not linked publicly | ❌ |

---

## Upcoming Routes (Task 4)

The following routes will be added in Task 4 (SEO Content Expansion) and will need to be added to `sitemap.xml` once live:

| Route | Title | Priority |
|-------|-------|---------|
| `/volunteer` | Volunteer with HACS Foundation \| Help Vulnerable Children | 0.8 |
| `/partner-with-us` | Partner with HACS Foundation \| Corporate and Community Partnerships | 0.8 |
| `/transparency` | Transparency and Accountability \| HACS Foundation | 0.7 |
| `/child-safeguarding` | Child Safeguarding Policy \| HACS Foundation | 0.7 |
| `/education-support` | Education Support for Vulnerable Children \| HACS Foundation | 0.8 |
| `/orphans-and-vulnerable-children` | Orphans and Vulnerable Children Support \| HACS Foundation | 0.8 |
| `/street-children-support` | Supporting Street Children and At-Risk Youth \| HACS Foundation | 0.8 |
| `/blog` | HACS Foundation Blog \| Children, Education and Community Support | 0.7 |
| `/blog/*` | (individual articles) | 0.6 |
| `/compare/*` | (4 comparison pages) | 0.6 |
| `/site-map` | Site Map \| HACS Foundation | 0.4 |

---

## Structured Data by Route

| Route | Schema Types |
|-------|-------------|
| `/` | `NGO`, `WebSite` (with `SearchAction`) |
| `/about` | `AboutPage`, `BreadcrumbList` |
| `/mission` | `WebPage`, `BreadcrumbList` |
| `/goals` | `WebPage`, `BreadcrumbList` |
| `/programs` | `WebPage`, `BreadcrumbList` |
| `/donate` | `WebPage`, `BreadcrumbList` |
| `/contact` | `ContactPage`, `BreadcrumbList` |
| `/faq` | `FAQPage` (7 Q&As) |
| `/gallery` | `ImageGallery`, `BreadcrumbList` |
| `/privacy` | `WebPage`, `BreadcrumbList` |
| `/terms` | `WebPage`, `BreadcrumbList` |

---

## Notes

- All canonical URLs use `https://www.hacsfoundation.com` (www, HTTPS).
- Trailing slash: only the root `/` uses a trailing slash. All other routes do not (e.g. `/about` not `/about/`).
- The `Seo.tsx` component provides client-side hydration of the same metadata. `prerender.mjs` provides server-side injection at build time.
- If you add a new page, you must: (1) add it to `prerender.mjs` PAGES array, (2) add it to `public/sitemap.xml`, and (3) add an entry to this file.
