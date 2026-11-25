import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Owais Alam Khan, RCI-registered Special Educator in Delhi NCR — experience with purpose, education with compassion.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const c = SITE_CONTENT.about;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        heading={c.heading}
        description={c.introduction}
        imageSrc={c.image}
        imageAlt={c.imageAlt}
        imageSize="banner"
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <div className="prose-premium max-w-2xl text-ink-muted">
              {c.body.map((para) => (
                <p key={para.slice(0, 40)} className="text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/experience">View experience</Button>
              <Button href="/qualifications" variant="secondary">
                View qualifications
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <GlowCard glow="peach">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
                Professional identity
              </p>
              <p className="mt-2 font-heading text-xl font-semibold text-ink">
                {SITE_CONTENT.personal.name}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {SITE_CONTENT.personal.title} · {SITE_CONTENT.personal.location}
              </p>
              <p className="mt-3 text-sm font-semibold text-teal-dark">
                {SITE_CONTENT.personal.credentials}
              </p>
            </GlowCard>
          </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <GlowCard className="h-full border-t-2 border-t-teal/25">
                  <h2 className="font-heading text-xl font-semibold text-ink">{value.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{value.text}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
