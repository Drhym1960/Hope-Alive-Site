import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import child1 from "@assets/file_00000000457071f89c08e9b7f1dfab87_1776680949210.png";
import child2 from "@assets/file_0000000088e871f89d623d0d5717e70b_1776680949139.png";
import child3 from "@assets/file_00000000c7c071fdaf3524db2a32f965_1776680948966.png";
import child4 from "@assets/file_00000000eeb471f887e0f300041016ed_1776680949165.png";
import child5 from "@assets/file_000000006b2871fdb04677d531835d82_1776680949100.png";

export const childrenSlides = [
  {
    src: child1,
    alt: "A smiling Nigerian girl at Hope Alive Children Spring Foundation in Makurdi",
    caption: "A bright smile of hope",
  },
  {
    src: child2,
    alt: "Children celebrating together at the foundation in Benue State, Nigeria",
    caption: "Joy in every gathering",
  },
  {
    src: child3,
    alt: "Boys laughing and posing with caregivers at the foundation",
    caption: "Laughing, growing, belonging",
  },
  {
    src: child4,
    alt: "Two girls smiling with a caregiver beside a village home",
    caption: "Cared for like family",
  },
  {
    src: child5,
    alt: "Children from the community smiling outdoors in rural Nigeria",
    caption: "Loved in our community",
  },
];

export type CarouselVariant = "card" | "strip" | "polaroid" | "filmstrip" | "cinematic";

type ChildrenCarouselProps = {
  variant?: CarouselVariant;
  className?: string;
  showCaptions?: boolean;
};

export function ChildrenCarousel({
  variant = "card",
  className,
  showCaptions = true,
}: ChildrenCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const root = api.rootNode();
    let timer = window.setInterval(() => api.scrollNext(), 4800);
    const stop = () => clearInterval(timer);
    const play = () => {
      stop();
      timer = window.setInterval(() => api.scrollNext(), 4800);
    };
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", play);
    api.on("pointerDown", () => {
      stop();
      window.setTimeout(play, 6500);
    });
    return () => {
      stop();
      root.removeEventListener("mouseenter", stop);
      root.removeEventListener("mouseleave", play);
      root.removeEventListener("focusin", stop);
      root.removeEventListener("focusout", play);
    };
  }, [api]);

  const goTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  const itemBasis =
    variant === "strip"
      ? "basis-[88%] sm:basis-[78%]"
      : variant === "filmstrip"
        ? "basis-[70%] sm:basis-[42%] lg:basis-[32%]"
        : "basis-full";

  const imageClass =
    variant === "polaroid"
      ? "aspect-[4/5] w-full object-cover"
      : variant === "cinematic"
        ? "aspect-[16/10] w-full object-cover"
        : variant === "filmstrip"
          ? "aspect-[4/5] w-full object-cover"
          : variant === "strip"
            ? "aspect-[4/5] sm:aspect-[5/6] w-full object-cover"
            : "aspect-[4/5] w-full object-cover";

  return (
    <div className={cn("relative", className)}>
      <Carousel
        opts={{ loop: true, align: variant === "filmstrip" ? "center" : "start" }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className={variant === "filmstrip" || variant === "strip" ? "-ml-3" : undefined}>
          {childrenSlides.map((slide, index) => (
            <CarouselItem key={slide.alt} className={cn(itemBasis, (variant === "filmstrip" || variant === "strip") && "pl-3")}>
              {variant === "polaroid" ? (
                <figure className={cn("bg-white p-3 pb-8 shadow-xl", index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]")}>
                  <img src={slide.src} alt={slide.alt} className={imageClass} />
                  {showCaptions && (
                    <figcaption className="mt-3 text-center font-serif text-sm text-stone-700">
                      {slide.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <figure
                  className={cn(
                    "relative overflow-hidden bg-muted",
                    variant === "cinematic" && "rounded-2xl ring-1 ring-secondary/60 shadow-2xl",
                    variant === "card" && "rounded-3xl shadow-2xl ring-4 ring-white/80",
                    variant === "strip" && "rounded-[1.75rem] shadow-xl",
                    variant === "filmstrip" && "rounded-2xl shadow-lg ring-2 ring-white/70",
                  )}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={cn(imageClass, index === current ? "scale-100" : "scale-[1.03]", "transition-transform duration-700")}
                  />
                  {showCaptions && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 py-4">
                      <p className="text-white text-sm font-medium">{slide.caption}</p>
                    </figcaption>
                  )}
                </figure>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md hover:bg-white transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md hover:bg-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Children photo slides">
        {childrenSlides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Show photo ${index + 1}: ${slide.caption}`}
            onClick={() => goTo(index)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              index === current ? "w-8 bg-secondary" : "w-2.5 bg-primary/25 hover:bg-primary/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
