const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/uploads",express.static("uploads"));

app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Civic Report Portal API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});