"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTitle from "@/components/ui/typography/auth-title";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { OtpFormValues } from "@/features/auth/auth.type";
import { VerifyOtpSchema } from "@/features/auth/auth.schema";
import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";
import ResendOtp from "@/features/auth/components/shared/ResendOtp";

const VerifyOtpForm = ({ email }: { email: string }) => {
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: { otp: ["", "", "", "", "", ""], email },
  });

  const { mutate: verify, isPending: isVerifying } = useVerifyOtp();

  const onSubmit = (values: OtpFormValues) => {
    verify({
      otp: values.otp.join(""), // convert array to string
      email: values.email,
    });
  };

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px] mb-[111px]">
      <AuthTitle
        title="Verify OTP"
        subtitle={`We’ve sent a 6-digit verification code to your email ${email}. Please enter the code below to confirm your account.`}
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
                        className="w-[50px] h-[50px] text-center border focus:border-[#3B3B3B] border-[#E0E0E0] rounded-full outline-none focus:bg-[#F5F5F5]"
                        value={char}
                        onChange={(e) => {
                          const newOtp = [...field.value];
                          newOtp[index] = e.target.value.slice(-1);
                          field.onChange(newOtp);

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

          <ResendOtp email={email} />

          <div className="mt-4">
            <SubmitButton
              label="Verify & Continue"
              loadingLabel="Verifying..."
              isPending={isVerifying}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyOtpForm;
