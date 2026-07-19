import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "HACS Foundation vs Crowdfunding — Supporting Children Responsibly",
  description: "Compare donating to HACS Foundation against crowdfunding campaigns for children. Understand the differences in accountability, oversight, and child protection.",
  url: "https://www.hacsfoundation.com/compare/hacs-foundation-vs-crowdfunding",
};

const rows = [
  { aspect: "Formal registration", hacs: "Registered with Corporate Affairs Commission (CAC), Nigeria", crowd: "Varies — most campaigns are not run by registered charities" },
  { aspect: "Child protection policy", hacs: "Formal written policy; safeguarding training for all staff and volunteers", crowd: "No requirement; entirely dependent on individual campaign organiser" },
  { aspect: "Financial oversight", hacs: "Accountable governance structure; donors can request information", crowd: "Minimal to none; platform takes a fee but does not verify fund use" },
  { aspect: "Programme continuity", hacs: "Sustained, multi-year programmes addressing education, health, nutrition, shelter", crowd: "One-off campaigns; typically no follow-up reporting on outcomes" },
  { aspect: "Accountability for funds", hacs: "Committed to transparent reporting; direct contact available", crowd: "No legal obligation to report on how funds were used" },
  { aspect: "Privacy for children", hacs: "Strict policy on photographs and personal information", crowd: "Photographs and personal stories often used without appropriate consent" },
  { aspect: "Tax receipts", hacs: "Contact us for documentation appropriate to your jurisdiction", crowd: "Not usually available; donations are typically personal, not charitable" },
  { aspect: "Track record", hacs: "Operating since 2012 in Makurdi, Benue State, Nigeria", crowd: "No verifiable track record; each campaign is independent" },
];

const donorQuestions = [
  "Is this organisation formally registered with a government authority?",
  "Does it have a child protection or safeguarding policy?",
  "How will my donation be used and how will I be informed of the outcome?",
  "Who is accountable if the money is misused?",
  "Has this organisation been operating reliably over time?",
  "Can I contact someone directly to ask questions?",
];

export default function HacsVsCrowdfunding() {
  return (
    <Layout>
      <Seo
        title="HACS Foundation vs Crowdfunding | Supporting Children Responsibly"
        description="Compare donating to HACS Foundation against crowdfunding campaigns for children. Understand accountability, child protection, financial oversight, and why registered charities matter."
        path="/compare/hacs-foundation-vs-crowdfunding"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Compare</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4 leading-tight">
            HACS Foundation vs Crowdfunding Campaigns
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Understanding the difference between donating to a registered foundation and contributing to a crowdfunding campaign helps you give safely and effectively.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Compare", href: "/site-map" }, { label: "HACS Foundation vs Crowdfunding" }]} />

      {/* Intro */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Choice"
            title="Two Ways to Support Children — Very Different Outcomes"
            subtitle="Online crowdfunding campaigns for individual children are increasingly common. They appear accessible and personal. But they carry significant risks that registered charities do not. This page explains those differences so you can give with confidence."
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
                  <th className="text-left px-5 py-4 font-serif font-bold">HACS Foundation</th>
                  <th className="text-left px-5 py-4 font-serif font-bold">Crowdfunding Campaigns</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-white" : "bg-accent/20"}>
                    <td className="px-5 py-4 font-semibold text-foreground align-top">{row.aspect}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">
                      <span className="flex gap-2"><span className="text-green-600 font-bold shrink-0">✓</span>{row.hacs}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground align-top">
                      <span className="flex gap-2"><span className="text-amber-500 font-bold shrink-0">!</span>{row.crowd}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Crowdfunding risks */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Understanding Risk"
            title="The Risks of Crowdfunding for Children"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Crowdfunding platforms are useful tools for many purposes. But when used for charitable giving — especially for children — there are specific risks that donors should understand.
            </p>
            <p>
              <strong className="text-foreground">Fraud risk:</strong> Crowdfunding campaigns for individual children can be created by anyone. Platforms have limited capacity to verify that the child exists, that the situation is as described, or that funds will be used as promised.
            </p>
            <p>
              <strong className="text-foreground">Child privacy risk:</strong> Many crowdfunding campaigns for children share personal photographs, detailed family circumstances, medical information, and other identifying details that the child has not consented to share — and that can follow them online for years.
            </p>
            <p>
              <strong className="text-foreground">No child protection:</strong> Crowdfunding campaigns are not subject to child safeguarding requirements. There is no requirement for the organiser to have a child protection policy or to have undergone any form of safeguarding training.
            </p>
            <p>
              <strong className="text-foreground">No accountability for outcomes:</strong> Once funds are transferred through a crowdfunding platform, there is typically no legal obligation to report on how the money was spent or what outcomes were achieved.
            </p>
          </div>
        </div>
      </section>

      {/* Questions to ask */}
      <section className="py-14 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Before You Give"
            title="Questions Every Donor Should Ask"
          />
          <ul className="space-y-3 mt-4">
            {donorQuestions.map((q) => (
              <li key={q} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-border">
                <span className="text-secondary font-bold mt-0.5 shrink-0">?</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            For a full checklist, read:{" "}
            <Link href="/blog/how-to-verify-a-childrens-charity" className="text-secondary hover:underline font-medium">
              How to Verify a Children's Charity Before Donating
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Give With Confidence</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          HACS Foundation is a registered Nigerian NGO with a clear child protection policy, transparent governance, and a track record of serving children in Makurdi since 2012. Donate with confidence.
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
