import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-dark">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-ink-muted">
          The page you are looking for is unavailable. Return home or send an enquiry.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Go home</Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Or browse{" "}
          <Link href="/expertise" className="font-semibold text-teal-dark underline">
            expertise areas
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
