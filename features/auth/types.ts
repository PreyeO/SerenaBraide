import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  verifyOtpSchema,
} from "@/features/auth/schemas";
import { z } from "zod";

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type SignUpFormValues = z.infer<typeof signupSchema>;
export type SigninFormValues = z.infer<typeof signinSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
