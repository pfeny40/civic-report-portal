import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-5">
            <div className="text-center p-5 bg-light rounded shadow">
                <h1 className="display-4 text-primary">Crowdsourced Civic Issue Reporting and Resolution System</h1>
                <div className="container mt-5">
                    <div className="row">

                        <div className="col-md-3">
                            <div className="card shadow p-3 text-center">
                                <h4>🛣️</h4>
                                <h5>Pothole</h5>
                                <p>Report damaged roads and potholes.</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow p-3 text-center">
                                <h4>🗑️</h4>
                                <h5>Garbage</h5>
                                <p>Report garbage collection issues.</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow p-3 text-center">
                                <h4>💧</h4>
                                <h5>Water Leakage</h5>
                                <p>Report water leakage problems.</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow p-3 text-center">
                                <h4>💡</h4>
                                <h5>Street Light</h5>
                                <p>Report broken street lights.</p>
                            </div>
                        </div>

                    </div>
                </div>
                <p className="lead mt-3">
                    Report civic issues like potholes, garbage, water leakage and help
                    improve your city.
                </p>
                <Link to="/report" className="btn btn-primary btn-lg mt-3">🚀 Report Issue</Link>
            </div>
            <hr className="my-5"/>
            <div className="row text-center">
                <div className="col-md-4">
                    <h3>📱 Easy Reporting</h3>
                    <p>
                        Citizens can report civic problem  with photos and descriptions.
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>⚡ Quick Resolution</h3>
                    <p>
                        Authorities can track and resolve complaints efficiently.
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>📊 Live Dashboard</h3>
                    <p>
                        View complaint statistics and resolution progress in real time.
                    </p>
                </div>
            </div>
            <hr className="my-5"/>
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <div className="card show p-4">
                        <h2 className="text-primary">500+</h2>
                        <h5>Total Complaints</h5>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow p-4">
                        <h2 className="text-success">300+</h2>
                        <h5>Resolved Issues</h5>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow p-4">
                        <h2 className="text-warning">200+</h2>
                        <h5>Active Users</h5>
                    </div>
                </div>
            </div>
            <footer className="text-center text-muted">
                <p>
                    © 2026 Civic Report Portal | Developed using MERN Stack
                </p>
            </footer>
        </div>
    );
}

export default Home;