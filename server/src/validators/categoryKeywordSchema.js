import { z } from "zod";

export const createCategoryKeywordSchema = z.object({
    keyword: z.string().trim().min(2).max(40),
    categoryId: z.string().nonempty()
}).strict();