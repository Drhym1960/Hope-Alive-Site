import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";

export default function Mission() {
  return (
    <Layout>
      <Seo title="Mission & Vision" description="Our mission and vision at Hope Alive Children Spring Foundation: giving orphaned and vulnerable children in Makurdi, Nigeria a future filled with love, care, and hope." path="/mission" />
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">What Drives Us</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">Mission & Vision</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Guided by love and driven by purpose, every action we take flows from a clear mission and a bold vision for Nigeria's children.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-primary rounded-3xl p-10 text-primary-foreground">
                <p className="text-secondary text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</p>
                <h2 className="font-serif text-2xl font-bold text-white mb-6">What We Are Called to Do</h2>
                <div className="space-y-4 text-primary-foreground/85 leading-relaxed">
                  <p>
                    The mission of Hope Alive Children Spring Foundation is to provide comprehensive, compassionate care to orphaned, abandoned, and vulnerable children in Nigeria, restoring their dignity, nurturing their potential, and empowering them to become confident, contributing members of society.
                  </p>
                  <p>
                    We exist to be a haven of safety, love, and opportunity for every child who has been left without a family or means of survival. Through education, healthcare, nutrition, shelter, and psychosocial support, we address every dimension of a child's wellbeing.
                  </p>
                  <p>
                    We are committed to working in partnership with communities, government, and faith organizations to create a Nigeria where no child is abandoned or forgotten.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="bg-accent border border-border rounded-3xl p-10">
                <p className="text-secondary text-xs font-semibold uppercase tracking-widest mb-4">Our Vision</p>
                <h2 className="font-serif text-2xl font-bold text-primary mb-6">The Future We Are Building</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our vision is a Nigeria where every child, regardless of background, circumstance, or loss, has access to love, protection, quality education, healthcare, and the opportunity to fulfill their God-given potential.
                  </p>
                  <p>
                    We envision communities where orphans are embraced, not excluded; where vulnerable children are championed, not overlooked; and where every child knows their life has purpose, value, and infinite possibility.
                  </p>
                  <p>
                    Through sustained advocacy, direct care, and community engagement, we are building a movement that will transform the landscape of child welfare in Benue State and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Commitments */}
        <section className="py-16 warm-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Our Commitments" title="The Pillars of Our Work" centered />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Child Protection", desc: "Ensuring every child in our care is safe from harm, abuse, and exploitation." },
                { title: "Quality Education", desc: "Providing access to education that opens doors to a brighter future." },
                { title: "Health & Nutrition", desc: "Keeping children healthy, fed, and strong so they can grow and thrive." },
                { title: "Community Integration", desc: "Reconnecting children with loving families and supportive communities where possible." },
              ].map((c) => (
                <div key={c.title} className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-4 h-4 bg-primary rounded-full" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background text-center">
          <div className="max-w-2xl mx-auto px-4">
            <blockquote className="font-serif text-2xl italic text-primary font-bold mb-4">
              "Giving Love a Chance"
            </blockquote>
            <p className="text-muted-foreground mb-8">Our motto captures everything we believe: that love, when given freely, has the power to transform lives and restore hope.</p>
            <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-colors">
              Support the Mission
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
