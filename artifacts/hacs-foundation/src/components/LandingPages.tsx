import { Link } from "wouter";
import { ChildrenCarousel } from "@/components/ChildrenCarousel";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SectionHeader } from "@/components/SectionHeader";
import scumlCert from "@assets/file_0000000005dc72468a99f867fb432e41_1776950214037.png";
import cacCert from "@assets/file_00000000ffdc7243a39fe6ba3dd8dfef_1776950214093.png";

export const stats = [
  { number: "500+", label: "Children Supported" },
  { number: "12+", label: "Years of Service" },
  { number: "6", label: "Active Programs" },
  { number: "1000+", label: "Meals Served Monthly" },
];

export const programs = [
  { n: "01", icon: "🍽️", title: "Feeding", desc: "Daily nutritious meals so no child goes hungry." },
  { n: "02", icon: "📚", title: "Education", desc: "Fees, uniforms, books, and mentorship." },
  { n: "03", icon: "🏥", title: "Healthcare", desc: "Checkups, immunizations, and emergency care." },
  { n: "04", icon: "🏠", title: "Shelter", desc: "Safe homes where children feel they belong." },
  { n: "05", icon: "🤝", title: "Skills", desc: "Vocational training for independent futures." },
  { n: "06", icon: "💚", title: "Counselling", desc: "Care that heals trauma and builds resilience." },
];

const stories = [
  { name: "Amaka, age 9", quote: "I now go to school every day. I want to be a doctor to help other children like me." },
  { name: "Tunde, age 14", quote: "The foundation gave me a home when I had nowhere to go. They gave me back my future." },
  { name: "Faith, age 11", quote: "I used to sleep hungry. Now I eat every day and I learn every day. Thank you HACS." },
];

function DonateCta() {
  return (
    <section className="py-20 hero-gradient">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Give with us</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">A gift that restores a childhood</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          Food, school, healthcare, and love for a child in Makurdi. Be the reason a child smiles today.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["₦1,000", "₦5,000", "₦10,000", "₦50,000"].map((amt) => (
            <Link key={amt} href="/donate" className="px-6 py-3 border-2 border-secondary text-secondary rounded-full font-semibold hover:bg-secondary hover:text-secondary-foreground text-sm">
              {amt}
            </Link>
          ))}
        </div>
        <Link href="/donate" className="inline-flex px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg shadow-xl donate-btn-pulse">
          Donate Now
        </Link>
      </div>
    </section>
  );
}

function BankStrip() {
  return (
    <section className="py-12 bg-muted">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground mb-4">Or transfer directly</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-card border border-border rounded-xl px-6 py-4 text-sm">
            <div className="font-semibold">Naira · Zenith Bank</div>
            <div className="text-primary font-mono font-bold text-lg mt-1">1224366497</div>
          </div>
          <div className="bg-card border border-border rounded-xl px-6 py-4 text-sm">
            <div className="font-semibold">Dollar Account</div>
            <div className="text-primary font-mono font-bold text-lg mt-1">5074649270</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustPair() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link href="/about#certificates" className="bg-card border border-border rounded-2xl shadow-sm p-3 flex flex-col items-center" aria-label="CAC certificate">
        <img src={cacCert} alt="CAC Certificate of Incorporation" loading="lazy" className="h-36 w-auto object-contain" />
        <span className="mt-3 text-xs font-semibold text-primary text-center">CAC Certificate</span>
      </Link>
      <Link href="/about#certificates" className="bg-card border border-border rounded-2xl shadow-sm p-3 flex flex-col items-center" aria-label="SCUML certificate">
        <img src={scumlCert} alt="SCUML Certificate of Registration" loading="lazy" className="h-36 w-auto object-contain" />
        <span className="mt-3 text-xs font-semibold text-primary text-center">SCUML Certificate</span>
      </Link>
    </div>
  );
}

export function BeaconLanding() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f4f7ef]">
        <img src="/looks/living-garden.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7faf3]/90 via-[#eef6e8]/75 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary">Hope Alive Children Spring Foundation</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                Every Child Deserves <span className="text-secondary">Love,</span> Care & <span className="text-secondary">Hope</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl text-muted-foreground">
                A charitable foundation in Makurdi supporting orphans and vulnerable children with shelter, education, healthcare, and love.{" "}
                <em className="text-primary">Giving Love a Chance.</em>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/donate" className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold shadow-lg donate-btn-pulse">Donate Today</Link>
                <Link href="/about" className="px-8 py-4 border-2 rounded-full font-semibold border-primary/30 text-primary">Learn Our Story</Link>
              </div>
            </div>
            <ChildrenCarousel />
          </div>
        </div>
      </section>
      <section className="bg-secondary py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-secondary-foreground">{stat.number}</div>
              <div className="text-secondary-foreground/80 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      <LeadershipSection />
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Our Mission" title="Transforming lives, one child at a time" subtitle="A loving, safe home for orphaned and vulnerable children in Benue State." />
            <Link href="/mission" className="text-primary font-semibold">Read our full mission →</Link>
          </div>
          <TrustPair />
        </div>
      </section>
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader eyebrow="What We Do" title="Our programs" centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="bg-card rounded-2xl p-6 border border-border">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-serif text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DonateCta />
      <BankStrip />
    </div>
  );
}

