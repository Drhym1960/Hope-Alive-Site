import { useState } from "react";
import Layout from "@/components/Layout";
import { useListFaqs } from "@workspace/api-client-react";
import { getListFaqsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";

const defaultFaqs = [
  { id: 1, question: "What is Hope Alive Children Spring Foundation?", answer: "Hope Alive Children Spring Foundation (HACS Foundation) is a registered charitable organisation and orphanage based in Makurdi, Benue State, Nigeria. We provide comprehensive care including shelter, food, education, healthcare, and love to orphaned and vulnerable children." },
  { id: 2, question: "How can I donate to the foundation?", answer: "You can donate through our secure online donation page using Stripe (card payment), PayPal, KoraPay, or via direct bank transfer to our Zenith Bank account: 1224366497 (Naira) or our dollar account: 5074649270. Every donation, no matter the size, makes a real difference." },
  { id: 3, question: "Is my donation tax-deductible?", answer: "HACS Foundation is a registered charitable organisation in Nigeria. Please consult your local tax authority for information regarding deductibility in your country of residence. We issue receipts for all donations upon request." },
  { id: 4, question: "How are donations used?", answer: "100% of your donation goes directly to program activities: feeding, education, healthcare, shelter, and skills training for the children in our care. Administrative costs are covered separately through institutional grants and partnerships." },
  { id: 5, question: "Can I sponsor a specific child?", answer: "Yes! Child sponsorship is one of the most impactful ways to give. Contact us at hacsfoundation10@gmail.com to learn more about our child sponsorship program and how you can support a specific child's journey." },
  { id: 6, question: "How can I volunteer with the foundation?", answer: "We welcome volunteers with skills in education, healthcare, counseling, administration, and more. Reach out to us via email or phone to discuss available opportunities and how your skills can serve our children." },
  { id: 7, question: "Where is the foundation located?", answer: "We are located at Shop No 6, Udoo Plaza, Terwase Agbadu Road, Opp NKST Church, Makurdi, Benue State, Nigeria. You can contact us at 08036238076 or 09016662836." },
  { id: 8, question: "Can organisations partner with HACS Foundation?", answer: "Absolutely. We actively seek partnerships with churches, NGOs, corporations, and government agencies. Corporate sponsorships, in-kind donations, and program partnerships are all welcome. Contact us to discuss partnership opportunities." },
];

export default function FAQ() {
  const { data } = useListFaqs({ query: { queryKey: getListFaqsQueryKey() } });
  const faqs = (data?.faqs?.length ? data.faqs : defaultFaqs);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Questions & Answers</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Everything you need to know about HACS Foundation and how you can support our work.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-serif font-semibold text-foreground text-base">{faq.question}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center transition-transform ${open === i ? "rotate-45 bg-primary" : ""}`}>
                      <svg className={`w-3 h-3 ${open === i ? "text-primary-foreground" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {open === i && (
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-accent border border-border rounded-2xl p-8 text-center">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Still have questions?</h3>
              <p className="text-muted-foreground text-sm mb-6">We're happy to help. Reach out and we'll respond within 1-2 business days.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
                  Contact Us
                </Link>
                <a href="mailto:hacsfoundation10@gmail.com" className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold text-sm hover:bg-primary/5 transition-colors">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
