import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/blog";

const SITE = "Hope Alive Children Spring Foundation";
const BASE_URL = "https://www.hacsfoundation.com";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow group"
    >
      <span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full mb-2">
        {post.category}
      </span>
      <h3 className="font-serif font-bold text-base text-foreground leading-snug group-hover:text-secondary transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-xs text-muted-foreground">{post.readingTime} min read · {formatDate(post.date)}</p>
    </Link>
  );
}

function ArticleNotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center py-24">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">The article you are looking for does not exist or may have been moved.</p>
        <Link href="/blog" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all">
          Back to Blog
        </Link>
      </div>
    </Layout>
  );
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const post = getPostBySlug(slug);

  if (!post) return <ArticleNotFound />;

  const related = getRelatedPosts(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle,
    description: post.seoDescription,
    image: `${BASE_URL}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.updatedDate,
    author: {
      "@type": "Organization",
      name: SITE,
      url: BASE_URL,
    },
    publisher: {
      "@type": "NGO",
      name: SITE,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.canonicalUrl,
    },
  };

  return (
    <Layout>
      <Seo
        title={post.seoTitle}
        description={post.seoDescription}
        path={`/blog/${post.slug}`}
        type="article"
        schema={articleSchema}
      />

      {/* Hero */}
      <section className="hero-gradient py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">{post.category}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-primary-foreground/70 text-sm">
            <span>By {post.author}</span>
            <span className="hidden sm:inline">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="hidden sm:inline">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      {/* Article body */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description / lead */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-medium border-l-4 border-secondary pl-5">
            {post.description}
          </p>

          {/* HTML content from markdown */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* CTA block */}
          <div className="mt-14 p-8 bg-primary rounded-2xl text-center">
            <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-3">Make a Difference Today</h2>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Hope Alive Children Spring Foundation supports orphaned and vulnerable children in Makurdi, Benue State, Nigeria. Your donation helps provide shelter, education, healthcare, and love.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/donate" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all">
                Donate Now
              </Link>
              <Link href="/volunteer" className="px-6 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
                Volunteer
              </Link>
            </div>
          </div>

          {/* Author */}
          <div className="mt-8 p-5 bg-accent/40 rounded-xl flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-card shadow-sm">
              <img src="/logo.png" alt="Hope Alive Children Spring Foundation" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{post.author}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                Hope Alive Children Spring Foundation is a registered Nigerian NGO providing shelter, education, healthcare, and psychosocial support to orphaned and vulnerable children in Makurdi, Benue State.
              </p>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link href="/blog" className="text-secondary hover:underline font-medium text-sm">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-14 bg-accent/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => <RelatedCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
