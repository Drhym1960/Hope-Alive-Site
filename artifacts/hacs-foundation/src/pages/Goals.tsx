import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";

const goals = [
  {
    number: "01",
    title: "Provide Safe Shelter",
    desc: "To establish and maintain safe, clean, and nurturing homes for orphaned and vulnerable children where they are protected from harm and feel truly at home.",
  },
  {
    number: "02",
    title: "Ensure Quality Education",
    desc: "To enroll every child in our care in quality educational institutions and provide academic support, materials, uniforms, and mentorship needed to succeed in school and beyond.",
  },
  {
    number: "03",
    title: "Deliver Comprehensive Healthcare",
    desc: "To provide regular medical examinations, vaccinations, emergency treatment, mental health support, and nutritional care to ensure every child is physically and emotionally healthy.",
  },
  {
    number: "04",
    title: "Feed and Nourish Children",
    desc: "To ensure every child receives three nutritious meals daily, eradicating hunger and malnutrition among the children in our care and the broader community we serve.",
  },
  {
    number: "05",
    title: "Empower Youth with Skills",
    desc: "To offer vocational training and skills acquisition programs that equip older children and youth with practical tools to build sustainable livelihoods and independence.",
  },
  {
    number: "06",
    title: "Strengthen Community Partnerships",
    desc: "To work collaboratively with churches, government agencies, NGOs, and community leaders to build a supportive ecosystem that protects children and upholds their rights.",
  },
  {
    number: "07",
    title: "Reunify Families Where Possible",
    desc: "To actively pursue safe family reunification for children where suitable family members can provide stable, loving homes, reconnecting children to their roots and heritage.",
  },
  {
    number: "08",
    title: "Advocate for Children's Rights",
    desc: "To amplify the voices of vulnerable children through advocacy, public awareness, and policy engagement, ensuring their rights are protected by law and respected in practice.",
  },
  {
    number: "09",
    title: "Expand Geographic Reach",
    desc: "To grow our programs and presence beyond Makurdi to serve more vulnerable children across Benue State and other communities in need across Nigeria.",
  },
  {
    number: "10",
    title: "Build a Sustainable Organisation",
    desc: "To develop the financial, human, and institutional capacity of the foundation to ensure our programs are sustainable, impactful, and growing for generations to come.",
  },
];

export default function Goals() {
  return (
    <Layout>
      <Seo
        title="Goals & Objectives — Building a Future for Nigeria's Children"
        description="Explore the 10 strategic goals of Hope Alive Children Spring Foundation: providing shelter, education, healthcare, nutrition, skills training, and advocacy for orphaned and vulnerable children in Benue State, Nigeria."
        path="/goals"
        keywords="HACS Foundation goals, Hope Alive Children Spring Foundation objectives, child welfare goals Nigeria, orphan support objectives Benue State, education shelter healthcare children Nigeria, NGO strategic goals Nigeria"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://www.hacsfoundation.com/goals",
          "name": "Goals & Objectives | Hope Alive Children Spring Foundation",
          "description": "The strategic goals guiding HACS Foundation as we care for and empower orphaned and vulnerable children in Benue State, Nigeria.",
          "isPartOf": { "@id": "https://www.hacsfoundation.com/#website" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hacsfoundation.com/" },
              { "@type": "ListItem", "position": 2, "name": "Goals & Objectives", "item": "https://www.hacsfoundation.com/goals" }
            ]
          }
        }}
      />
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Our Direction</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">Goals & Objectives</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              These are the specific outcomes we pursue every day: the concrete commitments that give shape to our mission and direction to our work.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="What We Are Working Toward"
              title="Our Strategic Goals"
              subtitle="Every goal below is not aspirational language. It is an active commitment backed by programs, staff, partnerships, and your generous support."
              centered
            />
            <div className="space-y-4">
              {goals.map((goal, i) => (
                <div key={goal.number} className={`rounded-2xl p-8 border flex gap-6 items-start ${i % 2 === 0 ? "bg-card border-border" : "bg-accent border-border"}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-serif text-sm">
                    {goal.number}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{goal.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{goal.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 hero-gradient text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">Help Us Achieve These Goals</h2>
            <p className="text-primary-foreground/80 mb-8">
              Your donation directly funds these objectives, from feeding a child today to building the infrastructure that serves children for decades.
            </p>
            <Link href="/donate" className="inline-block px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold hover:bg-secondary/90 transition-colors">
              Donate Now
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
