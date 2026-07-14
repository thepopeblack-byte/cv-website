import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImpactStats } from "@/components/ImpactStats";
import { LatestWriting } from "@/components/LatestWriting";
import { Portfolio } from "@/components/Portfolio";
import { SelectedEcosystems } from "@/components/SelectedEcosystems";
import { Skills } from "@/components/Skills";
import { SpeakingMedia } from "@/components/SpeakingMedia";
import { ScrollScenes } from "@/components/ScrollScenes";
import { SelectedOutcomes } from "@/components/SelectedOutcomes";

export default function Page() {
  return (
    <>
      <Header />
      <ScrollScenes />
      <main id="main-content" className="page-layer pb-6">
        <Hero />
        <About />
        <ImpactStats />
        <SelectedEcosystems />
        <SelectedOutcomes />
        <Portfolio />
        <Skills />
        <Certifications />
        <Education />
        <SpeakingMedia />
        <ExperienceTimeline />
        <LatestWriting />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
import { About } from "@/components/About";
