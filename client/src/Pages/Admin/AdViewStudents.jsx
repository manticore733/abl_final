import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import { fetchStudentsByFilters } from "../../api/adminApi";
import "./css/AdViewStudents.css";

const AdViewStudents = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Options
  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];
  const sections = ["A", "B", "C"];
  const batches = ["2023", "2024", "2025", "2026"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // --- API FETCH LOGIC ---
  const fetchStudents = async () => {
    if (!selectedSection || !selectedBranch || !selectedSemester) {
      alert("Please select Section, Branch, and Semester to fetch students.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchStudentsByFilters(selectedSection, selectedBranch, selectedSemester);
      setStudents(data);
    } catch (err) {
      setError("Failed to fetch students. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper for Circular Progress Ring
  const CircularProgress = ({ points }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min((points / 100) * 100, 100);
    const offset = circumference - (percentage / 100) * circumference;

    const colorClass = points < 40 ? 'stroke-error' : points >= 80 ? 'stroke-secondary' : 'stroke-teal';

    return (
      <div className="avs-progress-ring">
        <svg viewBox="0 0 40 40">
          <circle className="bg-ring" cx="20" cy="20" r={radius}></circle>
          <circle className={`fill-ring ${colorClass}`} cx="20" cy="20" r={radius} strokeDasharray={circumference} strokeDashoffset={offset}></circle>
        </svg>
        <span>{Math.round(percentage)}%</span>
      </div>
    );
  };

  return (
    <div className="avs-page-wrapper">
      <AdNavbar />

      <main className="avs-main-content">

        {/* Header Section */}
        <div className="avs-header">
          <div className="avs-header-text">
            <h1>Student Directory</h1>
            <p>Holistic management of institutional student data, academic tracking, and mentor-mentee alignment.</p>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <section className="avs-kpi-grid">
          {/* KPI 1 */}
          <div className="avs-kpi-card">
            <div className="avs-kpi-circle circle-primary"></div>
            <div className="avs-kpi-header">
              <div className="avs-kpi-icon icon-primary"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span></div>
              <span className="avs-kpi-badge badge-primary"><span className="material-symbols-outlined">trending_up</span> +2.4%</span>
            </div>
            <h3>Total Active Students</h3>
            <p>2,450</p>
          </div>

          {/* KPI 2 */}
          <div className="avs-kpi-card">
            <div className="avs-kpi-circle circle-error"></div>
            <div className="avs-kpi-header">
              <div className="avs-kpi-icon icon-error"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>error_med</span></div>
              <span className="avs-kpi-badge badge-error"><span className="material-symbols-outlined">warning</span> High Priority</span>
            </div>
            <h3>At-Risk Students</h3>
            <p>124</p>
          </div>

          {/* KPI 3 */}
          <div className="avs-kpi-card">
            <div className="avs-kpi-circle circle-tertiary"></div>
            <div className="avs-kpi-header">
              <div className="avs-kpi-icon icon-tertiary"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_ind</span></div>
              <span className="avs-kpi-badge badge-tertiary">Pending</span>
            </div>
            <h3>Pending Mentor Assignments</h3>
            <p>42</p>
          </div>
        </section>

        {/* Unified Pill Filter Bar */}
        <section className="avs-filter-container">
          <div className="avs-search-wrapper">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search by Name or Roll Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="avs-select-group">
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
              <option value="">All Branches</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
              <option value="">Batch</option>
              {batches.map(b => <option key={b} value={b}>Batch: {b}</option>)}
            </select>
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              <option value="">Semester</option>
              {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
              <option value="">Division</option>
              {sections.map(s => <option key={s} value={s}>Division {s}</option>)}
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">Holistic Status</option>
              <option value="on_track">On Track</option>
              <option value="at_risk">At Risk</option>
            </select>
            <button className="avs-filter-btn" onClick={fetchStudents} title="Fetch Students">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </section>

        {/* Data Table Container */}
        <section className="avs-table-container">
          <div className="avs-table-overflow">
            <table className="avs-table">
              <thead>
                <tr>
                  <th className="w-16">Sr. No.</th>
                  <th>Student</th>
                  <th>Academic Details</th>
                  <th>Holistic Progress</th>
                  <th>Mentor</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="avs-status-msg">Loading student records...</td></tr>
                ) : error ? (
                  <tr><td colSpan="6" className="avs-status-msg error-text">{error}</td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan="6" className="avs-status-msg">No students found. Apply filters and fetch.</td></tr>
                ) : (
                  students.map((student, index) => {
                    const points = student.total_points || 0;
                    const status = points < 40 ? 'At Risk' : points >= 80 ? 'Excellent' : 'On Track';
                    const statusClass = points < 40 ? 'badge-danger' : points >= 80 ? 'badge-excellent' : 'badge-safe';

                    return (
                      <tr key={index}>
                        <td className="avs-id-cell">0{index + 1}</td>
                        <td>
                          <div className="avs-student-cell">
                            <div className="avs-avatar-wrapper">
                              {/* Placeholder Image or Initials */}
                              <div className="avs-avatar-initials bg-primary-light text-primary">
                                {student.s_name ? student.s_name.substring(0, 2).toUpperCase() : "ST"}
                              </div>
                            </div>
                            <div>
                              <p className="avs-name">{student.s_name}</p>
                              <p className="avs-roll">ENROLLED</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avs-academic-cell">
                            <p className="avs-branch">{student.s_branch}</p>
                            <p className="avs-sub-details">Batch {student.s_batch || "-"} • Sem {student.s_sem} • Div {student.s_csec}</p>
                          </div>
                        </td>
                        <td>
                          <div className="avs-progress-cell">
                            <CircularProgress points={points} />
                            <span className={`avs-status-pill ${statusClass}`}>{status}</span>
                          </div>
                        </td>
                        <td>
                          <div className="avs-mentor-cell">
                            <div className={`avs-dot ${points < 40 ? 'bg-error' : 'bg-secondary'}`}></div>
                            <p>Assigned Faculty</p>
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="avs-action-cell">
                            <button className="avs-btn-view" onClick={() => navigate(`/student-profile/${student.id}`, { state: student })}>View Profile</button>
                            <button className="avs-btn-more"><span className="material-symbols-outlined">more_vert</span></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!loading && !error && students.length > 0 && (
            <div className="avs-pagination">
              <p>Showing <span>1-{students.length}</span> of <span>{students.length}</span> Students</p>
              <div className="avs-page-controls">
                <button disabled><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="active">1</button>
                <button><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default AdViewStudents;