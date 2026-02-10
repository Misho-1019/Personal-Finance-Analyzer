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