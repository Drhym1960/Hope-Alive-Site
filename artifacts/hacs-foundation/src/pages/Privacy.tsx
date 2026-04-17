import Layout from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="pt-16">
        <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-primary-foreground/80">Last updated: January 2025</p>
          </div>
        </section>
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">1. Introduction</h2>
                <p>Hope Alive Children Spring Foundation ("HACS Foundation", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website hacsfoundation.org or make a donation.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
                <p>We may collect the following information when you interact with our website:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Name, email address, phone number when you donate or contact us</li>
                  <li>Donation amount, payment method, and transaction reference</li>
                  <li>Messages submitted through our contact form</li>
                  <li>Browsing data such as IP address, browser type, and pages visited</li>
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To process and acknowledge your donation</li>
                  <li>To send you donation receipts and thank-you communications</li>
                  <li>To respond to your inquiries and contact form submissions</li>
                  <li>To improve our website and services</li>
                  <li>To send occasional updates about our programs (only with your consent)</li>
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">4. Payment Security</h2>
                <p>All online payments are processed through secure, PCI-compliant payment processors (Stripe, PayPal, KoraPay). We do not store your card details on our servers. Bank transfer information is provided for reference only.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">5. Data Sharing</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information with payment processors to complete transactions, or with legal authorities if required by law.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">6. Data Retention</h2>
                <p>We retain donation records for accounting and legal compliance purposes. Contact form submissions are retained for up to 2 years. You may request deletion of your data by contacting us.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hacsfoundation10@gmail.com.</p>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-3">8. Contact Us</h2>
                <p>For privacy-related questions, contact us at:</p>
                <p className="mt-2"><strong>Hope Alive Children Spring Foundation</strong><br />
                Shop No 6, Udoo Plaza, Terwase Agbadu Road, Opp NKST Church, Makurdi, Benue State, Nigeria<br />
                Email: hacsfoundation10@gmail.com<br />
                Phone: 08036238076</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
