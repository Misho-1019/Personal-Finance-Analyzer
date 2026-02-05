import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import router from "./router.js";
import prisma from "./prismaClient.js";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware.js";

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

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)


app.use(express.json())
app.use(cookieParser())

app.use(router)
app.use(authMiddleware)


const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))