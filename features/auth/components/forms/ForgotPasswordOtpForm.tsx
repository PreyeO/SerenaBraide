"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyOtpSchema } from "@/features/auth/auth.schema";
import { OtpFormValues } from "@/features/auth/auth.type";
import AuthTitle from "@/components/ui/typography/auth-title";
import SubmitButton from "@/components/ui/btns/submit-cta";
import ResendOtp from "@/features/auth/components/shared/ResendOtp";
import OtpInput from "@/features/auth/components/shared/OtpInput";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const ForgotPasswordOtpForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email")!;
  const returnUrl = searchParams.get("return_url");

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: { otp: ["", "", "", "", "", ""], email },
  });

  const onSubmit = (values: OtpFormValues) => {
    console.log(values);
    // Preserve return_url if it exists
    const resetPasswordUrl = returnUrl
      ? `/auth/reset-password?email=${email}&return_url=${encodeURIComponent(returnUrl)}`
      : `/auth/reset-password?email=${email}`;
    router.push(resetPasswordUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8.5 mb-27.75">
      <AuthTitle
        title="Verify Code"
        subtitle={`A 6-digit code has been sent to ${email}. Enter the code to continue.`}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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

          <SubmitButton
            label="Continue"
            loadingLabel="Please wait..."
            isPending={false}
          />
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordOtpForm;
