import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),

  dayOfBirth: z.string().min(1, "Day is required"),
  monthOfBirth: z.string().min(1, "Month is required"),
  yearOfBirth: z.string().min(4, "Year must be at least 4 characters"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
