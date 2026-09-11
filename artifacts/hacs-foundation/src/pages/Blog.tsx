import { Link, useSearch } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { getPostsPage, type BlogPost } from "@/lib/blog";

const SITE = "Hope Alive Children Spring Foundation";
const CATEGORIES = ["All", "Child Welfare", "Donor Guidance", "Education", "Partnerships", "Community Action"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
      <div className="bg-primary/10 px-6 pt-6 pb-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block bg-secondary/20 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h2 className="font-serif text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-secondary transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline decoration-secondary/40">
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
          <time className="text-xs text-muted-foreground" dateTime={post.date}>{formatDate(post.date)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-secondary hover:underline"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const search = useSearch();
  const page = Math.max(1, parseInt(new URLSearchParams(search).get("page") || "1"));
  const { posts, totalPages, currentPage } = getPostsPage(page);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `HACS Foundation Blog`,
    description: "Articles on child welfare, education, donor guidance, and community action from Hope Alive Children Spring Foundation.",
    url: "https://www.hacsfoundation.com/blog",
    publisher: {
      "@type": "NGO",
      name: SITE,
      url: "https://www.hacsfoundation.com",
    },
  };

  return (
    <Layout>
      <Seo
        title="HACS Foundation Blog | Children, Education & Community"
        description="Read articles on child welfare, education support, donor guidance, and community action from Hope Alive Children Spring Foundation in Makurdi, Nigeria."
        path="/blog"
        type="website"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Our Blog</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Children, Education & Community
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mx-auto">
            Articles and guides on child welfare, education support, responsible giving, and community action — from the HACS Foundation team in Makurdi, Nigeria.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Blog" }]} />

      {/* Article grid */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex justify-center gap-2" aria-label="Blog pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={p === 1 ? "/blog" : `/blog?page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    p === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Support Our Work</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Every article on this blog is part of our commitment to transparency and education. If you believe in our mission, consider making a donation or getting involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
              Donate Now
            </Link>
            <Link href="/volunteer" className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
