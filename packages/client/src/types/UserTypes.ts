import z from "zod";

export const user = z.object({
    userName: z.string().min(2).max(20, "Name must be 2-20 characters only"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be more than 6 characters"),
    role: z.enum(["user", "admin"]),
});

export interface Users {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  create_at: string;
}

export type userType = z.infer<typeof user>;