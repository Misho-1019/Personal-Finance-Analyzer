import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import router from "./router.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import prisma from "./prismaClient.js";

(async () => {
    try {
    // Prefer explicit connect for clarity
      await prisma.$connect();
      console.log("✅ Prisma connected successfully!");
    } catch (err) {
      console.error("❌ Prisma connection failed:", err);
      process.exit(1);
    }
})()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(authMiddleware)

app.use(router)

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))