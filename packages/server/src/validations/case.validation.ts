import { z } from "zod";

export const caseSchema = z.object({
  caseNumber: z.string().min(2).max(20, "Case Number should be 2-20 Characters only"),
  title: z.string().min(2).max(200, "Case Number should be 2-200 Characters only"),
  content: z.string().min(2).max(800, "Case Number should be 2-800 Characters only"),
  status: z.enum(["open", "close", "ongoing"]),
  startDate: z.string().datetime(),
  finishedDate: z.string().datetime().nullable().optional()
}).superRefine((data, ctx) => {
  const start = new Date(data.startDate);
  const finish = data.finishedDate ? new Date(data.finishedDate) : null;

  // Closed cases must have finishedDate
  if (data.status === "close" && !finish) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Finished date is required when case is closed",
      path: ["finishedDate"],
    });
  }

  // Open cases must not have finishedDate
  if (data.status === "open" && finish) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Open case cannot have finished date",
      path: ["finishedDate"],
    });
  }

  // Finished date cannot be before startDate
  if (finish && finish < start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Finished date cannot be before start date",
      path: ["finishedDate"],
    });
  }
});

export type caseInput = z.infer<typeof caseSchema>;
