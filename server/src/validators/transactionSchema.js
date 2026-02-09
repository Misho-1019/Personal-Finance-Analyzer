import { z } from "zod";

export const createTransactionSchema = z.object({
    type: z.enum(['INCOME', 'EXPENSE']),
    amountCents: z.number().positive().int(),
    date: z.string().refine(
        (value) => !Number.isNaN(Date.parse(value)),
        { message: 'Invalid date' },
    ),
    description: z.string().min(1).max(300),
    notes: z.string().optional(),
    categoryId: z.string().nonempty().optional()
})

export const listTransactionsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20),
    from: z.string().refine((v) => !Number.isNaN(Date.parse(v)), { message: 'Invalid date' }).optional(),
    to: z.string().refine((v) => !Number.isNaN(Date.parse(v)), { message: 'Invalid date' }).optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    categoryId: z.string().nonempty().optional(),
}) 

export const updateTransactionSchema = z.object({
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    amountCents: z.number().int().positive().optional(),
    date: z.string().refine(
        (value) => !Number.isNaN(Date.parse(value)),
        { message: 'Invalid date' },
    ).optional(),
    description: z.string().min(1).max(300).optional(),
    notes: z.union([z.string().min(1), z.null()]).optional(),
    categoryId: z.union([z.string().nonempty(), z.null()]).optional()
}).strict().superRefine((obj, ctx) => {
    if (Object.keys(obj).length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'At least one field must be provided',
        })
    }
})

export const idParamsSchema = z.object({
    id: z.string().nonempty()
}).strict();