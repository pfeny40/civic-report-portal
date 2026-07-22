import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedUser);
    }, []);
    return (
        <div className="container mt-5">
            <div className="card shadow p-4 col-md-6 mx-auto">
                <h2 className="text-center mb-4">👤 My Profile</h2>
                {user ? (
                    <>
                        <h5><strong>Name:</strong>{user.name}</h5>
                        <h5 className="mt-3"><strong>Email:</strong>{user.email}</h5>
                        <h5 className="mt-3"><strong>User ID:</strong>{user._id}</h5>
                    </>
                ): (
                    <h4 className="text-center">
                        User Not Logged In
                    </h4>
                )}
            </div>
        </div>
    );
}

export default Profile;