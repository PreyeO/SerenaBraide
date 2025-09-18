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
import { Button } from "@/components/ui/button";

import { useSignup } from "../hooks/useSignup";
import { SignUpFormValues, signUpSchema } from "../schemas";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
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
    <div className="flex items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-2xl">
        {/* 🔹 Sign in prompt */}
        <p className="text-sm text-gray-600 mb-2 text-right">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-[#E61A1A] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>

        <h1 className="text-3xl font-bold text-[#E61A1A] mt-4 mb-6">
          Create Your Account
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
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
                <FormItem>
                  <FormLabel>Phone Number (WhatsApp preferred)</FormLabel>
                  <FormControl>
                    <Input placeholder="+234 801 234 5678" {...field} />
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
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

            <FormField
              control={form.control}
              name="dayOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day of Birth</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="DD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Month of Birth */}
            <FormField
              control={form.control}
              name="monthOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month of Birth</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="MM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year of Birth */}
            <FormField
              control={form.control}
              name="yearOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Birth</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#E61A1A] text-white hover:bg-red-700"
              >
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
