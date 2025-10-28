"use client";

import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";

import { contactUser } from "./api";

export function useContact() {
  return useMutation({
    mutationFn: contactUser,
    onSuccess: (data) => {
      notify.success(data.message || "message sent successful");
    },
  });
}
