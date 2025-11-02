import {
  ContactFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  SigninFormValues,
  SignUpFormValues,
  VerifyOtpFormValues,
} from "@/types/auth";
import { apiClient } from "@/lib/api/client";

export async function signupUser(data: SignUpFormValues) {
  const response = await apiClient.post("/api/tenant-auth/register", data);
  return response.data;
}

export async function signinUser(data: SigninFormValues) {
  const response = await apiClient.post("/api/tenant-auth/login", data);
  return response.data;
}

export async function verifyOtp(data: VerifyOtpFormValues) {
  const response = await apiClient.post("/api/tenant-auth/verify-otp", data);
  return response.data;
}

export async function forgotPassword(data: ForgotPasswordFormValues) {
  const response = await apiClient.post(
    "/api/tenant-auth/forgot-password",
    data
  );
  return response.data;
}

export async function resetPassword(data: ResetPasswordFormValues) {
  const response = await apiClient.post(
    "/api/tenant-auth/reset-password",
    data
  );
  return response.data;
}

export async function contactUser(data: ContactFormValues) {
  const response = await apiClient.post("/api/contact-message", data);
  return response.data;
}
