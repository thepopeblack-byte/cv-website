import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">05 / CAPABILITIES</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Capabilities.</h2>
              <p className="section-copy">
                Commercial leadership, ecosystem execution, technical fluency,
                and intelligence-led operating depth.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {skillGroups.map((group) => (
                <article key={group.title} className="signal-card h-full">
                  <div className="meta-stack">{group.title}</div>
                  <ul className="mt-4 space-y-2 text-[0.98rem] leading-8 text-[var(--muted-strong)]">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
