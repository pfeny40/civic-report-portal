import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register } from "./controllers/authController.js";
console.log(register.toString());

import connectDB from "./config/db.js";
import issueRoutes from "./routes/issueRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Civic Report Portal API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});