import express from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get All Users (Admin Only)
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getUsers
);

// Delete User (Admin Only)
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

export default router;