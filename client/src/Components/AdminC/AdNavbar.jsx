import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./css/AdNavbar.css";
import { useToast } from "../../Components/ToastContext"; // ✅ Added for feedback
import apiClient from "../../apiClient";

const AdNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      // ✅ Use apiClient to hit the new auth/logout endpoint
      const response = await apiClient.post("/api/auth/logout");

      if (response.data.success) {
        // ✅ Clear UI state securely
        sessionStorage.clear();

        showToast('success', 'Logged Out', 'Admin session securely closed.');
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Failsafe: clear local storage and kick to login even if server disconnects
      sessionStorage.clear();
      showToast('error', 'Session Ended', 'You have been logged out.');
      navigate("/", { replace: true });
    }
  };

  // Helper to determine active route
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="sa-top-nav">

      {/* Left: Brand & Links */}
      <div className="sa-nav-left">
        <div className="sa-brand-container">
          <div className="sa-brand-icon">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <span className="sa-brand-text">Scholar Pulse</span>
        </div>

        <div className="sa-desktop-links">
          <Link className={`sa-nav-link ${isActive('/aHomepage')}`} to="/aHomepage">Dashboard</Link>
          <Link className={`sa-nav-link ${isActive('/add-mentor')}`} to="/add-mentor">Add Mentor</Link>
          <Link className={`sa-nav-link ${isActive('/ad-view-mentor')}`} to="/ad-view-mentor">Mentors</Link>
          <Link className={`sa-nav-link ${isActive('/ad-view-students')}`} to="/ad-view-students">Students</Link>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="sa-nav-right">
        {/* Search Bar Removed as requested */}

        <button className="sa-icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="sa-icon-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <button onClick={handleLogout} className="sa-icon-btn logout-icon-btn" title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>

        <Link to="/adprofile" className="sa-profile-wrapper">
          <img
            className={`sa-profile-avatar ${isActive('/adprofile') ? 'border-active' : ''}`}
            alt="Admin Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzqFW8D6iwaIlSrQW8lZ-lGpALxA7otslJlbmEbt8VWfLMHXWnQyTyjXHtqYzrlLV-LoNat_63AHLXNobwlNfNnG6fN0yCroHLYVFB_sZwLq40GQsgPQnZKD3HX4PRaCGyS_kGZFoXUk5liJDPcaAficWfXyf7k5aLrzno6bQBCiwKEi4VVIuj7992lae7x_PHJcIDBgYfcCQCQaxjJxSlx0EPERamB-O8QuRlO89GGN6HLFIuzCnb3BkSnYZG9w2Bvz6mlQqLV4U"
          />
        </Link>
      </div>

    </nav>
  );
};

export default AdNavbar;