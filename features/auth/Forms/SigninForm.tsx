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
import { SigninFormValues } from "../types";
import { signinSchema } from "../schemas";
import { useSignin } from "../hooks/useSignin";
import AuthTitle from "@/components/ui/typography/auth-title";
import AuthSpan from "@/components/ui/typography/auth-span";
import SubmitButton from "@/components/ui/btns/submit-cta";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignin();

  function onSubmit(values: SigninFormValues) {
    mutate(values);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[588px]">
        <AuthTitle
          title="Sign In"
          subtitle="Access your Cloud Top G dashboard and stay on track"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
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

            <div className="mt-4">
              <SubmitButton
                label="Proceed to Dashboard"
                loadingLabel="Signing in..."
                isPending={isPending}
              />
            </div>
          </form>
        </Form>
        <div className="text-center pt-6">
          <AuthSpan>
            Forgot your Password?{" "}
            <Link href="/auth/reset">
              <span className="text-[#E51919] underline cursor-pointer">
                Reset!
              </span>
            </Link>
          </AuthSpan>
        </div>
      </div>
    </div>
  );
};
export default SigninForm;
