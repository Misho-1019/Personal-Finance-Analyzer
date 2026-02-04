import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const authData = req.body;

    try {
        const user = await authService.register(authData)

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

authController.post('/login', async (req, res) => {
    const authData = req.body;

    try {
        const { token, payload } = await authService.login(authData);

        res.cookie('auth', token, { httpOnly: true })

        return res.status(200).json(payload)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

authController.get('/logout', isAuth, async (req, res) => {
    res.clearCookie('auth')

    return res.status(200).json({ message: 'Logout successfully!' })
})

export default authController;