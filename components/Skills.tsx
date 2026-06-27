"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const clusterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frameId = 0;

    const updateActiveCluster = () => {
      const viewportHeight = window.innerHeight;
      const anchor = viewportHeight * 0.42;
      let nextActiveIndex = 0;
      let bestScore = Number.POSITIVE_INFINITY;

      clusterRefs.current.forEach((cluster, index) => {
        if (!cluster) {
          return;
        }

        const rect = cluster.getBoundingClientRect();
        const visible = rect.bottom > viewportHeight * 0.12 && rect.top < viewportHeight * 0.88;
        const clusterAnchor = rect.top + Math.min(rect.height * 0.28, viewportHeight * 0.32);
        const score = Math.abs(clusterAnchor - anchor) + (visible ? 0 : viewportHeight);

        if (score < bestScore) {
          bestScore = score;
          nextActiveIndex = index;
        }
      });

      setActiveIndex(nextActiveIndex);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveCluster);
    };

    updateActiveCluster();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeGroup = skillGroups[activeIndex] ?? skillGroups[0];
  const capabilityProgress =
    skillGroups.length > 1 ? (activeIndex / (skillGroups.length - 1)) * 100 : 0;

  return (
    <section id="skills" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame capability-section">
          <div className="meta-stack">04 / CAPABILITIES</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <aside
              className="capability-copy"
              style={
                {
                  "--capability-progress": `${capabilityProgress}%`,
                } as CSSProperties
              }
            >
              <div className="capability-orbit" aria-hidden="true" />
              <h2 className="section-title">Capabilities.</h2>
              <p className="section-copy">
                Commercial leadership, ecosystem execution, technical fluency,
                and intelligence-led operating depth.
              </p>

              <div className="capability-active-card" aria-live="polite">
                <div className="meta-stack">Active cluster</div>
                <h3>{activeGroup.title}</h3>
                <p>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(skillGroups.length).padStart(2, "0")}
                </p>
              </div>

              <div className="capability-rail" aria-label="Capability clusters">
                {skillGroups.map((group, index) => (
                  <div
                    key={group.title}
                    className={`capability-rail-item ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{group.title}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="capability-cluster-stack">
              {skillGroups.map((group, index) => (
                <article
                  key={group.title}
                  ref={(node) => {
                    clusterRefs.current[index] = node;
                  }}
                  className={`capability-cluster ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  style={{ "--cluster-index": index } as CSSProperties}
                >
                  <div className="capability-cluster-header">
                    <span className="meta-stack">
                      {String(index + 1).padStart(2, "0")} / CLUSTER
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul className="capability-chip-grid">
                    {group.items.map((item) => (
                      <li key={item} className="capability-chip">
                        {item}
                      </li>
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
