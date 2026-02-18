import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2).max(20, "Name must be 2-20 characters only"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be more than 6 characters"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const roleSchema = z.object({
    role: z.enum(["user", "admin"])
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type roleInput = z.infer<typeof roleSchema>