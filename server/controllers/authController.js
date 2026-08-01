import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("REGISTER API CALLED");
  try {
    const { name, email, password } = req.body;
    console.log("Email received:", email);

    const userExists = await User.findOne({ email });
    console.log("User found:", userExists);

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role =
      email === "pfeni3112@gmail.com"
        ? "admin"
        : "user";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email);

    //Check user
    const user = await User.findOne({ email });
    console.log("User:", user);
    console.log("Role:", user.role);
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    //generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.json({
      message: "Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};