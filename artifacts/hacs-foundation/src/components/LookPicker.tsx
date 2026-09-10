import { useLocation } from "wouter";
import { LOOKS } from "@/lib/looks";
import { useLook } from "@/components/LookProvider";
import { cn } from "@/lib/utils";

export function LookPicker() {
  const [location] = useLocation();
  const { lookId, setLookId } = useLook();

  if (location !== "/") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-5xl px-3 pb-3">
        <div className="rounded-2xl border border-border bg-white/95 backdrop-blur-md shadow-2xl p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="sm:w-44 shrink-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary">Choose a look</p>
              <p className="text-sm font-serif font-semibold text-foreground leading-tight">
                5 homepage mockups
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 flex-1">
              {LOOKS.map((look) => (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => setLookId(look.id)}
                  className={cn(
                    "group text-left rounded-xl overflow-hidden border-2 transition-all",
                    lookId === look.id
                      ? "border-secondary shadow-md scale-[1.02]"
                      : "border-transparent hover:border-primary/30",
                  )}
                  aria-pressed={lookId === look.id}
                  aria-label={`Apply ${look.name} look`}
                >
                  <img
                    src={look.background}
                    alt=""
                    className="h-10 sm:h-14 w-full object-cover"
                  />
                  <span className="block px-1.5 py-1 text-[10px] sm:text-xs font-semibold text-foreground leading-tight truncate">
                    {look.id}. {look.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
