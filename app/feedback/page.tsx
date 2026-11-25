import type { Metadata } from "next";
import MeshBackground from "@/components/ui/MeshBackground";
import GlowCard from "@/components/ui/GlowCard";
import FeedbackForm from "@/components/forms/FeedbackForm";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share private feedback about your experience with Owais Alam Khan, Special Educator.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  const c = SITE_CONTENT.feedback;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <MeshBackground variant="soft" />
      <div className="relative z-10 mx-auto grid w-[min(980px,calc(100%-2rem))] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-dark">
            {c.eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-[clamp(2.2rem,4vw,3.3rem)] font-semibold text-ink">
            {c.heading}
          </h1>
          <p className="mt-5 text-ink-muted">{c.introduction}</p>
          <GlowCard className="mt-6" glow="peach">
            <p className="text-sm text-ink-muted">
              Feedback is stored separately from enquiries. Publication requires both your
              explicit permission and administrator review. Private or sensitive details are
              never displayed.
            </p>
          </GlowCard>
        </div>

        <GlowCard className="!p-6 sm:!p-8">
          <FeedbackForm />
        </GlowCard>
      </div>
    </section>
  );
}
