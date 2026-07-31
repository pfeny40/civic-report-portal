import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageUsers() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(
                "https://amiable-luck-production-e7d8.up.railway.app/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setUsers(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {
            await axios.delete(
                `https://amiable-luck-production-e7d8.up.railway.app/api/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("User Deleted Successfully");
            fetchUsers();
        } catch (error) {
            console.log(error);
            toast.error("Delete Failed");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                👥 Manage Users
            </h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            user.role === "admin"
                                                ? "bg-danger"
                                                : "bg-primary"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default ManageUsers;