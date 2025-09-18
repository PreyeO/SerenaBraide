import { apiClient } from "@/lib/client";
import { SignUpFormValues } from "./schemas";

export async function signupUser(data: SignUpFormValues) {
  const response = await apiClient.post("/api/tenant-auth/register", data);
  return response.data;
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await apiClient.post("/api/tenant-auth/login", data);
  return response.data;
}
