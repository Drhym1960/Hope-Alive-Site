import { Link } from "wouter";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import { TestimoniesSection } from "@/components/TestimoniesSection";

export default function Testimonies() {
  return (
    <Layout>
      <Seo
        title="Testimonies from Our Beneficiaries"
        description="Hear from beneficiaries of Hope Alive Children Spring Foundation in Makurdi — young people whose schooling, shelter, and care have been held by the house."
        path="/testimonies"
        keywords="HACS Foundation testimonies, beneficiary stories Nigeria, Hope Alive Children Spring Foundation videos, scholarship beneficiary testimony"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: "https://www.hacsfoundation.com/testimonies",
          name: "Testimonies from Our Beneficiaries | HACS Foundation",
          description: "Video testimonies and words from beneficiaries of Hope Alive Children Spring Foundation.",
          isPartOf: { "@id": "https://www.hacsfoundation.com/#website" },
          about: { "@id": "https://www.hacsfoundation.com/#organization" },
        }}
      />

      <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">Voices</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Testimonies from our beneficiaries
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mx-auto">
            These are the young people in our care, speaking for themselves.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Testimonies" }]} />

      <TestimoniesSection showIntro={false} />

      <section className="py-16 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Stand with the next child</h2>
          <p className="text-primary-foreground/80 mb-8">A gift keeps a school year, a table, and a house open.</p>
          <Link
            href="/donate"
            className="inline-flex px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold shadow-xl donate-btn-pulse"
          >
            Place a gift
          </Link>
        </div>
      </section>
    </Layout>
  );
}
