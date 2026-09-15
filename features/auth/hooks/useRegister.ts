"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "../auth.store";
import { notify } from "@/lib/notify";
import { trackCompleteRegistration } from "@/lib/analytics/pixel-events";
import { RegisterFormValues, RegisterResponse } from "../auth.type";
import { registerUser } from "../auth.service";
import { createAddress } from "@/features/cart-checkout/service/checkout.service";

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

// "Laura James" -> first "Laura", last "James". A single word repeats as
// both; a longer name folds everything after the first word into the last.
function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first_name = parts[0] ?? "";
  const last_name = parts.length > 1 ? parts.slice(1).join(" ") : first_name;
  return { first_name, last_name };
}

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterFormValues
  >({
    mutationFn: async (values) => {
      const { first_name, last_name } = splitName(values.name);

      const response = await registerUser({
        first_name,
        last_name,
        email: values.email,
        password: values.password,
        date_of_birth: values.date_of_birth || undefined,
        phone_number: values.phone_number,
        country: values.country,
      });

      // Log the account in immediately so the address request below goes
      // out authenticated.
      const { tokens, ...user } = response;
      setAuth({ user, tokens });

      // Best-effort: this is the delivery address they just typed on the
      // same form, saved now so it's already there when they reach
      // checkout. Never block signup on it — if it fails they can still
      // add an address manually on the checkout page.
      try {
        await createAddress({
          address: values.address,
          country: values.country,
          phone_number: values.phone_number,
          city: "",
          state: "",
          zip_code: "",
        });
      } catch {
        // Swallowed intentionally.
      }

      return response;
    },
    onSuccess: (data) => {
      notify.success("Registration successful!");
      trackCompleteRegistration();

      // Backend logs the user in immediately on signup (no email verification
      // gate), so continue straight to where they were headed.
      const searchParams = new URLSearchParams(window.location.search);
      const returnUrl = searchParams.get("return_url");

      router.push(returnUrl || "/profile");
      onSuccess?.(data);
    },
    onError: (error) => {
      // Axios interceptor handles error toast
      onError?.(error);
    },
  });
};
