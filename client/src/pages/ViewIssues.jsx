import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewIssues() {
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchIssues();
    }, []);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");


    const fetchIssues = async () => {
        try {
            const res = await axios.get("https://amiable-luck-production-e7d8.up.railway.app/api/issues");
            setIssues(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteIssue = async (id) => {
        try {
            await axios.delete(
                `https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success("Complaint Deleted Successfully!");
            fetchIssues();
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {

        console.log("TOKEN =", localStorage.getItem("token"));

        try {
            await axios.put(
                `https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}/status`,
                {
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("Status Updated!");
            fetchIssues();

        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Civic Issues</h2>
            <input type="text"
                className="form-control mb-4"
                placeholder="Search by Title or Location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                className="form-select mb-4"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="All">All Complaints</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
            </select>

            <select
                className="form-select mb-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Garbage">Garbage</option>
                <option value="Pothole">Pothole</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Street Light">Street Light</option>
                <option value="Drainage">Drainage</option>
            </select>

            {issues.length === 0 ? (
                <h5 className="text-center">No Complaints Found</h5>
            ) : (
                issues.filter((issue) => {
                    const matchesSearch =
                        issue.title.toLowerCase().includes(search.toLowerCase()) ||
                        issue.location.toLowerCase().includes(search.toLowerCase());
                    const matchesCategory =
                        category === "" ||
                        issue.category === category;
                    return matchesSearch && matchesCategory;
                })
                    .map((issue) => (
                        <div className="card shadow mb-4" key={issue._id}>
                            <div className="card-body">

                                <h3 className="text-primary">
                                    {issue.title}
                                </h3>
                                {issue.image && (
                                    <img src={`https://amiable-luck-production-e7d8.up.railway.app/uploads/${issue.image}`}
                                        alt="issue"
                                        className="img-fluid rounded mb-3"
                                        style={{ maxHeight: "250px" }}
                                    />
                                )}

                                <hr />

                                <p>
                                    <strong>Category:</strong> {issue.category}
                                </p>

                                <p>
                                    <strong>Location:</strong> {issue.location}
                                </p>

                                <p>
                                    <strong>Description:</strong> {issue.description}
                                </p>

                                <p>
                                    <strong>Status:</strong>

                                    <span className={`badge ms-2 ${issue.status === "Resolved" ? "bg-success" : "bg-warning text-dark"}`}
                                    >
                                        {issue.status}
                                    </span>
                                </p>
                                <button
                                    className="btn btn-info btn-sm mt-2 me-2"
                                    onClick={() => navigate(`/issue/${issue._id}`)}
                                >
                                    👁 View Details
                                </button>

                                {user?.role === "admin" && (
                                    <button
                                        className="btn btn-danger btn-sm mt-2 me-2"
                                        onClick={() => deleteIssue(issue._id)}
                                    >
                                        🗑 Delete
                                    </button>
                                )}

                                {user?.role === "admin" && (
                                    <select
                                        className="form-select mt-2 mb-2"
                                        value={issue.status}
                                        onChange={(e) => updateStatus(issue._id, e.target.value)}
                                        style={{ maxWidth: "220px" }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                )}

                                {user?.role === "admin" && (
                                    <button
                                        className="btn btn-dark btn-sm mt-2"
                                        onClick={() => navigate(`/edit/${issue._id}`)}
                                    >
                                        ✏️ Edit
                                    </button>
                                )}

                                <p className="text-muted">
                                    <small>
                                        Reported On :
                                        {" "}
                                        {new Date(issue.createdAt).toLocaleString()}
                                    </small>
                                </p>

                            </div>
                        </div>
                    )
                    ))
            }
        </div>
    );
}

export default ViewIssues;