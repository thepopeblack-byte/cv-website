"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/Container";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { number: "00", label: "Home", href: "#home" },
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Portfolio", href: "#portfolio" },
  { number: "03", label: "Experience", href: "#experience" },
  { number: "04", label: "Impact", href: "#impact" },
  { number: "05", label: "Skills", href: "#skills" },
  { number: "06", label: "Speaking", href: "#speaking" },
  { number: "07", label: "Certifications", href: "#certifications" },
  { number: "08", label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="page-layer sticky top-0 z-50 pt-4">
      <Container>
        <div className="relative overflow-hidden rounded-[1.15rem] border border-[var(--line)] bg-[rgba(10,11,13,0.82)] px-4 py-4 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%,rgba(214,176,120,0.08))]" />

          <div className="relative flex items-center justify-between gap-4">
            <Link href="#home" className="min-w-0">
              <div className="meta-stack">KAYODE POPOOLA / POPEBLACK</div>
              <div className="mt-1 truncate font-['Sora'] text-sm tracking-[-0.03em] text-[var(--foreground)]">
                Head of Sales & Business Development
              </div>
            </Link>

            <nav className="hidden items-center gap-5 xl:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.16em] text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  <span className="text-[0.62rem] tracking-[0.24em] text-[var(--accent-soft)] transition group-hover:text-[var(--foreground)]">
                    {link.number}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex lg:flex-col lg:items-end">
              <span className="meta-stack">{profile.location}</span>
              <span className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--foreground)]">
                Open to senior international roles
              </span>
            </div>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--foreground)] lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            id="mobile-nav"
            className={cn(
              "grid overflow-hidden transition-all duration-300 lg:hidden",
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0">
              <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-1 py-2 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--muted)] transition hover:text-[var(--foreground)]"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-[0.66rem] tracking-[0.22em] text-[var(--accent-soft)]">
                      {link.number}
                    </span>
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-[var(--line)] pt-4">
                  <div className="meta-stack">{profile.location}</div>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    Open to senior global commercial, partnerships, and ecosystem
                    leadership roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
