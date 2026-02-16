import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookiesParser from "cookie-parser"
// import helmet from "helmet";
// import morgan from "morgan"
import connectDB from "./src/config/db";


const app = express();
dotenv.config(); // anable to use env file
connectDB() // connect to database

// middleware
app.use(cors({
  origin: process.env.CLIENT_URI || "http://localhost:3000",
  credentials: true,
}))
app.use(express.json());  // anable to read from body
// app.use(helmet()); 
// app.use(morgan("dev"));
app.use(cookiesParser());

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
