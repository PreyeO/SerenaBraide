import {
  contactSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  verifyOtpSchema,
} from "@/lib/schemas/schema";
import { z } from "zod";

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type SignUpFormValues = z.infer<typeof signupSchema>;
export type SigninFormValues = z.infer<typeof signinSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
