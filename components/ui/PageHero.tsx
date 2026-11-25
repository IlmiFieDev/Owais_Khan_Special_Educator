import Image from "next/image";
import MeshBackground from "./MeshBackground";
import Reveal from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSize?: "banner" | "decorative";
}

export default function PageHero({
  eyebrow,
  heading,
  description,
  imageSrc,
  imageAlt = "",
  imageSize = "banner",
}: PageHeroProps) {
  const isDecorative = imageSize === "decorative";

  return (
    <section className="relative overflow-hidden border-b border-ink/5 bg-ivory py-10 sm:py-12">
      <MeshBackground variant="soft" />
      <div className="relative z-10 mx-auto grid w-[min(1120px,calc(100%-2rem))] items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-dark">
            {eyebrow}
          </p>
          <h1 className="max-w-2xl font-heading text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            {heading}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
        {imageSrc && (
          <Reveal delay={0.12} className="justify-self-end">
            <div
              className={`relative overflow-hidden rounded-soft border border-white/60 bg-frost/50 shadow-glow backdrop-blur-md ${
                isDecorative
                  ? "w-full max-w-[320px] p-3"
                  : "w-full max-w-md aspect-[4/3]"
              }`}
            >
              <div className="absolute -inset-6 rounded-full bg-teal/10 blur-2xl" aria-hidden="true" />
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={isDecorative ? 360 : 720}
                height={isDecorative ? 270 : 540}
                className={`relative z-10 ${
                  isDecorative
                    ? "aspect-[4/3] h-auto w-full rounded-xl object-cover"
                    : "h-full w-full object-cover"
                }`}
                sizes={isDecorative ? "320px" : "(max-width: 768px) 90vw, 420px"}
                priority
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
