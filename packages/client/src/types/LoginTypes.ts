import { z } from "zod"

export const loginProps = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type LoginProps = z.infer<typeof loginProps>