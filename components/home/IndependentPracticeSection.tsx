import Image from "next/image";
import Link from "next/link";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTENT } from "@/lib/content";
import { LineIcon } from "@/components/ui/Icons";

export default function IndependentPracticeSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const c = SITE_CONTENT.independentPractice;

  return (
    <section
      className={`relative overflow-hidden ${compact ? "py-14" : "py-16"}`}
      aria-labelledby="independent-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage/40 via-ivory to-sky/40" aria-hidden="true" />
      <div className="relative mx-auto grid w-[min(1120px,calc(100%-2rem))] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading
            eyebrow={c.eyebrow}
            heading={c.heading}
            id="independent-heading"
          />
          <div className="prose-premium mt-5 max-w-xl text-ink-muted">
            {(compact ? c.body.slice(0, 1) : c.body).map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <GlowCard className="mt-6 inline-flex flex-col gap-1 border-l-4 border-l-peach" glow="peach">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
              Verified focus
            </span>
            <span className="font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-semibold text-ink">
              {c.counterLabel}
            </span>
            <span className="text-sm text-ink-muted">{c.counterNote}</span>
          </GlowCard>
          {!compact && (
            <Link
              href="/experience"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-dark"
            >
              View professional journey
              <LineIcon name="arrow" className="h-4 w-4" />
            </Link>
          )}
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-peach/30 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-soft border border-white/70 shadow-lift aspect-[4/3]">
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 480px"
              />
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {c.highlights.slice(0, compact ? 4 : 7).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-2xl border border-white/70 bg-frost/70 px-3 py-2.5 text-sm text-ink shadow-soft backdrop-blur"
                >
                  <LineIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
