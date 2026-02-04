import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const authData = req.body;

    const user = await authService.register(authData)
    
    return res.status(201).json(user)
})

authController.post('/login', async (req, res) => {
    const authData = req.body;

    try {
        const { token, payload } = await authService.login(authData);

        return res.status(200).json(payload)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

export default authController;