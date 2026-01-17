"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";

import { BalanceFormValues } from "@/features/gift-card/giftcard.type";
import { BalanceSchema } from "@/features/gift-card/giftcard.schema";

const GiftPaymentForm = () => {
  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(BalanceSchema),
    defaultValues: {
      card_number: "",
      pin: "",
    },
  });

  const onSubmit = (data: BalanceFormValues) => {
    console.log("SUBMITTED DATA:", data);
    // TODO: Implement payment processing and success modal
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-[#3B3B3B] font-medium text-sm w-full pt-7.25"
        >
          <FormField
            control={form.control}
            name="card_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Gift card number"
                    className="rounded-[50px] border h-12.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Pin"
                    className="rounded-[50px] border h-12.5"
                  />
                </FormControl>
                <FormMessage />
                <AuthSpan className="font-normal text-sm leading-5.5">
                  <Link href="/">
                    <span className="font-medium text-black">
                      {" "}
                      Need Help? {" "}
                    </span>
                  </Link>{" "}
                  Your gift card number and PIN were sent to the email address
                  you used at the time of purchase.
                </AuthSpan>
              </FormItem>
            )}
          />
          <div className="mt-4">
            <SubmitButton label="Pay Now" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GiftPaymentForm;
