import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth']

    if (!token) return next();

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken;

        next()
    } catch (error) {
        res.clearCookie('auth')

        return res.status(401).json({ error: 'Invalid or expired token' })
    }
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