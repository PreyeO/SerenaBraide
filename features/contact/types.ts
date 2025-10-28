import { z } from "zod";
import { contactSchema } from "./schema";

export type ContactFormValues = z.infer<typeof contactSchema>;
