"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const desktopLinks = [
  { label: "Profile", href: "#home" },
  { label: "Proof", href: "#impact" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Speaking", href: "#speaking" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const mobileLinks = [
  { label: "Profile", href: "#home" },
  { label: "Proof", href: "#impact" },
  { label: "Ecosystems", href: "#ecosystems" },
  { label: "Capabilities", href: "#skills" },
  { label: "Work", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Media", href: "#speaking" },
  { label: "Contact", href: "#contact" },
];

const observedLinks = Array.from(
  new Map([...desktopLinks, ...mobileLinks].map((link) => [link.href, link])).values(),
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const activeHrefRef = useRef("#home");

  const activateLink = (href: string) => {
    activeHrefRef.current = href;
    setActiveHref(href);
    setOpen(false);
  };

  useEffect(() => {
    const sections = observedLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length || typeof window.IntersectionObserver === "undefined") {
      return;
    }

    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextActiveHref = activeHrefRef.current;
        let bestScore = 0;

        sections.forEach((section) => {
          const score = visibility.get(section) ?? 0;

          if (score > bestScore) {
            bestScore = score;
            nextActiveHref = `#${section.id}`;
          }
        });

        if (bestScore > 0.12 && activeHrefRef.current !== nextActiveHref) {
          activeHrefRef.current = nextActiveHref;
          setActiveHref(nextActiveHref);
        }
      },
      {
        rootMargin: "-14% 0px -62% 0px",
        threshold: [0.12, 0.28, 0.44, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header page-layer sticky top-0 z-50 pt-4">
      <Container>
        <div className="site-header-panel relative rounded-[1rem] border border-[var(--line)] bg-[rgba(10,11,13,0.84)] px-4 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="#home" className="site-brand min-w-0" onClick={() => activateLink("#home")}>
              <div className="meta-stack">Kayode Popoola / Popeblack</div>
              <div className="mt-1 truncate font-['Sora'] text-sm text-[var(--foreground)]">
                {profile.headline}
              </div>
            </Link>

            <nav className="desktop-nav hidden items-center lg:flex" aria-label="Primary navigation">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={cn(
                    "desktop-nav-link meta-stack transition hover:text-[var(--foreground)]",
                    activeHref === link.href && "is-active",
                  )}
                  onClick={() => activateLink(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link
                href={profile.bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="desktop-nav-cta meta-stack"
                onClick={() => setOpen(false)}
              >
                Book a Call
              </Link>
            </div>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="mobile-menu-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--foreground)] lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            id="mobile-nav"
            className={cn(
              "mobile-nav-panel grid overflow-hidden transition-all duration-300 lg:hidden",
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0">
              <div className="mobile-nav-links flex flex-col gap-3 border-t border-[var(--line)] pt-4">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={activeHref === link.href ? "page" : undefined}
                    className={cn(
                      "mobile-nav-link meta-stack px-1 py-2 transition hover:text-[var(--foreground)]",
                      activeHref === link.href && "is-active",
                    )}
                    onClick={() => activateLink(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
