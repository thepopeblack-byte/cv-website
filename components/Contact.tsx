"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

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
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus({
        type: "error",
        message: "Contact form is not configured yet. Please use the email link.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      opportunityType: String(formData.get("opportunityType") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please use the email link or try again.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. I\u2019ll get back to you soon.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please use the email link or try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="page-layer py-8 md:py-10 lg:py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">10 / CONTACT</div>
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

            <form onSubmit={handleSubmit} className="grid gap-4">
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
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="button-primary" disabled={submitting}>
                    {submitting ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
                {status.message ? (
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
                ) : null}
              </div>
            </form>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
