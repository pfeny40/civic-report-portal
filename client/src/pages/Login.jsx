import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();

    const [formData, setForData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://civic-report-portal-api.onrender.com/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            toast.success("Login Successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.log("LOGIN ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Login Failed"
            );
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control mb-3"
                                placeholder="Enter Email"
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control mb-3"
                                placeholder="Enter Password"
                            />

                            <button className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;