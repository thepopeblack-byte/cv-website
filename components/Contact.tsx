"use client";

import { Check, ChevronDown, LoaderCircle } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";
import { trackEvent } from "@/lib/analytics";

type StatusState = {
  type: "idle" | "success" | "error";
  message: string;
};

const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ||
  "https://formspree.io/f/mbdvyddy";

type OpportunityTypeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

function OpportunityTypeSelect({
  value,
  onChange,
}: OpportunityTypeSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const labelId = useId();
  const valueId = useId();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const options = profile.opportunityTypes;

  useEffect(() => {
    if (!open) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      optionRefs.current[activeIndex]?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeIndex, open]);

  const openOptions = (preferredIndex?: number) => {
    const selectedIndex = options.indexOf(value);
    setActiveIndex(
      preferredIndex ?? (selectedIndex >= 0 ? selectedIndex : 0),
    );
    setOpen(true);
  };

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openOptions();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openOptions(value ? options.indexOf(value) : options.length - 1);
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowDown") {
      nextIndex = Math.min(index + 1, options.length - 1);
    } else if (event.key === "ArrowUp") {
      nextIndex = Math.max(index - 1, 0);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = options.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[index]);
      return;
    } else if (event.key === "Tab") {
      setOpen(false);
      return;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
  };

  return (
    <div className="grid gap-2 text-sm text-[var(--muted)]">
      <span id={labelId}>Opportunity Type</span>
      <div ref={rootRef} className="contact-select">
        <input type="hidden" name="opportunityType" value={value} readOnly />
        <button
          ref={triggerRef}
          type="button"
          className="contact-select-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={`${labelId} ${valueId}`}
          onClick={() => {
            if (open) {
              setOpen(false);
            } else {
              openOptions();
            }
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span
            id={valueId}
            className={value ? undefined : "contact-select-placeholder"}
          >
            {value || "Select an option"}
          </span>
          <ChevronDown size={18} aria-hidden="true" />
        </button>

        {open ? (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className="contact-select-options"
          >
            {options.map((option, index) => {
              const selected = value === option;

              return (
                <button
                  key={option}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className="contact-select-option"
                  onClick={() => selectOption(option)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                >
                  <span>{option}</span>
                  {selected ? <Check size={16} aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Contact() {
  const formStartedRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [opportunityType, setOpportunityType] = useState("");
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
      trackEvent("contact_form_submit_error", { error_type: "validation" });
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
        trackEvent("contact_form_submit_error", { error_type: "server" });
        setStatus({
          type: "error",
          message:
            "Something went wrong. Please use the email link or try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. I\u2019ll get back to you soon.",
      });
      trackEvent("generate_lead", { method: "contact_form" });
      form.reset();
      setOpportunityType("");
    } catch {
      trackEvent("contact_form_submit_error", { error_type: "network" });
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

            <form
              onSubmit={handleSubmit}
              onFocusCapture={() => {
                if (!formStartedRef.current) {
                  formStartedRef.current = true;
                  trackEvent("contact_form_start", { form_id: "contact" });
                }
              }}
              data-clarity-mask="true"
              className="contact-form grid gap-4"
            >
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
                <OpportunityTypeSelect
                  value={opportunityType}
                  onChange={setOpportunityType}
                />
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
