import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [total, setTotal] = useState(0);
    const [pending, setPending] = useState(0);
    const [resolved, setResolved] = useState(0);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedUser);

        if (loggedUser) {
            fetchStats(loggedUser.email);
        }
    }, []);

    const fetchStats = async (email) => {
        try {
            const res = await axios.get(
                `https://amiable-luck-production-e7d8.up.railway.app/api/issues/user/${email}`
            );

            setTotal(res.data.length);

            setPending(
                res.data.filter((i) => i.status === "Pending").length
            );

            setResolved(
                res.data.filter((i) => i.status === "Resolved").length
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 col-md-6 mx-auto">
                <h2 className="text-center mb-4">👤 My Profile</h2>
                {user ? (
                    <>
                        <div className="text-center mb-4">

                            <img
                                src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=150"
                                className="rounded-circle shadow"
                                alt="avatar"
                            />

                            <h3 className="mt-3">{user.name}</h3>

                            <span className="badge bg-primary">
                                {user.role}
                            </span>

                        </div>

                        <hr />

                        <h5>📧 <b>Email:</b> {user.email}</h5>

                        <h5 className="mt-3">🆔 <b>User ID:</b> {user._id}</h5>

                        <h5 className="mt-3">
                            📋 <b>Total Complaints:</b> {total}
                        </h5>

                        <h5 className="mt-3">
                            🟡 <b>Pending:</b> {pending}
                        </h5>

                        <h5 className="mt-3">
                            🟢 <b>Resolved:</b> {resolved}
                        </h5>
                    </>
                ) : (
                    <h4 className="text-center">
                        User Not Logged In
                    </h4>
                )}
            </div>
        </div>
    );
}

export default Profile;