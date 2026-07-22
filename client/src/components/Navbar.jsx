import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logout Successfully!");

        navigate("/login");
    };

    return (
        <nav>
            <div className="logo">
                Civic Report Portal
            </div>

            <div className="menu">

                <Link to="/">Home</Link>

                {isLoggedIn ? (
                    <>
                        
                        <Link to="/dashboard">Dashboard</Link>

                        <Link to="/report">Report Issue</Link>

                        <Link to="/issues">View Issues</Link>

                        <Link to="/my-complaints">My Complaints</Link>

                        <Link to="/profile">Profile</Link>

                        <button
                            onClick={logout}
                            className="btn btn-danger btn-sm ms-2"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;