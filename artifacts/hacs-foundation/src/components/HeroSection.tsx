import { Link } from "wouter";
import { ChildrenCarousel } from "@/components/ChildrenCarousel";
import { Logo } from "@/components/Logo";
import { useLook } from "@/components/LookProvider";
import { cn } from "@/lib/utils";

function HeroCopy({
  tone,
  align = "left",
  showLogo = false,
}: {
  tone: "dark" | "light";
  align?: "left" | "center";
  showLogo?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "text-center mx-auto")}>
      {showLogo && (
        <div className={cn("mb-6", align === "center" && "flex justify-center")}>
          <Logo size={88} wordmark={false} />
        </div>
      )}
      <p
        className={cn(
          "text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in",
          dark ? "text-secondary" : "text-primary",
        )}
      >
        Hope Alive Children Spring Foundation
      </p>
      <h1
        className={cn(
          "font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up",
          dark ? "text-white" : "text-foreground",
        )}
      >
        Every Child Deserves{" "}
        <span className="text-secondary">Love,</span> Care &{" "}
        <span className="text-secondary">Hope</span>
      </h1>
      <p
        className={cn(
          "text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up",
          dark ? "text-white/85" : "text-muted-foreground",
          align === "center" && "mx-auto",
        )}
      >
        We are a charitable foundation in Makurdi, Nigeria, dedicated to supporting orphans and
        vulnerable children with shelter, education, healthcare, and unconditional love.{" "}
        <em className={dark ? "text-secondary" : "text-primary"}>Giving Love a Chance.</em>
      </p>
      <div
        className={cn(
          "flex flex-wrap gap-4 animate-fade-in-up",
          align === "center" && "justify-center",
        )}
      >
        <Link
          href="/donate"
          className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold text-base hover:bg-secondary/90 transition-all shadow-lg donate-btn-pulse"
        >
          Donate Today
        </Link>
        <Link
          href="/about"
          className={cn(
            "px-8 py-4 border-2 rounded-full font-semibold text-base transition-all",
            dark
              ? "border-white/40 text-white hover:bg-white/10"
              : "border-primary/30 text-primary hover:bg-primary/5",
          )}
        >
          Learn Our Story
        </Link>
      </div>
    </div>
  );
}

function Wave() {
  return (
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
  );
}

function SunriseHopeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src="/looks/sunrise-hope.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <HeroCopy tone="dark" />
          <ChildrenCarousel variant="card" />
        </div>
      </div>
      <Wave />
    </section>
  );
}

function LivingGardenHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f4f7ef]">
      <img
        src="/looks/living-garden.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7faf3]/90 via-[#eef6e8]/75 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <HeroCopy tone="light" />
          <ChildrenCarousel variant="strip" />
        </div>
      </div>
      <Wave />
    </section>
  );
}

function WarmEarthHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src="/looks/warm-earth.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#f8efe4]/78" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <HeroCopy tone="light" />
          <ChildrenCarousel variant="polaroid" />
        </div>
      </div>
      <Wave />
    </section>
  );
}

function OpenSkyHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <img
        src="/looks/open-sky.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/35 to-[#0b1f3a]/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 w-full">
        <HeroCopy tone="light" align="center" />
        <div className="mt-12">
          <ChildrenCarousel variant="filmstrip" />
        </div>
      </div>
      <Wave />
    </section>
  );
}

function NavyGoldHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src="/looks/navy-gold.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#071428]/45" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <HeroCopy tone="dark" align="center" showLogo />
        <div className="mt-12">
          <ChildrenCarousel variant="cinematic" />
        </div>
      </div>
      <Wave />
    </section>
  );
}

export function HeroSection() {
  const { lookId } = useLook();
  switch (lookId) {
    case 2:
      return <LivingGardenHero />;
    case 3:
      return <WarmEarthHero />;
    case 4:
      return <OpenSkyHero />;
    case 5:
      return <NavyGoldHero />;
    default:
      return <SunriseHopeHero />;
  }
}
