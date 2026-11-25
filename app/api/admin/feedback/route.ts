import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

async function assertAdmin() {
  const { authorised } = await getAdminSession();
  return authorised;
}

export async function PATCH(request: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const body = await request.json();
  const id = body?.id as string | undefined;
  const status = body?.status as string | undefined;

  if (!id || !["pending", "approved", "rejected"].includes(status || "")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const admin = createSupabaseAdmin();

  if (status === "approved") {
    const { data } = await admin
      .from("feedback")
      .select("consent_to_display, publication_consent")
      .eq("id", id)
      .single();

    const consented =
      Boolean(data?.publication_consent) || Boolean(data?.consent_to_display);
    if (!consented) {
      return NextResponse.json(
        { error: "Cannot approve feedback without publication consent." },
        { status: 400 }
      );
    }
  }

  const { error } = await admin
    .from("feedback")
    .update({
      status,
      moderation_status: status,
    })
    .eq("id", id);

  if (error) {
    // Legacy schema without moderation_status
    const { error: legacyError } = await admin
      .from("feedback")
      .update({ status })
      .eq("id", id);
    if (legacyError) {
      return NextResponse.json({ error: "Unable to update feedback." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const admin = createSupabaseAdmin();
  const { error } = await admin.from("feedback").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Unable to delete feedback." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
