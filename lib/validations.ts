import { z } from "zod";
import { SITE_CONTENT } from "./content";

const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;

export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name (at least 2 characters).")
      .max(80, "Name is too long."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .trim()
      .regex(phoneRegex, "Please enter a valid phone number.")
      .optional()
      .or(z.literal("")),
    enquiry_type: z
      .string()
      .min(1, "Please select an enquiry type.")
      .refine(
        (value) => (SITE_CONTENT.contact.enquiryTypes as readonly string[]).includes(value),
        "Please select a valid enquiry type."
      ),
    preferred_contact_method: z
      .string()
      .min(1, "Please select a preferred contact method.")
      .refine(
        (value) => ["Email", "Phone", "Either"].includes(value),
        "Please select a valid contact method."
      ),
    message: z
      .string()
      .trim()
      .min(20, "Please share a little more detail (at least 20 characters).")
      .max(1500, "Message is too long (max 1500 characters)."),
    contact_consent: z
      .boolean({
        required_error: "Consent is required so I can respond to your enquiry.",
      })
      .refine((value) => value === true, {
        message: "Consent is required so I can respond to your enquiry.",
      }),
    website: z.string().max(0).optional(), // honeypot
    turnstileToken: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasEmail = Boolean(data.email && data.email.length > 0);
    const hasPhone = Boolean(data.phone && data.phone.length > 0);

    if (!hasEmail && !hasPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide at least an email address or phone number.",
        path: ["email"],
      });
    }

    if (data.preferred_contact_method === "Email" && !hasEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required when email is your preferred contact method.",
        path: ["email"],
      });
    }

    if (data.preferred_contact_method === "Phone" && !hasPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone is required when phone is your preferred contact method.",
        path: ["phone"],
      });
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;

const relationshipMap: Record<string, string> = {
  "Parent / Guardian": "parent",
  Teacher: "teacher",
  Therapist: "therapist",
  Institution: "institution",
  Other: "other",
};

export const feedbackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(60, "Name is too long (max 60 characters)."),
  relationship: z
    .string()
    .min(1, "Please select your relationship to the educator.")
    .refine(
      (value) => (SITE_CONTENT.feedback.relationships as readonly string[]).includes(value),
      "Please select a valid relationship."
    ),
  rating: z
    .number({
      required_error: "Please select an overall experience rating.",
      invalid_type_error: "Please select an overall experience rating.",
    })
    .int("Rating must be a whole number.")
    .min(1, "Please select a rating from 1 to 5.")
    .max(5, "Please select a rating from 1 to 5."),
  message: z
    .string()
    .trim()
    .min(20, "Please share feedback of at least 20 characters.")
    .max(500, "Feedback is too long (max 500 characters)."),
  publication_consent: z.boolean(),
  website: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export function mapRelationship(label: string): string {
  return relationshipMap[label] ?? "other";
}
