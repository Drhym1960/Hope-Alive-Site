import type { ReactNode } from "react";
import { Link } from "wouter";
import { ChildrenCarousel } from "@/components/ChildrenCarousel";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import scumlCert from "@assets/file_0000000005dc72468a99f867fb432e41_1776950214037.png";
import cacCert from "@assets/file_00000000ffdc7243a39fe6ba3dd8dfef_1776950214093.png";

export const stats = [
  { number: "500+", label: "Children held" },
  { number: "12+", label: "Years of care" },
  { number: "6", label: "Living programs" },
  { number: "1000+", label: "Meals each month" },
];

export const programs = [
  { n: "01", title: "The table", desc: "Daily meals so a child never meets the day hungry." },
  { n: "02", title: "The school", desc: "Fees, uniforms, books, and a place in class." },
  { n: "03", title: "The clinic", desc: "Checkups, immunizations, and emergency care." },
  { n: "04", title: "The house", desc: "A safe bed and a name spoken with love." },
  { n: "05", title: "The trade", desc: "Skills so youth can stand on their own." },
  { n: "06", title: "The heart", desc: "Counselling that mends what the years took." },
];

const stories = [
  { name: "Amaka, 9", quote: "I go to school every day now. I want to be a doctor for children like me." },
  { name: "Tunde, 14", quote: "They gave me a home when I had nowhere. They gave me back my years." },
  { name: "Faith, 11", quote: "I used to sleep hungry. Now I eat, I learn, and I am not afraid." },
];

function Wave() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
        <path
          d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H0Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  );
}

function SunriseHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img src="/looks/sunrise-hope.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#140c04]/82 via-[#2a1608]/52 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {children}
          <ChildrenCarousel variant="framed" />
        </div>
      </div>
      <Wave />
    </section>
  );
}

