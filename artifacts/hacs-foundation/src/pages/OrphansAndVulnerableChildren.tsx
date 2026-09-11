import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Orphans and Vulnerable Children — HACS Foundation",
  description: "Learn about the needs of orphaned and vulnerable children and how Hope Alive Children Spring Foundation in Makurdi, Nigeria, provides support through six integrated programmes.",
  url: "https://www.hacsfoundation.com/orphans-and-vulnerable-children",
};

const needs = [
  { icon: "🏠", title: "Safe Shelter", desc: "A stable, safe home environment is the foundation of healthy development. Without it, other forms of support are difficult to sustain." },
  { icon: "🍽️", title: "Adequate Nutrition", desc: "Hunger affects concentration, health, and development. Children who are food-insecure cannot thrive in school or in life." },
  { icon: "📚", title: "Access to Education", desc: "Education is protective and transformative — but it is accessible only to children who have the fees, materials, and stability to attend." },
  { icon: "🏥", title: "Healthcare", desc: "Orphaned and vulnerable children are often less likely to receive regular healthcare, leaving preventable conditions untreated." },
  { icon: "💚", title: "Emotional Support", desc: "Many children in vulnerable situations have experienced loss, trauma, or abuse. Psychosocial support is essential for healing and healthy development." },
  { icon: "🤝", title: "Community & Belonging", desc: "Children need to feel that they belong — to a family, a community, a place. This sense of belonging is as important as physical wellbeing." },
];

const hacsResponse = [
  { prog: "Daily Feeding Programme", link: "/programs", desc: "Three nutritious meals per day for all resident children, plus community outreach feeding." },
  { prog: "Education Support Programme", link: "/education-support", desc: "School fees, uniforms, textbooks, tutoring, and scholarships from nursery through to university." },
  { prog: "Healthcare Programme", link: "/programs", desc: "Routine check-ups, immunisations, emergency treatment, and access to hospitals and clinics." },
  { prog: "Shelter & Housing Programme", link: "/programs", desc: "Safe, clean accommodation in a caring family environment with consistent adult supervision." },
  { prog: "Skills Acquisition Programme", link: "/programs", desc: "Vocational training and entrepreneurship education for older youth preparing for independence." },
  { prog: "Psychosocial Support Programme", link: "/programs", desc: "Individual and group counselling, trauma-informed care, and life-skills development." },
];

export default function OrphansAndVulnerableChildren() {
  return (
    <Layout>
      <Seo
        title="Supporting Orphans and Vulnerable Children | Hope Alive Children Spring Foundation"
        description="Hope Alive Children Spring Foundation provides shelter, education, healthcare, feeding, skills training, and psychosocial support to orphaned and vulnerable children in Makurdi, Nigeria."
        path="/orphans-and-vulnerable-children"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Orphans and Vulnerable Children
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mx-auto">
            Every child deserves safety, love, and opportunity — regardless of whether they have parents to provide those things. HACS Foundation exists to bridge that gap for children in Makurdi, Benue State, Nigeria.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Orphans & Vulnerable Children" }]} />

      {/* Who we mean */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Understanding the Context"
            title="Who Are Orphaned and Vulnerable Children?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The term "orphaned and vulnerable children" covers a broad range of circumstances. Some children have lost both parents and have no adult family member able to care for them. Others have a surviving parent who is unable to provide adequate care because of illness, poverty, or other challenges. Still others are children living in unsafe home environments or without consistent access to basic necessities.
            </p>
            <p>
              What these children share is a heightened vulnerability — a greater risk of missing out on the education, healthcare, nutrition, and emotional support that children need to grow into healthy, capable adults.
            </p>
            <p>
              In Benue State, Nigeria — and across much of sub-Saharan Africa — poverty, illness, and instability mean that large numbers of children are growing up without reliable adult support. HACS Foundation has been responding to this reality since 2012.
            </p>
          </div>
        </div>
      </section>

      {/* Needs */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Children Need"
            title="The Core Needs of Vulnerable Children"
            subtitle="Effective support addresses the whole child — not just one aspect of their life. These are the fundamental needs that HACS Foundation's programmes are designed to meet."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {needs.map((n) => (
              <div key={n.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{n.icon}</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{n.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HACS response */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="HACS Foundation's Response"
            title="Six Programmes, One Mission"
            subtitle="Since 2012, HACS Foundation has operated six integrated programmes to meet the full range of needs of orphaned and vulnerable children in Makurdi, Benue State."
          />
          <div className="space-y-4 mt-6">
            {hacsResponse.map((r) => (
              <div key={r.prog} className="flex gap-4 bg-accent/30 rounded-xl p-5 border border-border">
                <span className="text-secondary font-bold text-lg mt-0.5 shrink-0">→</span>
                <div>
                  <Link href={r.link} className="font-serif font-bold text-foreground hover:text-secondary transition-colors">
                    {r.prog}
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Full programme descriptions: <Link href="/programs" className="text-secondary hover:underline font-medium">Our Programmes</Link>
          </p>
        </div>
      </section>

      {/* How to help */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Get Involved"
            title="How You Can Help"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Donate", desc: "Financial contributions fund our six programmes directly.", href: "/donate" },
              { title: "Volunteer", desc: "Give your time and skills to children who need them.", href: "/volunteer" },
              { title: "Partner With Us", desc: "Organisations can support our work through formal partnerships.", href: "/partner-with-us" },
              { title: "Raise Awareness", desc: "Share information about HACS Foundation with your network.", href: "/blog" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-serif font-bold text-foreground group-hover:text-secondary transition-colors mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Every Child Deserves a Chance</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Your support — however you choose to give it — helps HACS Foundation provide the care, education, and love that vulnerable children in Nigeria need and deserve.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Donate Now
          </Link>
          <Link href="/about" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            Our Story
          </Link>
        </div>
      </section>
    </Layout>
  );
}
