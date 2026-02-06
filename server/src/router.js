import { Router } from "express";
import authController from "./controllers/authController.js";
import transactionController from "./controllers/transactionController.js";

const router = Router()

router.use('/auth', authController)
router.use('/transactions', transactionController)

export default router