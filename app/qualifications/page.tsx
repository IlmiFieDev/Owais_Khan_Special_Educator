import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Qualifications & Credentials",
  description:
    "Educational qualifications and RCI registration for Owais Alam Khan, Special Educator.",
  alternates: { canonical: "/qualifications" },
};

export default function QualificationsPage() {
  const c = SITE_CONTENT.qualifications;

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
        <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-5 md:grid-cols-2">
          {c.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.06} className={index === 0 ? "md:col-span-2" : ""}>
              <GlowCard className={`h-full ${index === 0 ? "border-l-4 border-l-teal" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-sage px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-teal-dark">
                    {card.badge}
                  </span>
                  <span className="text-xs font-bold text-ink-muted">{card.year}</span>
                </div>
                <h2 className={`mt-4 font-heading font-semibold text-ink ${index === 0 ? "text-3xl" : "text-2xl"}`}>
                  {card.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-teal-dark">
                  {card.institution}
                </p>
                {card.description && (
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {card.description}
                  </p>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 w-[min(1120px,calc(100%-2rem))] text-sm text-ink-muted">
          {c.additionalSkills}
        </p>
        <div className="mx-auto mt-8 w-[min(1120px,calc(100%-2rem))]">
          <Button href="/contact">Discuss educational support</Button>
        </div>
      </section>
    </>
  );
}
