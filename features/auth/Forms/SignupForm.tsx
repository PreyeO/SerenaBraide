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
import { useSignup } from "../hooks/useSignup";
import { SignUpFormValues } from "../types";
import { signupSchema } from "../schemas";
import AuthTitle from "@/components/ui/typography/auth-title";
import SubmitButton from "@/components/ui/btns/submit-cta";
import Paragraph from "@/components/ui/typography/paragraph";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      dayOfBirth: "",
      monthOfBirth: "",
      yearOfBirth: "",
    },
  });

  const { mutate, isPending } = useSignup();

  function onSubmit(values: SignUpFormValues) {
    mutate(values); // ✅ no need for onError here
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center pt-[70px] justify-center w-full   gap-[34px]">
      <AuthTitle
        title="Sign Up"
        subtitle="Create an account to shop faster, track your orders, and stay updated on your purchases. Plus, enjoy 200 points as a welcome bonus when you sign up."
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#3B3B3B] font-medium text-sm "
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>FIRST NAME</FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    className="rounded-[50px] border border-[#3B3B3B]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LAST NAME</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    className="rounded-[50px] border border-[#3B3B3B]"
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
              <FormItem className="">
                <FormLabel>EMAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-[50px] border border-[#3B3B3B]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>PHONE NUMBER</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234 801 234 5678"
                    {...field}
                    className="rounded-[50px] border border-[#3B3B3B]"
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
              <FormItem className="md:col-span-2">
                <FormLabel>PASSWORD</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      {...field}
                      className="rounded-[50px] border border-[#3B3B3B]"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
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
          <div className="w-full md:col-span-2">
            <FormLabel>DATE OF BIRTH</FormLabel>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {/* Day */}
              <FormField
                control={form.control}
                name="dayOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Day"
                        {...field}
                        className="w-full rounded-[50px] border border-[#3B3B3B]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Month */}
              <FormField
                control={form.control}
                name="monthOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Month"
                        {...field}
                        className="w-full rounded-[50px] border border-[#3B3B3B]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="yearOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Year"
                        {...field}
                        className="w-full rounded-[50px] border border-[#3B3B3B]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Paragraph
              className="text-[#9A9A98] text-sm leading-[18px] font-normal pt-1"
              content="Get Membership Reward on Your Birthday!"
            />
          </div>
          <div className="md:col-span-2 mt-4 text-[#3B3B3B] flex gap-6 items-center">
            <Checkbox id="terms" />
            <AuthSpan className="font-normal text-sm leading-[22px]">
              I agree to Serena Braide’s
              <Link href="/">
                <span className="font-medium underline"> Terms of Use </span>
              </Link>{" "}
              and I confirm I have read Serana Braide’s{" "}
              <Link href="/">
                {" "}
                <span className="font-medium underline">Privacy Policy</span>
              </Link>
            </AuthSpan>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <SubmitButton
              label="Sign Up"
              loadingLabel="Signing up..."
              isPending={isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
