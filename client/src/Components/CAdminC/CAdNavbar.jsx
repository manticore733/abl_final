import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./css/CAdNavbar.css";

const CAdNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Used to determine which link is active

  // Fetch profile pic from session, fallback to default if missing
  const profilePic = sessionStorage.getItem("profilePic") || "https://lh3.googleusercontent.com/aida-public/AB6AXuAPOIaMxJzaxqTw321ZYKkGgZ6eCwFj_ugjDliIjERuR0daW-fO1xJfre6ZZ1ONuub2arGW6-XYvv1hgfzcI4w2496oJESx5I9edmCG_4cHmVLamDwSB7lr0XTTUwKfJaVB15JCO-3Bb1k2XLzoAFC7gQ67dd8uOGXHJg0BqIKWxCVI11xe2QArZsqRFKgoaiQz6CWs37uve3tzDFTaP31Bz2j8gfS9bHfvYfbUHGukfiRH1I4JRaf7auK1ikjKr2NaucC7AC6OdlM";

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        sessionStorage.clear(); // Clear session data for security
        navigate("/", { replace: true });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Helper function to apply the 'active' class to the current route
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="ca-navbar">
      <div className="ca-nav-left">
        <span className="ca-brand-logo">AcademicEditorial</span>

        <nav className="ca-nav-links hidden-mobile">
          <Link to="/cHomepage" className={isActive("/cHomepage")}>Dashboard</Link>
          <Link to="/cadd-events" className={isActive("/cadd-events")}>Add Events</Link>
          <Link to="/cadmin-calendar" className={isActive("/cadmin-calendar")}>Calendar</Link>
        </nav>
      </div>

      <div className="ca-nav-right">
        <div className="ca-nav-icons hidden-mobile">
          <button title="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          {/* Replaced generic settings with a styled Logout button */}
          <button onClick={handleLogout} title="Logout" className="ca-logout-btn">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>

        {/* Clicking the avatar takes you to the profile page */}
        <div className="ca-nav-avatar" onClick={() => navigate("/cprofile")} title="Club Profile">
          <img src={profilePic} alt="Admin Profile" />
        </div>
      </div>
    </header>
  );
};

export default CAdNavbar;