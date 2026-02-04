import prisma from "../prismaClient.js";

export default {
    async register(authData) {
        const {firstName, lastName, email, password} = authData;

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password
            }
        })

        return user;
    }
}