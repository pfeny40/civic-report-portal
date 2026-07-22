const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try{ 
        const{ email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mesaage: "Invalid Email or Password "});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }
        
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({ message: "Login Successfuly",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;