import express from "express";
import Issue from "../models/Issue.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import sendComplaintEmail from "../utils/sendEmail.js";

const router = express.Router();

// ========================
// Create New Issue
// ========================
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        console.log("===== CREATE ISSUE =====");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const issue = await Issue.create({
            title: req.body.title,
            category: req.body.category,
            location: req.body.location,
            description: req.body.description,
            userEmail: req.body.userEmail,
            image: req.file ? req.file.path : "",
        });

        // 📧 Send email to admin
        sendComplaintEmail(issue);

        res.status(201).json(issue);

    } catch (error) {
        console.error("========== ERROR ==========");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);

        if (error.response) {
            console.error("Cloudinary Response:", error.response);
        }

        res.status(500).json({
            message: error.message,
        });
    }
});

// ========================
// Get Issues of Logged User
// ========================
router.get("/user/:email", async (req, res) => {
    try {
        const issues = await Issue.find({
            userEmail: req.params.email,
        }).sort({ createdAt: -1 });

        res.json(issues);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ========================
// Get Single Issue
// ========================
router.get("/:id", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        res.json(issue);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ========================
// Get All Issues
// ========================
router.get("/", async (req, res) => {
    try {
        const issues = await Issue.find().sort({
            createdAt: -1,
        });

        res.json(issues);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ========================
// Delete Issue
// ========================
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Issue.findByIdAndDelete(req.params.id);

        res.json({
            message: "Issue Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ========================
// Update Issue
// ========================
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        issue.title = req.body.title;
        issue.category = req.body.category;
        issue.location = req.body.location;
        issue.description = req.body.description;

        await issue.save();

        res.json({
            message: "Issue Updated Successfully",
            issue,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ========================
// Update Status (Admin Only)
// ========================
router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {

            const issue = await Issue.findByIdAndUpdate(
                req.params.id,
                {
                    status: req.body.status,
                },
                {
                    new: true,
                    runValidators: false,
                }
            );

            if (!issue) {
                return res.status(404).json({
                    message: "Issue not found",
                });
            }

            res.json(issue);

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message,
            });
        }
    }
);

export default router;