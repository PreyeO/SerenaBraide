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
import SubHeading from "@/components/ui/typography/subHeading";
import { useState, useEffect } from "react";
import Paragraph from "@/components/ui/typography/paragraph";
import FormModal from "@/components/ui/modals/form-modals";
import LinkCta from "@/components/ui/btns/link-cta";
import { useCheckBalance } from "../../hooks/useCheckBalance";
import { GiftCardBalanceResponse } from "../../giftcard.type";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter, useSearchParams } from "next/navigation";

const BalanceForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balanceData, setBalanceData] = useState<GiftCardBalanceResponse | null>(null);
  
  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(BalanceSchema),
    defaultValues: {
      card_number: "",
      pin: "",
    },
  });

  const checkBalanceMutation = useCheckBalance({
    onSuccess: (balance) => {
      setBalanceData(balance);
      setIsModalOpen(true);
    },
  });

  // Auto-submit after login redirect
  useEffect(() => {
    if (!isHydrated || !user) return;

    // Check if we have stored form data from before auth redirect
    const storedFormData = sessionStorage.getItem("giftcard_balance_form");
    if (storedFormData) {
      try {
        const { card_number, pin } = JSON.parse(storedFormData);
        // Restore form values
        form.reset({ card_number, pin });
        
        // Auto-submit the form
        checkBalanceMutation.mutate({ card_number, pin });
        
        // Clear stored data
        sessionStorage.removeItem("giftcard_balance_form");
      } catch (error) {
        console.error("Error restoring form data:", error);
        sessionStorage.removeItem("giftcard_balance_form");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isHydrated]);

  const onSubmit = (data: BalanceFormValues) => {
    // Check authentication before submitting
    if (!user) {
      // Store form data in sessionStorage
      sessionStorage.setItem(
        "giftcard_balance_form",
        JSON.stringify({ card_number: data.card_number, pin: data.pin })
      );
      
      // Redirect to login with return_url
      router.push("/auth/login?return_url=/giftcard-balance");
      return;
    }

    // User is authenticated, proceed with API call
    checkBalanceMutation.mutate({
      card_number: data.card_number,
      pin: data.pin,
    });
  };

  return (
    <div className="flex flex-col items-center w-full ">
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
                    placeholder="Pin"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
                <AuthSpan className="font-normal text-sm leading-[22px]">
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
            <SubmitButton
              label="Check card balance"
              isPending={checkBalanceMutation.isPending}
              loadingLabel="Checking balance..."
            />
          </div>

          <FormModal
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setBalanceData(null);
              form.reset();
            }}
            title="Gift card balance"
            showVideo={true}
          >
            {balanceData && (
              <div className="bg-[#F0F3F7] w-full  my-[30px] border rounded-[10px] py-[25px] flex flex-col items-center">
                <SubHeading
                  className="text-[40px] font-semibold"
                  title={`${balanceData.currency} ${balanceData.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                />
                <h3 className="font-medium text-[#6F6E6C] text-[22px] pt-[10px] pb-4">
                  Available balance
                </h3>

                <Paragraph
                  className="text-[#3B3B3B] leading-6 font-normal text-base  italic"
                  content="This balance can be used across Serena Braid products"
                />
                {balanceData.status && (
                  <Paragraph
                    className="text-[#3B3B3B] font-normal text-sm pt-2"
                    content={`Status: ${balanceData.status}`}
                  />
                )}
              </div>
            )}

            <Link href="/">
              <LinkCta
                className="w-full bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] "
                label="Continue shopping"
              />
            </Link>
            <Paragraph
              className="text-[#3B3B3B] font-normal text-sm pt-[10px]"
              content="Gift card balance is valid for 12 months from date of purchase"
            />
          </FormModal>
        </form>
      </Form>
    </div>
  );
};

export default BalanceForm;
