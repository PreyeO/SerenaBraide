"use client";

import { toast } from "sonner";

export const notify = {
  success: (message: string) => {
    toast.success(message || "Action successful");
  },
  error: (message: string) => {
    toast.error(message || "Something went wrong");
  },
};
