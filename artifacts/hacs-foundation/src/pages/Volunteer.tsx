import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const roles = [
  {
    icon: "📚",
    title: "Education Support",
    description: "Support children's learning by assisting with homework, tutoring, and academic mentorship. This role is particularly valued for tutors in sciences, mathematics, and English.",
    commitment: "Flexible — minimum 4 hours per week",
    format: "In-person (Makurdi) or remote tutoring where feasible",
  },
  {
    icon: "🎨",
    title: "Creative & Skills Activities",
    description: "Lead arts, crafts, music, sports, or creative writing sessions for children. Creative activities support cognitive development, emotional expression, and self-confidence.",
    commitment: "Weekend or after-school sessions",
    format: "In-person (Makurdi)",
  },
  {
    icon: "💻",
    title: "Communications & Content",
    description: "Help with social media content, blog writing, newsletter production, photography, or graphic design. These roles can often be completed remotely.",
    commitment: "Flexible, project-based",
    format: "Remote or in-person",
  },
  {
    icon: "📋",
    title: "Administration & Coordination",
    description: "Support our office team with data entry, record management, donor correspondence, event coordination, and general administrative tasks.",
    commitment: "2–3 days per week where possible",
    format: "In-person (Makurdi) preferred",
  },
  {
    icon: "🏥",
    title: "Healthcare & Wellbeing",
    description: "Qualified healthcare professionals — including doctors, nurses, pharmacists, and counsellors — can contribute to our health outreach and child wellbeing programmes.",
    commitment: "Flexible — periodic visits or regular schedule",
    format: "In-person (Makurdi)",
  },
  {
    icon: "🛠️",
    title: "Vocational Training",
    description: "Skilled tradespeople, entrepreneurs, and professionals can deliver practical skills training to older youth in our Skills Acquisition Programme.",
    commitment: "Minimum 3-month commitment, flexible schedule",
    format: "In-person (Makurdi)",
  },
];

const requirements = [
  "Genuine commitment to the wellbeing of children",
  "Completed safeguarding orientation before any work with children",
  "Agreement to the HACS Foundation Volunteer Code of Conduct",
  "Appropriate identity verification (required for all roles)",
  "Respect for children's privacy, dignity, and cultural background",
  "Reliability and clear communication about availability",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Volunteer with HACS Foundation",
  description: "Volunteer opportunities at Hope Alive Children Spring Foundation — education support, creative activities, communications, administration, healthcare, and skills training.",
  url: "https://www.hacsfoundation.com/volunteer",
};

export default function Volunteer() {
  return (
    <Layout>
      <Seo
        title="Volunteer with HACS Foundation | Help Vulnerable Children in Nigeria"
        description="Join the HACS Foundation volunteer team in Makurdi, Nigeria. Opportunities in education support, healthcare, communications, skills training, and administration. Apply today."
        path="/volunteer"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Get Involved</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Volunteer with HACS Foundation
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto">
            Give your time, skills, and care to children who need it most. We welcome volunteers who share our commitment to child welfare, dignity, and genuine impact.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Volunteer" }]} />

      {/* Why volunteer */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Volunteer"
            title="Make a Difference That Lasts"
            subtitle="Volunteers are central to everything we do at HACS Foundation. Whether you contribute hours, skills, or expertise, your presence in a child's life can be genuinely transformative — and the experience of serving alongside us is often just as meaningful for the volunteer."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon: "💛", title: "Real Impact", desc: "Work directly with children and see the difference your contribution makes in their daily lives." },
              { icon: "🌍", title: "Cross-Cultural Connection", desc: "Build relationships across cultures and communities in Makurdi, Benue State, Nigeria." },
              { icon: "📈", title: "Personal Growth", desc: "Develop empathy, skills, and perspective through meaningful work with a dedicated team." },
            ].map((item) => (
              <div key={item.title} className="bg-accent/40 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-serif font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer roles */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Opportunities"
            title="Volunteer Roles"
            subtitle="We offer a range of volunteer roles to match different skills, schedules, and locations. All roles require completion of our safeguarding orientation before work begins."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {roles.map((role) => (
              <div key={role.title} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{role.icon}</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{role.description}</p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-semibold text-foreground">Commitment:</span> <span className="text-muted-foreground">{role.commitment}</span></p>
                  <p><span className="font-semibold text-foreground">Format:</span> <span className="text-muted-foreground">{role.format}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Child Safeguarding"
            title="What We Expect from Volunteers"
            subtitle="Every volunteer who works with or around children at HACS Foundation must meet our safeguarding requirements. This is non-negotiable — it protects both the children and the volunteers."
          />
          <ul className="space-y-3 mt-4">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3">
                <span className="text-secondary font-bold text-lg leading-none mt-0.5">✓</span>
                <span className="text-muted-foreground leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
            Read our full{" "}
            <Link href="/child-safeguarding" className="text-secondary hover:underline font-medium">
              Child Safeguarding Policy
            </Link>{" "}
            before applying.
          </p>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader
            eyebrow="Apply Today"
            title="Ready to Volunteer?"
            subtitle="To express interest in volunteering with HACS Foundation, get in touch with our team. We will discuss your skills, availability, and the safeguarding process."
            centered
            light
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Link href="/contact" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
              Contact Us to Apply
            </Link>
            <Link href="/donate" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
              Donate Instead
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
