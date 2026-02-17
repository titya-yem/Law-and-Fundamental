import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
// import helmet from "helmet";
// import morgan from "morgan"
import userRouter from "./src/routes/user.route"

const app = express();
dotenv.config(); // anable to use env file

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:8000",
  credentials: true,
}))
app.use(express.json());  // anable to read from body
// app.use(helmet()); 
// app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
