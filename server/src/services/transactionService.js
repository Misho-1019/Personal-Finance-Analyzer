import prisma from "../prismaClient.js";

export default {
    async create(userId, transactionData) {
        const { type, amountCents, date, description, notes, categoryId } = transactionData;

        if (categoryId) {
            const category = await prisma.category.findFirst({
                where: { id: categoryId, userId },
                select: { id: true }
            })

            if (!category) {
                const err = new Error('Category not found')
                err.status = 404;
                throw err;
            }
        }

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                categoryId: categoryId ?? null,
                type,
                amountCents,
                date: new Date(date),
                description,
                notes: notes ?? null,
            },
            include: { category: true }
        })

        return transaction
    }
}