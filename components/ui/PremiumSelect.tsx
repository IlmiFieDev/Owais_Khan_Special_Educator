"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface PremiumSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
}

export default function PremiumSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid = false,
  describedBy,
}: PremiumSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listboxId = `${selectId}-listbox`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      const next = selectedIndex >= 0 ? selectedIndex : event.key === "ArrowUp" ? options.length - 1 : 0;
      setActiveIndex(next);
      setOpen(true);
    }
  };

  const onOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + options.length) % options.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const selected = options[selectedIndex];

  return (
    <div ref={wrapperRef} className="relative mt-1.5">
      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        className={`glow-interactive premium-select-trigger flex min-h-12 w-full items-center justify-between gap-3 rounded-[0.9rem] border bg-white/90 px-4 py-3 text-left text-sm shadow-[0_4px_18px_rgba(20,46,63,.04)] transition hover:border-teal/40 focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal/25 ${
          invalid ? "border-[#b42318]" : "border-ink/15"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        data-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => {
          setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
          setOpen((current) => !current);
        }}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={selected ? "text-ink" : "text-ink-muted"}>
          {selected?.label ?? placeholder}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-teal-dark transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={selectId}
          className="absolute z-[80] mt-2 max-h-72 w-full min-w-0 overflow-y-auto rounded-2xl border border-white/80 bg-white/95 p-1.5 shadow-lift backdrop-blur-xl"
        >
          {options.map((option, index) => {
            const selectedOption = option.value === value;
            return (
              <button
                key={option.value}
                ref={(node) => { optionRefs.current[index] = node; }}
                type="button"
                role="option"
                aria-selected={selectedOption}
                tabIndex={activeIndex === index ? 0 : -1}
                  className={`glow-interactive flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  selectedOption ? "bg-sage text-teal-dark" : "text-ink hover:bg-sky/50"
                }`}
                onClick={() => selectOption(index)}
                onKeyDown={onOptionKeyDown}
              >
                <span>{option.label}</span>
                {selectedOption && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
