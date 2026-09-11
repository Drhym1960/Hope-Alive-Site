import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Supporting Street Children and At-Risk Youth — HACS Foundation",
  description: "Hope Alive Children Spring Foundation works with street children and at-risk youth in Makurdi, Nigeria — providing support, education, and safe pathways through verified, dignified programmes.",
  url: "https://www.hacsfoundation.com/street-children-support",
};

const approaches = [
  {
    icon: "🏠",
    title: "Safe Accommodation",
    desc: "For children in immediate need of a safe place, HACS Foundation provides residential care in a stable, nurturing home environment in Makurdi, Benue State.",
  },
  {
    icon: "📚",
    title: "Education Re-entry",
    desc: "Children who have missed schooling receive support to return to education — including catch-up tutoring, school fees, and materials — so that disrupted schooling does not become a permanent barrier.",
  },
  {
    icon: "🍽️",
    title: "Nutritional Support",
    desc: "Regular, nutritious meals are provided to children in our care. Hunger is one of the most immediate threats to a child's health and their ability to engage in school or other activities.",
  },
  {
    icon: "💚",
    title: "Trauma-Informed Care",
    desc: "Many at-risk youth have experienced loss, abuse, or instability. Our psychosocial support programme provides counselling and a safe space to process difficult experiences.",
  },
  {
    icon: "🛠️",
    title: "Skills for Independence",
    desc: "Older youth who are not in school receive vocational training in practical trades, equipping them for economic independence and reducing their vulnerability to exploitation.",
  },
  {
    icon: "🤝",
    title: "Community Integration",
    desc: "We work to reconnect children with their families and communities wherever it is safe and appropriate to do so, because community belonging is essential for long-term wellbeing.",
  },
];

const respectPrinciples = [
  "Every child's story is treated with confidentiality and care",
  "No identifiable information or photographs of individual children are shared publicly",
  "Children are not represented in ways that exploit their suffering or invite voyeurism",
  "Our communications describe the situation and the response — not the identities of the children involved",
  "Children are treated as individuals with agency, not as objects of charity",
];

export default function StreetChildrenSupport() {
  return (
    <Layout>
      <Seo
        title="Supporting Street Children and At-Risk Youth | Hope Alive Children Spring Foundation"
        description="HACS Foundation provides safe, dignified support to street children and at-risk youth in Makurdi, Nigeria — shelter, education, nutrition, skills training, and trauma-informed care."
        path="/street-children-support"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">At-Risk Youth</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Supporting Street Children and At-Risk Youth
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mx-auto">
            Street children and at-risk youth are among the most visible yet most misunderstood young people in many communities. HACS Foundation provides safe, dignified, evidence-informed support for children who need it most in Makurdi, Benue State, Nigeria.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Street Children Support" }]} />

      {/* Understanding */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Understanding the Situation"
            title="Who Are Street Children and At-Risk Youth?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The term "street children" covers a range of situations. Some young people live primarily on the street because they have no alternative. Others spend significant time on the street to work, but maintain some connection to a home or family. Still others are at risk of street life — they have a home, but their circumstances are fragile enough that a crisis could push them into homelessness.
            </p>
            <p>
              Understanding this range is important because different young people need different kinds of support. Not every child on the street is an orphan. Not every at-risk child is homeless. Effective support begins with listening, understanding, and responding to the specific situation of each young person — not applying a one-size-fits-all solution.
            </p>
            <p>
              In Benue State, Nigeria, the causes of street life and heightened vulnerability among young people include loss of one or both parents, family poverty, displacement, domestic violence, and lack of access to education or employment. HACS Foundation responds to these realities with practical, sustained programmes.
            </p>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Help"
            title="Our Approach to Supporting At-Risk Youth"
            subtitle="HACS Foundation's support for street children and at-risk youth is integrated across our six programmes, addressing immediate needs and long-term wellbeing together."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {approaches.map((a) => (
              <div key={a.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dignity and privacy */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Child Dignity"
            title="Respect, Privacy, and Dignity"
            subtitle="Our work with street children and at-risk youth is governed by a strict commitment to the privacy and dignity of every young person we serve."
          />
          <ul className="space-y-3 mt-4">
            {respectPrinciples.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-0.5">✓</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
            Read our full{" "}
            <Link href="/child-safeguarding" className="text-secondary hover:underline font-medium">
              Child Safeguarding Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* What helps / what doesn't */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Responsible Engagement"
            title="What Helps — and What Doesn't"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            <div className="bg-card border border-secondary/30 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-primary mb-3">What Genuinely Helps</h3>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  "Donating to verified organisations with child protection policies",
                  "Supporting education access and vocational training",
                  "Providing unrestricted funds that can meet immediate needs",
                  "Long-term, sustained engagement rather than one-off gifts",
                  "Volunteering skills through verified organisations",
                  "Raising awareness responsibly, without sharing children's identities",
                ].map(i => <li key={i} className="flex gap-2"><span>✓</span>{i}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-red-900 mb-3">What Can Cause Harm</h3>
              <ul className="space-y-2 text-sm text-red-800">
                {[
                  "Giving cash directly to children on the street",
                  "Visiting children's homes as a tourist activity",
                  "Photographing children without consent",
                  "Short-term 'rescue' approaches without follow-up",
                  "Donating through unverified crowdfunding campaigns",
                  "Making promises of ongoing contact you cannot sustain",
                ].map(i => <li key={i} className="flex gap-2"><span>✗</span>{i}</li>)}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Read our blog article:{" "}
            <Link href="/blog/best-ways-to-support-street-children" className="text-secondary hover:underline font-medium">
              Responsible Ways to Support Street Children and At-Risk Youth
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Support At-Risk Youth in Nigeria</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Your donation to HACS Foundation helps at-risk and street-involved children access the safety, education, and care they need to build a stable future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Donate Now
          </Link>
          <Link href="/volunteer" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            Volunteer
          </Link>
        </div>
      </section>
    </Layout>
  );
}
