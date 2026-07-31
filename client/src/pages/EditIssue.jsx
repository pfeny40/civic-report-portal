import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditIssue() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        description: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success("Complaint Updated Successfully!");
            navigate("/my-complaints");
        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            toast.error("Update Failed");
        }
    };

    useEffect(() => {
        fetchIssue();
    }, []);
    const fetchIssue = async () => {
        try {
            const res = await axios.get(`https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}`);
            setFormData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Edit Complaint</h2>
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
                        placeholder="Description"
                    />
                    <button type="Submit" className="btn btn-primary w-100">
                        Update Complaint
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditIssue;