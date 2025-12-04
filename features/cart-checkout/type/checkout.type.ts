import z from "zod";
import { AddressSchema } from "../components/schema/checkout.schema";

export type AddressFormValues = z.infer<typeof AddressSchema>;

export interface PaymentItemProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  className: string;
  detail: string;
  optionID: string;
}
