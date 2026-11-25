import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Parent Resources & FAQs",
  description:
    "Parent guidance and frequently asked questions about special education support with Owais Alam Khan.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const c = SITE_CONTENT.resources;

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.guidance.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <GlowCard className={`h-full ${index % 2 === 0 ? "border-l-4 border-l-teal/25" : "border-l-4 border-l-peach/60"}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
                    {String(index + 1).padStart(2, "0")} · Parent guidance
                  </p>
                  <h2 className="mt-2 font-heading text-xl font-semibold text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm text-ink-muted">{item.text}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-heading text-3xl font-semibold text-ink">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-3">
              {c.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="glow-card group rounded-soft border border-white/70 bg-frost/70 p-1 shadow-soft backdrop-blur open:shadow-glow"
                >
                  <summary className="glow-interactive cursor-pointer list-none rounded-[1.1rem] px-5 py-4 font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span
                        className="grid h-8 w-8 place-items-center rounded-full bg-sage text-teal-dark transition group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-sm leading-relaxed text-ink-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <GlowCard className="mt-10" glow="peach">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Need details that are not listed here?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-muted">
              Session arrangements and fees are confirmed personally during consultation.
              Send an enquiry and we can discuss what fits your learner.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/contact">Send an Enquiry</Button>
              <Link href="/approach" className="text-sm font-bold text-teal-dark underline">
                Learn about my approach
              </Link>
            </div>
          </GlowCard>
        </div>
      </section>
    </>
  );
}
