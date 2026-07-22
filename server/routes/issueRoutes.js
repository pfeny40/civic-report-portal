const express = require("express");
const router = express.Router();

const Issue = require("../models/Issue");
const upload = require("../middleware/upload");

//create new Issue
router.post("/", upload.single("image"), async (req, res) => {
    console.log("BODY:", req.body);
    console.log ("FILE:", req.file);

    try {
        const issue = await Issue.create({
            title: req.body.title,
            category: req.body.category,
            location:req.body.location,
            description: req.body.description,
            userEmail: req.body.userEmail,
            image: req.file ? req.file.filename: "",
        });

        res.status(201).json(issue);
    } catch(error) {
        res.status(500).json({ message:error.message });
    }
    });
router.get("/user/:email", async (req, res) => {
    try {
        const issue = await Issue.find({
            userEmail: req.params.email,
        }).sort({ createdAt: -1 });
        res.json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message,});
    }
});

//get single Issue
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

//bet all Issues
router.get("/", async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (error) {
        console.log(error);
res.status(500).json({ message: error.message });
    }
});

//delete issue
router.delete("/:id", async (req, res) => {
    try{
        await Issue.findByIdAndDelete(req.params.id);
        res.json({ message: "Issue Deleted Successfully" });
    } catch (error) {
        console.log(error);
res.status(500).json({ message: error.message });
    }
});

//Update Issue Status
router.put("/:id", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return 
res.status(404).json({ message: "Issue not found" });
        }
        issue.title = req.body.title;
        issue.category = req.body.category;
        issue.location = req.body.location;
        issue.description = req.body.description;

        await issue.save();
        res.json({ mesaage: "Issue Updated Successfully", issue,});
    } catch (error) {
res.status(500).json({ message: error.message });
    }
});

router.put("/:id/status", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return 
res.status(404).json({
    message: "Issue not found",
});
        }
        issue.status = "Resolved";
        await issue.save();
        res.json(issue);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

    module.exports = router;