import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function MyComplaints() {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const total = issues.length;

    const pending = issues.filter(
        (issue) => issue.status === "Pending"
    ).length;

    const inProgress = issues.filter(
        (issue) => issue.status === "In Progress"
    ).length;

    const resolved = issues.filter(
        (issue) => issue.status === "Resolved"
    ).length;



    useEffect(() => {
        fetchMyComplaints();
    }, []);
    const fetchMyComplaints = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(`https://amiable-luck-production-e7d8.up.railway.app/api/issues/user/${user.email}`);
            setIssues(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComplaints = async (id) => {
        if (!window.confirm("Are you sure you want to delete this complaints?")) {
            return;
        }

        try {
            await axios.delete(
                `https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Complaints Deleted Successfully!");
            fetchMyComplaints();
        } catch (error) {
            console.log(error);
            console.log(error.response);
            toast.error(error.response?.data?.message || "Delete Failed");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">My Complaints</h2>

            <div className="row mt-4 mb-5">

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
                    <div className="card shadow text-center p-3 bg-info text-white">
                        <h5>In Progress</h5>
                        <h2>{inProgress}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center p-3 bg-success text-white">
                        <h5>Resolved</h5>
                        <h2>{resolved}</h2>
                    </div>
                </div>

            </div>

            <input
                type="text"
                className="form-control mb-4 shadow-sm"
                placeholder="🔍 Search Complaint..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                className="form-select mb-4 shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="All">All Complaints</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
            </select>

            {issues.length === 0 ? (
                <h4 className="text-center"> No Complaints Found</h4>
            ) : (
                issues
                    .filter((issue) => {
                        console.log("Status:", issue.status);
                        console.log("Selected:", statusFilter);

                        return statusFilter === "All"
                            ? true
                            : issue.status === statusFilter;
                    })
                    .map((issue) => (
                        <div className="card shadow-lg border-0 rounded-4 mb-4" key={issue._id}>
                            <div className="card-body">
                                <h4>{issue.title}</h4>
                                <p>
                                    <span className="badge bg-info">
                                        {issue.category}
                                    </span>
                                </p>
                                <p><b>Location:</b>{issue.location}</p>
                                <p>
                                    <b>Status:</b>{" "}
                                    <span className={`badge ${issue.status === "Resolved" ? "bg-success" : "bg-warning text-dark"
                                        }`}
                                    >
                                        {issue.status}
                                    </span>
                                </p>
                                <p>
                                    <b>Reported:</b>{" "}
                                    {new
                                        Date(issue.createdAt).toLocaleDateString()}
                                </p>
                                {issue.image && (
                                    <img
                                        src={issue.image}
                                        alt="Issue"
                                        className="img-fluid rounded mt-2"
                                        style={{ width: "250px" }}
                                    />
                                )}

                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => deleteComplaints(issue._id)}
                                >
                                    🗑 Delete
                                </button>

                                <button
                                    className="btn btn-success mt-2 ms-2"
                                    onClick={() => {
                                        console.log("Edit Clicked");
                                        navigate(`/edit/${issue._id}`);
                                    }}
                                >
                                    ✏️ Edit
                                </button>

                            </div>
                        </div>
                    ))
            )}
        </div>
    );
}

export default MyComplaints;