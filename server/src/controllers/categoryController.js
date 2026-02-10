import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createCategorySchema } from "../validators/categoriesSchema.js";
import categoryService from "../services/categoryService.js";

const categoryController = Router();

categoryController.post('/', isAuth, validateRequest({ body: createCategorySchema }), async (req, res) => {
    const userId = req.user.id;
    const categoryData = req.validated.body;

    try {
        const newCategory = await categoryService.create(userId, categoryData);

        return res.status(201).json(newCategory)
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }
})

categoryController.get('/', isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const categories = await categoryService.list(userId);
        
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' })
    }
})

export default categoryController;