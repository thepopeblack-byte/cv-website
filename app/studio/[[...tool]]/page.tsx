import Link from "next/link";

import { SanityStudio } from "@/components/SanityStudio";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-setup-page">
        <div className="studio-setup-card">
          <p className="meta-stack">Editorial Studio</p>
          <h1>Connect your Sanity project</h1>
          <p>
            The editor is installed, but it needs your Sanity project ID before
            it can open. Add the Sanity values from <code>.env.example</code> to
            <code>.env.local</code>, restart the website, then return here.
          </p>
          <div className="studio-setup-actions">
            <Link href="/blog" className="button-primary">
              View current blog
            </Link>
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Open Sanity management
            </a>
          </div>
        </div>
      </main>
    );
  }

  return <SanityStudio />;
}
