import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/MNavbar.css";
import { FetchStudentList } from "../../api/mentorApi";
import { LogOut, UserCircle } from "lucide-react"; // Matching SNavbar

const MNavbar = () => {
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

  const handleViewStudents = async (event) => {
    event.preventDefault();
    const students = await FetchStudentList();
    if (students) {
      navigate("/view-students");
    }
  };

  return (
    <nav className="mui-appbar">
      {/* Left side: Role Text (MUI Typography style) */}
      <div className="mui-role-text">
        Logged in as <strong>Mentor: {rollNumber}</strong>
      </div>

      {/* Center: Navigation Links (MUI Tabs style) */}
      <div className="mui-nav-center">
        <a
          className={`mui-nav-link ${location.pathname === '/mHomepage' ? 'mui-active' : ''}`}
          href="/mHomepage"
        >
          Home
        </a>
        <a
          className={`mui-nav-link ${location.pathname === '/view-students' ? 'mui-active' : ''}`}
          href="/view-students"
          onClick={handleViewStudents}
        >
          View Students
        </a>
      </div>

      {/* Right side: Actions (MUI IconButton style) */}
      <div className="mui-action-group">
        <a href="/mprofile" className="mui-icon-button" title="Profile">
          <UserCircle size={24} />
        </a>
        <button className="mui-icon-button mui-logout-button" onClick={handleLogout} title="Logout">
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
};

export default MNavbar;