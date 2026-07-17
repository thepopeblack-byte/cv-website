import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterPageTracker } from "@/components/NewsletterPageTracker";
import { SubstackSignup } from "@/components/SubstackSignup";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "The Popeblack Brief | Kayode Popoola",
  description:
    "Practical insights from Kayode Popoola on AI, privacy, financial crime, digital assets, strategic partnerships and emerging-market growth.",
  alternates: {
    canonical: `${siteUrl}/newsletter`,
  },
  openGraph: {
    title: "The Popeblack Brief | Kayode Popoola",
    description:
      "Practical insights from Kayode Popoola on AI, privacy, financial crime, digital assets, strategic partnerships and emerging-market growth.",
    url: `${siteUrl}/newsletter`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Popeblack Brief | Kayode Popoola",
    description:
      "Practical insights from Kayode Popoola on AI, privacy, financial crime, digital assets, strategic partnerships and emerging-market growth.",
  },
};

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer newsletter-page pb-10">
        <NewsletterPageTracker />
        <section className="newsletter-hero page-layer py-14 md:py-16 lg:py-14">
          <Container>
            <SubstackSignup variant="full" location="newsletter_page" />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
