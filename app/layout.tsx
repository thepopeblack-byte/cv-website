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

const siteUrl = "https://popeblack.com";
const metadataTitle =
  "Kayode Popoola | Web3 Partnerships & Revenue Growth Leader";
const metadataDescription =
  "Kayode Popoola is a Web3 business development and strategic partnerships leader driving revenue growth, ecosystem expansion, blockchain infrastructure adoption, and emerging market partnerships.";

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
  ],
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: siteUrl,
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
    title: metadataTitle,
    description: metadataDescription,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#08111f",
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
              "(()=>{function a(t){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{localStorage.setItem('popeblack-theme',t)}catch(e){}}try{a(localStorage.getItem('popeblack-theme')==='light'?'light':'dark')}catch(e){a('dark')}document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-theme-toggle]'):null;if(!b)return;e.preventDefault();a(document.documentElement.dataset.theme==='light'?'dark':'light')})})();",
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
                  worksFor: {
                    "@type": "Organization",
                    name: "Secret Network Foundation",
                  },
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
