import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    async register(authData) {
        const {firstName, lastName, email, password} = authData;

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (user) {
            throw new Error('User already exists!')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                passwordHash
            }
        })

        return newUser;
    },
    async login(authData) {
        const { email, password } = authData;

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error('Invalid email or password')
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            throw new Error('Invalid email or password')
        }

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.passwordHash
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })

        return {
            token,
            payload,
        }
    }
}