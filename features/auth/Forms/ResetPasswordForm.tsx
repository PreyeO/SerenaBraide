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
import { ResetPasswordFormValues } from "../types";
import { resetPasswordSchema } from "../schemas";
import { useResetPassword } from "../hooks/useResetPassword";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthSpan from "@/components/ui/typography/auth-span";
import AuthSwitchPrompt from "./shared-component/AuthSwitchPrompt";
import AuthLinkPrompt from "./shared-component/AuthLinkPrompt";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (values: ResetPasswordFormValues) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px]  mb-[111px] ">
      <AuthTitle
        title="Reset Password"
        subtitle="We’ve sent a 6-digit verification code to your email Testmail@gmail.com. Please enter the code below and create a new password."
        className=" max-w-[438px] leading-[22px]"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6  w-full"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[12px] font-medium">CODE</FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Code"
                    {...field}
                    className=" rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#9A9A98] font-normal h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
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
            name="confirmPassword"
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
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
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
