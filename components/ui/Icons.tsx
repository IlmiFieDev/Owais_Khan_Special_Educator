type IconProps = { className?: string; name: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LineIcon({ name, className = "w-7 h-7" }: IconProps) {
  const props = { className, viewBox: "0 0 32 32", "aria-hidden": true as const, ...common };

  switch (name) {
    case "autism":
      return (
        <svg {...props}>
          <path d="M5 19c3-8 7-8 11 0 4 8 8 8 11 0M5 13c3 8 7 8 11 0 4-8 8-8 11 0" />
        </svg>
      );
    case "down":
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 3v3M16 26v3M3 16h3M26 16h3M7 7l2 2M23 23l2 2M25 7l-2 2M9 23l-2 2" />
          <path d="M11.5 15.5c1.5-2 3.2-.7 4.5 1.2 1.3-1.9 3-3.2 4.5-1.2 1.6 2.2-1.4 4.6-4.5 6.6-3.1-2-6.1-4.4-4.5-6.6Z" />
        </svg>
      );
    case "intellectual":
      return (
        <svg {...props}>
          <path d="M10 6h8a7 7 0 0 1 7 7v3a5 5 0 0 1-5 5h-2l-5 5v-5h-3a7 7 0 0 1 0-15Z" />
          <path d="M11 13h10M11 17h6" />
        </svg>
      );
    case "learning":
      return (
        <svg {...props}>
          <path d="M4 7c5-1 9 0 12 3v16c-3-3-7-4-12-3V7ZM28 7c-5-1-9 0-12 3v16c3-3 7-4 12-3V7Z" />
        </svg>
      );
    case "early":
      return (
        <svg {...props}>
          <path d="M16 28V14M16 18c-6 0-10-3-10-9 6 0 10 3 10 9ZM16 14c0-6 4-9 10-9 0 6-4 9-10 9Z" />
        </svg>
      );
    case "understand":
      return (
        <svg {...props}>
          <circle cx="14" cy="14" r="8" />
          <path d="m20 20 7 7M10 14l2.5 2.5L18 11" />
        </svg>
      );
    case "plan":
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="6" />
          <circle cx="16" cy="16" r="1.5" />
          <path d="m20 12 7-7M22 5h5v5" />
        </svg>
      );
    case "teach":
      return (
        <svg {...props}>
          <path d="M7 8h18v18H7zM11 5h10v6H11zM11 16h10M11 20h7" />
        </svg>
      );
    case "review":
      return (
        <svg {...props}>
          <path d="M6 26V7M6 26h21" />
          <path d="m10 21 5-6 4 3 7-9" />
        </svg>
      );
    case "involve":
    case "family":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="4" />
          <circle cx="22" cy="12" r="3" />
          <path d="M4 27v-3a7 7 0 0 1 14 0v3M18 27v-2a5 5 0 0 1 10 0v2" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="12" />
          <path d="m10 16 4 4 8-8" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M6 16h18M16 8l8 8-8 8" />
        </svg>
      );
    case "play":
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="12" />
          <path d="M13 11v10l9-5-9-5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pause":
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="12" />
          <path d="M12 11h3v10h-3zM17 11h3v10h-3z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "star":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="m16 4 3.1 6.4 7 .9-5.1 4.9 1.3 7L16 20.3 9.7 23.2l1.3-7-5.1-4.9 7-.9L16 4z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="10" />
        </svg>
      );
  }
}
