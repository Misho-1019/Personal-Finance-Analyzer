import { Router } from "express";
import authController from "./controllers/authController.js";
import transactionController from "./controllers/transactionController.js";
import categoryController from "./controllers/categoryController.js";
import categoryKeywordController from "./controllers/categoryKeywordController.js";
import analyticsController from "./controllers/analyticsController.js";

const router = Router()

router.use('/auth', authController)
router.use('/transactions', transactionController)
router.use('/categories', categoryController)
router.use('/category-keywords', categoryKeywordController)
router.use('/analytics', analyticsController)

export default router