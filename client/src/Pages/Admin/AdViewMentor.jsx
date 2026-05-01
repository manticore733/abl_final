import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import { getMentorsByBranch, deleteMentor, incrementSemester } from "../../api/adminApi";
import "./css/AdViewMentor.css";

const AdViewMentor = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [mentorData, setMentorData] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dropdown Arrays
  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];
  const divisions = ["A", "B", "C"];
  const batches = ["1", "2", "3", "4"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // --- API FETCH ---
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMentorsByBranch(selectedBranch);
        setMentorData(data);
        setFilteredMentors(data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to fetch mentors. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [selectedBranch]);

  // --- FRONTEND FILTERING ---
  useEffect(() => {
    let filtered = mentorData;
    if (selectedDivision) filtered = filtered.filter((m) => m.m_csec === selectedDivision);
    if (selectedYear) filtered = filtered.filter((m) => m.year_of_joining?.toString().includes(selectedYear));
    if (selectedBatch) filtered = filtered.filter((m) => m.m_batch === selectedBatch);
    if (selectedSemester) filtered = filtered.filter((m) => m.m_sem?.toString() === selectedSemester);

    setFilteredMentors(filtered);
  }, [selectedDivision, selectedYear, selectedBatch, selectedSemester, mentorData]);

  // --- ACTIONS ---
  const handleDelete = async (m_id) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;
    try {
      await deleteMentor(m_id);
      setMentorData(mentorData.filter((mentor) => mentor.m_id !== m_id));
    } catch (error) {
      console.error("Error deleting mentor:", error);
      alert("Failed to delete mentor.");
    }
  };

  const handleIncrementSemester = async (m_id, currentSemester) => {
    if (currentSemester >= 8) {
      alert("Mentor is already at the maximum semester.");
      return;
    }
    try {
      const updatedMentor = await incrementSemester(m_id);
      setMentorData(
        mentorData.map((mentor) =>
          mentor.m_id === m_id ? { ...mentor, m_sem: updatedMentor.m_sem } : mentor
        )
      );
    } catch (error) {
      console.error("Error incrementing semester:", error);
      alert("Failed to increment semester.");
    }
  };

  // Route to AddMentor page with data attached!
  const handleEdit = (mentor) => {
    navigate('/add-mentor', { state: { editMode: true, mentorDetails: mentor } });
  };

  return (
    <div className="avm-page-wrapper">
      <AdNavbar />

      <main className="avm-main-content">

        {/* Header Section */}
        <div className="avm-header-section">
          <nav className="avm-breadcrumbs">
            <span>Dashboard</span>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className="current">Mentors</span>
          </nav>
          <div className="avm-header-flex">
            <div>
              <h1>Mentor Roster</h1>
              <p>Comprehensive management of faculty advisors and academic mentorship.</p>
            </div>
            <button className="avm-btn-primary" onClick={() => navigate('/add-mentor')}>
              <span className="material-symbols-outlined">person_add</span> Add New Mentor
            </button>
          </div>
        </div>

        {/* Analytical Filter Bar */}
        <section className="avm-filter-bar">
          <div className="avm-filter-group flex-1">
            <label>Department</label>
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
              <option value="all">All Departments</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="avm-filter-group w-32">
            <label>Batch</label>
            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
              <option value="">All</option>
              {batches.map(b => <option key={b} value={b}>Batch {b}</option>)}
            </select>
          </div>
          <div className="avm-filter-group w-32">
            <label>Division</label>
            <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
              <option value="">All</option>
              {divisions.map(d => <option key={d} value={d}>Div {d}</option>)}
            </select>
          </div>
          <div className="avm-filter-group w-40">
            <label>Year of Joining</label>
            <input
              type="text"
              placeholder="e.g. 2023"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="avm-year-input"
            />
          </div>
          <div className="avm-filter-group w-32">
            <label>Semester</label>
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              <option value="">All</option>
              {semesters.map(s => <option key={s} value={s}>Sem {s}</option>)}
            </select>
          </div>
          <div className="avm-filter-action">
            <button className="avm-btn-filter" title="Clear Filters" onClick={() => {
              setSelectedBranch('all'); setSelectedBatch(''); setSelectedDivision(''); setSelectedYear(''); setSelectedSemester('');
            }}>
              <span className="material-symbols-outlined">filter_list_off</span>
            </button>
          </div>
        </section>

        {/* Data Table Container */}
        <div className="avm-table-container">
          {loading ? (
            <div className="avm-loading">Loading roster data...</div>
          ) : error ? (
            <div className="avm-error">{error}</div>
          ) : (
            <table className="avm-table">
              <thead>
                <tr>
                  <th className="w-16">S.No</th>
                  <th>Mentor Name</th>
                  <th>Department</th>
                  <th>Academics</th>
                  <th>Joined</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentors.length === 0 ? (
                  <tr><td colSpan="6" className="avm-empty">No mentors found matching your criteria.</td></tr>
                ) : (
                  filteredMentors.map((mentor, index) => (
                    <tr key={mentor.m_id || index}>
                      <td className="avm-text-sub font-bold text-center">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td>
                        <div className="avm-mentor-cell">
                          {/* Fallback to Initials if no profile pic exists */}
                          {mentor.profile_pic ? (
                            <img src={`http://localhost:5000/${mentor.profile_pic.replace("\\", "/")}`} alt="Profile" className="avm-avatar" />
                          ) : (
                            <div className="avm-avatar-initials bg-primary-light text-primary">
                              {mentor.m_name ? mentor.m_name.substring(0, 2).toUpperCase() : "M"}
                            </div>
                          )}
                          <div>
                            <strong>{mentor.m_name}</strong>
                            <span className="avm-mentor-role">{mentor.m_designation || "Faculty"}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="avm-dept-text">{mentor.m_branch}</span>
                      </td>
                      <td>
                        <div className="avm-academics-cell">
                          <span className="avm-badge bg-gray">Batch {mentor.m_batch}</span>
                          <span className="avm-badge bg-gray">Div {mentor.m_csec}</span>
                          <span className="avm-badge bg-blue-light text-blue">Sem {mentor.m_sem}</span>
                        </div>
                      </td>
                      <td className="font-medium text-on-surface">
                        {mentor.year_of_joining}
                      </td>
                      <td className="text-right">
                        <div className="avm-action-btns">
                          <button className="btn-upgrade" title="Increment Semester" onClick={() => handleIncrementSemester(mentor.m_id, mentor.m_sem)}>
                            <span className="material-symbols-outlined">arrow_upward</span>
                          </button>
                          <button className="btn-edit" title="Edit Mentor" onClick={() => handleEdit(mentor)}>
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button className="btn-delete" title="Delete Mentor" onClick={() => handleDelete(mentor.m_id)}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Pagination Footer */}
          {!loading && !error && filteredMentors.length > 0 && (
            <div className="avm-pagination">
              <p>Showing 1-{filteredMentors.length} of {mentorData.length} Mentors</p>
              <div className="avm-page-controls">
                <button disabled><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="active">1</button>
                <button disabled><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default AdViewMentor;