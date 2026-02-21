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
import { BalanceSchema } from "../../giftcard.schema";
import { BalanceFormValues } from "../../giftcard.type";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";

interface GiftCardFormProps {
  onSubmit: (data: BalanceFormValues) => void;
  isLoading?: boolean;
  buttonLabel?: string;
  showHelpText?: boolean;
}

const GiftCardForm = ({
  onSubmit,
  isLoading = false,
  buttonLabel = "Continue",
}: GiftCardFormProps) => {
  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(BalanceSchema),
    defaultValues: {
      card_number: "",
      pin: "",
    },
  });

  return (
    <div className="flex flex-col items-center w-full md:px-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-[#3B3B3B] font-medium text-sm w-full pt-7.5"
        >
          <FormField
            control={form.control}
            name="card_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your gift card number"
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
                    type="password"
                    placeholder="Enter your security pin"
                    className="rounded-[50px] border h-12.5"
                  />
                </FormControl>
                <FormMessage />

                <AuthSpan className="  mt-1 font-normal text-[#6F6E6C] text-sm md:text-[12px] leading-5.5">
                  <Link href="/">
                    <span className="font-medium text-[#3B3B3B]">
                      {" "}
                      Require Assistance?{" "}
                    </span>
                  </Link>{" "}
                  Your card details and security PIN were securely delivered to
                  the email provided at purchase
                </AuthSpan>
              </FormItem>
            )}
          />
          <div className="my-1">
            <SubmitButton
              label={buttonLabel}
              isPending={isLoading}
              loadingLabel="Processing..."
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GiftCardForm;
