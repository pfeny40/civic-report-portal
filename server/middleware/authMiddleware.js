import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {

        console.log("========== AUTH ==========");
        console.log("Authorization:", req.headers.authorization);

        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id).select("-password");
        console.log("User Found:", user);

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};

export default authMiddleware;