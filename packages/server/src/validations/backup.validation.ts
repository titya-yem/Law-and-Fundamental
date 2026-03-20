import z from "zod";

export const backUpSchema = z.object({
    format: z.enum(["sql", "dump"]).optional(),
})