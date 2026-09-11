import { Link } from "wouter";
import { ChildrenCarousel } from "@/components/ChildrenCarousel";

export function HeroSection() {
  return (
    <section className="hero-stage">
      <div className="hero-stage-media" aria-hidden="true" />
      <div className="relative hero-stage-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] mb-4 animate-fade-in text-primary">
              A registered foundation in Makurdi, Benue State
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.12] mb-6 animate-fade-in-up text-foreground">
              Dignity, education, and belonging{" "}
              <span className="text-secondary italic font-medium">for every child.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up text-muted-foreground">
              Hope Alive Children Spring Foundation walks with orphaned and vulnerable children
              through shelter, schooling, healthcare, and love.{" "}
              <em className="text-primary">Giving Love a Chance.</em>
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up">
              <Link
                href="/donate"
                className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold text-base hover:bg-secondary/90 transition-all shadow-lg donate-btn-pulse rounded-full"
              >
                Become a patron
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border-2 font-semibold text-base transition-all rounded-full border-primary/30 text-primary hover:bg-primary/5"
              >
                Our story
              </Link>
            </div>
          </div>
          <ChildrenCarousel />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16"
        >
          <path
            d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
