const mongoose = require("mongoose");

const issueSchema = new
mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "pending",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Issue", issueSchema);