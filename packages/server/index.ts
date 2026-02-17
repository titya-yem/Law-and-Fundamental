import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import pool from "./src/config/db";
// import helmet from "helmet";
// import morgan from "morgan"

const app = express();
dotenv.config(); // anable to use env file

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}))
app.use(express.json());  // anable to read from body
// app.use(helmet()); 
// app.use(morgan("dev"));
app.use(cookieParser());

app.get("/test/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed"});
  }
})

app.get("/", (req, res) => {
  res.send("Lamdouy");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Lamdouy2" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
