import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const categoryData = {
    "Roads & Infrastructure": [
        "Pothole (ખાડા)",
        "Broken Road / Footpath (તૂટેલો રસ્તો)",
        "Street Light Not Working (સ્ટ્રીટ લાઈટ બંધ)",
        "Bridge Damage"
    ],
    "Waste & Sanitation": [
        "Garbage Dumped in Public Place (જાહેર જગ્યાએ કચરો)",
        "Overflowing Dustbins (ઓવરફ્લો થતી કચરાપેટી)",
        "Public Toilet Cleaning (જાહેર શૌચાલયની સફાઈ)",
        "Dead Animal Removal"
    ],
    "Water Supply & Drainage": [
        "Water Leakage (પાણીનું લીકેજ)",
        "Contaminated / Dirty Water (દૂષિત પાણી)",
        "Drainage Overflow / Blockage (ગટર ઉભરાવી)",
        "Low Water Pressure"
    ],
    "Public Parks & Trees": [
        "Fallen / Dangerous Tree Branches (તૂટેલી ઝાડની ડાળીઓ)",
        "Park Cleaning & Maintenance",
        "Playground Damage"
    ],
    "Traffic & Stray Animals": [
        "Stray Dog / Cattle Nuisance (રખડતા ઢોરની સમસ્યા)",
        "Traffic Signal Malfunction (ટ્રાફિક સિગ્નલ ખરાબ)",
        "Illegal Parking / Obstruction"
    ],
    "Other": [
        "General Civic Issue"
    ]
};

function ReportIssue() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        subcategory: "",
        location: "",
        latitude: "",
        longitude: "",
        description: "",
    });

    const [subcategories, setSubcategories] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMap, setLoadingMap] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (e) => {
        const selectedCat = e.target.value;
        setFormData({
            ...formData,
            category: selectedCat,
            subcategory: "",
        });
        setSubcategories(categoryData[selectedCat] || []);
    };

    // Google Map Location Detector
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser!");
            return;
        }

        setLoadingMap(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setFormData((prev) => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                    location: prev.location || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`,
                }));

                setLoadingMap(false);
                toast.info("📍 Location detected & pinned on Google Map!");
            },
            (error) => {
                setLoadingMap(false);
                toast.error("Unable to retrieve GPS location. Please enter manually.");
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("subcategory", formData.subcategory);
            data.append("location", formData.location);
            data.append("latitude", formData.latitude);
            data.append("longitude", formData.longitude);
            data.append("description", formData.description);
            if (image) {
                data.append("image", image);
            }
            
            const userObj = JSON.parse(localStorage.getItem("user") || "{}");
            data.append("userEmail", userObj.email || "guest@civic.com");

            // API Call (Issue Create Route)
            const response = await axios.post(
                "https://civic-report-portal-api.onrender.com/api/issues", // Updated endpoint
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // EmailJS Notification Trigger
            await emailjs.send(
                "service_29dmuol",
                "template_x1sfgum",
                {
                    name: "Civic Report Portal",
                    title: formData.title,
                    category: `${formData.category} (${formData.subcategory})`,
                    location: formData.location,
                    description: formData.description,
                    user_email: userObj.email,
                    email: userObj.email,
                },
                "raw8DD8j_43-Ajqhp"
            );

            toast.success("Complaint Submitted Successfully!");
            setFormData({
                title: "",
                category: "",
                subcategory: "",
                location: "",
                latitude: "",
                longitude: "",
                description: "",
            });
            setImage(null);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow p-4" style={{ maxWidth: "700px", margin: "auto" }}>
                <h2 className="text-center mb-4 text-primary">
                    <i className="fa-solid fa-triangle-exclamation me-2"></i>Report New Civic Issue
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Issue Title */}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Issue Title (e.g. Broken Street Light)"
                        required
                    />

                    {/* Main Category Dropdown */}
                    <div className="row g-2 mb-3">
                        <div className="col-md-6">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleCategoryChange}
                                className="form-select"
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {Object.keys(categoryData).map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory Dropdown */}
                        <div className="col-md-6">
                            <select
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleChange}
                                className="form-select"
                                disabled={!formData.category}
                                required
                            >
                                <option value="">-- Select Sub-Category --</option>
                                {subcategories.map((sub, idx) => (
                                    <option key={idx} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Location Input + Google Maps GPS Button */}
                    <div className="p-3 mb-3 border rounded bg-light">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="fw-semibold mb-0">Location & Google Map Pin</label>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={handleGetLocation}
                                disabled={loadingMap}
                            >
                                {loadingMap ? "📍 Detecting GPS..." : "📍 Detect Location"}
                            </button>
                        </div>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-control mb-2"
                            placeholder="Enter complete address / landmark"
                            required
                        />

                        {/* Google Map Embedded Preview */}
                        {formData.latitude && formData.longitude && (
                            <div className="mt-2 rounded overflow-hidden" style={{ height: "180px" }}>
                                <iframe
                                    title="Google Map Pin Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    src={`https://maps.google.com/maps?q=${formData.latitude},${formData.longitude}&z=15&output=embed`}
                                ></iframe>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control mb-3"
                        rows="4"
                        placeholder="Describe the issue in detail...."
                        required
                    ></textarea>

                    {/* Image File Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="form-control mb-4"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-danger w-100 py-2 fw-semibold"
                        disabled={loading}
                    >
                        {loading ? "⏳ Submitting..." : "Submit Complaint"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReportIssue;