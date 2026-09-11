import { useState } from "react";
import { PREMIUM_THEMES } from "@/lib/themes";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemePicker() {
  const { themeId, theme, setThemeId } = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <aside
      className="theme-picker fixed z-[80] left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:w-[24rem]"
      aria-label="Premium theme mockups for approval"
    >
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-xl p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              5 new mockups
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Inspired by leading children’s charities. Reply with the number to keep.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="shrink-0 border border-border px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
            aria-expanded={open}
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>

        {open && (
          <>
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {PREMIUM_THEMES.map((item) => {
                const selected = item.id === themeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setThemeId(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 border px-1 py-2 transition-all",
                      selected
                        ? "border-secondary bg-secondary/10 ring-1 ring-secondary/40"
                        : "border-border hover:border-primary/30 hover:bg-muted/40",
                    )}
                    aria-pressed={selected}
                    aria-label={`${item.number}. ${item.name}`}
                  >
                    <span className="flex h-6 w-full overflow-hidden border border-border">
                      {item.swatches.map((color) => (
                        <span
                          key={color}
                          className="h-6 flex-1"
                          style={{ background: color }}
                        />
                      ))}
                    </span>
                    <span className="text-xs font-serif font-bold text-foreground">{item.number}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-serif text-sm font-bold text-foreground leading-tight">
              {theme.number}. {theme.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-secondary mb-1">
              {theme.tagline} · like {theme.inspiredBy}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {theme.description}
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
