import { Link } from "wouter";
import { videoTestimonies } from "@/lib/testimonies";

export function TestimoniesSection({
  showIntro = true,
}: {
  showIntro?: boolean;
}) {
  return (
    <section className="bg-[#fbf7f0] py-16" id="testimonies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showIntro && (
          <>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-secondary mb-2">Testimonies</p>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">From our beneficiaries</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Hear from young people the foundation has stood with — in their own voices.
            </p>
          </>
        )}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videoTestimonies.map((item) => (
            <figure
              key={item.src}
              className="rounded-[1.25rem] border border-secondary/55 bg-card p-4 shadow-sm"
            >
              <div className="overflow-hidden rounded-xl bg-[#1c1410]">
                <video
                  className="mx-auto aspect-[9/16] w-full max-h-[34rem] object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  aria-label={`Testimony from ${item.name}`}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser cannot play this video.
                </video>
              </div>
              <figcaption className="pt-4 px-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-1">{item.role}</p>
                <h3 className="font-serif font-bold text-foreground mb-2">{item.name}</h3>
                <blockquote className="text-sm text-muted-foreground leading-relaxed">“{item.quote}”</blockquote>
              </figcaption>
            </figure>
          ))}
        </div>
        {showIntro && (
          <div className="mt-10 text-center">
            <Link href="/testimonies" className="text-primary font-semibold">
              See all testimonies →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
