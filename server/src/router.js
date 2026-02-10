import { Router } from "express";
import authController from "./controllers/authController.js";
import transactionController from "./controllers/transactionController.js";
import categoryController from "./controllers/categoryController.js";

const router = Router()

router.use('/auth', authController)
router.use('/transactions', transactionController)
router.use('/categories', categoryController)

export default router