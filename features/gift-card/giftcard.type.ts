import { z } from "zod";
import { BalanceSchema, RecipientSchema } from "./giftcard.schema";

export type RecipientFormValues = z.infer<typeof RecipientSchema>;
export type BalanceFormValues = z.infer<typeof BalanceSchema>;
