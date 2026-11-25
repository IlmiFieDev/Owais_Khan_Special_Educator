import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const { authorised } = await getAdminSession();
  if (!authorised) redirect("/admin/login");

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
        <p className="max-w-md text-center text-ink-muted">
          Admin data access requires `SUPABASE_SERVICE_ROLE_KEY` and `OWNER_USER_ID`
          to be configured on the server.
        </p>
      </div>
    );
  }

  const admin = createSupabaseAdmin();
  const [{ data: enquiries }, { data: feedback }] = await Promise.all([
    admin
      .from("enquiries")
      .select(
        "id, name, email, phone, enquiry_type, preferred_contact_method, message, status, created_at"
      )
      .order("created_at", { ascending: false }),
    admin
      .from("feedback")
      .select(
        "id, name, relationship, rating, message, consent_to_display, publication_consent, status, moderation_status, created_at"
      )
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      enquiries={enquiries ?? []}
      feedback={feedback ?? []}
    />
  );
}
