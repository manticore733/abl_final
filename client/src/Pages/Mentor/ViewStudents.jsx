import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MNavbar from "../../Components/MentorC/MNavbar";
import axios from "axios";
import "./css/ViewStudents.css";
import { Search, ChevronRight } from "lucide-react"; // Using Lucide

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
        } else {
          setStudents(Array.isArray(response.data.students) ? response.data.students : []);
        }
      } catch (error) {
        console.error("Error fetching student list:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewActivities = (s_id, name) => {
    navigate(`/get-student/${s_id}`, { state: { studentName: name } });
  };

  // Filter students based on search query (by name or roll number)
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = student.name?.toLowerCase().includes(query);
    const rollMatch = student.s_username?.toLowerCase().includes(query);
    return nameMatch || rollMatch;
  });

  return (
    <div className="mentor-page-wrapper">
      <MNavbar />

      {/* Mini-Hero Banner */}
      <div className="page-header-banner">
        <h2>Student Roster</h2>
        <p>Manage and review the activity logs of your assigned batch.</p>
      </div>

      <div className="mentor-main-container roaster-container">

        {/* Toolbar: Search and Filters */}
        <div className="toolbar-flex">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="roster-search-input"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="roster-stats">
            Total Students: <strong>{filteredStudents.length}</strong>
          </div>
        </div>

        {/* Modern Table Section */}
        {/* Modern Table Section */}
        <div className="modern-table-card">
          <div className="table-responsive-wrapper">
            <table className="modern-roster-table">
              <thead>
                <tr>
                  {/* Hardcoded widths prevent the table from shrinking or shifting! */}
                  <th style={{ width: "8%" }}>Sr No</th>
                  <th style={{ width: "25%" }}>Name</th>
                  <th style={{ width: "15%" }}>Roll No</th>
                  <th style={{ width: "15%" }}>Department</th>
                  <th style={{ width: "8%" }}>Sem</th>
                  <th style={{ width: "8%" }}>Batch</th>
                  <th style={{ width: "6%" }}>Div</th>
                  <th style={{ width: "15%" }} className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  /* Empty State Row */
                  <tr>
                    <td colSpan="8" className="empty-table-cell">
                      No students found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  /* Data Rows */
                  filteredStudents.map((student, index) => (
                    <tr key={student.s_id} className="roster-row">
                      <td className="sr-no-cell">{index + 1}</td>
                      <td className="fw-700 primary-text">{student.name}</td>
                      <td className="mono-text">{student.s_username}</td>
                      <td>{student.department}</td>
                      <td>{student.semester}</td>
                      <td>
                        <span className="batch-badge">{student.batch}</span>
                      </td>
                      <td>{student.division}</td>
                      <td className="action-cell">
                        <button
                          className="modern-view-btn"
                          onClick={() => handleViewActivities(student.s_id, student.name)}
                        >
                          View Profile
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>


      </div>

      {/* Footer */}
      <footer className="mentor-footer">
        <p>© {new Date().getFullYear()} FCRIT ABL Portal</p>
      </footer>
    </div>
  );
};

export default ViewStudents;
