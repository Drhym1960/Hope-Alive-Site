import { cn } from "@/lib/utils";

type LogoLoaderProps = {
  size?: number;
  label?: string;
  stacked?: boolean;
  className?: string;
};

export function LogoLoader({
  size = 72,
  label = "Loading",
  stacked = true,
  className,
}: LogoLoaderProps) {
  return (
    <div
      className={cn(
        "logo-loader inline-flex items-center justify-center",
        stacked && "flex-col gap-3",
        className,
      )}
      role="status"
      aria-label={label}
    >
      <img
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="logo-loader-mark rounded-full object-contain shrink-0"
        style={{ width: size, height: size }}
        draggable={false}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageLoadingOverlay({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/85 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LogoLoader size={96} label={label} />
    </div>
  );
}
