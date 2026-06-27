import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImpactStats } from "@/components/ImpactStats";
import { Portfolio } from "@/components/Portfolio";
import { SelectedEcosystems } from "@/components/SelectedEcosystems";
import { Skills } from "@/components/Skills";
import { SpeakingMedia } from "@/components/SpeakingMedia";
import { ScrollScenes } from "@/components/ScrollScenes";

export default function Page() {
  return (
    <>
      <Header />
      <ScrollScenes />
      <main id="main-content" className="page-layer pb-6">
        <Hero />
        <ImpactStats />
        <SelectedEcosystems />
        <Skills />
        <ExperienceTimeline />
        <Portfolio />
        <Certifications />
        <SpeakingMedia />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
