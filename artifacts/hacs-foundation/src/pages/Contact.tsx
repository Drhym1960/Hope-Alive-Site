import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useSubmitContact } from "@workspace/api-client-react";
import { SectionHeader } from "@/components/SectionHeader";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please enter a message of at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    await submitContact.mutateAsync({ data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      honeypot: data.honeypot || null,
    }});
    setSubmitted(true);
  };

  return (
    <Layout>
      <Seo title="Contact Us" description="Get in touch with Hope Alive Children Spring Foundation in Makurdi, Benue State, Nigeria. Call 08036238076 or email hacsfoundation10@gmail.com to support our children." path="/contact" />
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              We'd love to hear from you. Whether you want to partner with us, volunteer, or simply ask a question, reach out anytime.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Our Contact Details</h2>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                  <div>
                    <h4 className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Address</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Office No 5, Udoo Plaza,<br />
                      Opp NKST Church, Ama Terwase Agbadu Road,<br />
                      Makurdi, Benue State, Nigeria
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Phone</h4>
                    <a href="tel:08036238076" className="block text-muted-foreground text-sm hover:text-primary">08036238076</a>
                    <a href="tel:09016662836" className="block text-muted-foreground text-sm hover:text-primary">09016662836</a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Email</h4>
                    <a href="mailto:hacsfoundation10@gmail.com" className="text-muted-foreground text-sm hover:text-primary break-all">
                      hacsfoundation10@gmail.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Website</h4>
                    <a href="https://hacsfoundation.com" className="text-muted-foreground text-sm hover:text-primary">
                      hacsfoundation.com
                    </a>
                  </div>
                </div>

                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <h3 className="font-serif text-base font-semibold text-secondary mb-2">Want to Give?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Your donation directly supports orphaned children in Makurdi.
                  </p>
                  <a href="/donate" className="block text-center px-4 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-colors">
                    Donate Now
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="bg-card border border-border rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Message Received!</h2>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll respond to your message within 1-2 business days.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">Send Us a Message</h2>

                    {/* Honeypot anti-spam */}
                    <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                        <input {...register("name")} placeholder="Your full name" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                        <input {...register("email")} type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                        <input {...register("phone")} placeholder="080XXXXXXXX" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                        <input {...register("subject")} placeholder="How can we help?" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                      <textarea {...register("message")} rows={6} placeholder="Write your message here..." className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {submitContact.isError && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-destructive text-sm">
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-all disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
