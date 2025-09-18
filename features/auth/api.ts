import {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  SigninFormValues,
  SignUpFormValues,
  VerifyOtpFormValues,
} from "@/features/auth/types";
import { apiClient } from "@/lib/client";

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
