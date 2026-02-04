import { Router } from "express";
import authService from "../services/authService";

const authController = Router();

authController.post('/register', async (req, res) => {
    const authData = req.body;

    await authService.register(authData)
    
    res.end();
})

export default authController;