"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

type ActiveVideo = Pick<PortfolioItem, "title" | "videoEmbedUrl"> | null;

const featuredNotes = [
  [
    "Conference visibility across executive, policy, and market-entry conversations.",
    "Signals relationship credibility with international founders and ecosystem operators.",
    "Useful reference point for roles involving public-facing commercial representation.",
  ],
  [
    "Workshop-led brand building through technical education and ecosystem trust.",
    "Positions Kayode as an operator who can translate strategy into developer adoption.",
    "Strong supporting evidence for partnership, GTM, and ecosystem leadership roles.",
  ],
];

function withAutoplay(url: string) {
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}

export function Portfolio() {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>(null);
  const featuredItems = portfolioItems.slice(0, 2);
  const archiveItems = portfolioItems.slice(2);

  return (
    <section id="portfolio" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">02 / GLOBAL PRESENCE</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">
                Selected visibility, conference presence, and market-facing work.
              </h2>
              <p className="section-copy">
                This is not a project archive in the traditional sense. It is a
                curated public record of speaking, ecosystem presence, workshops,
                and media touchpoints that reinforce senior commercial credibility.
              </p>
            </div>

            <div className="space-y-6">
              {featuredItems.map((item, index) => (
                <SectionReveal key={item.title} delay={0.04 + index * 0.05}>
                  <article className="feature-grid-card dark-panel rich-border overflow-hidden">
                    <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
                      <div className="relative min-h-[320px] border-b border-[var(--line)] xl:min-h-[440px] xl:border-b-0 xl:border-r xl:border-[var(--line)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-700 hover:scale-[1.03]"
                          sizes="(min-width: 1280px) 36vw, 100vw"
                          loading={index === 0 ? "eager" : undefined}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.08),rgba(10,11,13,0.84))]" />
                        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                          <span className="hero-chip">{item.category}</span>
                          <span className="hero-chip">Featured reference</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                          <div className="meta-stack text-[0.7rem] text-[var(--muted-strong)]">
                            0{index + 1} / SELECTED FEATURE
                          </div>
                          <h3 className="mt-3 font-['Sora'] text-[1.9rem] leading-[1] tracking-[-0.06em] text-[var(--foreground)] sm:text-[2.4rem]">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8">
                        <div className="meta-stack">Market context</div>
                        <p className="mt-4 text-[1rem] leading-8 text-[var(--muted-strong)]">
                          {item.description}
                        </p>

                        <div className="mt-8 space-y-3">
                          {featuredNotes[index].map((note, noteIndex) => (
                            <div
                              key={note}
                              className="flex gap-4 border-t border-[var(--line)] pt-4"
                            >
                              <span className="meta-stack">0{noteIndex + 1}</span>
                              <p className="text-[0.96rem] leading-7 text-[var(--muted)]">
                                {note}
                              </p>
                            </div>
                          ))}
                        </div>

                        {item.placeholderNote ? (
                          <p className="mt-5 text-sm leading-7 text-[var(--accent-soft)]">
                            {item.placeholderNote}
                          </p>
                        ) : null}

                        <div className="mt-8 flex flex-wrap gap-4">
                          {item.videoEmbedUrl ? (
                            <button
                              type="button"
                              className="button-secondary"
                              onClick={() =>
                                setActiveVideo({
                                  title: item.title,
                                  videoEmbedUrl: item.videoEmbedUrl,
                                })
                              }
                            >
                              Watch clip
                            </button>
                          ) : null}

                          {item.videoWatchUrl ? (
                            <Link
                              href={item.videoWatchUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="button-ghost inline-flex"
                            >
                              Source video
                              <ArrowUpRight size={15} />
                            </Link>
                          ) : null}

                          {item.href ? (
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              className="button-ghost inline-flex"
                            >
                              Event page
                              <ArrowUpRight size={15} />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              ))}

              <div className="border-t border-[var(--line)] pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="meta-stack">Archive references</div>
                    <p className="mt-2 text-[0.98rem] leading-7 text-[var(--muted)]">
                      Additional speaking, media, and conference references from
                      the current public profile.
                    </p>
                  </div>
                  <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                    {archiveItems.length} supporting entries
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {archiveItems.map((item, index) => (
                    <SectionReveal key={item.title} delay={0.03 + index * 0.03}>
                      <article className="archive-card">
                        <div className="relative min-h-[220px] overflow-hidden rounded-[1rem] border border-[var(--line)]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition duration-500 hover:scale-[1.03]"
                            sizes="(min-width: 768px) 42vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.04),rgba(10,11,13,0.84))]" />
                          <div className="absolute left-4 top-4 meta-stack text-[0.68rem] text-[var(--muted-strong)]">
                            0{index + 3} / {item.category}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-['Sora'] text-[1.3rem] leading-[1.05] tracking-[-0.05em] text-[var(--foreground)]">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <p className="mt-4 text-[0.96rem] leading-7 text-[var(--muted)]">
                          {item.description}
                        </p>

                        {item.placeholderNote ? (
                          <p className="mt-3 text-sm leading-7 text-[var(--accent-soft)]">
                            {item.placeholderNote}
                          </p>
                        ) : null}

                        <div className="mt-4 flex flex-wrap gap-4">
                          {item.videoEmbedUrl ? (
                            <button
                              type="button"
                              className="bracket-link"
                              onClick={() =>
                                setActiveVideo({
                                  title: item.title,
                                  videoEmbedUrl: item.videoEmbedUrl,
                                })
                              }
                            >
                              [WATCH]
                            </button>
                          ) : null}

                          {item.videoWatchUrl ? (
                            <Link
                              href={item.videoWatchUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="bracket-link inline-flex items-center gap-2"
                            >
                              [VIDEO]
                              <ArrowUpRight size={13} />
                            </Link>
                          ) : null}

                          {item.href ? (
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              className="bracket-link inline-flex items-center gap-2"
                            >
                              [SOURCE]
                              <ArrowUpRight size={13} />
                            </Link>
                          ) : null}
                        </div>
                      </article>
                    </SectionReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>

      {activeVideo?.videoEmbedUrl ? (
        <div className="fixed inset-0 z-[90] bg-[rgba(8,10,12,0.86)] p-4 backdrop-blur-sm">
          <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
            <div className="w-full rounded-[1.2rem] border border-[var(--line)] bg-[rgba(11,12,16,0.98)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="meta-stack">Playback</div>
                  <h3 className="mt-2 font-['Sora'] text-xl text-[var(--foreground)]">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--foreground)]"
                  aria-label="Close video modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="aspect-video overflow-hidden rounded-[1rem] border border-[var(--line)]">
                <iframe
                  src={withAutoplay(activeVideo.videoEmbedUrl)}
                  title={activeVideo.title}
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
