#!/usr/bin/env node
/**
 * HACS Foundation — Build-time Prerender Script
 *
 * Generates a static HTML file for every public route so that Googlebot
 * (and any other crawler) receives a complete, meaningful HTML response
 * — including title, meta description, canonical URL, Open Graph tags,
 * JSON-LD structured data, and visible H1 / body text — without needing
 * to execute JavaScript first.
 *
 * Run automatically after `vite build` via the `build` npm script:
 *   vite build --config vite.config.ts && node prerender.mjs
 *
 * Output:  dist/public/{route}/index.html  for every entry in PAGES
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist/public");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("❌  dist/public/index.html not found — run `vite build` first.");
  process.exit(1);
}

const BASE_URL = "https://www.hacsfoundation.com";
const SITE_NAME = "Hope Alive Children Spring Foundation";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// ---------------------------------------------------------------------------
// Page definitions
// Each entry represents one public route.
// ---------------------------------------------------------------------------

/** @type {Array<{
 *   route: string,
 *   title: string,
 *   description: string,
 *   h1: string,
 *   intro: string,
 *   ogImage?: string,
 *   noindex?: boolean,
 *   schema?: object | object[],
 * }>} */
const PAGES = [
  // ── Homepage ────────────────────────────────────────────────────────────
  {
    route: "/",
    title: `HACS Foundation | Supporting Orphaned & Vulnerable Children in Nigeria`,
    description:
      "Hope Alive Children Spring Foundation (HACS Foundation) provides shelter, education, healthcare, and love to orphaned and vulnerable children in Benue State, Nigeria. Giving Love a Chance.",
    h1: "Giving Love a Chance",
    intro:
      "Hope Alive Children Spring Foundation supports orphaned and vulnerable children in Makurdi, Benue State, Nigeria with shelter, education, healthcare, and love. Every child deserves a chance.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "NGO",
        "@id": `${BASE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: ["HACS Foundation", "HACS"],
        url: BASE_URL,
        logo: `${BASE_URL}/favicon.svg`,
        image: DEFAULT_OG_IMAGE,
        description:
          "Hope Alive Children Spring Foundation provides comprehensive care — shelter, food, education, healthcare, and psychosocial support — to orphaned and vulnerable children in Benue State, Nigeria.",
        slogan: "Giving Love a Chance",
        foundingDate: "2012",
        areaServed: {
          "@type": "State",
          name: "Benue State",
          addressCountry: "NG",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Office No 5, Udoo Plaza, Opp NKST Church, Ama Terwase Agbadu Road",
          addressLocality: "Makurdi",
          addressRegion: "Benue State",
          addressCountry: "NG",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+2348036238076",
            contactType: "customer support",
            availableLanguage: "English",
          },
          {
            "@type": "ContactPoint",
            email: "hacsfoundation10@gmail.com",
            contactType: "customer support",
          },
        ],
        sameAs: ["https://hacsfoundation.com"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: SITE_NAME,
        description:
          "Official website of HACS Foundation — giving love a chance to orphaned and vulnerable children in Nigeria.",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/faq?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  },

  // ── About ────────────────────────────────────────────────────────────────
  {
    route: "/about",
    title: `About HACS Foundation — Who We Are | ${SITE_NAME}`,
    description:
      "Hope Alive Children Spring Foundation is a CAC-registered Nigerian NGO in Makurdi, Benue State, dedicated to providing shelter, education, healthcare, and love to orphaned and vulnerable children. Learn our story.",
    h1: "About Hope Alive Children Spring Foundation",
    intro:
      "HACS Foundation is a registered charitable foundation based in Makurdi, Benue State, Nigeria. We provide shelter, food, education, healthcare, and psychosocial support to orphaned and vulnerable children. Learn our values, our story, and our commitment to every child in our care.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${BASE_URL}/about#webpage`,
        url: `${BASE_URL}/about`,
        name: `About HACS Foundation | ${SITE_NAME}`,
        description:
          "Learn about Hope Alive Children Spring Foundation — a registered NGO in Makurdi, Benue State dedicated to orphaned and vulnerable children.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "About Us", item: `${BASE_URL}/about` },
        ]),
      },
    ],
  },

  // ── Mission ──────────────────────────────────────────────────────────────
  {
    route: "/mission",
    title: `Our Mission & Vision — Transforming Children's Lives in Nigeria | ${SITE_NAME}`,
    description:
      "The mission of Hope Alive Children Spring Foundation is to provide compassionate care to orphaned and vulnerable children in Nigeria, restoring their dignity and empowering their future. Discover what drives us.",
    h1: "Our Mission & Vision",
    intro:
      "The mission of HACS Foundation is to provide comprehensive, compassionate care to orphaned, abandoned, and vulnerable children in Nigeria — restoring their dignity, nurturing their potential, and empowering them to become confident, contributing members of society.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${BASE_URL}/mission`,
        name: `Mission & Vision | ${SITE_NAME}`,
        description:
          "The mission and vision of HACS Foundation: giving orphaned and vulnerable children in Nigeria a future filled with love, care, and hope.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Mission & Vision", item: `${BASE_URL}/mission` },
        ]),
      },
    ],
  },

  // ── Goals ────────────────────────────────────────────────────────────────
  {
    route: "/goals",
    title: `Goals & Objectives — Building a Future for Nigeria's Children | ${SITE_NAME}`,
    description:
      "Explore the 10 strategic goals of Hope Alive Children Spring Foundation: providing shelter, education, healthcare, nutrition, skills training, and advocacy for orphaned and vulnerable children in Benue State, Nigeria.",
    h1: "Goals & Objectives",
    intro:
      "HACS Foundation pursues 10 strategic goals that guide how we serve children: from providing safe shelter and daily nutrition to delivering quality education, free healthcare, skills training, and long-term advocacy for child welfare in Nigeria.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${BASE_URL}/goals`,
        name: `Goals & Objectives | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Goals & Objectives", item: `${BASE_URL}/goals` },
        ]),
      },
    ],
  },

  // ── Programs ─────────────────────────────────────────────────────────────
  {
    route: "/programs",
    title: `Programs & Services — Feeding, Education, Healthcare & More | ${SITE_NAME}`,
    description:
      "Hope Alive Children Spring Foundation runs 6 life-changing programs for orphaned children in Nigeria: daily feeding, education support, free healthcare, safe shelter, skills training, and psychosocial support.",
    h1: "Programs & Services",
    intro:
      "HACS Foundation delivers six core programmes for children in our care: a daily feeding programme, education support including school fees and materials, free healthcare and medical checkups, safe shelter and housing, vocational skills training for youth, and psychosocial counselling.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${BASE_URL}/programs`,
        name: `Programs & Services | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Programs", item: `${BASE_URL}/programs` },
        ]),
      },
    ],
  },

  // ── Donate ───────────────────────────────────────────────────────────────
  {
    route: "/donate",
    title: `Donate to Support Vulnerable Children | ${SITE_NAME}`,
    description:
      "Donate to Hope Alive Children Spring Foundation and help orphaned and vulnerable children in Nigeria. Give securely by card (Stripe), PayPal, KoraPay, or bank transfer. Every contribution makes a difference.",
    h1: "Donate to HACS Foundation",
    intro:
      "Your donation helps HACS Foundation provide shelter, education, healthcare, and daily meals to orphaned and vulnerable children in Makurdi, Benue State, Nigeria. Give securely online by card, PayPal, KoraPay, or by direct bank transfer.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${BASE_URL}/donate`,
        name: `Donate | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Donate", item: `${BASE_URL}/donate` },
        ]),
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  {
    route: "/contact",
    title: `Contact HACS Foundation — Get in Touch | ${SITE_NAME}`,
    description:
      "Contact Hope Alive Children Spring Foundation in Makurdi, Benue State, Nigeria. Call 08036238076 or email hacsfoundation10@gmail.com to donate, volunteer, partner, or ask about our children's programmes.",
    h1: "Contact Hope Alive Children Spring Foundation",
    intro:
      "Get in touch with HACS Foundation in Makurdi, Benue State, Nigeria. You can reach us by phone at 08036238076 or 09016662836, by email at hacsfoundation10@gmail.com, or by visiting our office at Udoo Plaza, Opp NKST Church, Ama Terwase Agbadu Road.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: `${BASE_URL}/contact`,
        name: `Contact | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Contact", item: `${BASE_URL}/contact` },
        ]),
      },
    ],
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  {
    route: "/faq",
    title: `Frequently Asked Questions | ${SITE_NAME}`,
    description:
      "Get answers to common questions about Hope Alive Children Spring Foundation: how to donate, child sponsorship, volunteering, how your donation is used, and how to partner with our NGO in Nigeria.",
    h1: "Frequently Asked Questions",
    intro:
      "Find answers to common questions about HACS Foundation: how to make a donation, how your contribution is used, child sponsorship, volunteering opportunities, where we are located, and how organisations can partner with us.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: `${BASE_URL}/faq`,
        name: `FAQ | ${SITE_NAME}`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Hope Alive Children Spring Foundation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hope Alive Children Spring Foundation (HACS Foundation) is a registered charitable foundation based in Makurdi, Benue State, Nigeria. We provide comprehensive care including shelter, food, education, healthcare, and love to orphaned and vulnerable children.",
            },
          },
          {
            "@type": "Question",
            name: "How can I donate to the foundation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can donate through our secure online donation page using Stripe (card payment), PayPal, KoraPay, or via direct bank transfer to our Zenith Bank account: 1224366497 (Naira) or our dollar account: 5074649270.",
            },
          },
          {
            "@type": "Question",
            name: "How are donations used?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "100% of your donation goes directly to programme activities: feeding, education, healthcare, shelter, and skills training for the children in our care.",
            },
          },
          {
            "@type": "Question",
            name: "Can I sponsor a specific child?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Child sponsorship is one of the most impactful ways to give. Contact us at hacsfoundation10@gmail.com to learn more about our child sponsorship programme.",
            },
          },
          {
            "@type": "Question",
            name: "How can I volunteer with the foundation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We welcome volunteers with skills in education, healthcare, counselling, administration, and more. Reach out to us via email or phone to discuss available opportunities.",
            },
          },
          {
            "@type": "Question",
            name: "Where is the foundation located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We are located at Office No 5, Udoo Plaza, Opp NKST Church, Ama Terwase Agbadu Road, Makurdi, Benue State, Nigeria. You can contact us at 08036238076 or 09016662836.",
            },
          },
          {
            "@type": "Question",
            name: "Can organisations partner with HACS Foundation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. We actively seek partnerships with churches, NGOs, corporations, and government agencies. Corporate sponsorships, in-kind donations, and programme partnerships are all welcome. Contact us to discuss opportunities.",
            },
          },
        ],
      },
    ],
  },

  // ── Gallery ──────────────────────────────────────────────────────────────
  {
    route: "/gallery",
    title: `Gallery — Moments of Joy, Care & Hope | ${SITE_NAME}`,
    description:
      "See the real impact of HACS Foundation in photos: joyful children, community outreach, gift distributions, and daily life at Hope Alive Children Spring Foundation in Makurdi, Benue State, Nigeria.",
    h1: "Gallery — Moments of Joy, Care & Hope",
    intro:
      "Explore photographs from HACS Foundation's work with children in Makurdi, Benue State, Nigeria. Each image reflects the love, care, and hope we give to every child in our programmes.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        url: `${BASE_URL}/gallery`,
        name: `Gallery | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Gallery", item: `${BASE_URL}/gallery` },
        ]),
      },
    ],
  },

  // ── Privacy ──────────────────────────────────────────────────────────────
  {
    route: "/privacy",
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Privacy Policy for Hope Alive Children Spring Foundation — how we collect, use, and protect your personal information when you visit hacsfoundation.com or make a charitable donation.",
    h1: "Privacy Policy",
    intro:
      "This Privacy Policy explains how Hope Alive Children Spring Foundation collects, uses, and protects your personal information when you visit our website or make a donation.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${BASE_URL}/privacy`,
        name: `Privacy Policy | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Privacy Policy", item: `${BASE_URL}/privacy` },
        ]),
      },
    ],
  },

  // ── Terms ────────────────────────────────────────────────────────────────
  {
    route: "/terms",
    title: `Terms of Use | ${SITE_NAME}`,
    description:
      "Terms of Use for the Hope Alive Children Spring Foundation website — conditions for accessing hacsfoundation.com and making charitable donations to support orphaned children in Nigeria.",
    h1: "Terms of Use",
    intro:
      "These Terms of Use govern your access to and use of the Hope Alive Children Spring Foundation website. Please read them before making a donation or using any feature of our website.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${BASE_URL}/terms`,
        name: `Terms of Use | ${SITE_NAME}`,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: breadcrumb([
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Terms of Use", item: `${BASE_URL}/terms` },
        ]),
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Inject or replace a <meta name="..."> tag content.
 */
function replaceMeta(html, attrType, key, value) {
  const re = new RegExp(
    `(<meta\\s+${attrType}="${escapeRegex(key)}"\\s+content=")[^"]*("\\s*/?>)`,
    "i"
  );
  const reAlt = new RegExp(
    `(<meta\\s+content="[^"]*"\\s+${attrType}="${escapeRegex(key)}"\\s*/?>)`,
    "i"
  );
  const replacement = `<meta ${attrType}="${key}" content="${escapeHtml(value)}" />`;
  if (re.test(html)) return html.replace(re, `$1${escapeHtml(value)}$2`);
  if (reAlt.test(html)) return html.replace(reAlt, replacement);
  // Insert before </head> if not found
  return html.replace("</head>", `  ${replacement}\n</head>`);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------------------
// Core: build HTML for one page
// ---------------------------------------------------------------------------

function buildHtml(template, page, googleVerification) {
  let html = template;
  const canonicalUrl =
    page.route === "/" ? BASE_URL + "/" : BASE_URL + page.route;
  const fullTitle = page.title;
  const ogImage = page.ogImage || DEFAULT_OG_IMAGE;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`);

  // <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // meta description
  html = replaceMeta(html, "name", "description", page.description);

  // meta robots
  if (page.noindex) {
    html = replaceMeta(html, "name", "robots", "noindex, nofollow");
  } else {
    html = replaceMeta(html, "name", "robots", "index, follow");
  }

  // OG tags
  html = replaceMeta(html, "property", "og:title", fullTitle);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "property", "og:image", ogImage);

  // Twitter tags
  html = replaceMeta(html, "name", "twitter:title", fullTitle);
  html = replaceMeta(html, "name", "twitter:description", page.description);
  html = replaceMeta(html, "name", "twitter:image", ogImage);

  // Replace / inject JSON-LD schema
  if (page.schema) {
    const schemaJson = JSON.stringify(
      Array.isArray(page.schema) ? page.schema : [page.schema],
      null,
      2
    );
    const ldTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;
    // Replace existing ld+json block
    html = html.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
      ldTag
    );
  }

  // Google Search Console verification meta tag
  if (googleVerification) {
    const verMeta = `<meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />`;
    html = html.replace("<!-- GOOGLE_VERIFICATION_META -->", verMeta);
  } else {
    // Remove the placeholder comment cleanly
    html = html.replace(/\s*<!-- GOOGLE_VERIFICATION_META -->\n?/, "\n");
  }

  // Google Analytics — inject GA4 snippet when VITE_GA_MEASUREMENT_ID is set
  const gaMeasurementId = process.env.VITE_GA_MEASUREMENT_ID || "";
  if (gaMeasurementId) {
    const gaScript = `<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(gaMeasurementId)}"></script>\n    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${escapeHtml(gaMeasurementId)}');</script>`;
    html = html.replace("<!-- GA_SCRIPT_PLACEHOLDER -->", gaScript);
  } else {
    html = html.replace(/\s*<!-- GA_SCRIPT_PLACEHOLDER -->\n?/, "\n");
  }

  // Inject static content into #root for immediate crawlability
  // React (createRoot) will replace this on hydration — no mismatch errors
  const staticContent = `<div style="font-family:sans-serif;max-width:900px;margin:0 auto;padding:80px 16px 40px">` +
    `<h1>${escapeHtml(page.h1)}</h1>` +
    `<p>${escapeHtml(page.intro)}</p>` +
    `</div>`;

  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${staticContent}</div>`
  );

  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  const template = fs.readFileSync(templatePath, "utf-8");
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION || "";

  let built = 0;
  let skipped = 0;

  for (const page of PAGES) {
    const html = buildHtml(template, page, googleVerification);

    if (page.route === "/") {
      // Overwrite the root index.html in place
      fs.writeFileSync(templatePath, html, "utf-8");
      console.log(`  ✓  /  →  dist/public/index.html`);
    } else {
      // Create dist/public/{slug}/index.html
      const slug = page.route.replace(/^\//, "");
      const dir = path.join(distDir, slug);
      fs.mkdirSync(dir, { recursive: true });
      const outPath = path.join(dir, "index.html");
      fs.writeFileSync(outPath, html, "utf-8");
      console.log(`  ✓  ${page.route}  →  dist/public/${slug}/index.html`);
    }
    built++;
  }

  console.log(`\n✅  Prerendered ${built} pages, skipped ${skipped}.`);
  console.log(`   Googlebot will now receive complete HTML for every public route.\n`);
}

run().catch((err) => {
  console.error("❌  Prerender failed:", err);
  process.exit(1);
});
