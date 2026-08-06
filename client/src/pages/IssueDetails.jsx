import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function IssueDetails() {
    const { id } = useParams();
    const [issue, setIssue] = useState(null);

    useEffect(() => {
        fetchIssue();
    }, []);

    const fetchIssue = async () => {
        try {
            const res = await axios.get(`https://amiable-luck-production-e7d8.up.railway.app/api/issues/${id}`);
            setIssue(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!issue) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">

                <h2 className="text-center mb-4">
                    📋 Complaint Details
                </h2>

                {issue.image && (
                    <img
                        src={issue.image}
                        alt="Issue"
                        className="img-fluid rounded mt-2"
                        style={{ width: "250px" }}
                    />
                )}

                <h3>{issue.title}</h3>

                <p><b>Category:</b> {issue.category}</p>

                <p><b>Location:</b> {issue.location}</p>

                <p><b>Description:</b> {issue.description}</p>

                <p>
                    <b>Status:</b>{" "}
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
                </p>

                <p>
                    <b>Date:</b>{" "}
                    {new Date(issue.createdAt).toLocaleDateString()}
                </p>

            </div>
        </div>
    );
}

export default IssueDetails;