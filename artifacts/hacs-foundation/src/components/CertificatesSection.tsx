import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import scumlCert from "@assets/file_0000000005dc72468a99f867fb432e41_1776950214037.png";
import cacCert from "@assets/file_00000000ffdc7243a39fe6ba3dd8dfef_1776950214093.png";

const certificates = [
  {
    id: "cac",
    title: "CAC Certificate of Incorporation",
    subtitle: "Corporate Affairs Commission · Registration No. 179461",
    src: cacCert,
    alt: "CAC Certificate of Incorporation for Hope Alive Children Spring Foundation",
  },
  {
    id: "scuml",
    title: "SCUML Certificate of Registration",
    subtitle: "Special Control Unit Against Money Laundering · RN: SC 071401705",
    src: scumlCert,
    alt: "SCUML Registration Certificate for Hope Alive Children Spring Foundation",
  },
];

const trustPoints = [
  { icon: "🛡️", title: "Registered Organisation", desc: "Officially incorporated in Nigeria with the CAC and SCUML." },
  { icon: "🔍", title: "Transparent Operations", desc: "Open records of our work, programmes and finances." },
  { icon: "💚", title: "Donation Accountability", desc: "Every gift is tracked and used to care for our children." },
];

export default function CertificatesSection() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="certificates" className="py-20 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Verified & Registered"
          title="Our Registration & Certification"
          subtitle="We believe in transparency, accountability, and public trust. Below are our official registration documents showing that Hope Alive Children Spring Foundation is duly registered."
          centered
        />

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {certificates.map((cert, idx) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => setOpen(idx)}
              className="group bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden text-left flex flex-col focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Enlarge ${cert.title}`}
            >
              <div className="bg-muted p-6 flex items-center justify-center">
                <img
                  src={cert.src}
                  alt={cert.alt}
                  loading="lazy"
                  className="max-h-80 w-auto object-contain shadow-sm group-hover:scale-[1.02] transition-transform"
                />
              </div>
              <div className="p-6 border-t border-border">
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cert.subtitle}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:underline">
                  Click to enlarge
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mt-10 leading-relaxed">
          Hope Alive Children Spring Foundation is officially registered in Nigeria and committed to operating with integrity, transparency, and accountability in all charitable activities.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          {trustPoints.map((tp) => (
            <div key={tp.title} className="bg-accent/40 border border-border rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">{tp.icon}</div>
              <div className="font-serif font-semibold text-primary text-sm mb-1">{tp.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{tp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 overflow-auto"
          role="dialog"
          aria-modal="true"
          aria-label={certificates[open].title}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen(null); }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl leading-none focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
          >
            ×
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={certificates[open].src}
              alt={certificates[open].alt}
              className="w-full h-auto rounded-lg shadow-2xl bg-white"
            />
            <p className="text-white/90 text-sm text-center mt-4 font-serif">
              {certificates[open].title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
