/**
 * HACS Foundation — Blog Content Loader
 *
 * Loads all Markdown files from src/content/blog/ using Vite's glob import.
 * Parses YAML frontmatter and converts Markdown to HTML at build/load time.
 * No external dependencies required.
 *
 * Usage:
 *   import { getAllPosts, getPostBySlug } from "@/lib/blog"
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  seoDescription: string;
  date: string;           // YYYY-MM-DD
  updatedDate: string;    // YYYY-MM-DD
  author: string;
  category: string;
  featuredImage: string;
  imageAlt: string;
  draft: boolean;
  canonicalUrl: string;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Full HTML content (converted from Markdown) */
  html: string;
  /** Plain-text excerpt (first 200 chars of content) */
  excerpt: string;
}

// ---------------------------------------------------------------------------
// Glob import — Vite loads all .md files as raw strings at build time
// ---------------------------------------------------------------------------

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// ---------------------------------------------------------------------------
// Frontmatter parser (no external deps)
// ---------------------------------------------------------------------------

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  if (!raw.startsWith("---")) return { data: {}, content: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };
  const yaml = raw.slice(4, end);
  const content = raw.slice(end + 4).trimStart();
  const data: Record<string, string> = {};
  for (const line of yaml.split("\n")) {
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    // Strip optional surrounding quotes
    data[key] = val.replace(/^["']|["']$/g, "");
  }
  return { data, content };
}

// ---------------------------------------------------------------------------
// Minimal Markdown → HTML converter
// Handles: headings, bold, italic, links, unordered/ordered lists, paragraphs, hr
// ---------------------------------------------------------------------------

function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeList = () => {
    if (inUl) { html.push("</ul>"); inUl = false; }
    if (inOl) { html.push("</ol>"); inOl = false; }
  };

  const inlineFormat = (text: string): string =>
    text
      // Bold: **text**
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic: *text*
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-secondary hover:underline font-medium">$1</a>');

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Horizontal rule
    if (/^---+$/.test(line)) { closeList(); html.push("<hr />"); continue; }

    // Headings
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    if (h3) { closeList(); html.push(`<h3 class="font-serif text-xl font-bold text-foreground mt-8 mb-3">${inlineFormat(h3[1])}</h3>`); continue; }
    if (h2) { closeList(); html.push(`<h2 class="font-serif text-2xl font-bold text-foreground mt-10 mb-4">${inlineFormat(h2[1])}</h2>`); continue; }

    // Unordered list
    const ul = line.match(/^[-*] (.+)/);
    if (ul) {
      if (inOl) { html.push("</ol>"); inOl = false; }
      if (!inUl) { html.push('<ul class="list-disc list-inside space-y-2 my-4 text-muted-foreground">'); inUl = true; }
      html.push(`<li class="leading-relaxed">${inlineFormat(ul[1])}</li>`);
      continue;
    }

    // Ordered list
    const ol = line.match(/^\d+\. (.+)/);
    if (ol) {
      if (inUl) { html.push("</ul>"); inUl = false; }
      if (!inOl) { html.push('<ol class="list-decimal list-inside space-y-2 my-4 text-muted-foreground">'); inOl = true; }
      html.push(`<li class="leading-relaxed">${inlineFormat(ol[1])}</li>`);
      continue;
    }

    // Empty line closes lists and paragraphs
    if (line === "") { closeList(); html.push(""); continue; }

    // Plain paragraph line
    closeList();
    html.push(`<p class="text-muted-foreground leading-relaxed mb-4">${inlineFormat(line)}</p>`);
  }
  closeList();
  return html.filter(l => l !== "").join("\n");
}

// ---------------------------------------------------------------------------
// Estimate reading time (avg 200 words/min)
// ---------------------------------------------------------------------------

function readingTime(md: string): number {
  const wordCount = md.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// ---------------------------------------------------------------------------
// Plain-text excerpt from HTML
// ---------------------------------------------------------------------------

function extractExcerpt(html: string, maxLen = 220): string {
  const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > maxLen ? plain.slice(0, maxLen).replace(/\s+\S*$/, "") + "…" : plain;
}

// ---------------------------------------------------------------------------
// Build post list from loaded modules
// ---------------------------------------------------------------------------

const BASE_URL = "https://www.hacsfoundation.com";

function parseModule(filePath: string, raw: string): BlogPost | null {
  const { data, content } = parseFrontmatter(raw);
  if (data.draft === "true") return null; // exclude drafts from the list

  const slug = data.slug || filePath.split("/").pop()?.replace(/\.md$/, "") || "";
  const title = data.title || slug;
  const date = data.date || "2026-07-19";
  const html = mdToHtml(content);

  return {
    slug,
    title,
    seoTitle: data.seoTitle || `${title} | Hope Alive Children Spring Foundation`,
    description: data.description || "",
    seoDescription: data.seoDescription || data.description || "",
    date,
    updatedDate: data.updatedDate || date,
    author: data.author || "HACS Foundation Editorial Team",
    category: data.category || "General",
    featuredImage: data.featuredImage || "/opengraph.jpg",
    imageAlt: data.imageAlt || title,
    draft: false,
    canonicalUrl: data.canonicalUrl || `${BASE_URL}/blog/${slug}`,
    readingTime: readingTime(content),
    html,
    excerpt: extractExcerpt(html),
  };
}

/** All published blog posts, sorted newest first */
export const allPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => parseModule(path, raw))
  .filter((p): p is BlogPost => p !== null)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

/** Get posts for a given page (1-indexed, 9 per page) */
export function getPostsPage(page: number, perPage = 9): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
} {
  const total = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const posts = allPosts.slice((current - 1) * perPage, current * perPage);
  return { posts, totalPages, currentPage: current };
}

/** Get related posts (same category, excluding current slug, max 3) */
export function getRelatedPosts(slug: string, max = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return allPosts.slice(0, max);
  return allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, max)
    .concat(
      allPosts.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, max)
    )
    .slice(0, max);
}
