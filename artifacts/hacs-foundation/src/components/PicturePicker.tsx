import { useState } from "react";
import { PICTURE_LAYOUTS } from "@/lib/pictureLayouts";
import { usePicture } from "@/components/PictureProvider";
import { cn } from "@/lib/utils";

export function PicturePicker() {
  const { pictureId, picture, setPictureId } = usePicture();
  const [open, setOpen] = useState(true);

  return (
    <aside
      className="picture-picker landing-picker theme-picker fixed z-[80] left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:w-[24rem]"
      aria-label="Picture display mockups"
    >
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-xl p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              2 picture displays
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              How the children photos sit on the page. Reply 1 or 2.
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
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {PICTURE_LAYOUTS.map((item) => {
                const selected = item.id === pictureId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPictureId(item.id)}
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
              {picture.number}. {picture.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-secondary mb-1">{picture.tagline}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{picture.description}</p>
          </>
        )}
      </div>
    </aside>
  );
}
