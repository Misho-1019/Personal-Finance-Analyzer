import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";

export default {
    async register(authData) {
        const {firstName, lastName, email, password} = authData;

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                passwordHash
            }
        })

        return user;
    }
}