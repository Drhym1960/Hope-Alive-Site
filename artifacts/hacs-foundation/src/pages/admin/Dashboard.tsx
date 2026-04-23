import { useState } from "react";
import { useLocation, Link } from "wouter";
import {
  useAdminMe,
  useAdminLogout,
  useAdminGetAnalytics,
  useAdminListDonations,
  useAdminListContacts,
  useAdminListGallery,
  useAdminCreateGalleryImage,
  useAdminDeleteGalleryImage,
  useAdminListFaqs,
  useAdminCreateFaq,
  useAdminUpdateFaq,
  useAdminDeleteFaq,
} from "@workspace/api-client-react";
import {
  getAdminGetAnalyticsQueryKey,
  getAdminListDonationsQueryKey,
  getAdminListContactsQueryKey,
  getAdminListGalleryQueryKey,
  getAdminListFaqsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type Tab = "overview" | "donations" | "contacts" | "gallery" | "faqs";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("overview");
  const qc = useQueryClient();

  const { data: me, isLoading: meLoading } = useAdminMe({
    query: { queryKey: ["admin", "me"], retry: false },
  });

  const logout = useAdminLogout();

  const handleLogout = async () => {
    await logout.mutateAsync();
    navigate("/admin/login");
  };

  if (meLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!me?.isAdmin) {
    navigate("/admin/login");
    return null;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "donations", label: "Donations" },
    { key: "contacts", label: "Contact Forms" },
    { key: "gallery", label: "Gallery" },
    { key: "faqs", label: "FAQs" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xs">HACS</div>
          <div>
            <div className="font-serif font-semibold text-sm text-primary-foreground">Admin Dashboard</div>
            <div className="text-xs text-primary-foreground/60">Hope Alive Children Spring Foundation</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-primary-foreground/70 text-xs hover:text-primary-foreground transition-colors">
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground text-xs rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-card border-b border-border px-4 sm:px-6">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4 sm:p-6">
        {tab === "overview" && <OverviewTab />}
        {tab === "donations" && <DonationsTab />}
        {tab === "contacts" && <ContactsTab />}
        {tab === "gallery" && <GalleryTab qc={qc} />}
        {tab === "faqs" && <FaqsTab qc={qc} />}
      </main>
    </div>
  );
}

