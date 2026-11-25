import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ items: [] }, { headers: { "Cache-Control": "public, max-age=60" } });
  }

  try {
    const admin = createSupabaseAdmin();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);
    const { data, error } = await admin
      .from("feedback")
      .select("id, name, relationship, rating, message")
      .eq("status", "approved")
      .eq("publication_consent", true)
      .eq("consent_to_display", true)
      .not("rating", "is", null)
      .order("created_at", { ascending: false })
      .limit(6)
      .abortSignal(controller.signal);
    clearTimeout(timeout);

    if (error) return NextResponse.json({ items: [] }, { status: 200 });

    const items = (data ?? []).map((item) => ({
      id: item.id,
      author: item.name?.trim() ? `${item.name.trim().charAt(0).toUpperCase()}.` : "Anonymous",
      relationship: item.relationship,
      rating: item.rating,
      message: item.message,
    }));

    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
