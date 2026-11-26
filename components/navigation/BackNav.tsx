"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const STACK_KEY = "site-nav-stack";

function readStack(): string[] {
  try {
    const raw = sessionStorage.getItem(STACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((p) => typeof p === "string") : [];
  } catch {
    return [];
  }
}

function writeStack(stack: string[]) {
  try {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack.slice(-24)));
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
}

/** Tracks in-app path history so BackNav can fall back safely. */
export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const stack = readStack();
    if (stack[stack.length - 1] !== pathname) {
      writeStack([...stack, pathname]);
    }
  }, [pathname]);

  return null;
}

interface BackNavProps {
  fallbackHref?: string;
  label?: string;
}

export default function BackNav({
  fallbackHref = "/",
  label = "Back",
}: BackNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = useCallback(() => {
    const stack = readStack();
    let previous: string | null = null;

    if (stack.length >= 2 && stack[stack.length - 1] === pathname) {
      previous = stack[stack.length - 2] ?? null;
      writeStack(stack.slice(0, -1));
    } else {
      const prior = [...stack].reverse().find((path) => path !== pathname);
      previous = prior ?? null;
    }

    if (
      previous &&
      previous !== pathname &&
      !previous.startsWith("/admin")
    ) {
      router.push(previous);
      return;
    }

    try {
      const referrer = document.referrer;
      if (referrer) {
        const refUrl = new URL(referrer);
        if (
          refUrl.origin === window.location.origin &&
          refUrl.pathname !== pathname &&
          !refUrl.pathname.startsWith("/admin")
        ) {
          router.back();
          return;
        }
      }
    } catch {
      // Invalid referrer — use fallback
    }

    router.push(fallbackHref);
  }, [fallbackHref, pathname, router]);

  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))] pt-4 sm:pt-5">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/10 bg-frost/70 px-3.5 py-2 text-sm font-semibold text-ink-soft shadow-soft backdrop-blur transition hover:border-teal/30 hover:text-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        aria-label="Go back to the previous page"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {label}
      </button>
    </div>
  );
}