function GoldBar() {
  return (
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

function PageRest({
  missionTitle,
  missionBody,
  programTitle,
  donateTitle,
  donateBody,
  donateCta,
}: {
  missionTitle: string;
  missionBody: string;
  programTitle: string;
  donateTitle: string;
  donateBody: string;
  donateCta: string;
}) {
  return (
    <>
      <GoldBar />
      <LeadershipSection />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="The work" title={missionTitle} subtitle={missionBody} />
            <Link href="/mission" className="text-primary font-semibold">Read the full mission →</Link>
          </div>
          <TrustPair />
        </div>
      </section>
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader eyebrow="How we keep them" title={programTitle} centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="bg-card rounded-2xl p-6 border border-border">
                <div className="font-serif text-secondary text-sm font-bold mb-2">{p.n}</div>
                <h3 className="font-serif text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {stories.map((s) => (
            <blockquote key={s.name} className="py-8 border-b border-border last:border-0">
              <p className="font-serif text-xl sm:text-2xl italic text-foreground mb-3">“{s.quote}”</p>
              <cite className="text-sm not-italic text-primary font-semibold">{s.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">{donateTitle}</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">{donateBody}</p>
          <Link href="/donate" className="inline-flex px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg shadow-xl donate-btn-pulse">
            {donateCta}
          </Link>
        </div>
      </section>
      <section className="py-12 bg-muted">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">Or send a gift by transfer</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-card border border-border rounded-xl px-6 py-4 text-sm">
              <div className="font-semibold">Naira · Zenith Bank</div>
              <div className="text-primary font-mono font-bold text-lg mt-1">1224366497</div>
            </div>
            <div className="bg-card border border-border rounded-xl px-6 py-4 text-sm">
              <div className="font-semibold">Dollar account</div>
              <div className="text-primary font-mono font-bold text-lg mt-1">5074649270</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroActions({
  primary,
  secondary,
  secondaryHref = "/about",
  sharp = false,
}: {
  primary: string;
  secondary: string;
  secondaryHref?: string;
  sharp?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/donate"
        className={cn(
          "px-8 py-4 bg-secondary text-secondary-foreground font-semibold shadow-lg donate-btn-pulse",
          sharp ? "rounded-none" : "rounded-full",
        )}
      >
        {primary}
      </Link>
      <Link
        href={secondaryHref}
        className={cn(
          "px-8 py-4 border-2 border-white/45 text-white font-semibold hover:bg-white/10",
          sharp ? "rounded-none" : "rounded-full",
        )}
      >
        {secondary}
      </Link>
    </div>
  );
}

export function DawnVerseLanding() {
  return (
    <div>
      <SunriseHero>
        <div>
          <p className="text-secondary text-xs font-semibold uppercase tracking-[0.32em] mb-6">Makurdi · at first light</p>
          <h1 className="font-verse italic text-4xl sm:text-5xl lg:text-[3.65rem] font-medium text-white leading-[1.18] mb-8">
            Love arrives
            <br />
            before the day
            <br />
            is fully here.
          </h1>
          <p className="text-white/82 text-lg leading-relaxed mb-10 max-w-xl">
            Hope Alive keeps the table set for orphaned and vulnerable children in Benue — a bed, a meal, a school place, and someone who stays.
          </p>
          <HeroActions primary="Give at sunrise" secondary="Walk our story" />
        </div>
      </SunriseHero>
      <PageRest
        missionTitle="We meet them at the beginning of the day"
        missionBody="A child should wake to breakfast, to a uniform, to a name spoken gently. That is the work of this house."
        programTitle="Six ways we keep the morning"
        donateTitle="Let this sunrise reach a child"
        donateBody="Your gift becomes a meal before school, a fee that is paid, a bed that is made."
        donateCta="Give this morning"
      />
    </div>
  );
}

export function GoldPromiseLanding() {
  return (
    <div>
      <SunriseHero>
        <div>
          <p className="text-secondary text-xs font-bold uppercase tracking-[0.38em] mb-5">Hope Alive</p>
          <h1 className="font-promise text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.02] mb-8">
            <span className="block">A child.</span>
            <span className="block text-secondary">A home.</span>
            <span className="block">A horizon.</span>
          </h1>
          <p className="text-white/85 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
            We do not wait for chance. We feed, school, shelter, and stand with children in Makurdi until they can stand alone.
          </p>
          <HeroActions primary="Place a gift" secondary="Meet the children" secondaryHref="/scholarship-beneficiaries" />
        </div>
      </SunriseHero>
      <PageRest
        missionTitle="Three promises, kept daily"
        missionBody="A child. A home. A horizon. Everything we run in Benue State answers those three words."
        programTitle="Where the promise lives"
        donateTitle="Keep a promise with us"
        donateBody="A gift of any size is a child fed, a school year begun, a house still open."
        donateCta="Place a gift"
      />
    </div>
  );
}

export function HouseLetterLanding() {
  return (
    <div>
      <SunriseHero>
        <div>
          <p className="font-verse italic text-secondary text-2xl mb-4">Dear friend,</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6">
            We are raising them as our own.
          </h1>
          <p className="text-white/84 text-lg leading-relaxed mb-8 max-w-xl">
            There is a house in Makurdi where a child who had nowhere is called by name. We keep the books, the beds, and the school places. Will you help us keep that house open?
          </p>
          <HeroActions primary="Stand with a child" secondary="See who they are" secondaryHref="/scholarship-beneficiaries" />
        </div>
      </SunriseHero>
      <PageRest
        missionTitle="This is still a home, not a campaign"
        missionBody="Hope Alive Children Spring Foundation was founded so that orphaned and vulnerable children would belong to someone. That someone is us — and, if you wish, you."
        programTitle="What the house provides"
        donateTitle="Help us keep the door unlatched"
        donateBody="Write yourself into a childhood. A gift today is a child who eats, learns, and sleeps in safety."
        donateCta="Send a gift home"
      />
    </div>
  );
}

export function ScriptSunriseLanding() {
  return (
    <div>
      <SunriseHero>
        <div>
          <p className="font-script text-secondary text-4xl sm:text-5xl mb-3 leading-none">Giving love a chance</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            The morning belongs to them.
          </h1>
          <p className="text-white/84 text-lg leading-relaxed mb-10 max-w-xl">
            Every sunrise over these hills is a reminder: a child in our care should wake to breakfast, to school, to belonging — not to hunger.
          </p>
          <HeroActions primary="Give with us" secondary="Our mission" secondaryHref="/mission" />
        </div>
      </SunriseHero>
      <PageRest
        missionTitle="A blessing kept in ordinary work"
        missionBody="Love is not a slogan here. It is fees paid, plates filled, and a child who knows they will not be left."
        programTitle="The work beneath the blessing"
        donateTitle="Bless a childhood with a gift"
        donateBody="Give so that morning in Makurdi still means a meal, a classroom, and a home."
        donateCta="Give with us"
      />
    </div>
  );
}

export function QuietRecordLanding() {
  return (
    <div>
      <SunriseHero>
        <div>
          <p className="font-record text-[11px] sm:text-xs font-semibold tracking-[0.34em] uppercase text-secondary mb-6">
            Hope Alive Children Spring Foundation
          </p>
          <h1 className="font-record text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.15] mb-6">
            Registered care.
            <br />
            Visible love.
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            CAC- and SCUML-registered in Nigeria. Twelve years. Five hundred children held. Your gift is recorded — and it reaches a child in Makurdi.
          </p>
          <HeroActions primary="Give with confidence" secondary="View certificates" secondaryHref="/about#certificates" sharp />
        </div>
      </SunriseHero>
      <PageRest
        missionTitle="A charity you can read on paper"
        missionBody="We publish our registration because trust should not be asked for in the dark. The work is shelter, school, healthcare, and counsel."
        programTitle="Record of programs"
        donateTitle="Enter a gift on the record"
        donateBody="Transfers and online gifts are received in the foundation’s name and used for children in our care."
        donateCta="Give with confidence"
      />
    </div>
  );
}
