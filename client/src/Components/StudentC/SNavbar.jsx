import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/SNavbar.css";
import { LogOut, UserCircle } from "lucide-react"; // Using refined Lucide icons

const SNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rollNumber = sessionStorage.getItem("username") || "Guest";

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/", { replace: true });
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="mui-appbar">
      {/* Left side: Role Text (MUI Typography style) */}
      <div className="mui-role-text">
        Logged in as <strong>Student: {rollNumber}</strong>
      </div>

      {/* Center: Navigation Links (MUI Tabs style) */}
      <div className="mui-nav-center">
        <a
          className={`mui-nav-link ${location.pathname === '/sHomepage' ? 'mui-active' : ''}`}
          href="/sHomepage"
        >
          Home
        </a>
        <a
          className={`mui-nav-link ${location.pathname === '/student-calendar' ? 'mui-active' : ''}`}
          href="/student-calendar"
        >
          Calendar
        </a>
        <a
          className={`mui-nav-link ${location.pathname === '/make-entry' ? 'mui-active' : ''}`}
          href="/make-entry"
        >
          Enter Records
        </a>
      </div>

      {/* Right side: Actions (MUI IconButton style) */}
      <div className="mui-action-group">
        <a href="/profile" className="mui-icon-button" title="Profile">
          <UserCircle size={24} />
        </a>
        <button className="mui-icon-button mui-logout-button" onClick={handleLogout} title="Logout">
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
};

export default SNavbar;
