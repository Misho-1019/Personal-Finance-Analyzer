import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { analyticsSchema, categoriesAnalyticsSchema } from "../validators/analytcisSchema.js";
import analyticsService from "../services/analyticsService.js";

const analyticsController = Router();

analyticsController.get('/monthly-summary', isAuth, validateRequest({ query: analyticsSchema }), async (req, res) => {
    const userId = req.user.id;
    const { from, to } = req.validated.query;

    try {
        const summary = await analyticsService.monthlySummary(userId, { from, to })

        return res.status(200).json(summary)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching analytics data' })
    }
})

analyticsController.get('/categories-summary', isAuth, validateRequest({ query: categoriesAnalyticsSchema }), async (req, res) => {
    const userId = req.user.id;
    const { from, to, type } = req.validated.query;

    try {
        const summary = await analyticsService.categoriesSummary(userId, { from, to, type })

        return res.status(200).json(summary)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching analytics data' })
    }
})

export default analyticsController;