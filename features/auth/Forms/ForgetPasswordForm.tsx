"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AuthSpan from "@/components/ui/typography/auth-span";
import AuthTitle from "@/components/ui/typography/auth-title";
import { ForgotPasswordFormValues } from "../types";
import { forgotPasswordSchema } from "../schemas";
import { useForgotPassword } from "../hooks/useForgotPassword";
import SubmitButton from "@/components/ui/btns/submit-cta";

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[588px]">
        <AuthTitle
          title="Forgot Password"
          subtitle="Enter your email and we'll send you a reset link"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 mt-6"
          >
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
            <div className="mt-4">
              <SubmitButton
                label="Send Reset Link"
                loadingLabel="Sending..."
                isPending={isPending}
              />
            </div>
          </form>
        </Form>
        <div className="text-center pt-6">
          <AuthSpan>
            Remember your password?{" "}
            <Link href="/auth/signin">
              <span className="text-[#E51919] underline cursor-pointer">
                Sign In
              </span>
            </Link>
          </AuthSpan>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
