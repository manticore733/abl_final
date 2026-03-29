import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import MNavbar from "../../Components/MentorC/MNavbar";
import { useToast } from "../../Components/ToastContext";
import "./css/StudentDetails.css";
import defaultAvatar from "../../assets/pfp_icon.jpg";

const StudentDetails = () => {
  const { id: s_id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // State
  const [pendingActivities, setPendingActivities] = useState([]);
  const [processedActivities, setProcessedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  // Tab & Filter State
  const [activeTab, setActiveTab] = useState("pending"); // pending, approved, rejected, all
  const [searchQuery, setSearchQuery] = useState("");

  // ---> THESE WERE MISSING! <---
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Custom Modal State
  const [openModal, setOpenModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectActivityId, setRejectActivityId] = useState(null);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const studentRes = await axios.get(`http://localhost:5000/api/mentor/getstudentdetails/${s_id}`);
      setStudent(studentRes.data);
    } catch (error) {
      showToast('error', 'Error', 'Failed to fetch student details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();

    const fetchActivities = async () => {
      setLoading(true);
      try {
        const [pendingRes, processedRes] = await Promise.allSettled([
          axios.get(`http://localhost:5000/api/mentor/student-pending-activities/${s_id}`),
          axios.get(`http://localhost:5000/api/mentor/student-processed-activities/${s_id}`),
        ]);

        if (pendingRes.status === "fulfilled") setPendingActivities(pendingRes.value.data);
        if (processedRes.status === "fulfilled") setProcessedActivities(processedRes.value.data);
      } catch (error) {
        showToast('error', 'Error', 'Failed to load activities.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [s_id, showToast]);

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, filterType, filterCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterType("");
    setFilterCategory("");
    setActiveTab("pending");
  };

  // --- Data Processing for Tabs ---
  let currentDataset = [];
  if (activeTab === "pending") currentDataset = pendingActivities;
  else if (activeTab === "approved") currentDataset = processedActivities.filter(a => a.status === "Approved");
  else if (activeTab === "rejected") currentDataset = processedActivities.filter(a => a.status === "Rejected");
  else if (activeTab === "all") currentDataset = [...pendingActivities, ...processedActivities];

  // Updated filter logic to include the dropdowns
  const filteredData = currentDataset.filter(act => {
    const matchesSearch = act.event_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.subcategory?.toLowerCase().includes(searchQuery.toLowerCase());

    // Match type/category if a filter is selected, otherwise return true
    const matchesType = filterType ? act.event_type === filterType : true;

    // Using subcategory as 'Category' here, adjust if your DB uses a different field
    const matchesCategory = filterCategory ? act.subcategory?.includes(filterCategory) : true;

    return matchesSearch && matchesType && matchesCategory;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // --- Actions ---
  const handleApprove = async (activityId) => {
    try {
      await axios.put(`http://localhost:5000/api/mentor/approve-activity/${activityId}`);
      showToast('success', 'Activity Approved', 'The activity has been successfully approved.');

      setPendingActivities((prev) => prev.filter((act) => act.id !== activityId));
      setProcessedActivities((prev) => [
        { ...pendingActivities.find((act) => act.id === activityId), status: "Approved" },
        ...prev
      ]);
      fetchStudentData();
    } catch (err) {
      showToast('error', 'Approval Failed', 'An error occurred while approving.');
    }
  };

  const handleApproveAll = async () => {
    if (pendingActivities.length === 0) return showToast('info', 'No Pending Items', 'There are no activities to approve.');
    // Implementing a bulk approve would require a specific backend endpoint. 
    showToast('info', 'Feature Coming Soon', 'Bulk approval is being configured.');
  };

  const handleRejectClick = (activityId) => {
    setRejectActivityId(activityId);
    setRejectReason("");
    setOpenModal(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      showToast('error', 'Reason Required', 'Please provide a reason for rejection.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/mentor/reject-activity/${rejectActivityId}`, {
        rejectionReason: rejectReason,
      });
      showToast('success', 'Activity Rejected', 'The activity has been rejected and student notified.');

      setPendingActivities((prev) => prev.filter((act) => act.id !== rejectActivityId));
      setProcessedActivities((prev) => [
        { ...pendingActivities.find((act) => act.id === rejectActivityId), status: "Rejected", remarks: rejectReason },
        ...prev
      ]);
      setOpenModal(false);
      fetchStudentData();
    } catch (err) {
      showToast('error', 'Rejection Failed', 'An error occurred while rejecting.');
    }
  };

  const handleUndo = async (activityId) => {
    try {
      await axios.put(`http://localhost:5000/api/mentor/undo-activity/${activityId}`);
      showToast('info', 'Action Undone', 'The activity has been moved back to Pending.');

      setProcessedActivities((prev) => prev.filter((act) => act.id !== activityId));
      setPendingActivities((prev) => [
        { ...processedActivities.find((act) => act.id === activityId), status: "Pending" },
        ...prev,
      ]);
      fetchStudentData();
    } catch (err) {
      showToast('error', 'Undo Failed', 'An error occurred while undoing the action.');
    }
  };

  return (
    <div className="sd-page-wrapper">
      <MNavbar />

      <main className="sd-main-content">

        {/* Breadcrumb Navigation */}
        <nav className="sd-breadcrumb">
          <Link to="/view-students">Student Roster</Link>
          <span className="material-symbols-outlined">chevron_right</span>
          <span>Profile</span>
          <span className="material-symbols-outlined">chevron_right</span>
          <span className="sd-current-crumb">{student?.name || "Loading..."}</span>
        </nav>

        <div className="sd-container">

          {/* 1. Hero Profile Card */}
          {student && (
            <section className="sd-hero-card editorial-shadow">
              <div className="sd-hero-bg-accent"></div>

              <div className="sd-identity-group">
                <div className="sd-avatar-container">
                  <img src={student.profile_picture || defaultAvatar} alt={student.name} />
                  <div className="sd-status-badge">ACTIVE</div>
                </div>

                <div className="sd-identity-info">
                  <h2>{student.name}</h2>
                  <p className="sd-degree-text">{student.department ? `B.Tech ${student.department}` : "Engineering Department"}</p>
                  <div className="sd-badge-row">
                    <span className="sd-pill-credits">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                      {student.total_credits} Credits Earned
                    </span>
                    <span className="sd-pill-dean">Dean's List Candidate</span>
                  </div>
                </div>
              </div>

              {/* Secondary Info Grid */}
              <div className="sd-info-grid glass-effect">
                <div className="sd-info-item">
                  <label>Batch</label>
                  <p>{student.batch || "N/A"}</p>
                </div>
                <div className="sd-info-item">
                  <label>Roll Number</label>
                  <p>{student.s_username}</p>
                </div>
                <div className="sd-info-item">
                  <label>Division</label>
                  <p>{student.division || "N/A"}</p>
                </div>
                <div className="sd-info-item">
                  <label>Year</label>
                  <p>FE</p>
                </div>
                <div className="sd-info-item">
                  <label>Semester</label>
                  <p>Sem {student.semester}</p>
                </div>
                <div className="sd-info-item">
                  <label>Department</label>
                  <p>{student.department}</p>
                </div>
              </div>
            </section>
          )}

          {/* 2. Activity Approval Queue */}
          <section className="sd-queue-section">
            <div className="sd-queue-header">
              <div>
                <h3>Activity Approval Queue</h3>
                <p>Review and validate student activity submissions for credit allocation.</p>
              </div>
              <button className="sd-btn-approve-all" onClick={handleApproveAll}>
                <span className="material-symbols-outlined">done_all</span> Approve All Pending
              </button>
            </div>

            {/* Tabs */}
            <div className="sd-tabs">
              <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
                Pending Approvals ({pendingActivities.length})
              </button>
              <button className={activeTab === 'approved' ? 'active' : ''} onClick={() => setActiveTab('approved')}>
                Approved ({processedActivities.filter(a => a.status === 'Approved').length})
              </button>
              <button className={activeTab === 'rejected' ? 'active' : ''} onClick={() => setActiveTab('rejected')}>
                Rejected ({processedActivities.filter(a => a.status === 'Rejected').length})
              </button>
              <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
                All Activities
              </button>
            </div>

            {/* Filters */}
            <div className="sd-filters">
              <div className="sd-filters-left">
                <div className="sd-search-box">
                  <span className="material-symbols-outlined">search</span>
                  <input
                    type="text"
                    placeholder="Search activity by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* New Activity Type Dropdown */}
                <div className="sd-dropdown-wrapper">
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">Activity Type</option>
                    <option value="Technical">Technical</option>
                    <option value="Social">Social</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>

                {/* New Category Dropdown */}
                <div className="sd-dropdown-wrapper">
                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">Category</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Certification">Certification</option>
                  </select>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>

              <button className="sd-btn-reset" onClick={handleResetFilters}>
                <span className="material-symbols-outlined">restart_alt</span> Reset Filters
              </button>
            </div>

            {/* Data Table */}
            <div className="sd-table-card editorial-shadow">
              <table className="sd-table">
                <thead>
                  <tr>
                    <th>Activity Name</th>
                    <th>Category</th>
                    <th>Participation Date</th>
                    <th>Venue</th>
                    <th className="text-center">Points</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="sd-empty-state">No activities found in this category.</td>
                    </tr>
                  ) : (
                    paginatedData.map((act) => (
                      <tr key={act.id}>
                        <td className="sd-td-main">
                          <span className="sd-act-title">{act.event_name}</span>
                          <span className="sd-act-sub">{act.subcategory || act.event_type}</span>
                        </td>
                        <td><span className={`sd-cat-pill cat-${act.event_type?.toLowerCase()}`}>{act.event_type}</span></td>
                        <td className="sd-td-text">{act.participation_date}</td>
                        <td className="sd-td-text">{act.venue || "N/A"}</td>
                        <td className="text-center"><span className="sd-pts-val">{act.allocated_points}</span></td>
                        <td className="text-right">
                          <div className="sd-actions-flex">
                            {act.status === "Pending" ? (
                              <>
                                <button className="sd-btn-reject" onClick={() => handleRejectClick(act.id)}>
                                  <span className="material-symbols-outlined">close</span> Reject
                                </button>
                                <button className="sd-btn-approve" onClick={() => handleApprove(act.id)}>
                                  <span className="material-symbols-outlined">check</span> Approve
                                </button>
                              </>
                            ) : (
                              <div className="sd-processed-action">
                                <span className={`sd-status-text ${act.status === 'Approved' ? 'text-success' : 'text-error'}`}>
                                  {act.status}
                                </span>
                                <button className="sd-btn-undo" onClick={() => handleUndo(act.id)}>
                                  <span className="material-symbols-outlined">undo</span> Undo
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Custom Pagination */}
            {totalPages > 1 && (
              <div className="sd-pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="sd-page-indicator">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Floating Action Button */}
      <button className="sd-fab" title="Send Feedback">
        <span className="material-symbols-outlined">chat_bubble</span>
      </button>

      {/* Custom Rejection Modal */}
      {openModal && (
        <div className="sd-modal-overlay">
          <div className="sd-modal-box">
            <div className="sd-modal-header">
              <div className="sd-modal-icon"><span className="material-symbols-outlined">error</span></div>
              <h3>Reject Activity</h3>
            </div>
            <p className="sd-modal-desc">Please provide a reason for rejecting this submission. The student will be notified.</p>
            <textarea
              className="sd-modal-textarea"
              placeholder="e.g., Invalid certificate, missing details..."
              rows="4"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="sd-modal-actions">
              <button className="sd-btn-cancel" onClick={() => setOpenModal(false)}>Cancel</button>
              <button className="sd-btn-confirm-reject" onClick={handleRejectConfirm}>Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="sh-footer">
        <div className="sh-footer-content">
          <div><p className="sh-copyright">© 2024 Scholar Pulse University. All rights reserved.</p></div>
          <div className="sh-footer-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDetails;