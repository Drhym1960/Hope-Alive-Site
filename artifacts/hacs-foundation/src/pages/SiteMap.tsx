import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { allPosts } from "@/lib/blog";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Site Map — HACS Foundation",
  description: "A complete list of all public pages on the Hope Alive Children Spring Foundation website.",
  url: "https://www.hacsfoundation.com/site-map",
};

const sections = [
  {
    title: "Core Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About HACS Foundation" },
      { href: "/mission", label: "Mission & Vision" },
      { href: "/goals", label: "Goals & Objectives" },
      { href: "/donate", label: "Donate" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Programmes & Work",
    links: [
      { href: "/programs", label: "All Programmes" },
      { href: "/education-support", label: "Education Support" },
      { href: "/orphans-and-vulnerable-children", label: "Orphans & Vulnerable Children" },
      { href: "/street-children-support", label: "Street Children Support" },
      { href: "/gallery", label: "Photo Gallery" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/volunteer", label: "Volunteer with Us" },
      { href: "/partner-with-us", label: "Partner with HACS Foundation" },
      { href: "/faq", label: "Frequently Asked Questions" },
    ],
  },
  {
    title: "Accountability",
    links: [
      { href: "/transparency", label: "Transparency & Accountability" },
      { href: "/child-safeguarding", label: "Child Safeguarding Policy" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/compare/hacs-foundation-vs-crowdfunding", label: "HACS Foundation vs Crowdfunding" },
      { href: "/compare/sponsor-a-child-vs-general-donation", label: "Child Sponsorship vs General Donation" },
      { href: "/compare/volunteering-vs-donating", label: "Volunteering vs Donating" },
      { href: "/compare/local-childrens-charity-vs-international-charity", label: "Local vs International Children's Charities" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

export default function SiteMap() {
  return (
    <Layout>
      <Seo
        title="Site Map | Hope Alive Children Spring Foundation"
        description="A complete list of all pages on the Hope Alive Children Spring Foundation website — programmes, blog, compare pages, accountability, and legal information."
        path="/site-map"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Site Map</h1>
          <p className="text-white/80 text-lg">A complete directory of all pages on the HACS Foundation website.</p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Site Map" }]} />

      {/* Sections */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-serif font-bold text-foreground text-lg mb-3 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-secondary transition-colors text-sm leading-relaxed">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Blog section */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h2 className="font-serif font-bold text-foreground text-lg mb-3 pb-2 border-b border-border">
                Blog Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <Link href="/blog" className="text-secondary hover:underline font-medium text-sm">Blog Index →</Link>
                </div>
                {allPosts.map((post) => (
                  <div key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="text-muted-foreground hover:text-secondary transition-colors text-sm leading-relaxed">
                      {post.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-10 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all">
              Donate Now
            </Link>
            <Link href="/volunteer" className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              Volunteer
            </Link>
            <Link href="/contact" className="px-6 py-3 border-2 border-muted-foreground text-muted-foreground rounded-full font-semibold hover:border-foreground hover:text-foreground transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
