import { ContactFormValues } from "@/types/general";
import { api } from "../axios";

export async function contactUser(data: ContactFormValues) {
  const response = await api.post("/api/contact-message", data);
  return response.data;
}
