import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditIssue from "./pages/EditIssue";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import MyComplaints from "./pages/MyComplaints";
import Profile from "./pages/Profile";
import ViewIssues from "./pages/ViewIssues";

function App() {
  return(
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>< Dashboard/></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute>< ReportIssue/></ProtectedRoute>} />
        <Route path="/my-complaints" element={<ProtectedRoute>< MyComplaints/></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/issues" element={<ViewIssues />} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditIssue/></ProtectedRoute>}/>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;