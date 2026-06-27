import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">07 / CREDENTIALS</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Credentials.</h2>
              <p className="section-copy">
                Certification work across compliance, financial crime analysis,
                open-source intelligence, and leadership.
              </p>
            </div>

            <div className="space-y-5">
              {certifications.map((certification) => (
                <article
                  key={`${certification.issuer}-${certification.title}`}
                  className="border-t border-[var(--line)] pt-5"
                >
                  <div className="meta-stack">
                    {certification.issuer} / {certification.year}
                  </div>
                  <h3 className="mt-3 font-['Sora'] text-[1.35rem] tracking-[-0.03em] text-[var(--foreground)]">
                    {certification.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
