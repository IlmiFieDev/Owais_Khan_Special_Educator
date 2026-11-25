"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

type Enquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  enquiry_type: string;
  preferred_contact_method: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  created_at: string;
};

type Feedback = {
  id: string;
  name: string;
  relationship: string;
  rating: number | null;
  message: string;
  consent_to_display?: boolean;
  publication_consent?: boolean;
  status?: string;
  moderation_status?: string | null;
  created_at: string;
};

interface AdminDashboardProps {
  enquiries: Enquiry[];
  feedback: Feedback[];
}

export default function AdminDashboard({
  enquiries: initialEnquiries,
  feedback: initialFeedback,
}: AdminDashboardProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [enquiryFilter, setEnquiryFilter] = useState("all");
  const [feedbackFilter, setFeedbackFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const enquiries = useMemo(() => {
    return initialEnquiries.filter((item) => {
      const matchesStatus =
        enquiryFilter === "all" || item.status === enquiryFilter;
      const haystack = `${item.name} ${item.email ?? ""} ${item.phone ?? ""} ${item.message}`.toLowerCase();
      return matchesStatus && haystack.includes(query.toLowerCase());
    });
  }, [initialEnquiries, enquiryFilter, query]);

  const feedback = useMemo(() => {
    return initialFeedback.filter((item) => {
      const status = item.moderation_status || item.status || "pending";
      const matchesStatus = feedbackFilter === "all" || status === feedbackFilter;
      const haystack = `${item.name} ${item.message}`.toLowerCase();
      return matchesStatus && haystack.includes(query.toLowerCase());
    });
  }, [initialFeedback, feedbackFilter, query]);

  const avgRating = useMemo(() => {
    const rated = initialFeedback.filter((f) => typeof f.rating === "number");
    if (!rated.length) return null;
    const sum = rated.reduce((acc, f) => acc + (f.rating || 0), 0);
    return (sum / rated.length).toFixed(1);
  }, [initialFeedback]);

  const mutate = async (url: string, body: Record<string, unknown>) => {
    setError("");
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setError(json.error || "Update failed.");
      return;
    }
    startTransition(() => router.refresh());
  };

  const remove = async (url: string, id: string) => {
    if (!window.confirm("Delete this record permanently?")) return;
    setError("");
    const res = await fetch(`${url}?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setError(json.error || "Delete failed.");
      return;
    }
    startTransition(() => router.refresh());
  };

  const logout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ivory px-4 py-8">
      <div className="mx-auto w-[min(1100px,100%)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-dark">
              Admin dashboard
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold text-ink">
              Enquiries & feedback
            </h1>
          </div>
          <Button type="button" variant="secondary" onClick={logout}>
            Log out
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-soft border border-white/70 bg-frost/80 p-4 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-dark">
              Enquiries
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold">{initialEnquiries.length}</p>
          </div>
          <div className="rounded-soft border border-white/70 bg-frost/80 p-4 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-dark">
              Feedback
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold">{initialFeedback.length}</p>
          </div>
          <div className="rounded-soft border border-white/70 bg-frost/80 p-4 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-dark">
              Avg rating
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold">
              {avgRating ?? "—"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <input
            className="field max-w-sm"
            placeholder="Search records"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search records"
          />
          <select
            className="field max-w-[12rem]"
            value={enquiryFilter}
            onChange={(e) => setEnquiryFilter(e.target.value)}
            aria-label="Filter enquiries"
          >
            <option value="all">All enquiry statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="field max-w-[12rem]"
            value={feedbackFilter}
            onChange={(e) => setFeedbackFilter(e.target.value)}
            aria-label="Filter feedback"
          >
            <option value="all">All feedback statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {error && (
          <p className="mt-4 text-sm text-[#b42318]" role="alert">
            {error}
          </p>
        )}
        {pending && (
          <p className="mt-2 text-sm text-ink-muted" role="status">
            Refreshing…
          </p>
        )}

        <section className="mt-10" aria-labelledby="admin-enquiries">
          <h2 id="admin-enquiries" className="font-heading text-2xl font-semibold text-ink">
            Enquiries
          </h2>
          <div className="mt-4 space-y-3">
            {enquiries.map((item) => (
              <article
                key={item.id}
                className="rounded-soft border border-white/70 bg-frost/80 p-4 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-ink">{item.name}</h3>
                    <p className="text-xs text-ink-muted">
                      {item.enquiry_type} · {item.preferred_contact_method} ·{" "}
                      {new Date(item.created_at).toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {item.email || "No email"} · {item.phone || "No phone"}
                    </p>
                  </div>
                  <select
                    className="field w-auto"
                    value={item.status}
                    onChange={(e) =>
                      mutate("/api/admin/enquiries", {
                        id: item.id,
                        status: e.target.value,
                      })
                    }
                    aria-label={`Status for enquiry from ${item.name}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-ink-muted">{item.message}</p>
                <button
                  type="button"
                  className="mt-3 text-xs font-bold text-[#b42318]"
                  onClick={() => remove("/api/admin/enquiries", item.id)}
                >
                  Delete
                </button>
              </article>
            ))}
            {!enquiries.length && (
              <p className="text-sm text-ink-muted">No enquiries match the current filters.</p>
            )}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="admin-feedback">
          <h2 id="admin-feedback" className="font-heading text-2xl font-semibold text-ink">
            Feedback
          </h2>
          <div className="mt-4 space-y-3">
            {feedback.map((item) => {
              const status = item.moderation_status || item.status || "pending";
              const consent =
                item.publication_consent ?? item.consent_to_display ?? false;
              return (
                <article
                  key={item.id}
                  className="rounded-soft border border-white/70 bg-frost/80 p-4 shadow-soft"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-ink">{item.name}</h3>
                      <p className="text-xs text-ink-muted">
                        {item.relationship}
                        {item.rating ? ` · ${item.rating}/5` : ""} ·{" "}
                        {consent ? "Publication consented" : "Private only"} ·{" "}
                        {new Date(item.created_at).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="soft"
                        className="!min-h-9 !px-3 !text-xs"
                        onClick={() =>
                          mutate("/api/admin/feedback", {
                            id: item.id,
                            status: "approved",
                          })
                        }
                        disabled={!consent}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="!min-h-9 !px-3 !text-xs"
                        onClick={() =>
                          mutate("/api/admin/feedback", {
                            id: item.id,
                            status: "rejected",
                          })
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-teal-dark">
                    Status: {status}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-ink-muted">
                    {item.message}
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-xs font-bold text-[#b42318]"
                    onClick={() => remove("/api/admin/feedback", item.id)}
                  >
                    Delete
                  </button>
                </article>
              );
            })}
            {!feedback.length && (
              <p className="text-sm text-ink-muted">No feedback match the current filters.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
