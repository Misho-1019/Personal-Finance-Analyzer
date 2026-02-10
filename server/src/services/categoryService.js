import prisma from "../prismaClient.js";

export default {
    async create(userId, categoryData) {
        const { name, color } = categoryData;

        const normalizedName = name.trim();

        const existingCategory = await prisma.category.findFirst({
            where: {
                userId,
                name: { equals: normalizedName, mode: 'insensitive' },
            }
        })

        if (existingCategory) {
            const err = new Error("Category with this name already exists");
            err.status = 409;
            throw err;
        }

        const category = await prisma.category.create({
            data: {
                userId,
                name: normalizedName,
                color: color ?? null,
            }
        })

        return category;
    }
}