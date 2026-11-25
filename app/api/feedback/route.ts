import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { feedbackSchema, mapRelationship } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 12_000) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const ip = getClientIp(request);
    const limited = rateLimit(`feedback:${ip}`, 5, 60_000);
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

    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid feedback." },
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
            "Feedback service is not configured yet. Please try again later.",
        },
        { status: 503 }
      );
    }

    const admin = createSupabaseAdmin();
    const displayName = data.name.trim();
    const payload = {
      name: displayName,
      relationship: mapRelationship(data.relationship),
      rating: data.rating,
      message: data.message,
      consent_to_display: Boolean(data.publication_consent),
      publication_consent: Boolean(data.publication_consent),
      moderation_status: "pending",
      status: "pending",
    };

    let { error } = await admin.from("feedback").insert(payload);

    if (error) {
      const { error: legacyError } = await admin.from("feedback").insert({
        name: displayName,
        relationship: mapRelationship(data.relationship),
        rating: data.rating,
        message: data.message,
        consent_to_display: Boolean(data.publication_consent),
        status: "pending",
      });

      if (legacyError) {
        console.error("Feedback insert failed");
        return NextResponse.json(
          { error: "Unable to save your feedback right now." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
