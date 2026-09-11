import { useEffect, useState } from "react";
import { Link } from "wouter";
import { childrenSlides } from "@/components/ChildrenCarousel";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SectionHeader } from "@/components/SectionHeader";
import scumlCert from "@assets/file_0000000005dc72468a99f867fb432e41_1776950214037.png";
import cacCert from "@assets/file_00000000ffdc7243a39fe6ba3dd8dfef_1776950214093.png";

const stats = [
  { number: "500+", label: "Children held" },
  { number: "12+", label: "Years of care" },
  { number: "6", label: "Living programs" },
  { number: "1000+", label: "Meals each month" },
];

const programs = [
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

export function HomeLanding() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setCurrent((value) => (value + 1) % childrenSlides.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [current, paused]);

  return (
    <div>
      <section className="bg-[#1c1410] pt-20">
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative isolate h-[min(62vh,34.875rem)] w-full overflow-hidden bg-[#1c1410]">
            {childrenSlides.map((item, index) => (
              <div
                key={item.alt}
                className={index === current ? "hero-crossfade-layer is-active" : "hero-crossfade-layer"}
                aria-hidden={index !== current}
              >
                <img
                  src={item.src}
                  alt={index === current ? item.alt : ""}
                  fetchPriority={index === 0 ? "high" : "low"}
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/40 to-black/15" />
            <div className="relative z-10 flex h-full items-end px-6 sm:px-10 lg:px-16 pb-20 pt-16">
              <div>
                <p className="text-secondary text-xs font-bold uppercase tracking-[0.38em] mb-5">Hope Alive</p>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.02] mb-8">
                  <span className="block">A child.</span>
                  <span className="block text-secondary">A home.</span>
                  <span className="block">A horizon.</span>
                </h1>
                <p className="text-white/85 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
                  We do not wait for chance. We feed, school, shelter, and stand with children in Makurdi until they can stand alone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/donate"
                    className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold shadow-lg donate-btn-pulse rounded-full"
                  >
                    Place a gift
                  </Link>
                  <Link
                    href="/scholarship-beneficiaries"
                    className="px-8 py-4 border-2 border-white/45 text-white font-semibold hover:bg-white/10 rounded-full"
                  >
                    Meet the children
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2" role="tablist" aria-label="Hero photographs">
              {childrenSlides.map((item, index) => (
                <button
                  key={item.alt}
                  type="button"
                  role="tab"
                  aria-selected={index === current}
                  aria-label={item.caption}
                  onClick={() => setCurrent(index)}
                  className={index === current ? "hero-dot is-active" : "hero-dot"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-secondary mb-2">The children</p>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">In our house</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {childrenSlides.map((slide) => (
              <Link
                key={slide.alt}
                href="/scholarship-beneficiaries"
                className="flex items-center gap-4 rounded-[1.25rem] border border-secondary/35 bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img src={slide.src} alt={slide.alt} className="h-[4.5rem] w-[4.5rem] rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-1">In our care</p>
                  <h3 className="font-serif font-bold text-foreground leading-tight mb-3">{slide.caption}</h3>
                  <span className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1.5">
                    Meet them
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoldPromiseRest />
    </div>
  );
}

function GoldPromiseRest() {
  return (
    <>
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="The work"
              title="Three promises, kept daily"
              subtitle="A child. A home. A horizon. Everything we run in Benue State answers those three words."
            />
            <Link href="/mission" className="text-primary font-semibold">Read the full mission →</Link>
          </div>
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
        </div>
      </section>

      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader eyebrow="How we keep them" title="Where the promise lives" centered />
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
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">Keep a promise with us</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            A gift of any size is a child fed, a school year begun, a house still open.
          </p>
          <Link href="/donate" className="inline-flex px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg shadow-xl donate-btn-pulse">
            Place a gift
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
