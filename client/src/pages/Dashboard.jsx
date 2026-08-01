import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const [issues, setIssues] = useState([]);

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

    const pending = issues.filter((issue) => issue.status === "Pending").length;
    const resolved = issues.filter((issue) => issue.status === "Resolved").length;
    const user = JSON.parse(localStorage.getItem("user"));

    const chartData = {
        labels: ["pending", "Resolved"],
        datasets: [
            {
                data: [pending, resolved],
                backgroundColor: [
                    "#ffc107",
                    "#198754",
                ],
                borderWidth: 1,
            },
        ],
    };
    if (user?.role !== "admin") {
        return (
            <div className="container mt-5 text-center">
                <h2>Access Denied</h2>
                <p>Only Admin can access Dashboard.</p>
            </div>
        );
    }


    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold text-primary mb-5">📊 Dashboard</h2>
            <div className="row g-4">
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow p-4 bg-primary text-white">
                        <h3>📋 Total Complaints</h3>
                        <h1 className="display-4 fw-bold">{total}</h1>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow p-4 bg-warning">
                        <h3>🟡 Pending</h3>
                        <h1 className="display-4 fw-bold">{pending}</h1>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow p-4 bg-success text-white">
                        <h3>🟢 Resolved</h3>
                        <h1 className="display-4 fw-bold">{resolved}</h1>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow p-4 bg-info text-white">
                        <h3>👤 Logged User</h3>
                        <h5 className="mt-3">{user?.name}</h5>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 mx-auto">
                        <div className="card shadow p-4" style={{ height: "360px" }}>
                            <h3 className="text-center mb-3">
                                Complaint Status Chart
                            </h3>
                            <div
                                style={{
                                    width: "250px",
                                    height: "250px",
                                    margin: "0 auto",
                                }}
                            >
                                <Pie
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <h3 className="mb-3">Recent Complaints</h3>
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.slice(0, 5).map((issue) => (
                                <tr key={issue._id}>
                                    <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                                    <td>{issue.title}</td>
                                    <td>{issue.category}</td>
                                    <td>
                                        <span
                                            className={`badge ${issue.status === "Resolved"
                                                    ? "bg-success"
                                                    : "bg-warning text-dark"
                                                }`}
                                        >
                                            {issue.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;