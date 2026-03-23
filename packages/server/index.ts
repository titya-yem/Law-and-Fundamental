import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import helmet from "helmet";
import morgan from "morgan"
import type { Request, Response } from "express";

import userRouter from "./src/routes/user.route"
import caseRouter from "./src/routes/case.route"
import BackUpRouter from "./src/routes/backup.route"

const app = express();
dotenv.config();

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}))
app.use(express.json()); 
app.use(helmet()); 
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/case", caseRouter);
app.use("/api/backup", BackUpRouter);

export default function handler(req: Request, res:Response) {
  app(req, res);
}