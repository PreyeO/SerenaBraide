"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { ForgotPasswordFormValues } from "../../../features/auth/types";
import { forgotPasswordSchema } from "../../../features/auth/schemas";
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
    <div className="flex flex-col items-center pt-[70px] justify-center w-full gap-[34px] ">
      <AuthTitle
        title="Forgot Password?"
        subtitle="Enter the email address you use in creating your account to reset password"
        className="max-w-[398px] leading-[22px] text-sm"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6  w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">Email</FormLabel>
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
          <div className="mt-[34px]">
            <SubmitButton
              label="Continue"
              loadingLabel="Sending..."
              isPending={isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
