import { api } from "@/lib/axios";

import { AxiosResponse } from "axios";
import {
  LoginFormValues,
  LoginResponse,
  OtpFormValues,
  OtpResponse,
  RegisterFormValues,
  RegisterResponse,
} from "@/features/auth/auth.type";

export async function registerUser(
  data: RegisterFormValues
): Promise<RegisterResponse> {
  const response: AxiosResponse<RegisterResponse> = await api.post(
    "/api/users/",
    data
  );
  return response.data;
}

export async function verifyOtp(data: OtpFormValues): Promise<OtpResponse> {
  const response: AxiosResponse<OtpResponse> = await api.post(
    "/api/users/email-verification/verify-otp/",
    data
  );
  return response.data;
}

export async function resendOtp(email: string): Promise<OtpResponse> {
  const response: AxiosResponse<OtpResponse> = await api.post(
    "/api/users/email-verification/request-otp/",
    { email }
  );
  return response.data;
}

export async function loginUser(data: LoginFormValues): Promise<LoginResponse> {
  const response: AxiosResponse<LoginResponse> = await api.post(
    "/api/users/login/",
    data
  );
  return response.data;
}

export async function requestPasswordReset(
  email: string
): Promise<OtpResponse> {
  const response = await api.post("/api/users/password-reset/request/", {
    email,
  });
  return response.data;
}

export async function completePasswordReset(data: {
  email: string;
  otp: string;
  new_password: string;
}): Promise<OtpResponse> {
  const response: AxiosResponse<OtpResponse> = await api.post(
    "/api/users/password-reset/complete/",
    data
  );
  return response.data;
}
