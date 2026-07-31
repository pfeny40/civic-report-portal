import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://amiable-luck-production-e7d8.up.railway.app/api/auth/register", formData);
            toast.success(res.data.message);
            navigate("/login");
            setFormData({
                name: "",
                email: "",
                password: "",
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "registration Failed");
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Create Account</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                             type="text" 
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             className="form-control mb-3" 
                             placeholder="Full Name" 
                             />
                            <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control mb-3" 
                            placeholder="Email" 
                            />
                            <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control mb-3" 
                            placeholder="Password" 
                            />

                            <button className="btn btn-success">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;