import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImpactStats } from "@/components/ImpactStats";
import { Portfolio } from "@/components/Portfolio";
import { SelectedEcosystems } from "@/components/SelectedEcosystems";
import { Skills } from "@/components/Skills";
import { SpeakingMedia } from "@/components/SpeakingMedia";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer pb-6">
        <Hero />
        <About />
        <Portfolio />
        <SelectedEcosystems />
        <ExperienceTimeline />
        <ImpactStats />
        <Skills />
        <SpeakingMedia />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
