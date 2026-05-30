import { Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import scumlCert from "@assets/file_0000000005dc72468a99f867fb432e41_1776950214037.png";
import cacCert from "@assets/file_00000000ffdc7243a39fe6ba3dd8dfef_1776950214093.png";

const stats = [
  { number: "500+", label: "Children Supported" },
  { number: "12+", label: "Years of Service" },
  { number: "6", label: "Active Programs" },
  { number: "1000+", label: "Meals Served Monthly" },
];

const programs = [
  {
    icon: "🍽️",
    title: "Feeding Program",
    desc: "Providing daily nutritious meals to ensure no child goes hungry.",
  },
  {
    icon: "📚",
    title: "Education Support",
    desc: "School fees, uniforms, books, and mentorship for academic success.",
  },
  {
    icon: "🏥",
    title: "Healthcare",
    desc: "Regular medical checkups, immunizations, and emergency care.",
  },
  {
    icon: "🏠",
    title: "Shelter & Housing",
    desc: "Safe, warm homes where children feel secure and loved.",
  },
  {
    icon: "🤝",
    title: "Skills Acquisition",
    desc: "Vocational training to equip youth for independent futures.",
  },
  {
    icon: "💚",
    title: "Psychosocial Support",
    desc: "Counseling and emotional care to heal trauma and build resilience.",
  },
];

const stories = [
  {
    name: "Amaka, age 9",
    quote: "I now go to school every day. I want to be a doctor to help other children like me.",
    location: "Makurdi, Benue State",
  },
  {
    name: "Tunde, age 14",
    quote: "The foundation gave me a home when I had nowhere to go. They gave me back my future.",
    location: "Makurdi, Benue State",
  },
  {
    name: "Faith, age 11",
    quote: "I used to sleep hungry. Now I eat every day and I learn every day. Thank you HACS.",
    location: "Makurdi, Benue State",
  },
  {
    name: "Kunde Aondofa",
    quote: "Supporting HACS Foundation has been deeply rewarding. I have seen first-hand how every contribution turns into real meals, school fees, and brighter smiles for these children.",
    location: "Makurdi, Benue State",
  },
  {
    name: "Sonia Doo Peter",
    quote: "What this foundation does for vulnerable children is remarkable. The care, the love, and the commitment are genuine. I am proud to stand with their mission.",
    location: "Makurdi, Benue State",
  },
  {
    name: "Faith Kumater",
    quote: "HACS Foundation gives these children more than shelter, it gives them dignity and hope for the future. Their work has truly touched my heart.",
    location: "Makurdi, Benue State",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.2) 0%, transparent 50%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in">
              Hope Alive Children Spring Foundation
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Every Child Deserves{" "}
              <span className="text-secondary">Love,</span>{" "}
              Care &{" "}
              <span className="text-secondary">Hope</span>
            </h1>
            <p className="text-primary-foreground/85 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up">
              We are a charitable foundation in Makurdi, Nigeria, dedicated to supporting orphans and vulnerable children with shelter, education, healthcare, and unconditional love. <em className="text-secondary">Giving Love a Chance.</em>
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up">
              <Link
                href="/donate"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold text-base hover:bg-secondary/90 transition-all shadow-lg donate-btn-pulse"
              >
                Donate Today
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold text-base hover:bg-white/10 transition-all"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="hsl(42, 30%, 97%)" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-secondary-foreground">{stat.number}</div>
                <div className="text-secondary-foreground/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Our Mission"
                title="Transforming Lives, One Child at a Time"
                subtitle="Hope Alive Children Spring Foundation was established to provide a loving, safe environment for orphaned and vulnerable children in Benue State, Nigeria. We believe every child deserves the chance to grow, learn, and thrive, regardless of their circumstances."
              />
              <p className="text-muted-foreground leading-relaxed mb-8">
                Founded with compassion at its core, our foundation works tirelessly to address the root causes of child vulnerability: poverty, loss, abuse, and neglect. Through comprehensive care programs, we restore hope and dignity to children who have been left behind by circumstance.
              </p>
              <Link href="/mission" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
                Read our full mission
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                <div className="text-3xl font-serif font-bold text-secondary mb-2">500+</div>
                <div className="text-sm text-primary-foreground/80">Children have received care, education, and support through our programs since inception.</div>
              </div>
              <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground mt-8">
                <div className="text-3xl font-serif font-bold mb-2">100%</div>
                <div className="text-sm text-secondary-foreground/80">of your donation goes directly to supporting children's needs.</div>
              </div>
              <div className="bg-accent rounded-2xl p-6 text-accent-foreground mt-[-1rem]">
                <div className="text-3xl font-serif font-bold text-primary mb-2">6</div>
                <div className="text-sm">Active programs serving children across Makurdi and Benue State.</div>
              </div>
              <div className="bg-muted rounded-2xl p-6">
                <div className="text-3xl font-serif font-bold text-primary mb-2">12+</div>
                <div className="text-sm text-muted-foreground">Years of dedicated service to Nigeria's most vulnerable children.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified & Registered (Trust Strip) */}
      <section className="py-16 bg-accent/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-secondary text-xs font-semibold uppercase tracking-widest mb-3">
                Verified & Registered
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                A Charity You Can Trust
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hope Alive Children Spring Foundation is a legally registered charitable organisation in Nigeria. View our official registration documents below.
              </p>
              <Link
                href="/about#certificates"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm"
              >
                View Full Registration Documents
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/about#certificates"
                className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all p-3 flex flex-col items-center"
                aria-label="View CAC Certificate of Incorporation"
              >
                <img
                  src={cacCert}
                  alt="CAC Certificate of Incorporation thumbnail"
                  loading="lazy"
                  className="h-40 w-auto object-contain"
                />
                <span className="mt-3 text-xs font-semibold text-primary text-center">CAC Certificate of Incorporation</span>
              </Link>
              <Link
                href="/about#certificates"
                className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all p-3 flex flex-col items-center"
                aria-label="View SCUML Registration Certificate"
              >
                <img
                  src={scumlCert}
                  alt="SCUML Certificate of Registration thumbnail"
                  loading="lazy"
                  className="h-40 w-auto object-contain"
                />
                <span className="mt-3 text-xs font-semibold text-primary text-center">SCUML Certificate of Registration</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Programs & Services"
            subtitle="From feeding hungry children to educating tomorrow's leaders, our programs address every dimension of a child's wellbeing."
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div key={prog.title} className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
                <div className="text-3xl mb-4">{prog.icon}</div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{prog.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/programs" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Children's Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Their Stories"
            title="Voices of Hope"
            subtitle="Behind every statistic is a real child with a real story. These are their words."
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.name} className="bg-card border border-border rounded-2xl p-8 relative">
                <div className="absolute top-6 left-8 text-6xl text-primary/10 font-serif leading-none select-none">"</div>
                <blockquote className="font-serif italic text-foreground text-base leading-relaxed mb-6 relative z-10">
                  {story.quote}
                </blockquote>
                <div>
                  <div className="font-semibold text-sm text-primary">{story.name}</div>
                  <div className="text-xs text-muted-foreground">{story.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Make a Difference Today</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            Your Gift Changes a Child's Life Forever
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            A donation of any amount provides food, education, healthcare, and love to a child who has lost everything. Be the reason a child smiles today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["₦1,000", "₦5,000", "₦10,000", "₦50,000"].map((amt) => (
              <Link
                key={amt}
                href="/donate"
                className="px-6 py-3 border-2 border-secondary text-secondary rounded-full font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all text-sm"
              >
                {amt}
              </Link>
            ))}
          </div>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg hover:bg-secondary/90 transition-all shadow-xl donate-btn-pulse"
          >
            Donate Now · Give Love a Chance
          </Link>
        </div>
      </section>

      {/* Bank Transfer Quick Info */}
      <section className="py-12 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">You can also donate directly via bank transfer</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-card border border-border rounded-xl px-6 py-4 text-sm">
              <div className="font-semibold text-foreground">Naira Account (Zenith Bank)</div>
              <div className="text-muted-foreground mt-1">Hope Alive Children Spring Foundation</div>
              <div className="text-primary font-mono font-bold text-lg mt-1">1224366497</div>
            </div>
            <div className="bg-card border border-border rounded-xl px-6 py-4 text-sm">
              <div className="font-semibold text-foreground">Dollar Account</div>
              <div className="text-muted-foreground mt-1">Hope Alive Children Spring Foundation</div>
              <div className="text-primary font-mono font-bold text-lg mt-1">5074649270</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
