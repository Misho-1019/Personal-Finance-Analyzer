import prisma from "../prismaClient.js";

export default {
    async create(userId, { keyword, categoryId }) {
        const normalizedKeyword = keyword.toLowerCase().trim().replace(/\s+/g, ' ');

        const findCategory = await prisma.category.findFirst({
            where: {
                id: categoryId,
                userId,
            }
        })

        if (!findCategory) {
            const err = new Error("Category not found");
            err.status = 404;
            throw err;
        }

        const existingKeyword = await prisma.categoryKeyword.findFirst({
            where: {
                userId,
                keyword: { equals: normalizedKeyword },
            }
        })

        if (existingKeyword) {
            const err = new Error("Keyword already exists");
            err.status = 409;
            throw err;
        }

        const categoryKeyword = await prisma.categoryKeyword.create({
            data: {
                userId,
                categoryId,
                keyword: normalizedKeyword,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                    }
                }
            }
        })

        return categoryKeyword;
    },
    async list(userId) {
        const categoryKeywords = await prisma.categoryKeyword.findMany({
            where: { userId },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                    }
                }
            },
            orderBy: { keyword: 'asc' },
        })

        return categoryKeywords
    }
}