import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/home/HomeHero";
import IndependentPracticeSection from "@/components/home/IndependentPracticeSection";
import Testimonials from "@/components/home/Testimonials";
import Button from "@/components/ui/Button";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LineIcon } from "@/components/ui/Icons";
import { SITE_CONTENT } from "@/lib/content";
export default function HomePage() {
  // Public pages deliberately make no backend request. Feedback remains
  // available on its dedicated page and to authenticated administrators.
  const testimonials: Array<{
    id: string;
    name: string;
    relationship: string;
    message: string;
  }> = [];

  return (
    <>
      <HomeHero />

      <section className="py-16 sm:py-20" aria-labelledby="home-about-heading">
        <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative max-w-md overflow-hidden rounded-soft border border-white/70 shadow-glow aspect-[4/3]">
              <Image
                src={SITE_CONTENT.about.image}
                alt={SITE_CONTENT.about.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="About"
              heading="Education shaped by experience and care."
              id="home-about-heading"
            />
            <p className="mt-5 max-w-xl text-ink-muted">
              {SITE_CONTENT.about.introduction}
            </p>
            <Button href="/about" variant="secondary" className="mt-6">
              Read more about my work
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage/30 py-16 sm:py-20" aria-labelledby="home-expertise-heading">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <Reveal>
            <SectionHeading
              eyebrow="Expertise"
              heading="Areas of educational support"
              description="Five established practice areas, each approached with structure, patience and respect for individual differences."
              id="home-expertise-heading"
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONTENT.expertise.areas.map((area, index) => (
              <Reveal key={area.id} delay={index * 0.05}>
                <GlowCard className="h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal-dark">
                    <LineIcon name={area.icon} />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{area.shortDescription}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/expertise">Explore all expertise areas</Button>
          </div>
        </div>
      </section>

      <IndependentPracticeSection compact />

      <section className="py-16 sm:py-20" aria-labelledby="home-approach-heading">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <Reveal>
            <SectionHeading
              eyebrow="My Approach"
              heading="Understand. Plan. Teach. Review. Involve."
              description="A clear five-step process designed for clarity, consistency and family partnership."
              id="home-approach-heading"
            />
          </Reveal>
          <ol className="mt-8 grid gap-3 sm:grid-cols-5" aria-label="Teaching approach preview">
            {SITE_CONTENT.approach.steps.map((step) => (
              <li key={step.step} className="border-t-2 border-teal/25 px-1 pt-3">
                <span className="text-xs font-bold text-teal-dark">0{step.step}</span>
                <p className="mt-1 font-heading text-lg font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-xs text-ink-muted">{step.subtitle}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button href="/approach" variant="secondary">
              Explore the full approach
            </Button>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-ink py-16 text-frost sm:py-20" aria-labelledby="testimonials-heading">
          <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-peach">
                Testimonials
              </p>
              <h2
                id="testimonials-heading"
                className="font-heading text-[clamp(1.85rem,3.4vw,2.85rem)] font-semibold text-frost"
              >
                Words from families and collaborators
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item) => (
                <blockquote
                  key={item.id}
                  className="rounded-soft border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <p className="text-sm leading-relaxed text-sage/90">“{item.message}”</p>
                  <footer className="mt-4 text-xs font-semibold text-peach">
                    {item.name} · {item.relationship}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <Testimonials />

      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-18" aria-labelledby="final-cta-heading">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sage via-ivory to-sky" aria-hidden="true" />
        <div className="relative mx-auto w-[min(900px,calc(100%-2rem))] text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-dark">
              Begin a conversation
            </p>
            <h2
              id="final-cta-heading"
              className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold text-ink"
            >
              Ready to talk about the next step?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-muted">
              Share a brief enquiry and I will respond with care. Separate feedback can be
              shared on the feedback page.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Send an Enquiry</Button>
              <Button href="/feedback" variant="secondary">
                Share Feedback
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Looking for FAQs? Visit{" "}
              <Link href="/resources" className="font-semibold text-teal-dark underline">
                Parent Resources
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
