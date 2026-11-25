"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroVideoProps {
  src: string;
  poster: string;
  label: string;
}

export default function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // Autoplay may be blocked by a browser policy. The muted video will
        // still retry through its native autoplay behavior when possible.
      }
    };

    if (ready) void tryPlay();
  }, [ready, failed]);

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div
        className="absolute -inset-4 rounded-[2rem] bg-teal/20 blur-2xl animate-glow-pulse"
        aria-hidden="true"
      />
      <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-white/70 bg-ink/5 shadow-lift">
        {!failed ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={poster}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 480px"
            priority
          />
        )}

      </div>
    </div>
  );
}
