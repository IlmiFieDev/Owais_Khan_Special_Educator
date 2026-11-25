import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ApproachJourney from "@/components/Approach/ApproachJourney";
import Button from "@/components/ui/Button";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "My Teaching Approach",
  description:
    "A five-step special education approach: Understand, Plan, Teach, Review and Involve.",
  alternates: { canonical: "/approach" },
};

export default function ApproachPage() {
  const c = SITE_CONTENT.approach;

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
          <ApproachJourney />
          <div className="mt-10 rounded-soft border border-white/70 bg-sage/40 p-6 backdrop-blur">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Families are part of the process
            </h2>
            <p className="mt-3 max-w-2xl text-ink-muted">
              Progress is strongest when teaching and home life move together. Each stage
              includes space for parent questions, practical guidance and shared review.
            </p>
            <Button href="/contact" className="mt-5">
              Start a conversation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
