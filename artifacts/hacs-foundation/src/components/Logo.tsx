import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  wordmark?: boolean;
  wordmarkHiddenOnMobile?: boolean;
  inverted?: boolean;
  className?: string;
};

export function Logo({
  size = 56,
  wordmark = true,
  wordmarkHiddenOnMobile = false,
  inverted = false,
  className,
}: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        src="/logo.png"
        alt="Hope Alive Children Spring Foundation"
        width={size}
        height={size}
        className="rounded-full bg-white shadow-sm object-contain shrink-0"
      />
      {wordmark && (
        <span className={cn(wordmarkHiddenOnMobile && "hidden sm:block")}>
          <span
            className={cn(
              "font-serif font-bold text-sm leading-tight block transition-colors",
              inverted ? "text-primary-foreground" : "text-primary",
            )}
          >
            Hope Alive Children Spring
          </span>
          <span
            className={cn(
              "text-xs block transition-colors",
              inverted ? "text-primary-foreground/80" : "text-muted-foreground",
            )}
          >
            Foundation
          </span>
        </span>
      )}
    </span>
  );
}
