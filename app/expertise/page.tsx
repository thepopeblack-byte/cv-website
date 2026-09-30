import type { Metadata } from "next";

import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteIntro } from "@/components/RouteIntro";
import { Skills } from "@/components/Skills";
import { SpeakingMedia } from "@/components/SpeakingMedia";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Expertise & Credentials | Kayode Popoola",
  description:
    "Kayode Popoola's demonstrated capabilities, credentials and public speaking in blockchain intelligence, financial-crime analysis and commercial leadership.",
  alternates: { canonical: `${siteUrl}/expertise` },
};

export default function ExpertisePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Expertise"
          title="Capabilities demonstrated in the work."
          intro="Two active practices: transaction and open-source analysis for digital-asset risk, and international partnerships and market adoption."
        />
        <Skills />
        <Certifications />
        <Education />
        <SpeakingMedia />
      </main>
      <Footer />
    </>
  );
}
