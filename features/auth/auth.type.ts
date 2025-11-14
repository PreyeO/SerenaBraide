import { z } from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from "@/features/auth/auth.schema";

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type OtpFormValues = z.infer<typeof VerifyOtpSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export interface StoreUser {
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
  email_validated: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  date_joined: string;
}

export interface UserTokens {
  refresh: string;
  access: string;
}

export interface RegisterResponse {
  user: StoreUser;
  tokens: UserTokens;
  detail: string;
}

export interface OtpResponse {
  detail: string;
}
export interface LoginResponse {
  user: StoreUser;
  tokens: UserTokens;
  detail: string;
}
