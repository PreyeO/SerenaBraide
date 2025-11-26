import { z } from "zod";
import RecipientForm from "./components/forms/RecipientForm";
import BalanceForm from "./components/forms/BalanceForm";

export type RecipientFormValues = z.infer<typeof RecipientForm>;
export type BalanceFormValues = z.infer<typeof BalanceForm>;
