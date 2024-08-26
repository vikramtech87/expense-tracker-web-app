import {z} from "zod";

export const registerFormSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
  confirmPassword: z.string()
}).refine(({password, confirmPassword}) => password === confirmPassword, {
  message: "The passwords do not match",
  path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;