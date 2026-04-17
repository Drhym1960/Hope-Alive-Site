import { useEffect, useState } from "react";
import { useSearch, Link } from "wouter";
import Layout from "@/components/Layout";
import { useVerifyStripePayment } from "@workspace/api-client-react";

export default function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");
  const [verified, setVerified] = useState(false);
  const [donation, setDonation] = useState<any>(null);

  const verifyStripe = useVerifyStripePayment();

  useEffect(() => {
    if (sessionId && !verified) {
      verifyStripe.mutateAsync({ data: { sessionId } }).then((d) => {
        setDonation(d);
        setVerified(true);
      }).catch(() => {
        setVerified(true);
      });
    } else if (!sessionId) {
      setVerified(true);
    }
  }, [sessionId]);

  return (
    <Layout>
      <div className="pt-16 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <svg className="w-10 h-10 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Thank You for Your Generosity!
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Your donation has been received and will go directly toward caring for orphaned and vulnerable children in Makurdi, Nigeria. You have made a real difference today.
          </p>

          {donation && (
            <div className="bg-accent border border-border rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3">Donation Summary</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-semibold text-foreground">{donation.currency} {Number(donation.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold text-foreground capitalize">{donation.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reference</span>
                  <span className="font-semibold text-foreground">#{donation.id}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-serif text-lg font-semibold text-primary mb-3">What Your Gift Makes Possible</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                Nutritious meals for hungry children who depend on us daily
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                School fees and supplies that keep children in education
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                Healthcare and medical support for sick and recovering children
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                A safe, loving home where children feel secure and valued
              </li>
            </ul>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-primary-foreground mb-8">
            <p className="font-serif italic text-lg mb-2">"Giving Love a Chance"</p>
            <p className="text-primary-foreground/80 text-sm">
              — Hope Alive Children Spring Foundation
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Return Home
            </Link>
            <Link href="/donate" className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors">
              Donate Again
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
