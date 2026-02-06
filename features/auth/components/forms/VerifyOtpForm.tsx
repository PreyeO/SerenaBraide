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
import OtpInput from "@/features/auth/components/shared/OtpInput";

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
    <div className="flex flex-col w-full gap-8.5 mb-27.75">
      <AuthTitle
        title="Verify OTP"
        subtitle={`We’ve sent a 6-digit verification code to your email ${email}. Please enter the code below to confirm your account.`}
        className="max-w-121"
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
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                  />
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
