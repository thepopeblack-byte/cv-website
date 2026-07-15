import { existsSync } from "node:fs";
import { join } from "node:path";

import { Download, Mail, Send } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

function XSocialIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.54V8.99H7.1v11.46Z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"
      />
    </svg>
  );
}

const cvFilePath = join(
  process.cwd(),
  "public",
  profile.cvUrl.replace(/^\//, ""),
);

export function Footer() {
  const hasCv = existsSync(cvFilePath);

  const socialLinks = [
    {
      label: "Email Kayode Popoola",
      href: `mailto:${profile.email}`,
      icon: <Mail aria-hidden="true" />,
    },
    {
      label: "Kayode Popoola on LinkedIn",
      href: profile.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    },
    {
      label: "Kayode Popoola on X",
      href: profile.twitter,
      icon: <XSocialIcon />,
      external: true,
    },
    {
      label: "Kayode Popoola on Telegram",
      href: profile.telegram,
      icon: <Send aria-hidden="true" />,
      external: true,
    },
    {
      label: "Watch Kayode Popoola on YouTube",
      href: profile.youtube,
      icon: <YouTubeIcon />,
      external: true,
    },
  ];

  return (
    <footer className="site-footer page-layer py-8">
      <Container>
        <div className="site-footer-inner">
          <div className="site-footer-intro">
            <div className="meta-stack">
              {profile.name} / {profile.brandName}
            </div>
            <p>
              Commercial leadership, Web3 partnerships, blockchain
              intelligence, and emerging-market execution.
            </p>
          </div>

          <div className="site-footer-actions">
            <div className="site-footer-meta">
              <span>Copyright {new Date().getFullYear()} {profile.name}</span>
              <Link href="/privacy">Privacy</Link>
              {hasCv ? (
                <Link href={profile.cvUrl} download className="footer-download">
                  <Download size={15} aria-hidden="true" />
                  Download CV
                </Link>
              ) : null}
            </div>

            <div className="footer-social-icons" aria-label="Professional links">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
