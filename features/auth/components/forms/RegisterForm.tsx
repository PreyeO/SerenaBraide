"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthTitle from "@/components/ui/typography/auth-title";
import AuthSpan from "@/components/ui/typography/auth-span";
import AuthSwitchPrompt from "@/features/auth/components/shared/AuthSwitchPrompt";
import { RegisterSchema } from "@/features/auth/auth.schema";
import { RegisterFormValues } from "@/features/auth/auth.type";
import { useRegister } from "@/features/auth/hooks/useRegister";
import Paragraph from "@/components/ui/typography/paragraph";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      date_of_birth: "",
    },
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (values: RegisterFormValues) => {
    // We can now send the values directly without any key transformation
    mutate(values);
  };

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px] mb-[111px]">
      <AuthTitle
        title="Sign Up"
        subtitle="Create an account to shop faster, track your orders, and stay updated on your purchases. Plus, enjoy 200 points as a welcome bonus when you sign up."
        className="max-w-[484px]"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#3B3B3B] font-normal"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  FIRST NAME
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#9A9A98] font-normal h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  LAST NAME
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">EMAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  PHONE NUMBER
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234 801 234 5678"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
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
              <FormItem className="">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[12px] font-medium">
                  CONFIRM PASSWORD
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  DATE OF BIRTH
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] text-[#D1D5DB] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
                <Paragraph
                  className="text-[#9A9A98] text-sm leading-[18px] font-normal pt-1"
                  content="     Get Membership Reward on Your Birthday!"
                />
              </FormItem>
            )}
          />

          {/* Terms */}
          <div className="md:col-span-2 mt-4 text-[#3B3B3B] flex gap-6 items-center">
            <AuthSpan className="font-normal text-sm leading-[22px]">
              By creating an account, you agree to Serena Braide’s
              <Link href="/legal/terms_of_service">
                <span className="font-medium underline"> Terms of Use </span>
              </Link>{" "}
              and confirm that you have read Serena Braide’s{" "}
              <Link href="/legal/privacy_policy">
                <span className="font-medium underline"> Privacy Policy</span>
              </Link>
            </AuthSpan>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <SubmitButton
              label="Create Account"
              loadingLabel="Creating account..."
              isPending={isPending}
              onClick={() => {}}
            />

            <AuthSwitchPrompt
              message="Already have an account?"
              linkText="Log In"
              href="/auth/login"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
