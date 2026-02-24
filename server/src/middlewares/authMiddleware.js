import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/cookieOptions.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth']

    if (!token) return next();

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken;
        res.locals.user = decodedToken;

    } catch (error) {
        res.clearCookie('auth', cookieOptions)
    }

    next()
}

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    next()
}

export const isGuest = (req, res, next) => {
    if (req.user) {
        return res.status(400).json({ error: 'You are already logged in' })
    }

    next()
}