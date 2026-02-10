import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().max(80).nonempty(),
    color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Color must be a valid hex code (e.g. #FF5733)",
    })
    .optional()
})

export const updateCategorySchema = z.object({
    name: z.string().trim().max(80).nonempty().optional(),
    color: z.union([z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, {
          message: "Color must be a valid hex code (e.g. #FF5733)",
        }), z.null()
    ]).optional()
}).strict().superRefine((obj, ctx) => {
    if (Object.keys(obj).length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'At least one field must be provided',
        })
    }
})