export function CinemaLanding() {
  return (
    <div>
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img src="/looks/living-garden.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
        <div className="relative max-w-4xl mx-auto px-4 pt-40 pb-24 text-center w-full">
          <p className="text-secondary text-xs font-semibold uppercase tracking-[0.28em] mb-5">Makurdi, Benue State</p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            A home. A school.<br />A future.
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Hope Alive walks with orphaned and vulnerable children — through meals, classrooms, clinics, and belonging.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg donate-btn-pulse">Give today</Link>
            <Link href="/scholarship-beneficiaries" className="px-10 py-4 border border-white/60 text-white rounded-full font-semibold">See the children</Link>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl font-bold text-secondary">{stat.number}</div>
                <div className="text-xs uppercase tracking-widest text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-foreground py-8">
        <div className="max-w-6xl mx-auto px-4">
          <ChildrenCarousel />
        </div>
      </section>
      <LeadershipSection />
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="Voices" title="In their words" centered />
          <div className="space-y-8">
            {stories.map((s) => (
              <blockquote key={s.name} className="border-l-4 border-secondary pl-6">
                <p className="font-serif italic text-xl text-foreground mb-2">“{s.quote}”</p>
                <cite className="text-sm text-primary not-italic font-semibold">{s.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <DonateCta />
      <BankStrip />
    </div>
  );
}

export function TrustFirstLanding() {
  return (
    <div>
      <section className="pt-28 pb-14 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-secondary text-xs font-semibold uppercase tracking-[0.22em] mb-4">Registered in Nigeria</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-5">
            A charity you can verify before you give
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Hope Alive Children Spring Foundation is CAC- and SCUML-registered in Makurdi. Your gift feeds, schools, and shelters children — with documents you can read.
          </p>
          <Link href="/donate" className="inline-flex px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold donate-btn-pulse">Donate with confidence</Link>
        </div>
      </section>
      <section className="pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <TrustPair />
        </div>
      </section>
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl font-bold text-secondary">{stat.number}</div>
              <div className="text-sm text-primary-foreground/75 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeader eyebrow="The children" title="Meet who your gift reaches" />
            <Link href="/scholarship-beneficiaries" className="text-primary font-semibold">Scholarship beneficiaries →</Link>
          </div>
          <ChildrenCarousel />
        </div>
      </section>
      <LeadershipSection />
      <DonateCta />
      <BankStrip />
    </div>
  );
}

export function CarePathLanding() {
  const steps = [
    { n: "01", title: "A safe bed", text: "Shelter and daily meals so a child can rest and grow." },
    { n: "02", title: "A school place", text: "Fees, books, and uniforms from primary through university." },
    { n: "03", title: "A future", text: "Healthcare, skills, and counselling until they can stand alone." },
  ];
  return (
    <div>
      <section className="pt-28 pb-16 bg-[#f4f7ef]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Giving Love a Chance</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Three promises to every child
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            We do not scatter programs. We walk one path with each child in Makurdi — from the first meal to a life of dignity.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.n} className="bg-card border border-border rounded-3xl p-8 text-center">
              <div className="font-serif text-secondary text-4xl font-bold mb-3">{step.n}</div>
              <h2 className="font-serif text-2xl font-bold mb-3">{step.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/donate" className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold donate-btn-pulse">Walk with a child</Link>
          <Link href="/programs" className="px-8 py-4 border-2 border-primary/30 text-primary rounded-full font-semibold">See programs</Link>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <ChildrenCarousel />
        </div>
      </section>
      <section className="py-16 bg-muted/60">
        <div className="max-w-3xl mx-auto px-4">
          {programs.map((p) => (
            <div key={p.title} className="flex gap-5 py-5 border-b border-border last:border-0">
              <span className="font-serif text-secondary font-bold w-10">{p.n}</span>
              <div>
                <h3 className="font-serif text-xl font-semibold">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <LeadershipSection />
      <DonateCta />
      <BankStrip />
    </div>
  );
}

export function HouseLedgerLanding() {
  return (
    <div>
      <section className="pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ChildrenCarousel />
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary mb-4">Est. · Makurdi</p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-[1.12] mb-6">
                The house that holds them
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Hope Alive is a registered children’s foundation. We keep the books, the beds, and the school places — so a child is never left to chance.
              </p>
              <Link href="/donate" className="inline-flex px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-none">Become a patron</Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background px-4 py-8">
                <div className="font-serif text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 border-y border-border">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-6">On the record</p>
          <TrustPair />
        </div>
      </section>
      <LeadershipSection />
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {stories.map((s) => (
            <blockquote key={s.name} className="py-8 border-b border-border last:border-0">
              <p className="font-serif text-2xl italic text-foreground mb-3">“{s.quote}”</p>
              <cite className="text-sm not-italic text-primary font-semibold">{s.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>
      <DonateCta />
      <BankStrip />
    </div>
  );
}
