import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { LineIcon } from "@/components/ui/Icons";
import { SITE_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Areas of Expertise",
  description:
    "Special education expertise across autism, Down syndrome, intellectual disability, learning difficulties and early intervention.",
  alternates: { canonical: "/expertise" },
};

export default function ExpertisePage() {
  const c = SITE_CONTENT.expertise;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        heading={c.heading}
        description={c.subtitle}
        imageSrc={c.banner}
        imageAlt={c.bannerAlt}
        imageSize="banner"
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))] space-y-12">
          {c.areas.map((area, index) => (
            <article
              key={area.id}
              id={area.id}
              className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2"
            >
              <Reveal className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-soft border border-white/70 shadow-glow">
                    <Image
                      src={area.image!}
                      alt={`Faceless educational materials supporting ${area.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 520px"
                    />
                  </div>
              </Reveal>

              <Reveal delay={0.08} className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-heading text-3xl font-semibold text-ink">
                  {area.title}
                </h2>
                <p className="mt-4 text-ink-muted">{area.introduction}</p>
                <p className="mt-3 text-ink-soft">{area.supportFocus}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold text-ink">Teaching strategies</h3>
                    <ul className="mt-2 space-y-2">
                      {area.strategies.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-ink-muted">
                          <LineIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">Learning objectives</h3>
                    <ul className="mt-2 space-y-2">
                      {area.objectives.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-ink-muted">
                          <LineIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  href={`/contact?topic=${encodeURIComponent("Individualised Educational Support")}&focus=${encodeURIComponent(area.title)}`}
                  className="mt-6"
                  variant="soft"
                >
                  Enquire about {area.title}
                </Button>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/5 bg-ivory py-14">
        <div className="mx-auto w-[min(900px,calc(100%-2rem))] text-center">
          <h2 className="font-heading text-3xl font-semibold text-ink">
            Methods that support the practice
          </h2>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONTENT.skills.items.map((skill) => (
              <GlowCard key={skill.id} className="!p-4">
                <h3 className="text-sm font-bold text-ink">{skill.name}</h3>
                <p className="mt-2 text-xs text-ink-muted">{skill.explanation}</p>
              </GlowCard>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-muted">
            Prefer a conversation first?{" "}
            <Link href="/contact" className="font-semibold text-teal-dark underline">
              Send an enquiry
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
