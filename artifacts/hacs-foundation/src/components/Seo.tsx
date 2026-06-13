import { useEffect } from "react";

const SITE_NAME = "Hope Alive Children Spring Foundation";
const BASE_URL = "https://www.hacsfoundation.com";
const DEFAULT_IMAGE = "https://www.hacsfoundation.com/opengraph.jpg";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  schema?: object | object[];
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setSchema(schema: object | object[]) {
  const existing = document.head.querySelector('script[data-seo-schema]');
  if (existing) existing.remove();
  const el = document.createElement("script");
  el.setAttribute("type", "application/ld+json");
  el.setAttribute("data-seo-schema", "true");
  el.textContent = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
  document.head.appendChild(el);
}

export default function Seo({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex,
  schema,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    if (keywords) setMeta("name", "keywords", keywords);
    setCanonical(url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    if (schema) {
      setSchema(schema);
    }
  }, [title, description, path, keywords, image, type, noindex, schema]);

  return null;
}
