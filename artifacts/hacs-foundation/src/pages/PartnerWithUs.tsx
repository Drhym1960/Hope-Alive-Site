import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const partnerTypes = [
  {
    icon: "🏢",
    title: "Corporate Partners",
    description: "Companies of all sizes can support HACS Foundation through programme sponsorship, payroll giving, matched giving, skills volunteering, or in-kind donations. We provide reporting, visibility, and a genuine connection to the impact your organisation creates.",
    examples: ["Programme sponsorship", "Staff volunteering days", "Matched giving schemes", "In-kind goods or services"],
  },
  {
    icon: "🏫",
    title: "Schools & Universities",
    description: "Educational institutions can partner with us through student fundraising, school supplies drives, educational exchanges, or curriculum-linked charity projects. Partnerships with schools often align naturally with our education mission.",
    examples: ["School supplies drives", "Student fundraising events", "Awareness campaigns", "Educational project partnerships"],
  },
  {
    icon: "⛪",
    title: "Faith Communities",
    description: "Churches, mosques, and other faith communities have a long history of supporting charitable work. We welcome partnerships with faith organisations that share our values of compassion, service, and care for the vulnerable.",
    examples: ["Regular giving campaigns", "Community fundraisers", "Volunteer mobilisation", "Awareness and advocacy"],
  },
  {
    icon: "🤝",
    title: "NGO & Civil Society Partners",
    description: "We are open to partnerships with other NGOs, civil society organisations, and government agencies where our work is complementary. Referral partnerships, resource sharing, and joint programmes are all possibilities.",
    examples: ["Referral partnerships", "Joint programmes", "Resource sharing", "Advocacy collaboration"],
  },
  {
    icon: "🌐",
    title: "Diaspora Organisations",
    description: "Nigerian diaspora groups and individuals based outside Nigeria play an important role in supporting communities back home. We welcome partnerships with diaspora organisations who want to direct support to children in Benue State.",
    examples: ["Diaspora fundraising", "Skill and knowledge transfers", "Supply chain partnerships", "Awareness in diaspora communities"],
  },
  {
    icon: "📱",
    title: "Media & Communications",
    description: "Media organisations, journalists, and content creators who cover social issues, children's welfare, or Nigeria can help amplify the stories of impact and need that inspire others to act.",
    examples: ["Editorial coverage", "Documentary partnerships", "Social media collaboration", "Awareness campaigns"],
  },
];

const steps = [
  { n: "01", title: "Get in Touch", desc: "Contact us with a brief description of your organisation and the kind of partnership you have in mind." },
  { n: "02", title: "Discovery Conversation", desc: "We will arrange a conversation to understand your goals and explain how our programmes work. No commitment is required at this stage." },
  { n: "03", title: "Agree on Terms", desc: "We agree a partnership framework that sets out contributions, reporting, and how the partnership will be acknowledged." },
  { n: "04", title: "Begin Working Together", desc: "We begin the partnership and provide regular updates on the impact of the collaboration." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Partner with HACS Foundation",
  description: "Partnership opportunities with Hope Alive Children Spring Foundation — corporate, school, faith community, NGO, and diaspora partnerships supporting vulnerable children in Nigeria.",
  url: "https://www.hacsfoundation.com/partner-with-us",
};

export default function PartnerWithUs() {
  return (
    <Layout>
      <Seo
        title="Partner with HACS Foundation | Corporate & Community Partnerships"
        description="Partner with Hope Alive Children Spring Foundation to support vulnerable children in Nigeria. We welcome corporate, school, faith, NGO, and diaspora partnerships in Makurdi, Benue State."
        path="/partner-with-us"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Partnerships</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Partner with HACS Foundation
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto">
            Join us in building a future for orphaned and vulnerable children in Nigeria. We welcome partnerships with organisations that share our commitment to child welfare, dignity, and lasting change.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Partner with Us" }]} />

      {/* Intro */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Partner With Us"
            title="More Than a Donation"
            subtitle="A partnership with HACS Foundation is a sustained relationship, not a transaction. We work with partners to align their resources and values with specific programmes that are making a difference for children in Makurdi, Benue State, Nigeria."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-accent/40 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-foreground mb-3">What Partners Gain</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Meaningful social impact aligned with your values", "Regular reporting on how your contribution is used", "Acknowledgement in our communications and reports", "A genuine relationship with a trusted children's foundation", "Access to volunteer and engagement opportunities"].map(i => (
                  <li key={i} className="flex gap-2"><span className="text-secondary">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/40 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-foreground mb-3">What Children Gain</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["School fees, uniforms, textbooks, and materials", "Three nutritious meals per day", "Medical care, including routine and emergency treatment", "A safe, stable home environment", "Skills training and mentorship for older youth"].map(i => (
                  <li key={i} className="flex gap-2"><span className="text-secondary">✓</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership types */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Partnership Types"
            title="How Your Organisation Can Get Involved"
            subtitle="We welcome partnerships from a wide range of organisations. Find the category that best describes your situation."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {partnerTypes.map((type) => (
              <div key={type.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{type.description}</p>
                <ul className="space-y-1">
                  {type.examples.map(ex => (
                    <li key={ex} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-secondary">·</span>{ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Process"
            title="How a Partnership Begins"
            subtitle="Starting a partnership with HACS Foundation is straightforward. We keep the process simple so the focus remains on the children we both want to serve."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="text-3xl font-bold text-secondary/30 font-serif shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-serif font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader
            eyebrow="Start a Conversation"
            title="Let's Talk About Partnership"
            subtitle="Whether you are a company, a school, a faith community, or an individual with a network, we would love to hear from you. Contact us to begin the conversation."
            centered
            light
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Link href="/contact" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
              Contact Us
            </Link>
            <Link href="/transparency" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
              Our Transparency
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
