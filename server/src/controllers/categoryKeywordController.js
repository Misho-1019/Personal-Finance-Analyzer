import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createCategoryKeywordSchema } from "../validators/categoryKeywordSchema.js";
import categoryKeywordService from "../services/categoryKeywordService.js";

const categoryKeywordController = Router();

categoryKeywordController.post('/', isAuth, validateRequest({ body: createCategoryKeywordSchema }), async (req, res) => {
    const userId = req.user.id;
    const { keyword, categoryId } = req.validated.body;

    try {
        const newCategoryKeyword = await categoryKeywordService.create(userId, { keyword, categoryId });

        return res.status(201).json(newCategoryKeyword);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }
})

export default categoryKeywordController;