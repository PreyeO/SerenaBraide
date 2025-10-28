import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  Subject: z.string().min(6, "Subject is required"),
  country: z.string().min(1, "Country is required"),
  message: z.string().min(1, "Message is required"),
});
