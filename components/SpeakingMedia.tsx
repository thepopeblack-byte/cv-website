"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { speakingMediaItems, type PortfolioItem } from "@/data/portfolio";

type ActiveMedia = Pick<PortfolioItem, "title" | "videoEmbedUrl"> | null;

function withAutoplay(url: string) {
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}

export function SpeakingMedia() {
  const [activeMedia, setActiveMedia] = useState<ActiveMedia>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
    };
  }, [activeMedia]);

  return (
    <section
      id="speaking"
      data-nav-group="expertise"
      data-scene-label="Speaking & Media"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame media-stage">
          <div className="meta-stack">Speaking & media</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div className="media-stage-copy">
              <h2 className="section-title">Watch Kayode in Action</h2>
              <p className="section-copy">
                Selected talks, workshops, media appearances, and public proof
                across Web3, blockchain privacy, ecosystem growth, and digital
                assets.
              </p>
            </div>

            <MobileSwipeRegion
              className="media-card-stack"
              label="Speaking and media appearances"
            >
              {speakingMediaItems.map((item, index) => (
                <SectionReveal key={item.title} delay={0.03 + index * 0.025}>
                  <article className="media-card">
                    <div className="image-panel media-image-panel relative min-h-[200px]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 220px, 100vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.08),rgba(10,11,13,0.82))]" />
                    </div>
                    <div>
                      <div className="meta-stack">{item.category}</div>
                      <h3 className="mt-3 font-['Sora'] text-[1.5rem] tracking-[-0.04em] text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[0.98rem] leading-8 text-[var(--muted)]">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-4">
                        {item.videoEmbedUrl ? (
                          <button
                            type="button"
                            className="bracket-link"
                            onClick={() =>
                              setActiveMedia({
                                title: item.title,
                                videoEmbedUrl: item.videoEmbedUrl,
                              })
                            }
                          >
                            [PLAY]
                          </button>
                        ) : null}
                        {item.videoWatchUrl ? (
                          <Link
                            href={item.videoWatchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bracket-link inline-flex items-center gap-2"
                          >
                            [{item.videoEmbedUrl ? "SOURCE" : "PLAY"}]
                            <ArrowUpRight size={13} />
                          </Link>
                        ) : null}
                        {item.href ? (
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bracket-link inline-flex items-center gap-2"
                          >
                            [{item.ctaLabel ?? "EVENT"}]
                            <ArrowUpRight size={13} />
                          </Link>
                        ) : null}
                        {item.links?.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bracket-link inline-flex items-center gap-2"
                          >
                            [{link.label}]
                            <ArrowUpRight size={13} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>

      {activeMedia?.videoEmbedUrl ? (
        <div
          className="fixed inset-0 z-[130] bg-[rgba(8,10,12,0.86)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-dialog-title"
        >
          <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
            <div className="w-full rounded-[1.2rem] border border-[var(--line)] bg-[rgba(11,12,16,0.98)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="meta-stack">Speaking clip</div>
                  <h3
                    id="media-dialog-title"
                    className="mt-2 font-['Sora'] text-xl text-[var(--foreground)]"
                  >
                    {activeMedia.title}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveMedia(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--foreground)]"
                  aria-label="Close media modal"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="aspect-video overflow-hidden rounded-[1rem] border border-[var(--line)]">
                <iframe
                  src={withAutoplay(activeMedia.videoEmbedUrl)}
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
