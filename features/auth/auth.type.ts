// features/auth/auth.type.ts
import { z } from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/features/auth/auth.schema";

// -------------------- Form Values --------------------
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export interface UserTokens {
  refresh: string;
  access: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  date_of_birth: string | null;
  country: string;
  city: string | null;
  is_customer: boolean;
  is_admin: boolean;
  customer_profile: number | null;
  admin_profile: {
    user: number;
  } | null;
  email_validated: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  date_joined: string;
}

export interface RegisterResponse extends User {
  tokens: UserTokens;
  detail?: string;
}

export type LoginResponse = RegisterResponse;

export interface OtpResponse {
  detail: string;
}

export type OtpPayload = {
  otp: string;
  email: string;
};
export type OtpFormValues = {
  otp: string[]; // 6 separate inputs
  email: string;
};
