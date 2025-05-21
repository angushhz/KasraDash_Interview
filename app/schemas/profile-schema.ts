
import { z } from "zod";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username cannot be longer than 30 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z
    .string()
    .max(500, { message: "Bio cannot be longer than 500 characters" })
    .optional(),
  urls: z.array(z.string().url({ message: "Please enter a valid URL" })),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
