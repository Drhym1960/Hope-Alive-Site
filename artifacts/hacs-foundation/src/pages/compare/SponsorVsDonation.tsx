import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Child Sponsorship vs General Donation — Which Is Better?",
  description: "Compare child sponsorship programmes to general charitable donations. Understand the benefits, limitations, and child protection considerations of each approach.",
  url: "https://www.hacsfoundation.com/compare/sponsor-a-child-vs-general-donation",
};

const rows = [
  { aspect: "Donor connection", sponsor: "Personal: linked to one named child's progress", general: "Collective: contributes to the overall programme" },
  { aspect: "Flexibility for the organisation", sponsor: "Lower: funds tied to one child", general: "Higher: funds directed where most needed" },
  { aspect: "Child privacy", sponsor: "Risk: may require sharing a child's identity, photo, and story", general: "Better: no individual child identified to donor" },
  { aspect: "What happens when child leaves programme", sponsor: "Link ends; donor may need to be re-matched", general: "No disruption; funds continue to support children" },
  { aspect: "Administrative overhead", sponsor: "Higher: matching, updates, correspondence required", general: "Lower: no per-donor correspondence needed" },
  { aspect: "Emotional motivation for donors", sponsor: "High: personal story drives giving", general: "Moderate: requires trust in the organisation" },
  { aspect: "Impact on a single child", sponsor: "Direct and trackable", general: "Shared across many children" },
  { aspect: "Risk of dependency or bias", sponsor: "Possible: some children may receive more support than others", general: "Lower: resources distributed by need" },
];

export default function SponsorVsDonation() {
  return (
    <Layout>
      <Seo
        title="Child Sponsorship vs General Donation — Which Is Better? | HACS Foundation"
        description="Compare child sponsorship to general charitable donations. Understand the benefits, limitations, and child protection considerations to decide how to best support vulnerable children."
        path="/compare/sponsor-a-child-vs-general-donation"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Compare</p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground mb-4 leading-tight">
            Child Sponsorship vs General Donation
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Many donors want to know: should I sponsor a specific child, or make a general donation? Both approaches have real merits and real limitations. This page helps you decide.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Compare", href: "/site-map" }, { label: "Sponsorship vs Donation" }]} />

      {/* Intro */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Two Models"
            title="Understanding Both Approaches"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-blue-900 text-lg mb-3">Child Sponsorship</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                The donor is linked to one named child. They may receive updates, photographs, or letters from or about that child. Their donation is understood as supporting that specific child's needs over time.
              </p>
            </div>
            <div className="bg-card border border-secondary/30 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-primary text-lg mb-3">General Donation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The donor gives to the organisation's general programmes. Funds are allocated by staff to the areas of greatest current need — education, healthcare, feeding, shelter, or psychosocial support.
              </p>
            </div>
          </div>
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
                  <th className="text-left px-5 py-4 font-serif font-bold">Child Sponsorship</th>
                  <th className="text-left px-5 py-4 font-serif font-bold">General Donation</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-accent/20"}>
                    <td className="px-5 py-4 font-semibold text-foreground align-top">{row.aspect}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">{row.sponsor}</td>
                    <td className="px-5 py-4 text-muted-foreground align-top">{row.general}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Child protection note */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Child Protection" title="The Privacy and Dignity Consideration" />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Child sponsorship programmes require sharing information about individual children — their names, photographs, and circumstances — with individual donors. Done responsibly, with the full and informed consent of the child and their guardian, this can be managed safely.
            </p>
            <p>
              However, it also creates real risks. Photographs and personal information once shared cannot be un-shared. Children whose images and stories are linked to poverty or vulnerability may experience stigma in their communities. Some children may not truly understand what they are consenting to.
            </p>
            <p>
              Organisations that take child protection seriously think carefully about these risks before establishing sponsorship programmes. At HACS Foundation, our child protection policy guides all decisions about how children are represented in our communications. Read our{" "}
              <Link href="/child-safeguarding" className="text-secondary hover:underline font-medium">Child Safeguarding Policy</Link>
              {" "}for details.
            </p>
          </div>
        </div>
      </section>

      {/* HACS approach */}
      <section className="py-14 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="HACS Foundation's Approach" title="How We Handle Donations" />
          <p className="text-muted-foreground leading-relaxed mb-5">
            HACS Foundation currently accepts general donations that are directed to our six programmes: feeding, education, healthcare, shelter, skills training, and psychosocial support. This allows us to direct funds where they are most urgently needed and avoids the privacy risks associated with individual sponsorship models.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Donors who wish to direct their gift to a specific programme (such as education or healthcare) are welcome to indicate this preference when donating. We will make every effort to honour programme-specific requests.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about how your donation will be used, <Link href="/contact" className="text-secondary hover:underline font-medium">contact us</Link> — we welcome donor questions.
          </p>
        </div>
      </section>

      {/* Questions to ask */}
      <section className="py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Before You Decide" title="Questions to Ask Any Organisation" />
          <ul className="space-y-3 mt-2">
            {[
              "If this is a sponsorship programme, how is the child's privacy protected?",
              "Is the child's consent (and their guardian's) genuinely informed?",
              "What happens to my donation if the sponsored child leaves the programme?",
              "Can I make a general donation instead if I prefer?",
              "How will I be informed of the impact of my donation?",
            ].map(q => (
              <li key={q} className="flex gap-3 items-start">
                <span className="text-secondary font-bold shrink-0 mt-0.5">?</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Make a Difference Today</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Whether you choose a one-time gift or a recurring donation, your support helps HACS Foundation provide shelter, education, healthcare, and love to children in Makurdi, Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Donate to HACS Foundation
          </Link>
          <Link href="/about" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            About Us
          </Link>
        </div>
      </section>
    </Layout>
  );
}
