import { useEffect, useState } from "react";
import { Link } from "wouter";
import { childrenSlides } from "@/components/ChildrenCarousel";
import { GoldPromiseRest } from "@/components/LandingPages";
import { cn } from "@/lib/utils";

function GoldPromiseCopy({
  tone,
}: {
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div>
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.38em] mb-5",
          dark ? "text-secondary" : "text-secondary",
        )}
      >
        Hope Alive
      </p>
      <h1
        className={cn(
          "font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] mb-8",
          dark ? "text-white" : "text-foreground",
        )}
      >
        <span className="block">A child.</span>
        <span className="block text-secondary">A home.</span>
        <span className="block">A horizon.</span>
      </h1>
      <p
        className={cn(
          "text-lg sm:text-xl leading-relaxed mb-10 max-w-lg",
          dark ? "text-white/85" : "text-muted-foreground",
        )}
      >
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
          className={cn(
            "px-8 py-4 border-2 font-semibold rounded-full",
            dark ? "border-white/45 text-white hover:bg-white/10" : "border-primary/25 text-primary hover:bg-primary/5",
          )}
        >
          Meet the children
        </Link>
      </div>
    </div>
  );
}

function ChildrenCardGrid() {
  return (
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
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-[4.5rem] w-[4.5rem] rounded-xl object-cover shrink-0"
              />
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
  );
}

export function PathHeroLanding() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % childrenSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <section className="bg-[#1c1410] pt-20">
        <div className="relative mx-auto max-w-[1440px]">
          <div className="relative min-h-[62vh] overflow-hidden">
            {childrenSlides.map((item, index) => (
              <img
                key={item.alt}
                src={item.src}
                alt={index === current ? item.alt : ""}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                  index === current ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/15" />
            <div className="relative z-10 flex min-h-[62vh] items-end px-6 sm:px-10 lg:px-16 pb-20 pt-16">
              <GoldPromiseCopy tone="dark" />
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
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === current ? "w-8 bg-secondary" : "w-6 bg-white/35 hover:bg-white/55",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <ChildrenCardGrid />
      <GoldPromiseRest />
    </div>
  );
}

export function GuideCardsLanding() {
  return (
    <div>
      <section className="bg-[#fbf7f0] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <GoldPromiseCopy tone="light" />
            <div className="flex justify-center">
              <div className="w-full max-w-[32rem] overflow-hidden rounded-[1.5rem] border-[4px] border-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <img
                  src={childrenSlides[0].src}
                  alt={childrenSlides[0].alt}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChildrenCardGrid />
      <GoldPromiseRest />
    </div>
  );
}
