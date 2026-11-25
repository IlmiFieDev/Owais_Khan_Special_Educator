"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import PremiumSelect from "@/components/ui/PremiumSelect";
import { SITE_CONTENT } from "@/lib/content";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const requestedTopic = searchParams.get("topic") ?? "";
  const requestedFocus = searchParams.get("focus") ?? "";
  const validFocus = SITE_CONTENT.expertise.areas.some((area) => area.title === requestedFocus)
    ? requestedFocus
    : "";
  const contextualType = SITE_CONTENT.contact.enquiryTypes.includes(
    requestedTopic as (typeof SITE_CONTENT.contact.enquiryTypes)[number]
  ) ? requestedTopic : "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      enquiry_type: contextualType,
      preferred_contact_method: "",
      message: validFocus ? `I am enquiring about ${validFocus}. ` : "",
      contact_consent: false,
      website: "",
    },
  });

  const onSubmit = async (data: EnquiryInput) => {
    if (submitted) return;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setSubmitted(true);
      reset();
    } catch {
      setStatus("error");
      setServerError("Unable to send your enquiry right now. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-soft border border-teal/25 bg-sage/50 p-6"
        role="status"
        aria-live="polite"
      >
        <h3 className="font-heading text-2xl font-semibold text-ink">
          Thank you for reaching out.
        </h3>
        <p className="mt-3 text-ink-muted">
          Your enquiry has been received. I will respond using your preferred contact method.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
      aria-describedby="enquiry-form-status"
    >
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div>
        <label className="label" htmlFor="enquiry-name">
          Your name
        </label>
        <input
          id="enquiry-name"
          className="field"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "enquiry-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="enquiry-name-error" className="field-error">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="enquiry-email">
            Email address
          </label>
          <input
            id="enquiry-email"
            type="email"
            className="field"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="enquiry-email-error" className="field-error">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="label" htmlFor="enquiry-phone">
            Phone number
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            className="field"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="enquiry-phone-error" className="field-error">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
          <label className="label" htmlFor="enquiry-type">
            Enquiry type
          </label>
          <Controller
            name="enquiry_type"
            control={control}
            render={({ field }) => (
              <PremiumSelect
                id="enquiry-type"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select an enquiry type"
                invalid={Boolean(errors.enquiry_type)}
                describedBy={errors.enquiry_type ? "enquiry-type-error" : undefined}
                options={SITE_CONTENT.contact.enquiryTypes.map((type) => ({ value: type, label: type }))}
              />
            )}
          />
          {errors.enquiry_type && <p id="enquiry-type-error" className="field-error">{errors.enquiry_type.message}</p>}
      </div>

      <div>
          <label className="label" htmlFor="enquiry-method">
            Preferred contact method
          </label>
          <Controller
            name="preferred_contact_method"
            control={control}
            render={({ field }) => (
              <PremiumSelect
                id="enquiry-method"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select a contact method"
                invalid={Boolean(errors.preferred_contact_method)}
                describedBy={errors.preferred_contact_method ? "enquiry-method-error" : undefined}
                options={SITE_CONTENT.contact.contactMethods.map((method) => ({ value: method, label: method }))}
              />
            )}
          />
          {errors.preferred_contact_method && <p id="enquiry-method-error" className="field-error">{errors.preferred_contact_method.message}</p>}
      </div>

      <div>
        <label className="label" htmlFor="enquiry-message">
          Message
        </label>
        <textarea
          id="enquiry-message"
          rows={5}
          className="field"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="enquiry-message-error" className="field-error">
            {errors.message.message}
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-ink/30"
          {...register("contact_consent")}
        />
        <span>
          I agree to be contacted about this enquiry. Please do not include a child’s
          full name, diagnosis or sensitive documents.
        </span>
      </label>
      {errors.contact_consent && (
        <p className="field-error">{errors.contact_consent.message}</p>
      )}

      <Button type="submit" disabled={status === "loading" || submitted}>
        {status === "loading" ? "Sending…" : "Send enquiry"}
      </Button>

      <p id="enquiry-form-status" role="status" className="text-sm text-ink-muted">
        {serverError || SITE_CONTENT.contact.privacyNote}
      </p>
    </form>
  );
}
