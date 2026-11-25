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

  if (!id || !["new", "contacted", "resolved"].includes(status || "")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const admin = createSupabaseAdmin();
  const { error } = await admin
    .from("enquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Unable to update enquiry." }, { status: 500 });
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
  const { error } = await admin.from("enquiries").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Unable to delete enquiry." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
