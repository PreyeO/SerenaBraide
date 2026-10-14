"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
import { isExistingAccountError } from "@/features/auth/utils/account.utils";
import { COUNTRIES } from "@/constant/countries";

const inputClass =
  "rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] font-normal h-12.5";
const selectClass =
  "w-full rounded-[50px] border border-input bg-background px-4 h-12.5 text-sm text-[#3B3B3B] focus:outline-none focus:border-[#3B3B3B] focus:bg-[#F5F5F5] appearance-none";

const MONTHS = [
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

const DAYS = Array.from({ length: 31 }, (_, i) => {
  const d = String(i + 1).padStart(2, "0");
  return { value: d, label: d };
});

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="md:col-span-2 text-base font-medium text-[#3B3B3B] border-b border-[#EAEAEA] pb-2">
    {title}
  </h2>
);

const Required = () => <span className="text-red-500">*</span>;

// Internally this is account registration, but to the customer it's the
// delivery/contact step of checkout: no password is asked for (one is
// generated on submit), and the fields lead with where the order is going.
const RegisterForm = () => {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return_url");
  const withReturn = (path: string) =>
    returnUrl ? `${path}?return_url=${encodeURIComponent(returnUrl)}` : path;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      address: "",
      state: "",
      country: "NG",
      phone_number: "",
      email: "",
      date_of_birth: "",
    },
  });

  const { mutate, isPending, error } = useRegister();
  const hasExistingAccount = isExistingAccountError(error);

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
        subtitle="Where should we deliver your order? Enter your delivery and contact details below, and we'll take you straight to payment."
        className="max-w-121"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#3B3B3B] font-normal w-full"
        >
          <SectionHeading title="Delivery details" />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  FULL NAME
                  <Required />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    autoComplete="name"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  DELIVERY ADDRESS
                  <Required />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Street, house/apartment, etc"
                    autoComplete="street-address"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  STATE
                  <Required />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Lagos"
                    autoComplete="address-level1"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={() => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  COUNTRY
                  <Required />
                </FormLabel>
                <FormControl>
                  <select
                    {...form.register("country")}
                    autoComplete="country"
                    className={selectClass}
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

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  PHONE NUMBER
                  <Required />
                  <span className="text-[#9A9A98] font-normal normal-case">
                    {" "}
                    (for delivery updates)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    autoComplete="tel"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SectionHeading title="Contact" />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  EMAIL
                  <Required />
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => {
              const [year, month, day] = field.value
                ? field.value.split("-")
                : ["", "", ""];
              const currentYear = year || new Date().getFullYear().toString();

              const handleChange = (part: "month" | "day", val: string) => {
                const newMonth = part === "month" ? val : month;
                const newDay = part === "day" ? val : day;
                field.onChange(
                  `${currentYear}-${newMonth || ""}-${newDay || ""}`,
                );
              };

              return (
                <FormItem>
                  <FormLabel className="text-[12px] font-medium">
                    DATE OF BIRTH
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      <select
                        value={month || ""}
                        onChange={(e) => handleChange("month", e.target.value)}
                        className={`flex-1 ${selectClass}`}
                      >
                        <option value="" disabled>
                          Month
                        </option>
                        {MONTHS.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={day || ""}
                        onChange={(e) => handleChange("day", e.target.value)}
                        className={`flex-1 ${selectClass}`}
                      >
                        <option value="" disabled>
                          Day
                        </option>
                        {DAYS.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Returning customer: their email/phone already has an account. */}
          {hasExistingAccount && (
            <div
              role="alert"
              className="md:col-span-2 rounded-[10px] border border-[#E5E5E5] bg-[#F6F7F8] p-5 flex flex-col gap-3"
            >
              <p className="font-medium text-[#3B3B3B]">Welcome back!</p>
              <p className="text-sm text-[#6F6E6C] leading-5.5">
                You&apos;ve ordered with us before. Log in to continue to
                payment. Your cart is saved. If you don&apos;t have a password
                yet, tap &ldquo;Forgot password&rdquo; and we&apos;ll email you
                a code.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={withReturn("/auth/login")}
                  className="rounded-full bg-[#3B3B3B] text-white text-sm px-6 py-3"
                >
                  Log in
                </Link>
                <Link
                  href={withReturn("/auth/forgot-password")}
                  className="rounded-full border border-[#6F6E6C] text-[#3B3B3B] text-sm px-6 py-3"
                >
                  Forgot password
                </Link>
              </div>
            </div>
          )}

          <div className="md:col-span-2 lg:mt-2 text-[#3B3B3B] flex gap-6 items-center">
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

          <div className="md:col-span-2 lg:mt-2">
            <SubmitButton
              label="Continue to Payment"
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
