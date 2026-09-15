import { z } from "zod";
import { phoneNumberSchema } from "@/lib/schemas/phone.schema";

// This doubles as the "checkout form" — a single Name field (split into
// first/last on submit) plus a delivery address, so the phone number and
// country typed here are shared with the address created right after signup.
// That's why phone_number/country are required here even though the account
// endpoint itself treats them as optional.
export const RegisterSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  date_of_birth: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
      "Enter a valid date of birth",
    ),
  phone_number: phoneNumberSchema,
  country: z.string().min(1, "Country is required"),
  address: z.string().min(2, "Address is required"),
  state: z.string().trim().min(2, "State is required"),
});
export const VerifyOtpSchema = z.object({
  otp: z.array(z.string().length(1)).length(6, "OTP must be 6 digits"),
  email: z.string().email("Enter a valid email"),
});

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const ResetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          "Password must contain upper, lower, number and special character",
      }),
    new_password_repeated: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.new_password_repeated, {
    path: ["new_password_repeated"],
    message: "Passwords do not match",
  });
