import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

function ReportIssue() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("location", formData.location);
            data.append("description", formData.description);
            data.append("image", image);
            data.append("userEmail", JSON.parse(localStorage.getItem("user")).email);
            console.log("Category =", formData.category);

            for (let pair of data.entries()) {
                console.log(pair[0], pair[1]);
            }
            const response = await axios.post(
                "https://amiable-luck-production-e7d8.up.railway.app/api/issues",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            await emailjs.send(
                "service_29dmuol",
                "template_x1sfgum",
                {
                    name: "Civic Report Portal",
                    title: formData.title,
                    category: formData.category,
                    location: formData.location,
                    description: formData.description,
                    user_email: JSON.parse(localStorage.getItem("user")).email,
                    email: JSON.parse(localStorage.getItem("user")).email,
                },
                "raw8DD8j_43-Ajqhp"
            );

            toast.success("Complaint Submitted Successfully!");
            setFormData({
                title: "",
                category: "",
                location: "",
                description: "",
            });
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Report New Civic Issue</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Issue Title"
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-select mb-3"
                    >
                        <option value="">Select Category</option>
                        <option>Pothole</option>
                        <option>Garbage</option>
                        <option>Water Leakage</option>
                        <option>Street Light</option>
                        <option>Drainage</option>
                    </select>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Location"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control mb-3"
                        rows="4"
                        placeholder="Describe the issue...."
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="form-control mb-3"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button
                        type="submit"
                        className="btn btn-danger w-100"
                        disabled={loading}
                    >
                        {loading ? "⏳ Submitting..." : "Submit Complaint"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReportIssue;