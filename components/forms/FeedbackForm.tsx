"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import StarRating from "@/components/forms/StarRating";
import PremiumSelect from "@/components/ui/PremiumSelect";
import { SITE_CONTENT } from "@/lib/content";
import { feedbackSchema, type FeedbackInput } from "@/lib/validations";

export default function FeedbackForm() {
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
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      relationship: "",
      rating: undefined,
      publication_consent: false,
      website: "",
    },
  });

  const onSubmit = async (data: FeedbackInput) => {
    if (submitted) return;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/feedback", {
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
      setServerError("Unable to send feedback right now. Please try again later.");
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
          Thank you for your feedback.
        </h3>
        <p className="mt-3 text-ink-muted">
          Your message has been received privately. If you consented to anonymised
          publication, it will only appear after administrative review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div>
        <label className="label" htmlFor="feedback-name">
          Full name
        </label>
        <input
          id="feedback-name"
          className="field"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "feedback-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && <p id="feedback-name-error" className="field-error">{errors.name.message}</p>}
      </div>

      <div>
        <label className="label" htmlFor="feedback-relationship">
          Relationship to the educator
        </label>
        <Controller
          name="relationship"
          control={control}
          render={({ field }) => (
            <PremiumSelect
              id="feedback-relationship"
              value={field.value}
              onChange={field.onChange}
              placeholder="Select your relationship"
              invalid={Boolean(errors.relationship)}
              describedBy={errors.relationship ? "feedback-relationship-error" : undefined}
              options={SITE_CONTENT.feedback.relationships.map((item) => ({ value: item, label: item }))}
            />
          )}
        />
        {errors.relationship && <p id="feedback-relationship-error" className="field-error">{errors.relationship.message}</p>}
      </div>

      <div>
        <p className="label mb-2" id="feedback-rating-label">Overall experience rating</p>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <StarRating
              value={field.value ?? null}
              onChange={field.onChange}
              invalid={Boolean(errors.rating)}
              describedBy={errors.rating ? "feedback-rating-error" : undefined}
            />
          )}
        />
        {errors.rating && <p id="feedback-rating-error" className="field-error">{errors.rating.message}</p>}
      </div>

      <div>
        <label className="label" htmlFor="feedback-message">
          Feedback message
        </label>
        <textarea
          id="feedback-message"
          rows={5}
          className="field"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "feedback-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="feedback-message-error" className="field-error">
            {errors.message.message}
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 rounded-xl bg-sage/35 p-4 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-ink/30"
          {...register("publication_consent")}
        />
        <span>
          <strong className="block font-semibold text-ink">I allow my feedback to be featured on this website.</strong>
          <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
            Your feedback may be published after review, with personal and sensitive details protected.
          </span>
        </span>
      </label>

      <Button type="submit" disabled={status === "loading" || submitted}>
        {status === "loading" ? "Sending…" : "Submit feedback"}
      </Button>

      {serverError && (
        <p role="status" className="text-sm text-[#b42318]">
          {serverError}
        </p>
      )}
    </form>
  );
}
