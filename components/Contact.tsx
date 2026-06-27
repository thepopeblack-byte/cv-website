"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

type StatusState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: "idle",
    message:
      "Use the form for partnership, leadership, speaking, advisory, or intelligence conversations.",
  });

  async function handleSubmit(formData: FormData) {
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const company = String(formData.get("company") ?? "");
    const opportunityType = String(formData.get("opportunityType") ?? "");
    const message = String(formData.get("message") ?? "");

    if (!endpoint) {
      const subject = encodeURIComponent(
        `${opportunityType || "Opportunity"} from ${name || "Website Visitor"}`,
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nOpportunity Type: ${opportunityType}\n\nMessage:\n${message}`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: "success",
        message: "Email draft opened. You can send it directly from your mail client.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Submission failed. Use the direct email link instead.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">09 / CONTACT</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Contact.</h2>
              <p className="section-copy">{profile.audienceLabel}</p>
              <div className="mt-8 space-y-3">
                <div>
                  <Link href={`mailto:${profile.email}`} className="bracket-link">
                    [EMAIL]
                  </Link>
                </div>
                <div>
                  <Link
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="bracket-link"
                  >
                    [LINKEDIN]
                  </Link>
                </div>
                <div>
                  <Link
                    href={profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="bracket-link"
                  >
                    [X]
                  </Link>
                </div>
                <div>
                  <Link
                    href={profile.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="bracket-link"
                  >
                    [TELEGRAM]
                  </Link>
                </div>
              </div>
            </div>

            <form action={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Name
                  <input
                    required
                    name="name"
                    className="rounded-[0.95rem] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--line-strong)]"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-[0.95rem] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--line-strong)]"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Company
                  <input
                    name="company"
                    className="rounded-[0.95rem] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--line-strong)]"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Opportunity Type
                  <select
                    required
                    name="opportunityType"
                    defaultValue=""
                    className="rounded-[0.95rem] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--line-strong)]"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {profile.opportunityTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Message
                <textarea
                  required
                  name="message"
                  rows={7}
                  className="rounded-[0.95rem] border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--line-strong)]"
                />
              </label>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <button type="submit" className="button-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                <p
                  className={`max-w-xl text-sm leading-7 ${
                    status.type === "error"
                      ? "text-[#e0a7a0]"
                      : status.type === "success"
                        ? "text-[#d8d1c2]"
                        : "text-[var(--muted)]"
                  }`}
                >
                  {status.message}
                </p>
              </div>
            </form>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
