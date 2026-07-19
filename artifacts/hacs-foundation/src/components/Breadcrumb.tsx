import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component.
 * Renders both visible breadcrumbs and BreadcrumbList JSON-LD.
 * Usage: <Breadcrumb items={[{ label: "About", href: "/about" }]} />
 * The last item (current page) should have no href.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const BASE_URL = "https://www.hacsfoundation.com";

  const all = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visible breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {all.map((item, index) => {
            const isLast = index === all.length - 1;
            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && <span className="text-muted-foreground/50" aria-hidden="true">›</span>}
                {isLast || !item.href ? (
                  <span className="text-foreground font-medium" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-secondary transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
