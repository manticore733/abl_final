import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SNavbar from "../../Components/StudentC/SNavbar"; // Using unified navbar
import axios from "axios";
import { useToast } from "../../Components/ToastContext";
import "./css/ViewStudents.css";
import MNavbar from "../../Components/MentorC/MNavbar";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mentor/studentsundermentor", {
          withCredentials: true,
        });

        if (response.data && response.data.mentorId) {
          sessionStorage.setItem("mentorId", response.data.mentorId);
        }

        if (typeof response.data === "string") {
          console.error("Received HTML instead of JSON:", response.data);
          showToast("error", "Data Error", "Received invalid data format from server.");
        } else {
          setStudents(Array.isArray(response.data.students) ? response.data.students : []);
        }
      } catch (error) {
        console.error("Error fetching student list:", error);
        showToast("error", "Connection Error", "Failed to load student roster.");
      }
    };
    fetchData();
  }, [showToast]);

  const handleViewActivities = (s_id, name) => {
    navigate(`/get-student/${s_id}`, { state: { studentName: name } });
  };

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = student.name?.toLowerCase().includes(query);
    const rollMatch = student.s_username?.toLowerCase().includes(query);
    return nameMatch || rollMatch;
  });

  // Helper to get initials for the avatar
  const getInitials = (name) => {
    if (!name) return "ST";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  // Mock data generator for the performance bar chart (Replace with real data later)
  const getMockPerformance = () => {
    return [
      Math.floor(Math.random() * 60) + 40, // Tech
      Math.floor(Math.random() * 60) + 40, // Social
      Math.floor(Math.random() * 60) + 40, // Sports
      Math.floor(Math.random() * 60) + 40, // Cultural
      Math.floor(Math.random() * 60) + 40, // Internship
      Math.floor(Math.random() * 60) + 40, // Leadership
    ];
  };

  return (
    <div className="vs-page-wrapper">
      <MNavbar />

      <main className="vs-main-content">
        <div className="vs-container">

          {/* Header Section */}
          <div className="vs-header-flex">
            <div>
              <h2 className="vs-page-title">Student Roster</h2>
              <p className="vs-page-desc">Managing <span className="text-primary font-bold">{students.length} academic pulses</span> across your assigned batch.</p>
            </div>

            {/* Roster Stats Bento */}
            <div className="vs-stats-group">
              <div className="vs-stat-box bg-surface-low">
                <span className="vs-stat-label text-muted">Total</span>
                <span className="vs-stat-val text-main">{students.length}</span>
              </div>
              <div className="vs-stat-box bg-cyan-light">
                <span className="vs-stat-label text-cyan">Active</span>
                <span className="vs-stat-val text-cyan">{Math.floor(students.length * 0.9)}</span>
              </div>
              <div className="vs-stat-box bg-error-light border-error">
                <span className="vs-stat-label text-error">Attention</span>
                <span className="vs-stat-val text-error">{Math.floor(students.length * 0.1)}</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="vs-toolbar-section">
            <div className="vs-filter-bar glass-effect">
              <div className="vs-filter-title">
                <span className="material-symbols-outlined">tune</span>
                <span>Filters</span>
              </div>
              <select className="vs-select">
                <option>All Semesters</option>
                <option>Semester 3</option>
                <option>Semester 5</option>
                <option>Semester 7</option>
              </select>
              <select className="vs-select">
                <option>All Branches</option>
                <option>Computer Science</option>
                <option>Electronics</option>
              </select>
              <select className="vs-select">
                <option>Performance: High to Low</option>
                <option>Need Attention</option>
              </select>
              <div className="vs-view-toggles">
                <button className="active"><span className="material-symbols-outlined">grid_view</span></button>
                <button><span className="material-symbols-outlined">list</span></button>
              </div>
            </div>

            {/* Prominent Search */}
            <div className="vs-search-wrapper">
              <span className="material-symbols-outlined vs-search-icon">search</span>
              <input
                type="text"
                className="vs-search-input"
                placeholder="Search by Student Name or Roll Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Student Grid */}
          <div className="vs-student-grid">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => {
                const isWarning = Math.random() > 0.8; // Randomly assign "Need Attention" status for UI mockup
                const perfData = getMockPerformance();
                const avgScore = (perfData.reduce((a, b) => a + b, 0) / perfData.length / 10).toFixed(1);

                return (
                  <div key={student.s_id} className={`vs-student-card ${isWarning ? 'warning-card' : ''}`}>
                    <div className="vs-card-bg-accent"></div>

                    <div className="vs-card-header">
                      <div className="vs-avatar">{getInitials(student.name)}</div>
                      <div className="vs-info">
                        <div className="vs-name-row">
                          <h3>{student.name}</h3>
                          {isWarning && <span className="material-symbols-outlined text-error">error</span>}
                        </div>
                        <p>ID: {student.s_username}</p>
                        <div className="vs-badges">
                          <span className="vs-badge-sem">Sem {student.semester}</span>
                          <span className="vs-badge-dept">{student.department || "Engineering"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="vs-performance-section">
                      <div className="vs-perf-header">
                        <p>Performance Pulse</p>
                        <span className={isWarning ? "text-error" : "text-primary"}>{avgScore} / 10.0</span>
                      </div>

                      {/* Mini CSS Bar Chart */}
                      <div className="vs-mini-chart">
                        {perfData.map((val, idx) => (
                          <div
                            key={idx}
                            className="vs-mini-bar"
                            style={{ height: `${val}%` }}
                            title={`Score: ${val}%`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="vs-card-actions">
                      <button className="vs-btn-view" onClick={() => handleViewActivities(student.s_id, student.name)}>
                        View Profile
                      </button>
                      <button className={`vs-btn-review ${isWarning ? 'btn-error' : ''}`}>
                        {isWarning ? "Intervention Required" : <>Review <span className="vs-review-badge">3</span></>}
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="vs-empty-state">
                <span className="material-symbols-outlined">search_off</span>
                <h3>No students found</h3>
                <p>Try adjusting your search query or filters.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="sh-footer">
        <div className="sh-footer-content">
          <div><p className="sh-copyright">© 2024 Scholar Pulse University. All rights reserved.</p></div>
          <div className="sh-footer-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ViewStudents;