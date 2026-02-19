import { z } from "zod";

export const RegisterSchema = z
  .object({
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirm_password: z.string().min(8, "Confirm password is required"),
    date_of_birth: z
      .string()
      .regex(
        /^\d{2}-\d{2}$/,
        "Date of birth must be in MM-DD format",
      ),
    phone_number: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
export const VerifyOtpSchema = z.object({
  otp: z.array(z.string().length(1)).length(6, "OTP must be 6 digits"),
  email: z.string().email("Enter a valid email"),
});

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const ResetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          "Password must contain upper, lower, number and special character",
      }),
    new_password_repeated: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.new_password_repeated, {
    path: ["new_password_repeated"],
    message: "Passwords do not match",
  });
