"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import AuthTitle from "@/components/ui/typography/auth-title";
import AuthSpan from "@/components/ui/typography/auth-span";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { VerifyOtpFormValues } from "../../../features/auth/types";
import { verifyOtpSchema } from "../../../features/auth/schemas";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthLinkPrompt from "../shared-component/AuthLinkPrompt";

const VerifyOtpForm = () => {
  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const { mutate, isPending } = useVerifyOtp();

  const onSubmit = (values: VerifyOtpFormValues) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px]  mb-[111px] ">
      <AuthTitle
        title="Verify OTP"
        subtitle="We’ve sent a 6-digit verification code to your email Testmail@gmail.com. Please enter the code below to confirm your account and unlock your scent experience."
        className="text-center max-w-[468px] mx-auto"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 mt-6"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2 justify-center">
                    {field.value.map((char, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        id={`otp-${index}`}
                        className="w-[50px] h-[50px] text-center border focus:border-[#3B3B3B] border-[#E0E0E0] rounded-full outline-none  focus:bg-[#F5F5F5] "
                        value={char}
                        onChange={(e) => {
                          const newOtp = [...field.value];
                          newOtp[index] = e.target.value.slice(-1); // only last char
                          field.onChange(newOtp);

                          // Auto focus next input
                          if (
                            e.target.value &&
                            index < field.value.length - 1
                          ) {
                            const nextInput = document.getElementById(
                              `otp-${index + 1}`
                            ) as HTMLInputElement;
                            nextInput?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          // Move to previous input on Backspace if empty
                          if (
                            e.key === "Backspace" &&
                            !field.value[index] &&
                            index > 0
                          ) {
                            const prevInput = document.getElementById(
                              `otp-${index - 1}`
                            ) as HTMLInputElement;
                            prevInput?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center gap-[6px] items-center">
            <AuthLinkPrompt
              message="Didn't receive the code?"
              linkText="Resend OTP"
              href="/auth/resend"
            />
            <p className="font-normal text-sm  text-[#6F6E6C]">
              You can request a new one in 22 seconds.
              <span className="text-[#3B3B3B]">22</span>
            </p>
          </div>

          <div className="mt-4">
            <SubmitButton
              label="Verify & Continue"
              loadingLabel="Verifying..."
              isPending={isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyOtpForm;
