import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Education Support for Vulnerable Children — HACS Foundation",
  description: "HACS Foundation's Education Support Programme provides school fees, uniforms, books, and tutoring for orphaned and vulnerable children in Makurdi, Benue State, Nigeria.",
  url: "https://www.hacsfoundation.com/education-support",
};

const components = [
  { icon: "🏫", title: "School Fees & Enrolment", desc: "We pay school fees from nursery through secondary school for all children in our care, removing the financial barrier that keeps many vulnerable children out of school." },
  { icon: "👕", title: "Uniforms & Shoes", desc: "Every child receives the uniforms, shoes, and bags they need to attend school with dignity — removing a common source of stigma and exclusion." },
  { icon: "📚", title: "Books & Materials", desc: "Textbooks, exercise books, stationery, and geometry sets are provided so that no child arrives unprepared to learn." },
  { icon: "🎓", title: "After-School Tutoring", desc: "Children who need extra support receive tutoring in core subjects. This is particularly important for children who have experienced disrupted schooling due to trauma or instability." },
  { icon: "👤", title: "Academic Mentorship", desc: "Older students and community members invest time in younger children's development, providing guidance, encouragement, and a model of what is possible with education." },
  { icon: "🎓", title: "University & Vocational Scholarships", desc: "Qualifying older youth who complete secondary education are supported to access university or vocational training, giving them the foundation for long-term economic independence." },
];

const barriers = [
  { title: "Cost", desc: "School fees, uniforms, and supplies represent a significant expense for families in poverty. Many children are kept at home because their caregivers cannot afford these costs." },
  { title: "Instability & Trauma", desc: "Children who have experienced loss, displacement, or abuse often struggle to attend school consistently. Without stable support, even enrolled children may fall behind or drop out." },
  { title: "Hunger", desc: "A child who arrives at school without having eaten cannot concentrate or learn effectively. Education support works best alongside adequate nutrition." },
  { title: "Social Exclusion", desc: "Orphaned and vulnerable children can face stigma in school settings. Mentorship and psychosocial support help children build confidence and peer relationships." },
];

export default function EducationSupport() {
  return (
    <Layout>
      <Seo
        title="Education Support for Vulnerable Children | Hope Alive Children Spring Foundation"
        description="HACS Foundation provides school fees, uniforms, textbooks, tutoring, and scholarships for orphaned and vulnerable children in Makurdi, Benue State, Nigeria. Education changes lives."
        path="/education-support"
        schema={schema}
      />

      {/* Hero */}
      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Education Programme</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Education Support for Vulnerable Children
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mx-auto">
            Education is the most powerful tool a child has to change their future. HACS Foundation ensures that no child in our care is denied access to learning because of the circumstances of their birth.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Education Support" }]} />

      {/* Why it matters */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why It Matters"
            title="Education as Protection and Opportunity"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              For a child growing up without parental support or in poverty, access to education is rarely guaranteed. School fees, uniforms, textbooks, and simply having a stable enough home to attend regularly can all become obstacles that others take for granted.
            </p>
            <p>
              When those obstacles are removed, something remarkable happens. Children discover capability they did not know they had. They form relationships that provide stability and belonging. They begin to see a future for themselves — one they are actively building, day by day, lesson by lesson.
            </p>
            <p>
              Education is also protective. Children who are in school are less exposed to the risks of street life, child labour, and exploitation. A school day provides structure, access to trusted adults, and the social foundations that support healthy development.
            </p>
          </div>
        </div>
      </section>

      {/* Barriers */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Challenge"
            title="Barriers Vulnerable Children Face"
            subtitle="Understanding the specific obstacles that prevent vulnerable children from accessing education helps explain why targeted, comprehensive support is necessary."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            {barriers.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme components */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Approach"
            title="What Our Education Support Includes"
            subtitle="HACS Foundation's Education Support Programme addresses each of the major barriers to education with direct, practical interventions."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {components.map((c) => (
              <div key={c.title} className="bg-accent/30 border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-term impact */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Long-Term Impact"
            title="Education Changes More Than One Life"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The benefits of education for vulnerable children extend well beyond their individual futures. A child who completes their schooling and enters employment is better positioned to support their own family, their community, and the next generation of children who will need the same opportunities.
            </p>
            <p>
              This is the multiplier effect that makes education one of the highest-impact areas of charitable intervention. The change that begins with a set of textbooks and a school uniform can reach across decades and generations.
            </p>
          </div>
          <div className="mt-8 p-6 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground text-sm italic leading-relaxed">
              "Education is the most powerful tool we can give a child to change their story."
            </p>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-5">Learn More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Scholarship Beneficiaries 2026/2027", href: "/scholarship-beneficiaries" },
              { title: "Why Education Support Matters (Blog)", href: "/blog/why-education-support-matters" },
              { title: "How to Organise a School Supplies Drive", href: "/blog/how-to-organise-a-school-supplies-drive" },
              { title: "All Our Programmes", href: "/programs" },
              { title: "Support Vulnerable Children", href: "/orphans-and-vulnerable-children" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block bg-accent/30 rounded-xl p-4 hover:bg-accent/50 transition-colors group">
                <span className="font-medium text-foreground group-hover:text-secondary transition-colors text-sm">{l.title} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-4">Support a Child's Education</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Your donation helps HACS Foundation provide school fees, uniforms, books, and tutoring for orphaned and vulnerable children in Makurdi, Benue State, Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Donate Now
          </Link>
          <Link href="/programs" className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold hover:border-primary-foreground transition-all">
            All Programmes
          </Link>
        </div>
      </section>
    </Layout>
  );
}
