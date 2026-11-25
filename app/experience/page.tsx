import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import IndependentPracticeSection from "@/components/home/IndependentPracticeSection";
import Button from "@/components/ui/Button";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Professional Experience",
  description:
    "Professional journey of Owais Alam Khan across schools, clinics and independent special education practice in Delhi NCR.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  const c = SITE_CONTENT.experience;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        heading={c.heading}
        description={c.subtitle}
        imageSrc={c.image}
        imageAlt={c.imageAlt}
        imageSize="decorative"
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <dl className="grid gap-px overflow-hidden rounded-soft border border-white/70 bg-white/70 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["15+ years", "Professional experience"],
              ["Since 2018", "Independent practice"],
              ["Schools & clinic", "Institutional collaboration"],
              ["RCI registered", "CRR No. A16789"],
            ].map(([value, label]) => (
              <div key={label} className="bg-ivory/80 px-5 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">{label}</dt>
                <dd className="mt-1 font-heading text-xl font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <ExperienceTimeline />
          <div className="mt-10">
            <Button href="/qualifications" variant="secondary">
              View qualifications
            </Button>
          </div>
        </div>
      </section>

      <IndependentPracticeSection />
    </>
  );
}
