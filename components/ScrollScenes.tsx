"use client";

import { useEffect, useRef, useState } from "react";

const sceneLabels = [
  "Hero",
  "Commercial Proof",
  "Ecosystems",
  "Capabilities",
  "Selected Work",
  "Experience",
  "Credentials",
  "Education",
  "Media",
  "Writing",
  "Contact",
];

export function ScrollScenes() {
  const [activeScene, setActiveScene] = useState(0);
  const [sceneCount, setSceneCount] = useState(sceneLabels.length);
  const activeSceneRef = useRef(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main#main-content > section.page-layer",
      ),
    );

    if (!sections.length) {
      return;
    }

    sections.forEach((section, index) => {
      section.classList.add("scroll-scene");
      section.dataset.sceneIndex = String(index + 1);
    });
    const initialFrameId = window.requestAnimationFrame(() => {
      setSceneCount(sections.length);
      activateScene(findBestScene());
    });

    const activateScene = (nextActiveScene: number) => {
      sections.forEach((section, index) => {
        section.classList.toggle("scene-active", index === nextActiveScene);
        section.classList.toggle("scene-before", index < nextActiveScene);
        section.classList.toggle("scene-after", index > nextActiveScene);
      });

      if (activeSceneRef.current !== nextActiveScene) {
        activeSceneRef.current = nextActiveScene;
        setActiveScene(nextActiveScene);
      }
    };

    const findBestScene = () => {
      const viewportHeight = window.innerHeight;
      const anchor = viewportHeight * 0.42;
      let nextActiveScene = 0;
      let bestScore = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const visible =
          rect.bottom > viewportHeight * 0.08 &&
          rect.top < viewportHeight * 0.92;
        const sectionAnchor =
          rect.top + Math.min(rect.height * 0.28, viewportHeight * 0.36);
        const score =
          Math.abs(sectionAnchor - anchor) + (visible ? 0 : viewportHeight);

        if (score < bestScore) {
          bestScore = score;
          nextActiveScene = index;
        }
      });

      return nextActiveScene;
    };

    if (typeof window.IntersectionObserver === "undefined") {
      let frameId = 0;

      const requestUpdate = () => {
        window.cancelAnimationFrame(frameId);
        frameId = window.requestAnimationFrame(() =>
          activateScene(findBestScene()),
        );
      };

      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);

      return () => {
        window.cancelAnimationFrame(initialFrameId);
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        sections.forEach((section) => {
          section.classList.remove(
            "scroll-scene",
            "scene-active",
            "scene-before",
            "scene-after",
          );
          delete section.dataset.sceneIndex;
        });
      };
    }

    const visibility = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(
            entry.target as HTMLElement,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let nextActiveScene = -1;
        let bestScore = 0;

        sections.forEach((section, index) => {
          const ratio = visibility.get(section) ?? 0;

          if (ratio > bestScore) {
            bestScore = ratio;
            nextActiveScene = index;
          }
        });

        if (nextActiveScene >= 0 && bestScore > 0.12) {
          activateScene(nextActiveScene);
        } else {
          activateScene(findBestScene());
        }
      },
      {
        rootMargin: "-10% 0px -28% 0px",
        threshold: [0.18, 0.32, 0.48, 0.64, 0.8],
      },
    );

    const syncOnResize = () => activateScene(findBestScene());

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("resize", syncOnResize);

    return () => {
      window.cancelAnimationFrame(initialFrameId);
      observer.disconnect();
      window.removeEventListener("resize", syncOnResize);
      sections.forEach((section) => {
        section.classList.remove(
          "scroll-scene",
          "scene-active",
          "scene-before",
          "scene-after",
        );
        delete section.dataset.sceneIndex;
      });
    };
  }, []);

  const label = sceneLabels[activeScene] ?? `Scene ${activeScene + 1}`;
  const progress = sceneCount > 1 ? (activeScene / (sceneCount - 1)) * 100 : 0;

  return (
    <div className="scroll-story-progress" aria-hidden="true">
      <span className="scroll-story-progress-line">
        <span style={{ height: `${progress}%` }} />
      </span>
      <span className="scroll-story-progress-label">{label}</span>
    </div>
  );
}
