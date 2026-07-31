import User from "../models/User.js";

// Get All Users (Admin)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete User (Admin)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};