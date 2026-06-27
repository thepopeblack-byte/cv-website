"use client";

import { useEffect, useState } from "react";

const sceneLabels = [
  "Hero",
  "Commercial Proof",
  "Ecosystems",
  "Capabilities",
  "Experience",
  "Selected Work",
  "Credentials",
  "Media",
  "Contact",
];

export function ScrollScenes() {
  const [activeScene, setActiveScene] = useState(0);
  const [sceneCount, setSceneCount] = useState(sceneLabels.length);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main#main-content > section.page-layer"),
    );

    if (!sections.length) {
      return;
    }

    setSceneCount(sections.length);
    sections.forEach((section, index) => {
      section.classList.add("scroll-scene");
      section.dataset.sceneIndex = String(index + 1);
    });

    let frameId = 0;

    const updateActiveScene = () => {
      const viewportHeight = window.innerHeight;
      const anchor = viewportHeight * 0.42;
      let nextActiveScene = 0;
      let bestScore = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const visible = rect.bottom > viewportHeight * 0.08 && rect.top < viewportHeight * 0.92;
        const sectionAnchor = rect.top + Math.min(rect.height * 0.28, viewportHeight * 0.36);
        const score = Math.abs(sectionAnchor - anchor) + (visible ? 0 : viewportHeight);

        if (score < bestScore) {
          bestScore = score;
          nextActiveScene = index;
        }
      });

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)),
        );
        const parallaxOffset = `${((progress - 0.5) * -2.5).toFixed(3)}rem`;

        section.style.setProperty("--scene-scroll", progress.toFixed(3));
        section.style.setProperty("--scene-parallax", parallaxOffset);
        section.classList.toggle("scene-active", index === nextActiveScene);
        section.classList.toggle("scene-before", index < nextActiveScene);
        section.classList.toggle("scene-after", index > nextActiveScene);
      });

      setActiveScene(nextActiveScene);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveScene);
    };

    updateActiveScene();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      sections.forEach((section) => {
        section.classList.remove("scroll-scene", "scene-active", "scene-before", "scene-after");
        delete section.dataset.sceneIndex;
        section.style.removeProperty("--scene-scroll");
        section.style.removeProperty("--scene-parallax");
      });
    };
  }, []);

  const label = sceneLabels[activeScene] ?? `Scene ${activeScene + 1}`;
  const progress = sceneCount > 1 ? (activeScene / (sceneCount - 1)) * 100 : 0;

  return (
    <div className="scroll-story-progress" aria-hidden="true">
      <span>{String(activeScene + 1).padStart(2, "0")}</span>
      <span className="scroll-story-progress-line">
        <span style={{ height: `${progress}%` }} />
      </span>
      <span>{String(sceneCount).padStart(2, "0")}</span>
      <span className="scroll-story-progress-label">{label}</span>
    </div>
  );
}
