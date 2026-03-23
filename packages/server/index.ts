import express from "express";
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

app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});