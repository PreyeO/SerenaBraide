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
import Paragraph from "@/components/ui/typography/paragraph";

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
  showHelpText = true,
}: GiftCardFormProps) => {
  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(BalanceSchema),
    defaultValues: {
      card_number: "",
      pin: "",
    },
  });

  return (
    <div className="flex flex-col items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-[#3B3B3B] font-medium text-sm w-full pt-[29px]"
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
                    className="rounded-[50px] border h-[50px]"
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
                    placeholder="Pin"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
                {showHelpText && (
                  <AuthSpan className="font-normal text-sm leading-[22px]">
                    <Link href="/">
                      <span className="font-medium text-black">
                        {" "}
                        Need Help?{" "}
                      </span>
                    </Link>{" "}
                    Your gift card number and PIN were sent to the email address
                    you used at the time of purchase.
                  </AuthSpan>
                )}
              </FormItem>
            )}
          />
          <div className="mt-4">
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

