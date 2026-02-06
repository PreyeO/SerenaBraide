"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthTitle from "@/components/ui/typography/auth-title";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { ResetPasswordFormValues } from "@/features/auth/auth.type";
import { ResetPasswordSchema } from "@/features/auth/auth.schema";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import AuthLinkPrompt from "../shared/AuthLinkPrompt";
import AuthSwitchPrompt from "../shared/AuthSwitchPrompt";
import PasswordInput from "../shared/PasswordInput";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { otp: "", new_password: "", new_password_repeated: "" },
  });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (values: ResetPasswordFormValues) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col w-full gap-8.5 mb-27.75">
      <AuthTitle
        title="Reset Password"
        subtitle={`We’ve sent a 6-digit verification code to your email ${email}. Please enter the code below and create a new password.`}
        className="max-w-121"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6  w-full"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[12px] font-medium">
                  CODE<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Code"
                    {...field}
                    className=" rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] font-normal h-12.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  New Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password_repeated"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  Confirm Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="lg:mt-4">
            <SubmitButton
              label="Reset Password"
              loadingLabel="Resetting..."
              isPending={isPending}
              onClick={() => { }}
            />
          </div>
          <div className=" lg:mt-4 flex items-center justify-center">
            <AuthLinkPrompt
              message="Didn't get the code?"
              linkText="Resend Code"
              href="/auth/resend"
            />
          </div>
          <AuthSwitchPrompt
            message="Remember Password?"
            linkText="Login Here"
            href="/auth/signin"
          />
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
