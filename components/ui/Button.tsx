import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "soft";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-glow hover:bg-teal-dark hover:-translate-y-0.5",
  secondary:
    "bg-frost/70 text-ink border border-ink/10 backdrop-blur-md hover:border-teal/40 hover:text-teal-dark",
  ghost: "bg-transparent text-teal-dark hover:bg-sage/60",
  soft: "bg-sage text-ink hover:bg-teal hover:text-white",
};

interface CommonProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    className = "",
    variant = "primary",
    ...rest
  } = props;
  const classes = `glow-interactive inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
