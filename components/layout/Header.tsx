"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { SITE_CONTENT } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const moreActive = SITE_CONTENT.nav.more.some((item) => isActive(item.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const close = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  useEffect(() => {
    if (!open) return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const linkClass = (href: string) =>
    `glow-interactive relative rounded-lg px-2.5 py-2 text-[0.8rem] font-semibold transition ${
      isActive(href)
        ? "text-teal-dark after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-teal"
        : "text-ink-soft hover:text-teal-dark"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-ink/8 bg-frost/75 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-frost/40 backdrop-blur-md"
      }`}
    >
      <nav
        className="mx-auto flex h-[4.5rem] w-[min(1180px,calc(100%-1.5rem))] items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 no-underline"
          aria-label={`${SITE_CONTENT.personal.name} — home`}
        >
          <Image
            src="/brand/ok-mark.svg"
            width={48}
            height={38}
            alt=""
            priority
            className="h-9 w-auto shrink-0"
          />
          <span className="min-w-0">
            <span className="block truncate font-heading text-[0.95rem] font-bold leading-tight text-ink">
              {SITE_CONTENT.personal.name}
            </span>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-teal-dark">
              Special Educator
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {SITE_CONTENT.nav.primary.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={linkClass(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={`glow-interactive inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[0.8rem] font-semibold transition ${moreActive ? "text-teal-dark" : "text-ink-soft hover:text-teal-dark"}`}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              More
              <svg className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-20 mt-2 min-w-[12rem] rounded-2xl border border-white/70 bg-frost/95 p-2 shadow-glass backdrop-blur-xl"
              >
                {SITE_CONTENT.nav.more.map((item) => (
                  <Link
                    key={item.key}
                    role="menuitem"
                    href={item.href}
                    className="glow-interactive block rounded-xl px-3 py-2 text-sm font-semibold text-ink hover:bg-sage/60"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button href="/contact" className="hidden sm:inline-flex" variant="primary">
            {SITE_CONTENT.nav.cta}
          </Button>
          <button
            ref={triggerRef}
            type="button"
            className="glow-interactive inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-ink/10 bg-frost/80 lg:hidden"
            aria-label={open ? SITE_CONTENT.nav.closeMenu : SITE_CONTENT.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[4.5rem] z-40 bg-ink/30 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={menuRef}
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 border-b border-ink/10 bg-frost/95 px-4 py-4 shadow-lift backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex w-[min(1180px,100%)] flex-col gap-1">
              {SITE_CONTENT.nav.primary.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`glow-interactive rounded-xl px-3 py-3 text-base font-semibold ${
                    isActive(item.href) ? "bg-sage text-teal-dark" : "text-ink"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {SITE_CONTENT.nav.more.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="glow-interactive rounded-xl px-3 py-3 text-base font-semibold text-ink-soft"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/contact" className="mt-2" onClick={() => setOpen(false)}>
                {SITE_CONTENT.nav.cta}
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
