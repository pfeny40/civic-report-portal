import { useEffect, useState } from "react";
import axios from "axios";

function MyComplaints() {
    const [issues, setIssues] = useState([]);
    useEffect(() => {
        fetchMyComplaints();
    }, []);
    const fetchMyComplaints = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(`http://localhost:5000/api/issues/user/${user.email}`);
            setIssues(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">My Complaints</h2>
            {issues.length === 0 ? (
                <h4 className="text-center"> No Complaints Found</h4>
            ) : (
                issues.map((issue) => (
            <div className="card shadow mb-3" key={issue._id}>
                <div className="card-body">
                    <h4>{issue.title}</h4>
                    <p><b>Category:</b>{issue.category}</p>
                    <p><b>Location:</b>{issue.location}</p>
                    <p><b>Status:</b>{issue.status}</p>
                </div>
            </div>
            ))
            ) }
        </div>
    );
}

export default MyComplaints;