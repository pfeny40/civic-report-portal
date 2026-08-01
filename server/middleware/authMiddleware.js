import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(" ")[1];

        console.log("Authorization Header:", req.headers.authorization);

        if (!token) {
            return res.status(401).json({
                message: "Access Denied. No Token."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};

export default authMiddleware;