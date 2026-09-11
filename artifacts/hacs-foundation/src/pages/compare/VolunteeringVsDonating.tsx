import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Volunteering vs Donating — Which Makes a Bigger Difference?",
  description: "Compare volunteering and donating to a children's charity. Both have real value; this guide helps you decide which is right for your situation.",
  url: "https://www.hacsfoundation.com/compare/volunteering-vs-donating",
};

const rows = [
  { aspect: "What you give", volunteer: "Time, skills, and presence", donate: "Financial resources" },
  { aspect: "Flexibility", volunteer: "Requires scheduling and commitment", donate: "One-time or recurring; no fixed schedule" },
  { aspect: "Distance", volunteer: "Often requires physical presence; some remote roles available", donate: "Can be done from anywhere in the world" },
  { aspect: "Impact on the organisation", volunteer: "Reduces operational costs; adds human capacity", donate: "Funds programmes, salaries, materials, and facilities" },
  { aspect: "Impact on children", volunteer: "Mentorship, tutoring, activities — direct human connection", donate: "Pays for the food, school fees, medicine, and care children need" },
  { aspect: "Safeguarding requirements", volunteer: "Screening, training, and Code of Conduct required before working with children", donate: "No safeguarding screening required" },
  { aspect: "Availability", volunteer: "Limited by the organisation's capacity to manage and supervise volunteers", donate: "Always welcome — organisations can always use funds" },
  { aspect: "Skills needed", volunteer: "Varies by role — some roles require specific professional skills", donate: "None — anyone can give any amount" },
];

export default function VolunteeringVsDonating() {
  return (
    <Layout>
      <Seo
        title="Volunteering vs Donating — Which Makes a Bigger Difference? | HACS Foundation"
        description="Compare volunteering and donating to a children's charity. Understand the different kinds of impact, commitment, and requirements so you can decide which fits your situation best."
        path="/compare/volunteering-vs-donating"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Compare</p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground mb-4 leading-tight">
            Volunteering vs Donating
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Two powerful ways to support children's charities — but they work differently. This guide helps you understand the trade-offs and choose what's right for your situation.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Compare", href: "/site-map" }, { label: "Volunteering vs Donating" }]} />

      {/* Intro */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Short Answer"
            title="Both Are Valuable — for Different Reasons"
            subtitle="The honest answer is that there is no universal 'better' option. The most valuable contribution is the one you can sustain consistently. A reliable monthly donation often does more good than a single, intensive volunteer visit. And a skilled volunteer contributing their professional expertise over a year can provide value that no donation could easily buy."
          />
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-6 bg-accent/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-5 py-4 font-serif font-bold">Aspect</th>
                  <th className="text-left px-5 py-4 font-serif font-bold">Volunteering</th>
                  <th className="text-left px-5 py-4 font-serif font-bold">Donating</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-accent/20"}>
                    <td className="px-5 py-4 font-semibold text-foreground align-top">{row.aspect}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">{row.volunteer}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">{row.donate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to volunteer */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-accent/30 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-foreground text-xl mb-4">Volunteering Is a Good Fit When…</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "You have time you can commit reliably over a sustained period",
                  "You have specific skills the organisation needs (teaching, healthcare, IT, communications)",
                  "You can be physically present in Makurdi, Benue State, Nigeria",
                  "You are willing to complete safeguarding training and background checks",
                  "You want a direct, personal connection with the mission",
                  "Your organisation offers skills volunteering or volunteer days",
                ].map(i => <li key={i} className="flex gap-2"><span className="text-secondary shrink-0">✓</span>{i}</li>)}
              </ul>
            </div>
            <div className="bg-accent/30 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-foreground text-xl mb-4">Donating Is a Good Fit When…</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "You are not able to commit time reliably or are located outside Nigeria",
                  "You want to give immediately without a lengthy onboarding process",
                  "You want to support the organisation's overall capacity, not just one activity",
                  "You prefer a recurring, predictable form of support that staff can plan around",
                  "You want to cover specific programme costs like school fees or medical care",
                  "You are a company looking to make a corporate social responsibility contribution",
                ].map(i => <li key={i} className="flex gap-2"><span className="text-secondary shrink-0">✓</span>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why not both */}
      <section className="py-14 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why Not Both?" title="Combining Volunteering and Giving" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            Many of the most impactful supporters of children's charities do both — they give financially and contribute their time or skills. Even small amounts of each go a long way. A volunteer who also contributes a modest monthly donation is more valuable to the organisation than either alone.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you are considering doing both, start with what is most immediately practical — usually a donation — and then explore volunteering once you have a relationship with the organisation and understand what is needed.
          </p>
        </div>
      </section>

      {/* Important note about volunteering */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Important" title="Volunteering With Children Requires Safeguarding" />
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-800 text-sm leading-relaxed mb-3">
              Any volunteer who works with or around children at HACS Foundation must complete our safeguarding orientation, agree to our Volunteer Code of Conduct, and provide appropriate identity verification.
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              This is non-negotiable. It protects both the children and the volunteers. We do not allow individuals to work with children until this process is complete.
            </p>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Learn more: <Link href="/child-safeguarding" className="text-secondary hover:underline font-medium">Child Safeguarding Policy</Link> · <Link href="/volunteer" className="text-secondary hover:underline font-medium">Volunteer Information</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Ready to Get Involved?</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Whether you give your time or your resources, your support helps children in Makurdi, Nigeria live safer, healthier, and more hopeful lives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Donate Now
          </Link>
          <Link href="/volunteer" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            Volunteer Information
          </Link>
        </div>
      </section>
    </Layout>
  );
}
