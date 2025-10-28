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
import { SignUpFormValues } from "../types";
import { signupSchema } from "../schemas";
import AuthTitle from "@/components/ui/typography/auth-title";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useSignin } from "../hooks/useSignin";
import UnderlineLink from "@/components/ui/btns/underline-cta";
import AuthSwitchPrompt from "./shared-component/AuthSwitchPrompt";

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignin();

  function onSubmit(values: SignUpFormValues) {
    mutate(values); // ✅ no need for onError here
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px] mb-[111px]">
      <AuthTitle
        title="Login"
        subtitle="By accessing your Serena Braide Account you can track and manage your orders and also save multiple items in your cart and wishlist."
        className="max-w-[484px]"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-[#3B3B3B] font-medium text-sm w-full max-w-md "
        >
          {/* Email */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[12px] font-medium">EMAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  PASSWORD
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      {...field}
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
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
          <UnderlineLink
            href="/auth/forgot-password"
            className="mx-auto"
            text="Forgot Password?"
          />

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <SubmitButton
              label="Sign In"
              loadingLabel="Signing in..."
              isPending={isPending}
            />
          </div>

          <AuthSwitchPrompt
            message="New Customer?"
            linkText="Create account"
            href="/auth/signup"
          />
        </form>
      </Form>
    </div>
  );
}
