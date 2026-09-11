import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Local Children's Charity vs International Charity — Which Should You Support?",
  description: "Compare giving to a local Nigerian children's charity versus a large international organisation. Understand accountability, overhead, local knowledge, and community impact.",
  url: "https://www.hacsfoundation.com/compare/local-childrens-charity-vs-international-charity",
};

const rows = [
  { aspect: "Local knowledge", local: "Deep — staff live in and understand the community", intl: "Variable — depends on quality of local partners and field staff" },
  { aspect: "Overhead and admin costs", local: "Generally lower — no international headquarters or complex management layers", intl: "Often higher — large central offices, compliance, international logistics" },
  { aspect: "Responsiveness", local: "High — can adapt quickly to local needs and conditions", intl: "Lower — decisions may be made far from the communities affected" },
  { aspect: "Community relationships", local: "Embedded — often built over years with local leaders and families", intl: "Varies — may be mediated through local partners" },
  { aspect: "Accountability to local community", local: "Direct — staff live among the people they serve", intl: "Indirect — accountable primarily to donors in other countries" },
  { aspect: "Brand recognition", local: "Lower — limited marketing budgets", intl: "High — significant investment in global brand and fundraising" },
  { aspect: "Scale", local: "Smaller — serves a defined community well", intl: "Larger — operates across many countries and regions" },
  { aspect: "Verification", local: "Requires more due diligence by the donor", intl: "Often regulated in donor's country; easier to verify online" },
];

const localAdvantages = [
  "Funds stay in and circulate within the local economy — staff salaries, suppliers, and services are local",
  "No 'translation layer' between donor intention and programme delivery — accountability is direct",
  "Deep cultural competence means programmes are more likely to be appropriate and effective",
  "Smaller organisations can be more responsive to the specific needs of individual children",
  "Relationships with local government, hospitals, schools, and community leaders are often stronger",
];

const intlConsiderations = [
  "Larger organisations may have more systems for financial oversight and reporting",
  "Well-established international charities are easier to verify from abroad",
  "Some international charities operate excellent local partnerships with genuine community involvement",
  "Larger scale can mean greater advocacy influence at national or international levels",
];

const questions = [
  "Is the organisation formally registered in the country where it operates?",
  "Do staff live and work in the communities they serve?",
  "What percentage of donations reach programme activities versus administration?",
  "How long has the organisation been operating in this specific community?",
  "Can I speak directly with someone who manages the programmes?",
  "Does the organisation have a child protection policy appropriate to the local context?",
];

export default function LocalVsInternational() {
  return (
    <Layout>
      <Seo
        title="Local vs International Children's Charity — Which to Support? | HACS Foundation"
        description="Compare donating to a local Nigerian children's charity like HACS Foundation versus a large international organisation. Understand local knowledge, overhead, accountability, and community impact."
        path="/compare/local-childrens-charity-vs-international-charity"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Compare</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4 leading-tight">
            Local vs International Children's Charities
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Should you donate to a local Nigerian children's charity or a large international organisation? Both have genuine strengths. This guide explains the key differences so you can make an informed choice.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Compare", href: "/site-map" }, { label: "Local vs International" }]} />

      {/* Intro */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Context"
            title="Why This Question Matters"
            subtitle="Many donors outside Nigeria who want to support children there face a real choice: give to a well-known international charity they have heard of, or find and support a local organisation they may know less about. Both are legitimate paths, but they produce different kinds of impact."
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
                  <th className="text-left px-5 py-4 font-serif font-bold">Local Charity (e.g. HACS Foundation)</th>
                  <th className="text-left px-5 py-4 font-serif font-bold">Large International Charity</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-accent/20"}>
                    <td className="px-5 py-4 font-semibold text-foreground align-top">{row.aspect}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">{row.local}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">{row.intl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Local advantages */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Case for Local"
            title="Why Local Organisations Matter"
          />
          <ul className="space-y-3 mt-4">
            {localAdvantages.map(a => (
              <li key={a} className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-0.5 shrink-0">✓</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* International considerations */}
      <section className="py-14 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="International Considerations"
            title="When Large Organisations Can Be a Good Choice"
          />
          <ul className="space-y-3 mt-4">
            {intlConsiderations.map(c => (
              <li key={c} className="flex items-start gap-3">
                <span className="text-muted-foreground font-bold mt-0.5 shrink-0">·</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            The key variable with international charities is the quality of their local engagement. An international organisation with strong, accountable local partnerships can be just as impactful as a local one. Research their local partnerships before giving.
          </p>
        </div>
      </section>

      {/* Due diligence */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Due Diligence"
            title="Questions to Ask Any Organisation"
          />
          <ul className="space-y-3 mt-4">
            {questions.map(q => (
              <li key={q} className="flex gap-3 items-start bg-accent/30 rounded-xl px-5 py-4">
                <span className="text-secondary font-bold shrink-0 mt-0.5">?</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            Read our full due diligence guide: <Link href="/blog/how-to-verify-a-childrens-charity" className="text-secondary hover:underline font-medium">How to Verify a Children's Charity Before Donating</Link>
          </p>
        </div>
      </section>

      {/* HACS context */}
      <section className="py-14 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="About HACS Foundation" title="A Local Organisation with Deep Roots" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hope Alive Children Spring Foundation has been operating in Makurdi, Benue State, Nigeria since 2012. Our staff live and work in the community we serve. Our six programmes — feeding, education, healthcare, shelter, skills training, and psychosocial support — are designed for and delivered within the specific social, cultural, and economic context of Benue State.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We welcome scrutiny from prospective donors. If you want to ask questions before giving, <Link href="/contact" className="text-secondary hover:underline font-medium">contact us</Link>. We are committed to transparency and to earning your trust.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Learn more about our organisation on our <Link href="/about" className="text-secondary hover:underline font-medium">About page</Link> and <Link href="/transparency" className="text-secondary hover:underline font-medium">Transparency page</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Support Children in Benue State, Nigeria</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Your donation to HACS Foundation goes directly to programmes serving orphaned and vulnerable children in Makurdi — delivered by a team embedded in the community since 2012.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Donate to HACS Foundation
          </Link>
          <Link href="/transparency" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            Our Transparency
          </Link>
        </div>
      </section>
    </Layout>
  );
}
