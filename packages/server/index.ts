import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./src/routes/user.route";
import caseRouter from "./src/routes/case.route";
import BackUpRouter from "./src/routes/backup.route";

const app = express();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/auth", userRouter);
app.use("/api/case", caseRouter);
app.use("/api/backup", BackUpRouter);

// root health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✅" });
});

// export as serverless function
export default ServerlessHttp(app);