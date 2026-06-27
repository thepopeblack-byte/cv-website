"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/Container";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="page-layer sticky top-0 z-50 pt-4">
      <Container>
        <div className="relative rounded-[1rem] border border-[var(--line)] bg-[rgba(10,11,13,0.84)] px-4 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="#home" className="min-w-0">
              <div className="meta-stack">Kayode Popoola / Popeblack</div>
              <div className="mt-1 truncate font-['Sora'] text-sm text-[var(--foreground)]">
                {profile.headline}
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="meta-stack transition hover:text-[var(--foreground)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <span className="meta-stack">Global Web3 GTM</span>
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
                    className="meta-stack px-1 py-2 transition hover:text-[var(--foreground)]"
                    onClick={() => setOpen(false)}
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
