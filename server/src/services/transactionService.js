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
    },
    async list(userId, { page, pageSize }) {
        const [totalItems, items] = await Promise.all([
            prisma.transaction.count({
                where: { userId }
            }),
            prisma.transaction.findMany({
                where: { userId },
                orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: { category: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                    }
                } } 
            })
        ])

        const totalPages = Math.max(Math.ceil(totalItems / pageSize))

        if (page > totalPages) {
            return {
                items: [],
                page,
                pageSize,
                totalItems,
                totalPages
            }
        }

        return {
            items,
            page,
            pageSize,
            totalItems,
            totalPages,
        }
    }
}