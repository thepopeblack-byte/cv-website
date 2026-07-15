"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import {
  ControlledScene,
  type ControlledSceneItem,
} from "@/components/ControlledScene";
import { speakingMediaItems, type PortfolioItem } from "@/data/portfolio";

type ActiveMedia = Pick<PortfolioItem, "title" | "videoEmbedUrl"> | null;

function withAutoplay(url: string) {
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}

export function SpeakingMedia() {
  const [activeMedia, setActiveMedia] = useState<ActiveMedia>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mediaTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeMedia) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMedia(null);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      mediaTriggerRef.current?.focus();
    };
  }, [activeMedia]);

  const mediaPanels: ControlledSceneItem[] = speakingMediaItems.map(
    (item, index) => ({
      id: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label:
        [
          "Encryption Day",
          "Tech Talk",
          "Secret Agent",
          "Daybreak Extra",
          "Alt Kings",
          "Web3 Lagos",
          "Cybertech Africa",
        ][index] ?? item.title,
      content: (
        <article className="media-card media-feature-card">
          <div className="image-panel media-image-panel relative">
            <Image
              src={item.image}
              alt={item.imageAlt ?? item.title}
              fill
              className="object-cover"
              sizes="(min-width: 1180px) 34vw, 100vw"
            />
            <div className="media-image-shade" aria-hidden="true" />
          </div>
          <div className="media-feature-copy">
            <div className="meta-stack">{item.category}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="media-feature-actions">
              {item.videoEmbedUrl ? (
                <button
                  ref={(node) => {
                    if (node) {
                      mediaTriggerRef.current = node;
                    }
                  }}
                  type="button"
                  className="text-link"
                  onClick={() =>
                    setActiveMedia({
                      title: item.title,
                      videoEmbedUrl: item.videoEmbedUrl,
                    })
                  }
                >
                  Play
                </button>
              ) : null}
              {item.videoWatchUrl ? (
                <Link
                  href={item.videoWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link inline-flex items-center gap-2"
                >
                  {item.videoEmbedUrl ? "Source" : "Play"}
                  <ArrowUpRight size={13} />
                </Link>
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link inline-flex items-center gap-2"
                >
                  {item.ctaLabel ?? "Event"}
                  <ArrowUpRight size={13} />
                </Link>
              ) : null}
              {item.links?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link inline-flex items-center gap-2"
                >
                  {link.label}
                  <ArrowUpRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </article>
      ),
    }),
  );

  return (
    <section
      id="speaking"
      data-nav-group="expertise"
      data-scene-label="Speaking & Media"
      className="page-layer controlled-section py-14 md:py-16 lg:py-12"
    >
      <Container>
        <ControlledScene
          eyebrow="Speaking & media"
          title="Watch Kayode in Action"
          intro="Selected talks, workshops, media appearances, and public proof across Web3, blockchain privacy, ecosystem growth, and digital assets."
          items={mediaPanels}
          ariaLabel="Speaking and media appearances"
          panelClassName="media-scene-panel"
        />
      </Container>

      {activeMedia?.videoEmbedUrl ? (
        <div
          className="media-dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-dialog-title"
        >
          <div className="media-dialog-shell">
            <div className="media-dialog">
              <div className="media-dialog-header">
                <div>
                  <div className="meta-stack">Speaking clip</div>
                  <h3 id="media-dialog-title">{activeMedia.title}</h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveMedia(null)}
                  className="media-dialog-close"
                  aria-label="Close media modal"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="media-dialog-frame">
                <iframe
                  src={withAutoplay(activeMedia.videoEmbedUrl)}
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
