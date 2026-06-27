import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "./globals.css";

import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL("https://popeblack.com"),
  title:
    "Kayode Popoola | Head of Sales & Business Development | Web3 Partnerships Leader",
  description:
    "Executive resume and portfolio website of Kayode Popoola, Head of Sales & Business Development, strategic partnerships leader, Web3 ecosystem growth specialist, blockchain intelligence analyst, and emerging technology commercial strategist.",
  keywords: [
    "Kayode Popoola",
    "Popeblack",
    "Head of Sales",
    "Business Development",
    "Strategic Partnerships",
    "Web3",
    "Blockchain",
    "Secret Network",
    "Ecosystem Growth",
    "Revenue Growth",
    "Blockchain Intelligence",
    "AML",
    "OSINT",
    "Nigeria",
    "Africa Web3",
  ],
  openGraph: {
    title:
      "Kayode Popoola | Head of Sales & Business Development | Web3 Partnerships Leader",
    description:
      "Premium executive website for Kayode Popoola, a senior commercial leader spanning strategic partnerships, ecosystem growth, and blockchain intelligence.",
    url: "https://popeblack.com",
    siteName: "Kayode Popoola | Popeblack",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kayode Popoola executive profile card",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Kayode Popoola | Head of Sales & Business Development | Web3 Partnerships Leader",
    description:
      "Executive portfolio and resume website for Kayode Popoola, Popeblack.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://popeblack.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#08111f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="app-shell">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="grid-overlay" />
          {children}
        </div>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              alternateName: profile.brandName,
              url: "https://popeblack.com",
              email: `mailto:${profile.email}`,
              jobTitle: profile.headline,
              description: `${profile.executiveSummary} ${profile.currentFocus}`,
              sameAs: [profile.linkedin, profile.twitter, profile.telegram],
              worksFor: {
                "@type": "Organization",
                name: "Secret Network Foundation",
              },
              knowsAbout: [
                "Strategic Partnerships",
                "Business Development",
                "Revenue Growth",
                "Web3 Ecosystems",
                "Blockchain Intelligence",
                "AML/CFT",
                "OSINT",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
