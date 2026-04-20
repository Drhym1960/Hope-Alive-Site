import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/Layout";
import { useCreateDonation, useCreateStripeSession } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";

const ngnPresets = [1000, 5000, 10000, 50000];
const gbpPresets = [5, 20, 50, 100];
const usdPresets = [5, 25, 50, 100];

const donationSchema = z.object({
  donorName: z.string().optional(),
  donorEmail: z.string().email("Enter a valid email").optional().or(z.literal("")),
  donorPhone: z.string().optional(),
  purpose: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  amount: z.number().min(1, "Please enter an amount"),
  currency: z.string().default("NGN"),
  paymentMethod: z.enum(["stripe", "paypal", "korapay", "bank_transfer"]),
});

type DonationForm = z.infer<typeof donationSchema>;

const currencyForMethod = (m: string): { code: "NGN" | "GBP" | "USD"; symbol: string; presets: number[]; defaultAmt: number } => {
  if (m === "stripe") return { code: "GBP", symbol: "£", presets: gbpPresets, defaultAmt: 20 };
  if (m === "paypal") return { code: "USD", symbol: "$", presets: usdPresets, defaultAmt: 25 };
  return { code: "NGN", symbol: "₦", presets: ngnPresets, defaultAmt: 5000 };
};

export default function Donate() {
  const [, navigate] = useLocation();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDonation = useCreateDonation();
  const createStripeSession = useCreateStripeSession();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      paymentMethod: "bank_transfer",
      isAnonymous: false,
      amount: 5000,
      currency: "NGN",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const isAnonymous = watch("isAnonymous");
  const cur = currencyForMethod(paymentMethod);

  // Reset amount when payment method changes (since currency changes)
  useEffect(() => {
    setSelectedPreset(cur.defaultAmt);
    setCustomAmount("");
    setValue("amount", cur.defaultAmt);
    setValue("currency", cur.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  const handlePresetSelect = (amt: number) => {
    setSelectedPreset(amt);
    setCustomAmount("");
    setValue("amount", amt);
  };

  const handleCustomAmount = (val: string) => {
    setCustomAmount(val);
    setSelectedPreset(null);
    const num = parseFloat(val.replace(/,/g, ""));
    if (!isNaN(num)) setValue("amount", num);
  };

  const onSubmit = async (data: DonationForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (data.paymentMethod === "stripe") {
        const session = await createStripeSession.mutateAsync({ data: {
          amount: data.amount,
          currency: "GBP",
          donorName: data.isAnonymous ? null : (data.donorName || null),
          donorEmail: data.donorEmail || null,
          donorPhone: data.donorPhone || null,
          purpose: data.purpose || null,
          isAnonymous: data.isAnonymous,
        }});
        if (session.url) {
          window.location.href = session.url;
        }
      } else if (data.paymentMethod === "bank_transfer") {
        await createDonation.mutateAsync({ data: {
          amount: data.amount,
          currency: "NGN",
          paymentMethod: "bank_transfer",
          donorName: data.isAnonymous ? null : (data.donorName || null),
          donorEmail: data.donorEmail || null,
          donorPhone: data.donorPhone || null,
          purpose: data.purpose || null,
          isAnonymous: data.isAnonymous,
          transactionId: null,
        }});
        navigate("/donate/thank-you");
      } else if (data.paymentMethod === "paypal") {
        await createDonation.mutateAsync({ data: {
          amount: data.amount,
          currency: "USD",
          paymentMethod: "paypal",
          donorName: data.isAnonymous ? null : (data.donorName || null),
          donorEmail: data.donorEmail || null,
          donorPhone: data.donorPhone || null,
          purpose: data.purpose || null,
          isAnonymous: data.isAnonymous,
          transactionId: null,
        }});
        const ppKey = import.meta.env.VITE_PAYPAL_CLIENT_ID;
        if (ppKey) {
          window.open("https://www.paypal.com/donate", "_blank");
        } else {
          navigate("/donate/thank-you");
        }
      } else if (data.paymentMethod === "korapay") {
        await createDonation.mutateAsync({ data: {
          amount: data.amount,
          currency: "NGN",
          paymentMethod: "korapay",
          donorName: data.isAnonymous ? null : (data.donorName || null),
          donorEmail: data.donorEmail || null,
          donorPhone: data.donorPhone || null,
          purpose: data.purpose || null,
          isAnonymous: data.isAnonymous,
          transactionId: null,
        }});
        navigate("/donate/thank-you");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again or use bank transfer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="pt-16">
        <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Support Our Children</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Make a Donation</h1>
            <p className="text-primary-foreground/80 text-lg">
              Your generosity directly feeds, educates, and protects vulnerable children in Makurdi, Nigeria.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Donation Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
                  {/* Amount */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Choose Amount <span className="text-sm font-normal text-muted-foreground">({cur.code})</span></h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {cur.presets.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePresetSelect(amt)}
                          className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                            selectedPreset === amt
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          {cur.symbol}{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{cur.symbol}</span>
                      <input
                        type="text"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    {errors.amount && <p className="text-destructive text-xs mt-1">{errors.amount.message}</p>}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Payment Method</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: "bank_transfer", label: "Bank Transfer" },
                        { value: "stripe", label: "Card (Stripe)" },
                        { value: "paypal", label: "PayPal" },
                        { value: "korapay", label: "KoraPay" },
                      ].map((m) => (
                        <label key={m.value} className="cursor-pointer">
                          <input type="radio" value={m.value} {...register("paymentMethod")} className="sr-only" />
                          <div className={`py-3 px-4 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                            paymentMethod === m.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-muted-foreground hover:border-primary"
                          }`}>
                            {m.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bank Transfer Info */}
                  {paymentMethod === "bank_transfer" && (
                    <div className="bg-accent border border-border rounded-2xl p-6">
                      <h4 className="font-semibold text-foreground mb-4">Bank Account Details</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Naira Account (Zenith Bank)</div>
                          <div className="font-semibold text-foreground">Hope Alive Children Spring Foundation</div>
                          <div className="font-mono text-primary text-lg font-bold">1224366497</div>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dollar Account</div>
                          <div className="font-semibold text-foreground">Hope Alive Children Spring Foundation</div>
                          <div className="font-mono text-primary text-lg font-bold">5074649270</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        After making your transfer, fill the form below and click "Confirm Donation" so we can acknowledge your gift.
                      </p>
                    </div>
                  )}

                  {/* PayPal Notice */}
                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800">
                      PayPal integration will redirect you to complete your donation on PayPal's secure platform. Fill your details below first.
                    </div>
                  )}

                  {/* KoraPay Notice */}
                  {paymentMethod === "korapay" && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-800">
                      KoraPay is being set up. For now, your donation record will be saved and you will receive confirmation. You can also use Bank Transfer for immediate processing.
                    </div>
                  )}

                  {/* Donor Info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-xl font-semibold text-foreground">Your Information</h3>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" {...register("isAnonymous")} className="w-4 h-4 accent-primary" />
                        <span className="text-muted-foreground">Donate anonymously</span>
                      </label>
                    </div>
                    {!isAnonymous && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                          <input {...register("donorName")} placeholder="Your name" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                          <input {...register("donorEmail")} type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                          {errors.donorEmail && <p className="text-destructive text-xs mt-1">{errors.donorEmail.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                          <input {...register("donorPhone")} placeholder="08000000000" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Donation Purpose (optional)</label>
                          <input {...register("purpose")} placeholder="e.g. For the feeding program" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                      </div>
                    )}
                    {isAnonymous && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Donation Purpose (optional)</label>
                        <input {...register("purpose")} placeholder="e.g. For the feeding program" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-secondary text-secondary-foreground rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed donate-btn-pulse"
                  >
                    {isSubmitting ? "Processing..." : paymentMethod === "bank_transfer" ? "Confirm Donation" : paymentMethod === "stripe" ? "Continue to Secure Payment" : `Donate with ${paymentMethod === "paypal" ? "PayPal" : "KoraPay"}`}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your donation is secure. We never store card details. Hope Alive Children Spring Foundation.
                  </p>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <h3 className="font-serif text-lg font-semibold text-secondary mb-4">Your Impact</h3>
                  <ul className="space-y-3 text-sm text-primary-foreground/85">
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">₦1,000</span>
                      <span>Feeds a child for 3 days</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">₦5,000</span>
                      <span>Covers a month of school supplies</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">₦10,000</span>
                      <span>Provides healthcare for one child for a month</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">₦50,000</span>
                      <span>Covers school fees for one child for a term</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-serif text-base font-semibold text-foreground mb-3">Need Help?</h3>
                  <p className="text-muted-foreground text-sm mb-4">Having trouble donating? Contact us directly and we'll assist you.</p>
                  <div className="space-y-2 text-sm">
                    <a href="mailto:hacsfoundation10@gmail.com" className="flex items-center gap-2 text-primary hover:underline">
                      hacsfoundation10@gmail.com
                    </a>
                    <a href="tel:08036238076" className="flex items-center gap-2 text-primary hover:underline">
                      08036238076
                    </a>
                    <a href="tel:09016662836" className="flex items-center gap-2 text-primary hover:underline">
                      09016662836
                    </a>
                  </div>
                </div>

                <div className="bg-accent border border-border rounded-2xl p-6">
                  <h3 className="font-serif text-base font-semibold text-foreground mb-3">Bank Transfer Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase mb-1">Naira (Zenith Bank)</div>
                      <div className="font-mono font-bold text-primary text-base">1224366497</div>
                      <div className="text-xs text-muted-foreground">Hope Alive Children Spring Foundation</div>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="text-xs text-muted-foreground uppercase mb-1">Dollar Account</div>
                      <div className="font-mono font-bold text-primary text-base">5074649270</div>
                      <div className="text-xs text-muted-foreground">Hope Alive Children Spring Foundation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
