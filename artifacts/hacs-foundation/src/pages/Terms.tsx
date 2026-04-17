import Layout from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="pt-16">
        <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-white mb-4">Terms of Use</h1>
            <p className="text-primary-foreground/80">Last updated: January 2025</p>
          </div>
        </section>
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using the website of Hope Alive Children Spring Foundation (hacsfoundation.org), you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use this website.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">2. Use of Website</h2>
                <p>This website is provided for informational purposes and to facilitate charitable donations. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of others.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">3. Donations</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All donations are voluntary and made to support Hope Alive Children Spring Foundation's charitable work.</li>
                  <li>Donations are generally non-refundable. In cases of error or unauthorized transactions, contact us within 7 days.</li>
                  <li>We issue receipts for all recorded donations. Contact us if you require a formal receipt.</li>
                  <li>We are committed to using donations responsibly for the benefit of children in our care.</li>
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
                <p>All content on this website — including text, images, logos, and design — is the property of Hope Alive Children Spring Foundation or used with permission. Reproduction without written consent is prohibited.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">5. Limitation of Liability</h2>
                <p>HACS Foundation is not liable for any indirect, incidental, or consequential damages arising from your use of this website. We make no warranties about the accuracy or completeness of website content.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">6. Changes to Terms</h2>
                <p>We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the updated Terms.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">7. Contact</h2>
                <p>Questions about these Terms? Contact us at hacsfoundation10@gmail.com or call 08036238076.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
