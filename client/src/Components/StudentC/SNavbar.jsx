import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./css/SNavbar.css";
import { useToast } from "../../Components/ToastContext";

const SNavbar = () => {
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
        showToast('success', 'Logged Out', 'You have been successfully logged out.');
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      showToast('error', 'Logout Failed', 'Could not connect to the server.');
    }
  };

  // Helper to determine active route
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="sh-top-nav">
      <div className="sh-nav-left">
        <span className="sh-brand-text">Academic Portal</span>
        <div className="sh-desktop-links">
          <Link className={`sh-nav-link ${isActive('/sHomepage')}`} to="/sHomepage">Dashboard</Link>
          <Link className={`sh-nav-link ${isActive('/student-calendar')}`} to="/student-calendar">Schedule</Link>
          <Link className={`sh-nav-link ${isActive('/make-entry')}`} to="/make-entry">Activities</Link>
          {/* Add more links here as needed */}
        </div>
      </div>

      <div className="sh-nav-right">
        <div className="sh-search-box">
          <span className="material-symbols-outlined">search</span>
          <input placeholder="Search records..." type="text" />
        </div>

        <button className="sh-icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="sh-icon-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <button onClick={handleLogout} className="sh-icon-btn logout-icon-btn" title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>

        <Link to="/profile">
          <img
            className={`sh-profile-avatar ${isActive('/profile') ? 'border-active' : ''}`}
            alt="Student Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-01cNusPj6qq-SqdEc78yD6RCE2i37nxrydaMSyXPS0x8xyoL2-jPlLqLKdJHXJPqzsBLaJVv_x19BKsfrWF00x9arEtsk-oZ6k_J0SNo2tVGpuoNGSFCGeEbMNRWWaeVNmOpS6XsmGRqt9ATEfZi526ZUaNLUIGRIHuWtbAHqsDJ-x18LdyNtbAVeG9r0r5d6Ahe_jIO-AXGewrH017f1xSJXK4pZHA-A-g_VJU4zeU-r9bxZK126UWiQK6ygAd6NZjQeoBxQXY"
          />
        </Link>
      </div>
    </nav>
  );
};

export default SNavbar;