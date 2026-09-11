import { useState } from "react";
import { LANDING_LAYOUTS } from "@/lib/landings";
import { useLanding } from "@/components/LandingProvider";
import { cn } from "@/lib/utils";

export function LandingPicker() {
  const { landingId, landing, setLandingId } = useLanding();
  const [open, setOpen] = useState(true);

  return (
    <aside
      className="landing-picker theme-picker fixed z-[80] left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:w-[24rem]"
      aria-label="Landing page structure mockups"
    >
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-xl p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              5 landing structures
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              New homepage layouts. Reply with the number to keep.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
            aria-expanded={open}
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>
        {open && (
          <>
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {LANDING_LAYOUTS.map((item) => {
                const selected = item.id === landingId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLandingId(item.id)}
                    className={cn(
                      "rounded-xl border px-1 py-2 text-center transition-all",
                      selected
                        ? "border-secondary bg-secondary/10 ring-1 ring-secondary/40"
                        : "border-border hover:border-primary/30 hover:bg-muted/40",
                    )}
                    aria-pressed={selected}
                    aria-label={`${item.number}. ${item.name}`}
                  >
                    <span className="block text-sm font-serif font-bold text-foreground">{item.number}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-serif text-sm font-bold text-foreground leading-tight">
              {landing.number}. {landing.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-secondary mb-1">{landing.tagline}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{landing.description}</p>
          </>
        )}
      </div>
    </aside>
  );
}
