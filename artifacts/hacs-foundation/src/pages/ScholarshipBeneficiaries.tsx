import { useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import {
  type Beneficiary,
  type EducationLevel,
  LEVEL_LABELS,
  SCHOLARSHIP_SESSION,
  beneficiaries,
  beneficiariesByLevel,
  formatNgn,
  scholarshipTotals,
} from "@/lib/scholarships";

type TabKey = EducationLevel | "all";

const TABS: { key: TabKey; label: string; count: number }[] = [
  { key: "all", label: "All students", count: scholarshipTotals.students },
  { key: "primary", label: "Primary", count: scholarshipTotals.primary },
  { key: "secondary", label: "Secondary", count: scholarshipTotals.secondary },
  { key: "university", label: "University", count: scholarshipTotals.university },
];

const SUMMARY: { label: string; value: string; wide?: boolean }[] = [
  { label: "Students Supported", value: String(scholarshipTotals.students) },
  { label: "Primary School Pupils", value: String(scholarshipTotals.primary) },
  { label: "Secondary School Students", value: String(scholarshipTotals.secondary) },
  { label: "University Students", value: String(scholarshipTotals.university) },
  { label: "Total Scholarship Commitment", value: formatNgn(scholarshipTotals.commitment), wide: true },
];

function FeeBreakdown({ student }: { student: Beneficiary }) {
  return (
    <div className="border-t border-border pt-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">
        Fee breakdown · {student.session}
      </p>
      <dl className="space-y-2">
        {student.fees.map((line) => (
          <div key={line.label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-muted-foreground">{line.label}</dt>
            <dd className="font-medium text-foreground tabular-nums">
              {line.amount === null ? (
                <span className="text-muted-foreground font-normal italic">Not stated</span>
              ) : (
                formatNgn(line.amount)
              )}
            </dd>
          </div>
        ))}
        <div className="flex items-start justify-between gap-4 text-sm pt-2 border-t border-border">
          <dt className="font-semibold text-foreground">Official total</dt>
          <dd className="font-serif font-bold text-primary tabular-nums">{formatNgn(student.total)}</dd>
        </div>
      </dl>
      {student.level === "secondary" && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          Visible line items add up to ₦74,000. The Medical amount is not printed on the source document, so it is left unconfirmed. The official total remains {formatNgn(student.total)}.
        </p>
      )}
    </div>
  );
}

function StudentCard({
  student,
  expanded,
  onToggle,
}: {
  student: Beneficiary;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full text-left p-5 sm:p-6 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">
              {LEVEL_LABELS[student.level]}
            </p>
            <h3 className="font-serif text-xl font-bold text-foreground leading-tight">{student.name}</h3>
            {student.institution && (
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{student.institution}</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Academic session {student.session}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-serif text-lg sm:text-xl font-bold text-primary tabular-nums">
              {formatNgn(student.total)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {expanded ? "Hide details" : "View details"}
            </p>
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-5 sm:px-6 pb-6">
          <FeeBreakdown student={student} />
        </div>
      )}
    </article>
  );
}

function LevelSection({
  level,
  students,
  expanded,
  onToggle,
}: {
  level: EducationLevel;
  students: Beneficiary[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  const subtotal =
    level === "primary"
      ? scholarshipTotals.primaryAmount
      : level === "secondary"
        ? scholarshipTotals.secondaryAmount
        : scholarshipTotals.universityAmount;

  return (
    <section aria-labelledby={`${level}-heading`} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h2 id={`${level}-heading`} className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {LEVEL_LABELS[level]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {students.length} {students.length === 1 ? "student" : "students"} · {formatNgn(subtotal)}
          </p>
        </div>
      </div>
      <div className={cn("grid gap-4", level === "university" ? "lg:grid-cols-2" : "md:grid-cols-2")}>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            expanded={expanded.has(student.id)}
            onToggle={() => onToggle(student.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default function ScholarshipBeneficiaries() {
  const [tab, setTab] = useState<TabKey>("all");
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(beneficiaries.filter((b) => b.level === "university").map((b) => b.id)),
  );

  const visible = useMemo(() => beneficiariesByLevel(tab), [tab]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const grouped: EducationLevel[] =
    tab === "all" ? ["primary", "secondary", "university"] : [tab];

  return (
    <Layout>
      <Seo
        title="Education Scholarship Programme 2026/2027 | Children We Support"
        description="Hope Alive Children Spring Foundation is supporting 19 students in the 2026/2027 academic session — 12 primary, 5 secondary, and 2 university — with a documented scholarship commitment of ₦1,671,000."
        path="/scholarship-beneficiaries"
        keywords="HACS Foundation scholarships, children we support, education scholarship Nigeria, primary school fees Benue, university scholarship Makurdi, Hope Alive Children Spring Foundation beneficiaries"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: "https://www.hacsfoundation.com/scholarship-beneficiaries",
          name: "Education Scholarship Programme 2026/2027",
          description:
            "Scholarship beneficiaries supported by Hope Alive Children Spring Foundation for the 2026/2027 academic session.",
          isPartOf: { "@id": "https://www.hacsfoundation.com/#website" },
        }}
      />

      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
              Children We Support
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
              Education Scholarship Programme {SCHOLARSHIP_SESSION}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Hope Alive Children Spring Foundation supports children at primary, secondary, and university levels by helping with tuition and other educational expenses for the {SCHOLARSHIP_SESSION} academic session.
            </p>
          </div>
        </section>

        <Breadcrumb
          items={[
            { label: "Programmes", href: "/programs" },
            { label: "Scholarship Beneficiaries" },
          ]}
        />

        <section className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {SUMMARY.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "bg-card border border-border rounded-2xl p-5 text-center shadow-sm",
                    item.wide && "col-span-2 lg:col-span-1",
                  )}
                >
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-primary tabular-nums leading-tight">
                    {item.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              role="tablist"
              aria-label="Scholarship categories"
              className="flex flex-wrap gap-2 mb-10 p-1.5 bg-muted/70 rounded-full w-full sm:w-fit"
            >
              {TABS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.key}
                  onClick={() => setTab(item.key)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                    tab === item.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-card",
                  )}
                >
                  {item.label}
                  <span className="ml-1.5 opacity-70">{item.count}</span>
                </button>
              ))}
            </div>

            <div className="space-y-14">
              {grouped.map((level) => (
                <LevelSection
                  key={level}
                  level={level}
                  students={visible.filter((s) => s.level === level)}
                  expanded={expanded}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-accent/30 border-y border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Why This Matters"
              title="Investing in Their Future"
              subtitle="The foundation’s education programme helps reduce financial barriers and gives children the opportunity to remain in school and continue their education."
              centered
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed text-center">
              <p>
                For many families, school fees, uniforms, books, and levies are the difference between a child staying in class and dropping out. By covering documented educational expenses for {scholarshipTotals.students} students this session, Hope Alive Children Spring Foundation keeps the path to learning open — from primary school through university.
              </p>
              <p>
                Every amount shown on this page is taken from the foundation’s scholarship records for {SCHOLARSHIP_SESSION}. Where a line item was not printed on the source document, it is marked as not stated rather than estimated.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold text-center hover:bg-secondary/90 transition-colors shadow-md"
              >
                Support a student’s education
              </Link>
              <Link
                href="/education-support"
                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold text-center hover:bg-primary/5 transition-colors"
              >
                Learn about education support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
