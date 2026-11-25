import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { enquirySchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 20_000) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const ip = getClientIp(request);
    const limited = rateLimit(`enquiry:${ip}`, 5, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
      );
    }

    const body = await request.json();
    if (body?.website) {
      return NextResponse.json({ ok: true });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid enquiry." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const turnstileOk = await verifyTurnstile(data.turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Spam verification failed. Please try again." },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            "Enquiry service is not configured yet. Please try again later or use another contact channel once published.",
        },
        { status: 503 }
      );
    }

    const admin = createSupabaseAdmin();
    const { error } = await admin.from("enquiries").insert({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      enquiry_type: data.enquiry_type,
      preferred_contact_method: data.preferred_contact_method,
      message: data.message,
      contact_consent: true,
      status: "new",
    });

    if (error) {
      console.error("Enquiry insert failed");
      return NextResponse.json(
        { error: "Unable to save your enquiry right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
