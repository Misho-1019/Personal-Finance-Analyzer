import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const authData = req.body;

    const user = await authService.register(authData)
    
    return res.status(201).json(user)
})

export default authController;