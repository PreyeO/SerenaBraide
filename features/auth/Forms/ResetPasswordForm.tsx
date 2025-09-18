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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[588px]">
        <AuthTitle
          title="Reset Password"
          subtitle="Set a new password for your account"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 mt-6"
          >
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
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#E51919]"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="******"
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#E51919]"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500"
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
