"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { otp: "", new_password: "", new_password_repeated: "" },
  });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (values: ResetPasswordFormValues) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px]  mb-[111px] ">
      <AuthTitle
        title="Reset Password"
        subtitle={`We’ve sent a 6-digit verification code to your email ${email}. Please enter the code below and create a new password.`}
        className=" max-w-[438px] leading-[22px]"
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
                <FormLabel className="text-[12px] font-medium">CODE</FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Code"
                    {...field}
                    className=" rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] font-normal h-[50px]"
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
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5]  h-[50px]"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
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
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="******"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-[50px]"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4">
            <SubmitButton
              label="Reset Password"
              loadingLabel="Resetting..."
              isPending={isPending}
              onClick={() => {}}
            />
          </div>
          <div className=" mt-4  flex  items-center justify-center">
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
