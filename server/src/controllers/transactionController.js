import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createTransactionSchema, idParamsSchema, listTransactionsSchema, updateTransactionSchema } from "../validators/transactionSchema.js";
import transactionService from "../services/transactionService.js";

const transactionController = Router();

transactionController.post('/', isAuth, validateRequest({ body: createTransactionSchema }), async (req, res) => {
    const transactionData = req.validated.body;
    const userId = req.user.id;

    try {
        const transaction = await transactionService.create(userId, transactionData)

        return res.status(201).json(transaction)
    } catch (error) {
        console.log(error);
        
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

transactionController.get('/', isAuth, validateRequest({ query: listTransactionsSchema }), async (req, res) => {
    const userId = req.user.id;
    const { page, pageSize, from, to, type, categoryId } = req.validated.query;

    try {
        const data = await transactionService.list(userId, { page, pageSize, from, to, type, categoryId })

        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

transactionController.patch('/:id', isAuth, validateRequest({ body: updateTransactionSchema, params: idParamsSchema }), async (req, res) => {
    const userId = req.user.id;
    const transactionId = req.validated.params.id;
    const transactionData = req.validated.body;

    try {
        const updatedTransaction = await transactionService.update(userId, transactionId, transactionData)

        return res.status(200).json(updatedTransaction)
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

transactionController.delete('/:id', isAuth, validateRequest({ params: idParamsSchema }), async (req, res) => {
    const userId = req.user.id;
    const transactionId = req.validated.params.id;

    try {
        await transactionService.delete(userId, transactionId)

        return res.status(204).send();
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default transactionController;