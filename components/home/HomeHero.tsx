import MeshBackground from "@/components/ui/MeshBackground";
import Button from "@/components/ui/Button";
import HeroVideo from "@/components/media/HeroVideo";
import { SITE_CONTENT } from "@/lib/content";

export default function HomeHero() {
  const t = SITE_CONTENT.hero;

  return (
    <section
      className="relative overflow-hidden pb-10 pt-8 sm:pt-12 lg:pb-16"
      aria-labelledby="hero-heading"
    >
      <MeshBackground variant="hero" />
      <div className="relative z-10 mx-auto grid w-[min(1180px,calc(100%-2rem))] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-xl">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-dark"
          >
            {t.eyebrow}
          </p>
          <p
            className="mb-3 font-heading text-xl font-medium text-ink-soft sm:text-2xl"
          >
            {t.name}
          </p>
          <h1
            id="hero-heading"
            className="font-heading text-[clamp(2.4rem,5vw,3.85rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink"
          >
            {t.headline.split(". ").map((part, i, arr) => (
              <span key={part}>
                {i === 1 ? (
                  <em className="not-italic text-teal-dark">
                    {part}
                    {i < arr.length - 1 ? "." : ""}
                  </em>
                ) : (
                  <>
                    {part}
                    {i < arr.length - 1 ? ". " : ""}
                  </>
                )}
              </span>
            ))}
          </h1>
          <p
            className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {t.description}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/contact">{t.primaryCta}</Button>
            <Button href="/expertise" variant="secondary">
              {t.secondaryCta}
            </Button>
          </div>
        </div>

        <div>
          <HeroVideo src={t.videoSrc} poster={t.posterSrc} label={t.videoLabel} />
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 w-[min(1180px,calc(100%-2rem))]">
        <ul
          className="grid gap-3 rounded-[1.5rem] border border-white/70 bg-frost/70 p-3 shadow-glass backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Professional trust indicators"
        >
          {SITE_CONTENT.trust.map((itemTrust, index) => (
            <li
              key={itemTrust.id}
              className={`rounded-2xl px-4 py-4 ${
                index % 2 === 0 ? "bg-sage/50" : "bg-sky/45"
              }`}
            >
              <p className="font-heading text-lg font-semibold text-ink">
                {itemTrust.title}
              </p>
              <p className="mt-1 text-xs text-ink-muted">{itemTrust.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
