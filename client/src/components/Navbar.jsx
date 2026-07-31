import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? "bg-dark text-white" : "";
    }, [darkMode]);

    const isLoggedIn = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log("Navbar User:", user);

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
            <div
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            <div className={`menu ${menuOpen ? "active" : ""}`}>

                <Link to="/">Home</Link>

                {isLoggedIn ? (
                    <>

                        <Link to="/dashboard">Dashboard</Link>

                        <Link to="/report">Report Issue</Link>

                        <Link to="/issues">View Issues</Link>

                        <Link to="/my-complaints">My Complaints</Link>

                        <Link to="/profile">Profile</Link>
                        {user?.role === "admin" && (
                            <Link to="/admin">Admin Panel</Link>
                        )}

                        {user?.role === "admin" && (
                            <Link to="/manage-users">
                                Manage Users
                            </Link>
                        )}

                        <button
                            className="btn btn-secondary btn-sm me-2"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? "☀ Light" : "🌙 Dark"}
                        </button>

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