"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const desktopLinks = [
  { label: "Profile", href: "#home" },
  { label: "Proof", href: "#impact" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
  { label: "Speaking", href: "#speaking" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const mobileLinks = [
  { label: "Profile", href: "#home" },
  { label: "Proof", href: "#impact" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
  { label: "Speaking", href: "#speaking" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const homepageSpyTargets = [
  { sectionId: "home", activeHref: "#home" },
  { sectionId: "impact", activeHref: "#impact" },
  { sectionId: "ecosystems", activeHref: "#impact" },
  { sectionId: "portfolio", activeHref: "#impact" },
  { sectionId: "skills", activeHref: "#skills" },
  { sectionId: "experience", activeHref: "#experience" },
  { sectionId: "credentials", activeHref: "#credentials" },
  { sectionId: "education", activeHref: "#credentials" },
  { sectionId: "speaking", activeHref: "#speaking" },
  { sectionId: "writing", activeHref: "/blog" },
  { sectionId: "contact", activeHref: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const activeHrefRef = useRef("#home");
  const pathname = usePathname();

  const activateLink = (href: string) => {
    if (href.startsWith("#")) {
      activeHrefRef.current = href;
      setActiveHref(href);
    }
    setOpen(false);
  };

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) {
      return href;
    }

    return pathname === "/" ? href : `/${href}`;
  };

  const isActiveLink = (href: string) => {
    if (href === "/blog") {
      return pathname === "/blog" || (pathname === "/" && activeHref === href);
    }

    return pathname === "/" && activeHref === href;
  };

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem("popeblack-theme") === "light"
        ? "light"
        : "dark";

    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.style.colorScheme = savedTheme;
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = homepageSpyTargets
      .map((target) => ({
        ...target,
        element: document.getElementById(target.sectionId),
      }))
      .filter((target) => target.element) as Array<
      (typeof homepageSpyTargets)[number] & { element: HTMLElement }
    >;
    const orderedSections = [...sections].sort(
      (a, b) => a.element.offsetTop - b.element.offsetTop,
    );

    if (!orderedSections.length) {
      return;
    }

    let frameId = 0;

    const findActiveHref = () => {
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--site-header-height",
          ),
        ) || 92;
      const viewportHeight = window.innerHeight;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );

      if (scrollTop + viewportHeight >= pageHeight - 24) {
        return "#contact";
      }

      const anchorY = scrollTop + headerHeight + viewportHeight * 0.34;
      let nextActiveHref = orderedSections[0]?.activeHref ?? "#home";

      for (const target of orderedSections) {
        if (target.element.offsetTop <= anchorY) {
          nextActiveHref = target.activeHref;
        } else {
          break;
        }
      }

      return nextActiveHref;
    };

    const updateActiveHref = () => {
      frameId = 0;
      const nextActiveHref = findActiveHref();

      if (activeHrefRef.current !== nextActiveHref) {
        activeHrefRef.current = nextActiveHref;
        setActiveHref(nextActiveHref);
      }
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveHref);
    };

    requestUpdate();

    if (typeof window.IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(requestUpdate, {
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0, 0.16, 0.32, 0.48, 0.64],
      });

      sections.forEach((target) => observer.observe(target.element));

      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      window.addEventListener("hashchange", requestUpdate);

      return () => {
        window.cancelAnimationFrame(frameId);
        observer.disconnect();
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        window.removeEventListener("hashchange", requestUpdate);
      };
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [pathname]);

  return (
    <header className="site-header page-layer sticky top-0 pt-4">
      <Container>
        <div className="site-header-panel relative rounded-[1rem] border border-[var(--line)] bg-[rgba(10,11,13,0.84)] px-4 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={resolveHref("#home")}
              className="site-brand min-w-0"
              onClick={() => activateLink("#home")}
            >
              <div className="meta-stack">Kayode Popoola / Popeblack</div>
              <div className="mt-1 truncate font-['Sora'] text-sm text-[var(--foreground)]">
                {profile.headline}
              </div>
            </Link>

            <nav
              className="desktop-nav hidden items-center lg:flex"
              aria-label="Primary navigation"
            >
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  aria-current={isActiveLink(link.href) ? "page" : undefined}
                  className={cn(
                    "desktop-nav-link meta-stack transition hover:text-[var(--foreground)]",
                    isActiveLink(link.href) && "is-active",
                  )}
                  onClick={() => activateLink(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="nav-actions hidden items-center gap-2 lg:flex">
              <Link
                href={profile.bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="desktop-nav-cta meta-stack"
                onClick={() => setOpen(false)}
              >
                Book a Call
              </Link>
              <button
                type="button"
                className="theme-toggle"
                data-theme-toggle
                aria-label="Toggle color theme"
              >
                <span className="theme-icon theme-icon-sun">
                  <Sun size={15} />
                </span>
                <span className="theme-icon theme-icon-moon">
                  <Moon size={15} />
                </span>
              </button>
            </div>

            <div className="mobile-nav-actions flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="theme-toggle"
                data-theme-toggle
                aria-label="Toggle color theme"
              >
                <span className="theme-icon theme-icon-sun">
                  <Sun size={15} />
                </span>
                <span className="theme-icon theme-icon-moon">
                  <Moon size={15} />
                </span>
              </button>
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
          </div>

          <div
            id="mobile-nav"
            className={cn(
              "mobile-nav-panel grid overflow-hidden transition-all duration-300 lg:hidden",
              open
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0">
              <div className="mobile-nav-links flex flex-col gap-3 border-t border-[var(--line)] pt-4">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={resolveHref(link.href)}
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                    className={cn(
                      "mobile-nav-link meta-stack px-1 py-2 transition hover:text-[var(--foreground)]",
                      isActiveLink(link.href) && "is-active",
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