function OverviewTab() {
  const { data, isLoading } = useAdminGetAnalytics({
    query: { queryKey: getAdminGetAnalyticsQueryKey() },
  });

  if (isLoading) return <LoadingState />;
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="font-serif text-2xl font-bold text-foreground">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Donations" value={data.totalDonations.toString()} sub="All time" />
        <StatCard label="Total Amount" value={`₦${Number(data.totalAmount).toLocaleString()}`} sub="Completed donations" />
        <StatCard label="Unique Donors" value={data.totalDonors.toString()} sub="Identified donors" />
        <StatCard label="Payment Methods" value={data.methodBreakdown.length.toString()} sub="Channels used" />
      </div>

      {/* Method Breakdown */}
      {data.methodBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Payment Method Breakdown</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.methodBreakdown.map((m) => (
              <div key={m.method} className="bg-muted rounded-xl p-4">
                <div className="capitalize font-semibold text-foreground text-sm">{m.method.replace("_", " ")}</div>
                <div className="text-2xl font-bold text-primary mt-1">{m.count}</div>
                <div className="text-xs text-muted-foreground">₦{Number(m.total).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Totals */}
      {data.monthlyTotals.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Monthly Donation Totals</h2>
          <div className="space-y-2">
            {data.monthlyTotals.map((m) => (
              <div key={m.month} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground font-medium">{m.month}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary">₦{Number(m.total).toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-2">({m.count} donations)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Donations */}
      {data.recentDonations.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Recent Donations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground text-xs uppercase tracking-wide">
                  <th className="pb-3 pr-4">Donor</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Method</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentDonations.slice(0, 5).map((d) => (
                  <tr key={d.id} className="border-t border-border">
                    <td className="py-3 pr-4 text-foreground">{d.isAnonymous ? "Anonymous" : (d.donorName || "Unknown")}</td>
                    <td className="py-3 pr-4 font-semibold text-primary">{d.currency} {Number(d.amount).toLocaleString()}</td>
                    <td className="py-3 pr-4 capitalize">{d.paymentMethod?.replace("_", " ")}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ""}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.paymentStatus === "completed" ? "bg-green-100 text-green-700" : d.paymentStatus === "failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {d.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.totalDonations === 0 && (
        <div className="bg-accent border border-border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No donations yet. Share the donation page to start receiving support!</p>
          <Link href="/donate" className="inline-block mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
            View Donation Page
          </Link>
        </div>
      )}
    </div>
  );
}

function DonationsTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminListDonations(
    { page, limit: 20 },
    { query: { queryKey: getAdminListDonationsQueryKey({ page, limit: 20 }) } },
  );

  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-foreground mb-6">All Donations</h1>
      {data?.donations.length === 0 ? (
        <EmptyState message="No donations yet." />
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="text-left text-muted-foreground text-xs uppercase tracking-wide">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Donor</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Purpose</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.donations.map((d) => (
                  <tr key={d.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">#{d.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{d.isAnonymous ? "Anonymous" : (d.donorName || "N/A")}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.donorEmail || "N/A"}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{d.currency} {Number(d.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 capitalize">{d.paymentMethod?.replace("_", " ")}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-32 truncate">{d.purpose || "N/A"}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ""}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.paymentStatus === "completed" ? "bg-green-100 text-green-700" : d.paymentStatus === "failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {d.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data && data.total > 20 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Total: {data.total} donations</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40">Prev</button>
                <span className="px-3 py-1 text-sm">Page {page}</span>
                <button onClick={() => setPage(p => p + 1)} disabled={page * 20 >= data.total} className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ContactsTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminListContacts(
    { page, limit: 20 },
    { query: { queryKey: getAdminListContactsQueryKey({ page, limit: 20 }) } },
  );

  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-foreground mb-6">Contact Form Submissions</h1>
      {data?.contacts.length === 0 ? (
        <EmptyState message="No contact messages yet." />
      ) : (
        <div className="space-y-4">
          {data?.contacts.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold text-foreground">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.email} {c.phone && `• ${c.phone}`}</div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}
                </div>
              </div>
              <div className="text-sm font-medium text-primary mb-2">Subject: {c.subject}</div>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.message}</p>
            </div>
          ))}
          {data && data.total > 20 && (
            <div className="flex justify-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40">Prev</button>
              <span className="px-3 py-1 text-sm">Page {page} of {Math.ceil(data.total / 20)}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page * 20 >= data.total} className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40">Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GalleryTab({ qc }: { qc: any }) {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);

  const { data, isLoading } = useAdminListGallery({ query: { queryKey: getAdminListGalleryQueryKey() } });
  const createImage = useAdminCreateGalleryImage();
  const deleteImage = useAdminDeleteGalleryImage();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    await createImage.mutateAsync({ data: { url, caption: caption || null, category: category || null, sortOrder: 0 } });
    setUrl(""); setCaption(""); setCategory("");
    setAdding(false);
    qc.invalidateQueries({ queryKey: getAdminListGalleryQueryKey() });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    await deleteImage.mutateAsync({ id });
    qc.invalidateQueries({ queryKey: getAdminListGalleryQueryKey() });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Gallery Management</h1>
        <button onClick={() => setAdding(!adding)} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold">
          {adding ? "Cancel" : "+ Add Image"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Image URL *</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Caption</label>
              <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Image caption" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Education, Healthcare" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <button type="submit" disabled={createImage.isPending} className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold disabled:opacity-60">
            {createImage.isPending ? "Adding..." : "Add Image"}
          </button>
        </form>
      )}

      {data?.images.length === 0 ? (
        <EmptyState message="No gallery images yet. Add your first image above." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.images.map((img) => (
            <div key={img.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <img src={img.url} alt={img.caption || ""} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="text-sm font-medium text-foreground">{img.caption || "No caption"}</div>
                <div className="text-xs text-muted-foreground mb-3">{img.category || "No category"}</div>
                <button onClick={() => handleDelete(img.id)} className="text-xs text-destructive hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FaqsTab({ qc }: { qc: any }) {
  const [adding, setAdding] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");

  const { data, isLoading } = useAdminListFaqs({ query: { queryKey: getAdminListFaqsQueryKey() } });
  const createFaq = useAdminCreateFaq();
  const updateFaq = useAdminUpdateFaq();
  const deleteFaq = useAdminDeleteFaq();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFaq.mutateAsync({ data: { question, answer, sortOrder: 0 } });
    setQuestion(""); setAnswer(""); setAdding(false);
    qc.invalidateQueries({ queryKey: getAdminListFaqsQueryKey() });
  };

  const handleUpdate = async (id: number) => {
    await updateFaq.mutateAsync({ id, data: { question: editQ, answer: editA, sortOrder: 0 } } as any);
    setEditId(null);
    qc.invalidateQueries({ queryKey: getAdminListFaqsQueryKey() });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return;
    await deleteFaq.mutateAsync({ id });
    qc.invalidateQueries({ queryKey: getAdminListFaqsQueryKey() });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">FAQ Management</h1>
        <button onClick={() => setAdding(!adding)} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold">
          {adding ? "Cancel" : "+ Add FAQ"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Question *</label>
            <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="FAQ question" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Answer *</label>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={4} placeholder="FAQ answer" className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" required />
          </div>
          <button type="submit" disabled={createFaq.isPending} className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold disabled:opacity-60">
            {createFaq.isPending ? "Adding..." : "Add FAQ"}
          </button>
        </form>
      )}

      {data?.faqs.length === 0 ? (
        <EmptyState message="No FAQs yet. Add your first FAQ above." />
      ) : (
        <div className="space-y-4">
          {data?.faqs.map((faq) => (
            <div key={faq.id} className="bg-card border border-border rounded-2xl p-6">
              {editId === faq.id ? (
                <div className="space-y-4">
                  <input value={editQ} onChange={e => setEditQ(e.target.value)} className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  <textarea value={editA} onChange={e => setEditA(e.target.value)} rows={3} className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(faq.id)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Save</button>
                    <button onClick={() => setEditId(null)} className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{faq.answer}</p>
                  <div className="flex gap-4">
                    <button onClick={() => { setEditId(faq.id); setEditQ(faq.question); setEditA(faq.answer); }} className="text-xs text-primary hover:underline">Edit</button>
                    <button onClick={() => handleDelete(faq.id)} className="text-xs text-destructive hover:underline">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{label}</div>
      <div className="font-serif text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center py-16">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
      {message}
    </div>
  );
}
