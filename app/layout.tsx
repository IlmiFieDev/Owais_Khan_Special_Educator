import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { A11yProvider } from "@/components/AccessibilityPanel/AccessibilityContext";
import SiteShell from "@/components/layout/SiteShell";
import { SITE_CONTENT, SITE_URL } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Owais Alam Khan — Special Educator · Delhi NCR",
    template: "%s | Owais Alam Khan",
  },
  description:
    "RCI registered special educator supporting learners with autism, Down syndrome, intellectual disabilities and learning difficulties in Delhi NCR. Personalised education with compassion.",
  keywords: [
    "special educator Delhi",
    "special educator Noida",
    "autism teacher Delhi NCR",
    "IEP specialist Delhi NCR",
    "special education home tuition Delhi",
    "RCI registered special educator",
    "Owais Alam Khan",
  ],
  openGraph: {
    title: "Owais Alam Khan — Special Educator",
    description:
      "Personalised special education support in Delhi NCR. Individual attention, practical learning and family collaboration.",
    url: SITE_URL,
    siteName: "Owais Alam Khan",
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: SITE_CONTENT.personal.name,
              jobTitle: SITE_CONTENT.personal.title,
              description:
                "RCI registered special educator supporting learners with diverse educational needs in Delhi NCR.",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Delhi NCR",
                addressCountry: "IN",
              },
              knowsAbout: SITE_CONTENT.expertise.areas.map((a) => a.title),
              url: SITE_URL,
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <A11yProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>
          <SiteShell>{children}</SiteShell>
        </A11yProvider>
      </body>
    </html>
  );
}
