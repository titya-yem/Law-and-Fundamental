import express from "express";
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("Lamdouy2");
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})