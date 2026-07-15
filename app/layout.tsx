import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "./globals.css";

import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { profile } from "@/data/profile";
import { siteDescription, siteName, siteUrl } from "@/data/site";

const metadataTitle =
  "Kayode Popoola | Web3 Partnerships & Revenue Growth Leader";
const metadataDescription = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: metadataTitle,
  description: metadataDescription,
  keywords: [
    "Kayode Popoola",
    "Popeblack",
    "Web3 Business Development Leader",
    "Head of Sales and Business Development",
    "Strategic Partnerships Leader",
    "Blockchain Partnerships",
    "Web3 Partnerships",
    "Ecosystem Growth",
    "Revenue Growth",
    "Go-to-Market Strategy",
    "Enterprise Sales",
    "Blockchain Infrastructure",
    "Confidential Computing",
    "Privacy-Preserving AI",
    "AI Infrastructure Partnerships",
    "DeFi Partnerships",
    "EVM and Layer-2 Partnerships",
    "Blockchain Intelligence Analyst",
    "Crypto Investigations",
    "AML/CFT",
    "OSINT",
    "Africa Web3 Ecosystem",
    "Emerging Markets Growth",
    "Public-Sector Programmes",
    "Capacity Building",
    "Transaction Monitoring",
    "Digital-Asset Risk",
  ],
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: siteUrl,
    siteName,
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
  title: metadataTitle,
  description: metadataDescription,
  images: ["/opengraph-image"],
},
icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
},
manifest: "/site.webmanifest",
alternates: {
  canonical: siteUrl,
},
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{function a(t){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}try{a(localStorage.getItem('popeblack-theme')==='light'?'light':'dark')}catch(e){a('dark')}})();",
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="app-shell">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="grid-overlay" />
          {children}
        </div>
        <AnalyticsProvider />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: profile.name,
                  alternateName: profile.brandName,
                  url: siteUrl,
                  email: `mailto:${profile.email}`,
                  jobTitle: profile.headline,
                  description: `${profile.executiveSummary} ${profile.currentFocus}`,
                  sameAs: [profile.linkedin, profile.twitter, profile.telegram],
                  worksFor: [
                    {
                      "@type": "Organization",
                      name: "Secret Network Foundation",
                    },
                    {
                      "@type": "Organization",
                      name: "CipherOwl Inc.",
                    },
                  ],
                  knowsAbout: [
                    "Web3 Business Development",
                    "Strategic Partnerships",
                    "Revenue Growth",
                    "Go-to-Market Strategy",
                    "Enterprise Sales",
                    "Blockchain Infrastructure",
                    "Confidential Computing",
                    "Privacy-Preserving AI",
                    "AI Infrastructure Partnerships",
                    "DeFi Partnerships",
                    "EVM and Layer-2 Partnerships",
                    "Blockchain Intelligence",
                    "Crypto Investigations",
                    "AML/CFT",
                    "OSINT",
                    "Africa Web3 Ecosystem",
                    "Emerging Markets Growth",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: siteName,
                  description: metadataDescription,
                  publisher: {
                    "@id": `${siteUrl}/#person`,
                  },
                },
                {
                  "@type": "ProfilePage",
                  "@id": `${siteUrl}/#profile-page`,
                  url: siteUrl,
                  name: metadataTitle,
                  description: metadataDescription,
                  mainEntity: {
                    "@id": `${siteUrl}/#person`,
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
