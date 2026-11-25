"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMotionDisabled } from "@/components/AccessibilityPanel/AccessibilityContext";
import { LineIcon } from "@/components/ui/Icons";

interface HeroVideoProps {
  src: string;
  poster: string;
  label: string;
}

export default function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const motionOff = useMotionDisabled();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed || motionOff) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    if (ready) void tryPlay();
  }, [ready, failed, motionOff]);

  useEffect(() => {
    if (motionOff && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [motionOff]);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

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

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 to-transparent p-4">
          <button
            type="button"
            onClick={toggle}
            disabled={failed || motionOff}
            className="inline-flex items-center gap-2 rounded-full bg-frost/90 px-3.5 py-2 text-sm font-semibold text-ink shadow-soft backdrop-blur disabled:opacity-60"
            aria-pressed={playing}
            aria-label={playing ? "Pause video" : "Play video"}
          >
            <LineIcon name={playing ? "pause" : "play"} className="h-5 w-5 text-teal" />
            {failed
              ? "Preview image"
              : motionOff
                ? "Motion paused"
                : playing
                  ? "Pause"
                  : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
