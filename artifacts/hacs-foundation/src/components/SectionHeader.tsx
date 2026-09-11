interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${light ? "text-secondary" : "text-secondary"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4 ${light ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h2>
      {centered && <div className="section-divider mx-auto mb-4" />}
      {!centered && <div className="section-divider mb-4" />}
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
