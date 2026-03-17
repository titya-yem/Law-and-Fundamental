import z from "zod";

export const user = z.object({
    userName: z.string().min(2).max(20, "Name must be 2-20 characters only"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be more than 6 characters"),
    role: z.enum(["user", "admin"]),
});

export interface UsersTypes {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  create_at: string;
}

export const userEditSchema = z.object({
  name: z.string().min(2, 'Name must be 2+ characters'),
  email: z.string().email('Invalid email'),
  role: z.enum(['user', 'admin']),
});

export type UserEditForm = z.infer<typeof userEditSchema>;

export type userType = z.infer<typeof user>;