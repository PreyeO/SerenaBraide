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
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthTitle from "@/components/ui/typography/auth-title";
import AuthSpan from "@/components/ui/typography/auth-span";
import AuthSwitchPrompt from "@/features/auth/components/shared/AuthSwitchPrompt";
import PasswordInput from "@/features/auth/components/shared/PasswordInput";
import { RegisterSchema } from "@/features/auth/auth.schema";
import { RegisterFormValues } from "@/features/auth/auth.type";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { COUNTRIES } from "@/constant/countries";

const RegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      country: "NG",
      password: "",
      date_of_birth: "",
      address: "",
    },
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (values: RegisterFormValues) => {
    const finalValues = { ...values };

    // Fail-safe: Ensure date_of_birth is YYYY-MM-DD
    if (values.date_of_birth && values.date_of_birth.split("-").length === 2) {
      const currentYear = new Date().getFullYear().toString();
      finalValues.date_of_birth = `${currentYear}-${values.date_of_birth}`;
    }

    // Date of birth is optional — send undefined (omitted from the request)
    // rather than an empty string when left blank.
    if (!finalValues.date_of_birth) finalValues.date_of_birth = undefined;

    mutate(finalValues);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8.5 mb-27.75">
      <AuthTitle
        title="Checkout"
        subtitle="Enter your details below to complete your order. We'll set up your account automatically so you can track deliveries and check out faster next time."
        className="max-w-121"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#3B3B3B] font-normal"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  NAME<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5]  font-normal  h-12.5"
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
                <FormLabel className="text-[12px] font-medium">
                  EMAIL<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5]   h-12.5"
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
                  PHONE NUMBER<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234 801 234 5678"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5]  h-12.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={() => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  COUNTRY<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <select
                    {...form.register("country")}
                    className="w-full rounded-[50px] border border-input bg-background px-4 h-12.5 text-sm text-[#3B3B3B] focus:outline-none focus:border-[#3B3B3B] focus:bg-[#F5F5F5] appearance-none"
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  DELIVERY ADDRESS<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Street, house/apartment, etc"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5]  h-12.5"
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
                  PASSWORD<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => {
              const parts = field.value ? field.value.split("-") : ["", "", ""];
              const [year, month, day] = parts;

              const currentYear = year || new Date().getFullYear().toString();

              const handleChange = (part: "month" | "day", val: string) => {
                const newMonth = part === "month" ? val : month;
                const newDay = part === "day" ? val : day;

                field.onChange(`${currentYear}-${newMonth || ""}-${newDay || ""}`);
              };

              const months = [
                { value: "01", label: "January" },
                { value: "02", label: "February" },
                { value: "03", label: "March" },
                { value: "04", label: "April" },
                { value: "05", label: "May" },
                { value: "06", label: "June" },
                { value: "07", label: "July" },
                { value: "08", label: "August" },
                { value: "09", label: "September" },
                { value: "10", label: "October" },
                { value: "11", label: "November" },
                { value: "12", label: "December" },
              ];

              const days = Array.from({ length: 31 }, (_, i) => {
                const d = String(i + 1).padStart(2, "0");
                return { value: d, label: d };
              });

              return (
                <FormItem>
                  <FormLabel className="text-[12px] font-medium">
                    DATE OF BIRTH
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      {/* Month */}
                      <select
                        value={month || ""}
                        onChange={(e) => handleChange("month", e.target.value)}
                        className="flex-1 rounded-[50px] border border-input bg-background px-4 h-12.5 text-sm text-[#3B3B3B] focus:outline-none focus:border-[#3B3B3B] focus:bg-[#F5F5F5] appearance-none"
                      >
                        <option value="" disabled>
                          Month
                        </option>
                        {months.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>

                      {/* Day */}
                      <select
                        value={day || ""}
                        onChange={(e) => handleChange("day", e.target.value)}
                        className="flex-1 rounded-[50px] border border-input bg-background px-4 h-12.5 text-sm text-[#3B3B3B] focus:outline-none focus:border-[#3B3B3B] focus:bg-[#F5F5F5] appearance-none"
                      >
                        <option value="" disabled>
                          Day
                        </option>
                        {days.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {/* <Paragraph
                    className="text-[#9A9A98] lg:text-sm text-xs leading-4.5 font-normal pt-1"
                    content="Get Membership Reward on Your Birthday!"
                  /> */}
                </FormItem>
              );
            }}
          />

          {/* Terms */}
          <div className="md:col-span-2 lg:mt-4 text-[#3B3B3B] flex gap-6 items-center">
            <AuthSpan className="font-normal lg:text-sm text-xs lg:leading-5.5 leading-4.5">
              By continuing, you agree to the Serena Braide
              <Link href="/legal/terms_of_service">
                <span className="font-medium underline"> Terms of Use </span>
              </Link>{" "}
              and acknowledge our
              <Link href="/legal/privacy_policy">
                <span className="font-medium underline"> Privacy Policy</span>
              </Link>
            </AuthSpan>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 lg:mt-4">
            <SubmitButton
              label="Continue to Checkout"
              loadingLabel="Processing..."
              isPending={isPending}
              onClick={() => {}}
            />
          </div>
          <div className="md:col-span-2">
            <AuthSwitchPrompt
              message="Shopped with us before?"
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
