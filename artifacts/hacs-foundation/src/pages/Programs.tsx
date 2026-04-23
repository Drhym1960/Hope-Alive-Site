import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";

const programs = [
  {
    title: "Daily Feeding Program",
    icon: "🍽️",
    description: "Hunger is the most immediate threat facing many of the children we serve. Our Daily Feeding Program ensures that every child under our care receives three balanced, nutritious meals every day: breakfast, lunch, and dinner. We also operate a community feeding initiative that extends meals to vulnerable children in the surrounding neighborhood who may not be resident in our facility.",
    impact: "Over 1,000 meals served monthly",
    color: "bg-amber-50 border-amber-200",
    details: [
      "Three nutritious meals daily for all resident children",
      "Community outreach feeding for non-resident vulnerable children",
      "Nutritional education and cooking skills for older youth",
      "Special dietary support for children with health conditions",
    ],
  },
  {
    title: "Education Support Program",
    icon: "📚",
    description: "Education is the most powerful tool we can give a child to change their story. Our Education Support Program covers school fees, uniforms, textbooks, stationery, and any other materials children need to attend and thrive in school. We also provide after-school tutoring, homework help, and mentorship to help children achieve academic excellence.",
    impact: "100+ children in school",
    color: "bg-blue-50 border-blue-200",
    details: [
      "Full payment of school fees from nursery to secondary school",
      "School uniforms, bags, books, and stationery provided",
      "After-school tutoring and academic mentorship",
      "University and vocational scholarship program for qualifying youth",
    ],
  },
  {
    title: "Healthcare & Medical Program",
    icon: "🏥",
    description: "Healthy children are happy children. Our Healthcare Program provides comprehensive medical care to all children in our custody, including routine checkups, immunizations, dental care, eye care, and emergency medical treatment. We partner with local hospitals and clinics to ensure every child receives prompt, quality healthcare without financial barriers.",
    impact: "Free healthcare for all resident children",
    color: "bg-red-50 border-red-200",
    details: [
      "Regular medical examinations and health monitoring",
      "Full immunization schedules for all children",
      "Emergency medical treatment and hospital access",
      "Mental health counseling and trauma therapy",
    ],
  },
  {
    title: "Shelter & Housing Program",
    icon: "🏠",
    description: "Every child needs a safe, stable place to call home. Our Shelter and Housing Program maintains clean, well-maintained living quarters where children are safe, secure, and cared for. Beyond physical shelter, we create a genuine home, a family environment where children are loved, their voices are heard, and they belong.",
    impact: "Safe home for 50+ resident children",
    color: "bg-green-50 border-green-200",
    details: [
      "Safe, clean, and comfortable accommodation for resident children",
      "Family-style living environment with house parents",
      "Regular facility maintenance and improvement",
      "Safe outdoor play areas and recreational spaces",
    ],
  },
  {
    title: "Skills Acquisition Program",
    icon: "🛠️",
    description: "We prepare older children and youth for independent, productive lives. Our Skills Acquisition Program offers hands-on vocational training in high-demand trades such as tailoring, catering, phone repair, computer skills, farming, and more. Graduates leave with both a skill and a starter kit to begin their own enterprise.",
    impact: "Youth equipped for economic independence",
    color: "bg-purple-50 border-purple-200",
    details: [
      "Vocational training in trades: tailoring, catering, computer skills, farming",
      "Business and entrepreneurship education",
      "Starter kits provided upon completion",
      "Mentorship and job placement support",
    ],
  },
  {
    title: "Psychosocial Support Program",
    icon: "💚",
    description: "Many of the children who come to us carry deep emotional wounds from loss, trauma, abuse, or abandonment. Our Psychosocial Support Program provides professional counseling, group therapy, life skills training, and spiritual support to help children process their past, build resilience, and develop healthy emotional foundations for the future.",
    impact: "Emotional healing and resilience for every child",
    color: "bg-teal-50 border-teal-200",
    details: [
      "Individual and group counseling sessions",
      "Trauma-informed care approach across all programs",
      "Life skills and social development training",
      "Spiritual care and character formation",
    ],
  },
];

export default function Programs() {
  return (
    <Layout>
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Our Work</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">Programs & Services</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Six comprehensive programs, one purpose: to care for every dimension of every child's wellbeing.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {programs.map((prog, i) => (
                <div key={prog.title} className={`rounded-3xl border p-8 lg:p-10 ${prog.color}`}>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="text-5xl">{prog.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">{prog.title}</h2>
                        <span className="flex-shrink-0 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {prog.impact}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">{prog.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {prog.details.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-secondary-foreground mb-4">
              Every Program Needs Your Support
            </h2>
            <p className="text-secondary-foreground/80 mb-8">
              Your donation helps us fund all six of these programs, from the meals we serve today to the skills we teach for tomorrow.
            </p>
            <Link href="/donate" className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors">
              Donate to Support Our Programs
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
