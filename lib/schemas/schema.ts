import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  Subject: z.string().min(6, "Subject is required"),
  country: z.string().min(1, "Country is required"),
  message: z.string().min(1, "Message is required"),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),

  dayOfBirth: z.string().min(1, "Day is required"),
  monthOfBirth: z.string().min(1, "Month is required"),
  yearOfBirth: z.string().min(4, "Year must be at least 4 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyOtpSchema = z.object({
  otp: z.array(z.string().length(1)).length(6, "OTP must be 6 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    code: z.string().email("Enter a valid code"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
