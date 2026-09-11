import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Child Safeguarding Policy — HACS Foundation",
  description: "Hope Alive Children Spring Foundation's child safeguarding policy: protecting child dignity, privacy, volunteer conduct, and reporting mechanisms.",
  url: "https://www.hacsfoundation.com/child-safeguarding",
};

const principles = [
  { icon: "👤", title: "Dignity First", desc: "Every child is treated with full respect for their dignity, individuality, and cultural background — in all circumstances and without exception." },
  { icon: "🔒", title: "Privacy & Confidentiality", desc: "Children's personal information, stories, and circumstances are held in confidence and are not shared without appropriate consent or legal necessity." },
  { icon: "📷", title: "Photography Consent", desc: "Photographs of children are only taken and used with the informed consent of the child (where they are of sufficient age and maturity) and/or their legal guardian." },
  { icon: "🛡️", title: "Protection from Harm", desc: "We are committed to protecting every child in our care or our presence from physical, emotional, sexual, and psychological harm." },
  { icon: "👁️", title: "Staff Accountability", desc: "All staff and volunteers are screened, trained, and held accountable for maintaining the highest standards of conduct around children." },
  { icon: "📢", title: "Safe Reporting", desc: "Children and adults have access to clear, safe mechanisms for reporting concerns — and all reports are taken seriously and acted upon." },
];

const conductRules = [
  "Treat every child with respect, patience, and kindness at all times",
  "Never be alone with a child out of sight of other adults",
  "Never use physical punishment, intimidation, or humiliation as a means of discipline",
  "Never engage in or tolerate discriminatory, offensive, or inappropriate language",
  "Never photograph children without explicit authorisation from the Foundation",
  "Never share children's personal information on social media or with third parties",
  "Never develop inappropriate relationships with children outside of sanctioned programme activities",
  "Report any concern, suspicion, or allegation involving child welfare immediately to the designated safeguarding contact",
];

export default function ChildSafeguarding() {
  return (
    <Layout>
      <Seo
        title="Child Safeguarding Policy | Hope Alive Children Spring Foundation"
        description="HACS Foundation's child safeguarding policy covers child dignity, privacy, photography consent, volunteer conduct, and how to report concerns about a child's welfare."
        path="/child-safeguarding"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Safeguarding</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Child Safeguarding Policy
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mx-auto">
            Protecting every child in our care is our highest priority. This policy sets out our commitment and the standards we expect from everyone associated with HACS Foundation.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Child Safeguarding" }]} />

      {/* Owner review notice */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-800 text-sm leading-relaxed">
            <span className="font-bold text-amber-900">⚠️ Owner Review Required:</span> This document reflects good practice principles and should be reviewed by the Foundation's leadership before it is treated as an approved, binding policy. Where specific names, contacts, or procedures are indicated by placeholders, these must be filled in with accurate information.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Commitment"
            title="Why Safeguarding Matters"
            subtitle="Many of the children in our care have experienced loss, trauma, neglect, or abuse. They are among the most vulnerable members of our community. We have an absolute obligation to ensure that our foundation is a safe place — not only in our intention, but in our practice."
          />
          <p className="text-muted-foreground leading-relaxed">
            This policy applies to all staff, volunteers, contractors, donors, visitors, and any other person who comes into contact with children through HACS Foundation's programmes or premises. It is not optional. Adherence to this policy is a condition of working with or visiting HACS Foundation.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Core Principles"
            title="What We Stand For"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {principles.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-serif font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Privacy" title="Photography and Media" />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Children in HACS Foundation's care have the right to control how their image is used. We take this seriously. The following rules apply to all photographs, videos, and media involving children associated with our programmes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>No photograph of a child may be taken on Foundation premises or at Foundation activities without the explicit authorisation of Foundation staff.</li>
              <li>Photographs of children are not shared on social media or in public communications without appropriate consent from the child (where of sufficient age) and/or their legal guardian.</li>
              <li>Photographs used in our communications should portray children with dignity — not in ways that invite pity, exploit their vulnerability, or misrepresent their circumstances.</li>
              <li>Staff and volunteers must seek permission from their supervisor before taking any photograph involving children.</li>
              <li>Visitors, donors, and volunteers who wish to take photographs must request explicit permission in advance. This permission may be declined and must be respected.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conduct rules */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Standards of Conduct"
            title="Rules for All Staff, Volunteers, and Visitors"
            subtitle="The following rules are mandatory for all individuals who come into contact with children through HACS Foundation."
          />
          <ul className="space-y-3 mt-4">
            {conductRules.map((rule) => (
              <li key={rule} className="flex items-start gap-3 bg-card rounded-xl px-5 py-4 border border-border">
                <span className="text-secondary font-bold mt-0.5">✓</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reporting Concerns"
            title="How to Report a Safeguarding Concern"
            subtitle="If you have a concern about the welfare of a child associated with HACS Foundation, you are obligated to report it. There is no penalty for raising a concern in good faith."
          />
          <div className="space-y-4">
            <div className="bg-accent/40 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-foreground mb-3">Designated Safeguarding Contact</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                All safeguarding concerns should be reported to the Foundation's designated safeguarding contact. Contact details:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li><span className="font-semibold text-foreground">Contact name:</span> <span className="italic">[TODO: Designated safeguarding contact name to be added by the Foundation]</span></li>
                <li><span className="font-semibold text-foreground">Phone:</span> <a href="tel:08036238076" className="text-secondary hover:underline">08036238076</a> / <a href="tel:09016662836" className="text-secondary hover:underline">09016662836</a></li>
                <li><span className="font-semibold text-foreground">Email:</span> <a href="mailto:hacsfoundation10@gmail.com" className="text-secondary hover:underline">hacsfoundation10@gmail.com</a></li>
              </ul>
            </div>
            <div className="bg-accent/40 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-foreground mb-3">How Reports Are Handled</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All concerns are treated with seriousness and confidentiality. The safeguarding contact will acknowledge receipt of any concern and communicate the next steps. Where a report involves a criminal matter or immediate risk to a child, the appropriate Nigerian authorities will be notified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Committed to Every Child's Safety</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          If you have questions about our safeguarding practices, or would like to report a concern, please contact us immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Contact Us
          </Link>
          <Link href="/volunteer" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            Volunteer Information
          </Link>
        </div>
      </section>
    </Layout>
  );
}
