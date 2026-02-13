import { z } from "zod";

export const analyticsSchema = z.object({
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }).optional(),
}).strict().superRefine(({ from, to }, ctx) => {
    if (from && to) {
        const fromDate = Date.parse(from);
        const toDate = Date.parse(to);
    
        if (fromDate > toDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "From date must be before or equal to To date",
            });
        }
    }
});

export const categoriesAnalyticsSchema = z.object({
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }),
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
}).strict().superRefine(({ from, to }, ctx) => {
    const fromDate = Date.parse(from);
    const toDate = Date.parse(to);

    if (fromDate > toDate) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "From date must be before or equal to To date",
        });
    }
});