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

const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ||
  "https://formspree.io/f/mbdvyddy";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
        message:
          "Something went wrong. Please use the email link or try again.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(contactEndpoint, {
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
        message:
          "Something went wrong. Please use the email link or try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      data-scene-label="Contact"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">Contact</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Contact.</h2>
              <p className="section-copy">{profile.audienceLabel}</p>
              <div className="contact-primary-actions mt-7 flex flex-wrap gap-3">
                <Link
                  href={profile.bookCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Book a Call
                </Link>
                <Link
                  href={`mailto:${profile.email}`}
                  className="button-secondary"
                >
                  Email Kayode
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form grid gap-4">
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

              <p className="contact-privacy-note">
                By submitting this form, you agree that the information
                provided may be used to respond to your enquiry. Read the{" "}
                <Link href="/privacy">privacy notice</Link>.
              </p>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="button-primary"
                    disabled={submitting}
                  >
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
                    role={status.type === "error" ? "alert" : "status"}
                    aria-live={status.type === "error" ? "assertive" : "polite"}
                    className={`max-w-xl text-sm leading-7 ${
                      status.type === "error"
                        ? "text-[var(--error)]"
                        : status.type === "success"
                          ? "text-[var(--success)]"
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
