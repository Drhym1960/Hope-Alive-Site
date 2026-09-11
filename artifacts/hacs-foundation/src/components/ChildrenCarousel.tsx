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

const childrenSlides = [
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

export function ChildrenCarousel({
  className,
  variant = "strip",
}: {
  className?: string;
  variant?: "strip" | "framed";
}) {
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

  const framed = variant === "framed";

  return (
    <div className={cn("relative", className)}>
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="w-full">
        <CarouselContent className={framed ? undefined : "-ml-3"}>
          {childrenSlides.map((slide, index) => (
            <CarouselItem
              key={slide.alt}
              className={framed ? "basis-full" : "basis-[88%] sm:basis-[78%] pl-3"}
            >
              {framed ? (
                <figure className="mx-auto max-w-[22rem] sm:max-w-[26rem]">
                  <div className="portrait-frame p-[11px] sm:p-[14px] shadow-[0_28px_70px_rgba(20,10,0,0.55)]">
                    <div className="bg-[#f7f0dc] p-2.5 sm:p-3">
                      <div className="relative overflow-hidden bg-[#1a1208]">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className={cn(
                            "aspect-[4/5] w-full object-cover transition-transform duration-700",
                            index === current ? "scale-100" : "scale-[1.04]",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-4 text-center">
                    <p className="text-secondary font-serif italic text-base">{slide.caption}</p>
                  </figcaption>
                </figure>
              ) : (
                <figure className="relative overflow-hidden bg-muted rounded-[1.75rem] shadow-xl">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={cn(
                      "aspect-[4/5] sm:aspect-[5/6] w-full object-cover transition-transform duration-700",
                      index === current ? "scale-100" : "scale-[1.03]",
                    )}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 py-4">
                    <p className="text-white text-sm font-medium">{slide.caption}</p>
                  </figcaption>
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
              index === current
                ? "w-8 bg-secondary"
                : framed
                  ? "w-2.5 bg-white/35 hover:bg-white/55"
                  : "w-2.5 bg-primary/25 hover:bg-primary/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
