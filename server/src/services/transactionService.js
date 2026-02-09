import prisma from "../prismaClient.js";

function cleanPatchData(input) {
    return Object.fromEntries(
        Object.entries(input).filter(([_, value]) => value !== '' && value !== undefined)
    )
}

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
    async list(userId, { page, pageSize, from, to, type, categoryId }) {
        const mainWhere = { userId }

        if (from || to) {
            mainWhere.date = {};

            if (from) {
                mainWhere.date.gte = new Date(from)
            }

            if (to) {
                mainWhere.date.lte = new Date(to)
            }
        }

        if (type) {
            mainWhere.type = type
        }

        if (categoryId) {
            mainWhere.categoryId = categoryId
        }

        const [totalItems, items] = await Promise.all([
            prisma.transaction.count({
                where: mainWhere,
            }),
            prisma.transaction.findMany({
                where: mainWhere,
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

        const totalPages = Math.ceil(totalItems / pageSize)

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
    },
    async update(userId, transactionId, transactionData) {
        const findTransaction = await prisma.transaction.findFirst({
            where: { 
                id: transactionId,
                userId: userId 
            }
        })

        if (!findTransaction) {
            const err = new Error('Not Found')
            err.status = 404;
            throw err;
        }

        const cleanedData = cleanPatchData(transactionData)

        const { type, amountCents, date, description, notes, categoryId } = cleanedData;

        if (typeof categoryId === 'string') {
            const category = await prisma.category.findFirst({
                where: { id: categoryId, userId },
                select: { id: true },
            })

            if (!category) {
                const err = new Error('Category not found')
                err.status = 404;
                throw err;
            }
        }

        const data = {};

        if (type !== undefined) data.type = type;
        if (amountCents !== undefined) data.amountCents = amountCents;
        if (description !== undefined) data.description = description;
        if (notes !== undefined) data.notes = notes;
        if (categoryId !== undefined) data.categoryId = categoryId;
        if (date !== undefined) data.date = new Date(date);

        return await prisma.transaction.update({
            where: { id: transactionId },
            data,
            include: { category: {
                select: {
                    id: true,
                    name: true,
                    color: true
                }
            }}
        })
    }
}