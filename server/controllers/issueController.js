import Issue from "../models/Issue.js";

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(issue);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};