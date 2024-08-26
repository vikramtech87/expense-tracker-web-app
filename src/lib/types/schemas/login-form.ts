import {z} from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;