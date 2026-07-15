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
    "Kayode Popoola's capabilities, credentials, education, professional development, and public speaking across commercial growth, Web3, and blockchain intelligence.",
  alternates: { canonical: `${siteUrl}/expertise` },
};

export default function ExpertisePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Expertise"
          title="Commercial depth, infrastructure fluency, and intelligence-led execution."
          intro="A focused view of capabilities, credentials, education, professional development, and public proof supporting senior commercial and institutional work."
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
