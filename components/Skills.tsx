"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const clusterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const clusters = clusterRefs.current.filter(Boolean) as HTMLElement[];

    if (!clusters.length) {
      return;
    }

    const activateCluster = (nextActiveIndex: number) => {
      if (activeIndexRef.current !== nextActiveIndex) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }
    };

    if (typeof window.IntersectionObserver === "undefined") {
      activateCluster(0);
      return;
    }

    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let nextActiveIndex = activeIndexRef.current;
        let bestScore = 0;

        clusters.forEach((cluster) => {
          const score = visibility.get(cluster) ?? 0;
          const index = clusterRefs.current.indexOf(cluster);

          if (index >= 0 && score > bestScore) {
            bestScore = score;
            nextActiveIndex = index;
          }
        });

        if (bestScore > 0.14) {
          activateCluster(nextActiveIndex);
        }
      },
      {
        rootMargin: "-12% 0px -30% 0px",
        threshold: [0.18, 0.34, 0.5, 0.68],
      },
    );

    clusters.forEach((cluster) => observer.observe(cluster));

    return () => observer.disconnect();
  }, []);

  const activeGroup = skillGroups[activeIndex] ?? skillGroups[0];
  const capabilityProgress =
    skillGroups.length > 1 ? (activeIndex / (skillGroups.length - 1)) * 100 : 0;
  const selectCluster = (nextActiveIndex: number) => {
    activeIndexRef.current = nextActiveIndex;
    setActiveIndex(nextActiveIndex);
  };

  return (
    <section id="skills" className="page-layer py-14 md:py-16 lg:py-12">
      <Container>
        <SectionReveal className="section-frame capability-section">
          <div className="meta-stack">Capabilities</div>
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
                  <button
                    type="button"
                    key={group.title}
                    className={`capability-rail-item ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    aria-current={index === activeIndex ? "step" : undefined}
                    onClick={() => selectCluster(index)}
                  >
                    <span>{group.title}</span>
                  </button>
                ))}
              </div>
              <p className="capability-mobile-hint">
                Tap a cluster to switch focus. All capabilities remain
                available.
              </p>
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
                    <span className="meta-stack">Capability cluster</span>
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
