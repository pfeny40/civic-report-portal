import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
        },

        location: {
            type: String,
            required: true,
        },

        userEmail: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Resolved"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;