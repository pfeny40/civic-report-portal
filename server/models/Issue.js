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
        subcategory: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        location: {
            type: String, // Manual address / landmark
            required: true,
        },
        latitude: {
            type: Number,
            default: null,
        },
        longitude: {
            type: Number,
            default: null,
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