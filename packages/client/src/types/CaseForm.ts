import { z } from "zod";

export const caseFormSchema = z.object({
  caseNumber: z.string().min(2).max(20, "Case Number should be 2-20 Characters only"),
  title: z.string().min(2).max(200, "Case Number should be 2-200 Characters only"),
  content: z.string().min(2).max(3000, "Case Number should be 2-3000 Characters only"),
  status: z.enum(["open", "close", "ongoing"]),
  startDate: z.string(),
  finishedDate: z.string().nullable().optional(),
}).superRefine((data, ctx) => {
  const start = new Date(data.startDate);
  const finish = data.finishedDate ? new Date(data.finishedDate) : null;

  if (data.status === "close" && !finish) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Finished date required when case is closed",
      path: ["finishedDate"],
    });
  }

  if (data.status === "open" && finish) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Open case cannot have finished date",
      path: ["finishedDate"],
    });
  }

  if (finish && finish < start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Finished date cannot be before start date",
      path: ["finishedDate"],
    });
  }
});

export interface CaseProps {
  caseItem: {
    id: number;
    caseNumber: string;
    title: string;
    content: string;
    status: 'open' | 'close' | 'ongoing';
    startDate: string;
    finishedDate?: string | null;
  };
}

export type CaseFormValues = z.infer<typeof caseFormSchema>;