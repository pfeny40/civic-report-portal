import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    useEffect(() => {
        fetchIssues();
    }, []);
    const fetchIssues = async () => {
        try {
            const res = await axios.get("https://amiable-luck-production-e7d8.up.railway.app/api/issues");
            setIssues(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const total = issues.length;

    const pending = issues.filter(
        (issue) => issue.status === "Pending"
    ).length;

    const resolved = issues.filter(
        (issue) => issue.status === "Resolved"
    ).length;

    const categories = [...new Set(issues.map((i) => i.category))].length;

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Status Updated");
            fetchIssues();

        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error("Status Update Failed");
        }
    };

    const deleteIssue = async (id) => {
        if (!window.confirm("Delete this complaint?")) {
            return;
        }

        try {
            await axios.delete(`https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}`);

            toast.success("Complaint Deleted Successfully!");

            fetchIssues();
        } catch (error) {
            console.log(error);
            toast.error("Delete Failed");
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                👨‍💼 Admin Dashboard
            </h2>
            <div className="row mb-4">

                <div className="col-md-3">
                    <div className="card shadow text-center p-3 bg-primary text-white">
                        <h5>Total</h5>
                        <h2>{total}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center p-3 bg-warning">
                        <h5>Pending</h5>
                        <h2>{pending}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center p-3 bg-success text-white">
                        <h5>Resolved</h5>
                        <h2>{resolved}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center p-3 bg-info text-white">
                        <h5>Categories</h5>
                        <h2>{categories}</h2>
                    </div>
                </div>

            </div>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="🔍 Search Complaint..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                className="form-select mb-4"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option value="Pothole">Pothole</option>
                <option value="Garbage">Garbage</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Street Light">Street Light</option>
                <option value="Drainage">Drainage</option>
            </select>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {issues
                        .filter((issue) =>
                            issue.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .filter((issue) =>
                            categoryFilter === "All"
                                ? true
                                : issue.category === categoryFilter
                        )
                        .map((issue) => (
                            <tr key={issue._id}>
                                <td>{issue.title}</td>
                                <td>{issue.category}</td>
                                <td>{issue.location}</td>
                                <td>
                                    <span
                                        className={`badge ${issue.status === "Pending"
                                            ? "bg-warning text-dark"
                                            : issue.status === "In Progress"
                                                ? "bg-primary"
                                                : "bg-success"
                                            }`}
                                    >
                                        {issue.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={issue.status}
                                        onChange={(e) =>
                                            updateStatus(issue._id, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteIssue(issue._id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
export default AdminDashboard;