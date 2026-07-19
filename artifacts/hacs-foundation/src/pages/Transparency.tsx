import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Transparency and Accountability — HACS Foundation",
  description: "Verified organisational information, governance, and accountability information for Hope Alive Children Spring Foundation.",
  url: "https://www.hacsfoundation.com/transparency",
};

const programmes = [
  { name: "Daily Feeding Programme", desc: "Ensures children receive nutritious meals every day." },
  { name: "Education Support Programme", desc: "Covers school fees, uniforms, books, and tutoring." },
  { name: "Healthcare Programme", desc: "Provides routine and emergency medical care." },
  { name: "Shelter & Housing Programme", desc: "Maintains safe, stable accommodation for resident children." },
  { name: "Skills Acquisition Programme", desc: "Vocational training and entrepreneurship for older youth." },
  { name: "Psychosocial Support Programme", desc: "Counselling, trauma care, and life-skills development." },
];

export default function Transparency() {
  return (
    <Layout>
      <Seo
        title="Transparency & Accountability | Hope Alive Children Spring Foundation"
        description="Verified organisational information, governance, and accountability for Hope Alive Children Spring Foundation — a registered Nigerian NGO serving orphaned children in Makurdi, Benue State."
        path="/transparency"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Accountability</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Transparency & Accountability
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto">
            We believe that donors, volunteers, and the communities we serve deserve honest, clear information about who we are, how we work, and how we use the resources entrusted to us.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Transparency" }]} />

      {/* Organisation information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Verified Information"
            title="About Our Organisation"
            subtitle="The following information is verified and accurate to the best of our knowledge. Where information is pending or subject to update, we have noted this clearly."
          />

          <div className="space-y-6 mt-6">
            <div className="bg-accent/40 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-xl text-foreground mb-4">Legal Identity</h2>
              <dl className="space-y-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Full legal name</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">Hope Alive Children Spring Foundation</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Common name</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">HACS Foundation</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Type</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">Registered charitable foundation, Nigeria</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Founded</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">2012</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Registration body</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">Corporate Affairs Commission (CAC), Nigeria</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Registration number</dt>
                  <dd className="sm:col-span-2 text-muted-foreground italic text-muted-foreground/70">
                    [TODO: Registration number to be added by the Foundation — please contact us to request verification documents]
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-accent/40 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-xl text-foreground mb-4">Contact & Location</h2>
              <dl className="space-y-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Physical address</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">Office No 5, Udoo Plaza, Opp NKST Church, Ama Terwase Agbadu Road, Makurdi, Benue State, Nigeria</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Phone</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">
                    <a href="tel:08036238076" className="text-secondary hover:underline">08036238076</a>
                    {" / "}
                    <a href="tel:09016662836" className="text-secondary hover:underline">09016662836</a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Email</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">
                    <a href="mailto:hacsfoundation10@gmail.com" className="text-secondary hover:underline">hacsfoundation10@gmail.com</a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="font-semibold text-foreground">Website</dt>
                  <dd className="sm:col-span-2 text-muted-foreground">https://www.hacsfoundation.com</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Programmes"
            subtitle="HACS Foundation operates six programmes for orphaned and vulnerable children in Makurdi, Benue State."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {programmes.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-serif font-bold text-foreground mb-1">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Full programme descriptions: <Link href="/programs" className="text-secondary hover:underline">Our Programmes</Link>
          </p>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Accountability"
            title="Reporting & Financial Information"
            subtitle="We are committed to honest reporting on how donations are used and the outcomes our programmes achieve."
          />
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-6">
            <h3 className="font-serif font-bold text-amber-900 mb-2">Annual Reports — Coming Soon</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              We are working to publish annual reports that provide a full account of our activities, beneficiaries, and finances. This page will be updated with downloadable reports as they are completed.
            </p>
            <p className="text-amber-700 text-sm mt-3">
              In the meantime, prospective donors and partners are welcome to <Link href="/contact" className="font-semibold underline">contact us directly</Link> to request information about our programmes and finances.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-accent/40 rounded-xl p-5">
              <h3 className="font-serif font-bold text-foreground mb-2">How Donations Are Used</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Donations to HACS Foundation support our six programmes directly: feeding, education, healthcare, shelter, skills training, and psychosocial support. We maintain operational transparency and welcome questions from donors about how their contributions are allocated.
              </p>
            </div>
            <div className="bg-accent/40 rounded-xl p-5">
              <h3 className="font-serif font-bold text-foreground mb-2">Banking Information</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Donations by bank transfer can be made to:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><span className="font-semibold text-foreground">Bank:</span> Zenith Bank</li>
                <li><span className="font-semibold text-foreground">Naira account:</span> 1224366497 — Hope Alive Children Spring Foundation</li>
                <li><span className="font-semibold text-foreground">Dollar account:</span> 5074649270 — Hope Alive Children Spring Foundation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Governance"
            title="How We Are Governed"
          />
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-800 text-sm leading-relaxed">
              <span className="font-semibold text-amber-900">Note to the Foundation team:</span> This section should include details of the governing board, governance structure, and meeting schedule once verified. Please update this page with accurate governance information before publishing.
            </p>
          </div>
          <div className="mt-6 bg-white rounded-xl border border-border p-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              HACS Foundation is governed by a board of trustees in accordance with our founding documents and the requirements of Nigerian charity law. Our governance structures ensure that funds are managed responsibly and that the organisation's activities remain aligned with our mission of serving orphaned and vulnerable children.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">
              For governance enquiries, please <Link href="/contact" className="text-secondary hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Policies" title="Key Policies" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Child Safeguarding Policy", href: "/child-safeguarding", desc: "How we protect children in our care from harm, abuse, and exploitation." },
              { title: "Privacy Policy", href: "/privacy", desc: "How we collect, use, and protect personal information from visitors and donors." },
              { title: "Terms of Use", href: "/terms", desc: "Terms governing use of the HACS Foundation website." },
              { title: "Volunteering Code of Conduct", href: "/volunteer", desc: "Standards expected of all volunteers working with or around children." },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="block bg-accent/40 rounded-xl p-5 hover:bg-accent/60 transition-colors group">
                <h3 className="font-serif font-bold text-foreground group-hover:text-secondary transition-colors mb-1">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Questions or Requests?</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          We welcome any questions about our organisation, our governance, or how your donation is used. Please get in touch and we will respond as promptly as possible.
        </p>
        <Link href="/contact" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
          Contact Us
        </Link>
      </section>
    </Layout>
  );
}
