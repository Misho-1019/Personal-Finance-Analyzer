import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRefreshToken, hashToken } from "../utils/token.js";

const SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_DAYS = 7;

function requiredSecret() {
    if (!SECRET) throw new Error('JWT_SECRET is not set!')
}

function buildAccessToken(user) {
    requiredSecret()

    const payload = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: ACCESS_EXPIRES_IN })

    return {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    }
}

function refreshExpiryDate() {
    const d = new Date();
    d.setDate(d.getDate() + REFRESH_DAYS)

    return d;
}

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

        const accessToken = buildAccessToken(newUser)

        const refreshToken = generateRefreshToken()
        const tokenHash = hashToken(refreshToken)

        await prisma.refreshToken.create({
            data: {
                userId: newUser.id,
                tokenHash,
                expiresAt: refreshExpiryDate(),
            },
        })

        return { accessToken, refreshToken }
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

        const accessToken = buildAccessToken(user)

        const refreshToken = generateRefreshToken();
        const tokenHash = hashToken(refreshToken)

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt: refreshExpiryDate(),
            }
        })

        return { accessToken, refreshToken }
    },
    async logout(refreshToken) {
        if (!refreshToken) return;

        const tokenHash = hashToken(refreshToken)

        await prisma.refreshToken.updateMany({
            where: {
                tokenHash,
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        })
    },
    async refresh(refreshToken) {
        if (!refreshToken) throw new Error('Missing refresh token');

        const oldHash = hashToken(refreshToken)

        const existing = await prisma.refreshToken.findFirst({
            where: {
                tokenHash: oldHash,
            },
            include: {
                user: true,
            }
        })

        if (!existing) throw new Error('Invalid refresh token');

        if (existing.revokedAt) throw new Error('Refresh token revoked');

        if (existing.expiresAt <= new Date()) throw new Error('Refresh token expired');

        const newRefreshToken = generateRefreshToken();

        const newHash = hashToken(newRefreshToken)

        await prisma.$transaction([
            prisma.refreshToken.update({
                where: {id: existing.id },
                data: {
                    revokedAt: new Date(),
                    replacedByTokenHash: newHash,
                }
            }),
            prisma.refreshToken.create({
                data: {
                    userId: existing.userId,
                    tokenHash: newHash,
                    expiresAt: refreshExpiryDate(),
                }
            })
        ])

        const accessToken = buildAccessToken(existing.user)

        return { accessToken, refreshToken: newRefreshToken }
    }
}