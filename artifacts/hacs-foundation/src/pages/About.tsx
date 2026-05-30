import { useEffect } from "react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { SectionHeader } from "@/components/SectionHeader";
import CertificatesSection from "@/components/CertificatesSection";
import { Link } from "wouter";

const values = [
  { title: "Compassion", desc: "We approach every child with unconditional love, empathy, and genuine care." },
  { title: "Dignity", desc: "Every child is treated with the highest respect, affirming their inherent worth." },
  { title: "Integrity", desc: "We operate with full transparency and accountability in all we do." },
  { title: "Excellence", desc: "We pursue the highest standards of care, service, and impact." },
  { title: "Community", desc: "We believe families and communities are essential to a child's healing and growth." },
  { title: "Hope", desc: "We plant seeds of possibility in every child's heart, nurturing belief in their future." },
];

export default function About() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <Layout>
      <Seo title="About Us" description="Learn about Hope Alive Children Spring Foundation, a registered charitable foundation in Makurdi, Benue State, Nigeria, caring for orphaned and vulnerable children since our founding." path="/about" />
      <div className="pt-16">
        {/* Hero */}
        <section className="hero-gradient py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">About Us</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">Who We Are</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Hope Alive Children Spring Foundation is a registered charitable foundation serving the most vulnerable children in Makurdi, Benue State, Nigeria.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader eyebrow="Our Story" title="Born from a Heart of Love" />
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Hope Alive Children Spring Foundation was born out of a deep conviction that no child should suffer alone. Confronted daily with the heartbreaking reality of children orphaned by poverty, disease, and loss, our founders were moved to act, not just to sympathize, but to step in as family.
                  </p>
                  <p>
                    What began as a small gathering of concerned individuals caring for a handful of children in Makurdi has grown into a fully operational charitable organisation with multiple programs, a team of dedicated staff and volunteers, and the love and trust of hundreds of families across Benue State.
                  </p>
                  <p>
                    Today, Hope Alive Children Spring Foundation operates as a children's care and community support center, providing comprehensive care that addresses not just the physical needs of children, but their emotional, educational, and spiritual wellbeing.
                  </p>
                  <p>
                    Our motto, <em className="text-primary font-medium">"Giving Love a Chance"</em>, is not just a tagline. It is the promise we make to every child who walks through our doors: you are loved, you are valued, and you belong.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                  <h3 className="font-serif text-xl font-semibold text-secondary mb-3">Our Identity</h3>
                  <ul className="space-y-2 text-primary-foreground/85 text-sm">
                    <li><strong>Name:</strong> Hope Alive Children Spring Foundation</li>
                    <li><strong>Type:</strong> Charitable Foundation</li>
                    <li><strong>Location:</strong> Makurdi, Benue State, Nigeria</li>
                    <li><strong>Website:</strong> hacsfoundation.com</li>
                    <li><strong>Email:</strong> hacsfoundation10@gmail.com</li>
                  </ul>
                </div>
                <div className="bg-accent border border-border rounded-2xl p-8">
                  <h3 className="font-serif text-xl font-semibold text-primary mb-3">Our Motto</h3>
                  <p className="text-2xl font-serif italic text-primary font-bold">"Giving Love a Chance"</p>
                  <p className="text-muted-foreground text-sm mt-3">This is the promise we make to every child we serve.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 warm-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="What We Stand For" title="Our Core Values" centered />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-primary mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration & Certification */}
        <CertificatesSection />

        {/* CTA */}
        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Join Us in Giving Love a Chance
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether through a donation, volunteering, or spreading the word, every act of kindness changes a child's story.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/donate" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                Donate Now
              </Link>
              <Link href="/contact" className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
