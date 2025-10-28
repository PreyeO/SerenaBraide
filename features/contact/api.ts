import { apiClient } from "@/lib/client";
import { ContactFormValues } from "./types";

export async function contactUser(data: ContactFormValues) {
  const response = await apiClient.post("/api/contact-message", data);
  return response.data;
}
