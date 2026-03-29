import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../ToastContext"; // Adjust path if needed
import { FetchStudentList } from "../../api/mentorApi";
import "./css/MNavbar.css";

const MNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        showToast('success', 'Logged Out', 'You have securely logged out of the portal.');
        navigate("/", { replace: true });
      } else {
        showToast('error', 'Logout Failed', 'An error occurred during logout.');
      }
    } catch (error) {
      console.error("Error during logout:", error);
      showToast('error', 'Connection Error', 'Could not connect to the server.');
    }
  };

  const handleViewStudents = async (event) => {
    event.preventDefault();
    const students = await FetchStudentList();
    if (students) {
      navigate("/view-students");
    }
  };

  // Helper to determine active route
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="sh-top-nav">
      <div className="sh-nav-left">
        <span className="sh-brand-text">Faculty Portal</span>
        <div className="sh-desktop-links">
          <Link className={`sh-nav-link ${isActive('/mHomepage')}`} to="/mHomepage">Overview</Link>
          <a
            className={`sh-nav-link ${isActive('/view-students')}`}
            href="/view-students"
            onClick={handleViewStudents}
          >
            Students
          </a>
        </div>
      </div>

      <div className="sh-nav-right">
        <div className="sh-search-box">
          <span className="material-symbols-outlined">search</span>
          <input placeholder="Search students..." type="text" />
        </div>

        <button className="sh-icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="sh-icon-btn">
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        <button onClick={handleLogout} className="sh-icon-btn logout-icon-btn" title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>

        <Link to="/mprofile">
          <img
            className={`sh-profile-avatar ${isActive('/mprofile') ? 'border-active' : ''}`}
            alt="Mentor Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARPwWo51AkmWe0-FeHnbNWyIARhWlN5GxLLqF9qc8kuf2F-sVkQY6HHooaTUoRHmbJRJ-xhVZ68MMSkLci7FatIeCrGxo01Hp2PtwglQdGOQglGpwTM2YpNw6GG0o-9knJ-k2algYoIuqUBvIZbvBBbS6b7_XoCYY3n4093FXnRlNMgyBU_i1Aw8c4nrtcyraE3qnwnp9-Sk6KfjRtz0k5C--_I9BzGX1vOClDkcRyyDhyS50O-jTCLyioQ5e8N7_YQDylMnEG4uk"
          />
        </Link>
      </div>
    </nav>
  );
};

export default MNavbar;