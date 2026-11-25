import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import MeshBackground from "@/components/ui/MeshBackground";
import GlowCard from "@/components/ui/GlowCard";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enquiry & Contact",
  description:
    "Send a professional enquiry to Owais Alam Khan, Special Educator in Delhi NCR.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const c = SITE_CONTENT.contact;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <MeshBackground variant="soft" />
      <div className="relative z-10 mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-dark">
            {c.eyebrow}
          </p>
          <h1 className="mt-3 max-w-md font-heading text-[clamp(2.2rem,4vw,3.4rem)] font-semibold text-ink">
            {c.heading}
          </h1>
          <p className="mt-5 max-w-md text-ink-muted">{c.introduction}</p>

          <GlowCard className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
              Practice details
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <strong className="text-ink">{SITE_CONTENT.personal.name}</strong>
              </li>
              <li>{SITE_CONTENT.personal.title}</li>
              <li>{SITE_CONTENT.personal.location}</li>
              <li>{SITE_CONTENT.personal.credentials}</li>
              <li>
                <a
                  href={`mailto:${c.email}`}
                  className="glow-interactive inline-flex max-w-full break-all rounded-md font-semibold text-teal-dark underline underline-offset-2"
                >
                  {c.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-ink-muted">For a direct written enquiry, email is available above. You can also use the secure enquiry form.</p>
            <p className="mt-3 text-xs text-ink-muted">
              Read the{" "}
              <Link href="/privacy" className="font-semibold text-teal-dark underline">
                Privacy information
              </Link>
              .
            </p>
          </GlowCard>

          <div className="relative mt-8 aspect-[4/3] max-w-md overflow-hidden rounded-soft border border-white/70 bg-frost/60 shadow-soft">
            <Image
              src={c.image}
              alt={c.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          </div>
        </div>

        <GlowCard className="!p-6 sm:!p-8">
          <h2 className="font-heading text-2xl font-semibold text-ink">Enquiry form</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Required fields are marked in the form. Provide at least one valid contact method.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-ink-muted">Preparing enquiry form…</p>}>
              <EnquiryForm />
            </Suspense>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
