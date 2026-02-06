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
    categoryId: z.string().uuid().optional()
})