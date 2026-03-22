import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Pagination } from "@mui/material";
import MNavbar from "../../Components/MentorC/MNavbar";
import {
  Search,
  CheckCircle,
  XCircle,
  Undo,
  ArrowLeft,
  User,
  GraduationCap,
  Award,
  Hash
} from "lucide-react";
import "./css/StudentDetails.css";
import defaultAvatar from "../../assets/pfp_icon.jpg";

const StudentDetails = () => {
  const { id: s_id } = useParams();
  const navigate = useNavigate();

  // State for activities
  const [pendingActivities, setPendingActivities] = useState([]);
  const [processedActivities, setProcessedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for student info
  const [student, setStudent] = useState(null);

  // Reject Modal
  const [openModal, setOpenModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectActivityId, setRejectActivityId] = useState(null);

  // Pagination & Search States
  const ITEMS_PER_PAGE = 5;
  const [pendingPage, setPendingPage] = useState(1);
  const [processedPage, setProcessedPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const studentRes = await axios.get(
        `http://localhost:5000/api/mentor/getstudentdetails/${s_id}`
      );
      setStudent(studentRes.data);
    } catch (error) {
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData(); // Fetch student details on load

    const fetchActivities = async () => {
      setLoading(true);
      setError("");

      try {
        const [pendingRes, processedRes] = await Promise.allSettled([
          axios.get(`http://localhost:5000/api/mentor/student-pending-activities/${s_id}`),
          axios.get(`http://localhost:5000/api/mentor/student-processed-activities/${s_id}`),
        ]);

        if (pendingRes.status === "fulfilled") {
          setPendingActivities(pendingRes.value.data);
        } else {
          setPendingActivities([]);
        }

        if (processedRes.status === "fulfilled") {
          setProcessedActivities(processedRes.value.data);
        } else if (processedRes.reason.response?.status === 404) {
          setProcessedActivities([]);
        }
      } catch (error) {
        setError("Something went wrong while loading activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [s_id]);

  // Derived Derived state for Search and Pagination
  const filteredProcessed = processedActivities.filter(act =>
    act.event_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset page when search changes
  useEffect(() => {
    setProcessedPage(1);
  }, [searchQuery]);

  const pendingStart = (pendingPage - 1) * ITEMS_PER_PAGE;
  const paginatedPending = pendingActivities.slice(pendingStart, pendingStart + ITEMS_PER_PAGE);

  const processedStart = (processedPage - 1) * ITEMS_PER_PAGE;
  const paginatedProcessed = filteredProcessed.slice(processedStart, processedStart + ITEMS_PER_PAGE);


  // Action: Approve
  const handleApprove = async (activityId) => {
    if (!window.confirm("Are you sure you want to approve this activity?")) return;

    try {
      await axios.put(`http://localhost:5000/api/mentor/approve-activity/${activityId}`);

      setPendingActivities((prev) => prev.filter((act) => act.id !== activityId));
      setProcessedActivities((prev) => [
        { ...pendingActivities.find((act) => act.id === activityId), status: "Approved" },
        ...prev
      ]);

      fetchStudentData(); // Refresh total credits
    } catch (err) {
      console.error("Error approving activity:", err);
    }
  };

  // Action: Reject (Open Modal)
  const handleRejectClick = (activityId) => {
    setRejectActivityId(activityId);
    setOpenModal(true);
  };

  // Confirm Reject
  const handleRejectConfirm = async () => {
    if (!rejectReason) {
      alert("Please enter a rejection reason.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/mentor/reject-activity/${rejectActivityId}`, {
        rejectionReason: rejectReason,
      });

      setPendingActivities((prev) => prev.filter((act) => act.id !== rejectActivityId));
      setProcessedActivities((prev) => [
        { ...pendingActivities.find((act) => act.id === rejectActivityId), status: "Rejected", remarks: rejectReason },
        ...prev
      ]);

      setOpenModal(false);
      setRejectReason("");
      fetchStudentData();
    } catch (err) {
      console.error("Error rejecting activity:", err);
    }
  };

  // Action: Undo
  const handleUndo = async (activityId) => {
    if (!window.confirm("Are you sure you want to undo this action?")) return;

    try {
      await axios.put(`http://localhost:5000/api/mentor/undo-activity/${activityId}`);

      setProcessedActivities((prev) => prev.filter((act) => act.id !== activityId));
      setPendingActivities((prev) => [
        ...prev,
        { ...processedActivities.find((act) => act.id === activityId), status: "Pending" },
      ]);

      fetchStudentData();
    } catch (err) {
      console.error("Error undoing activity:", err);
    }
  };

  return (
    <div className="mentor-page-wrapper">
      <MNavbar />

      {/* 1. Header Banner */}
      <div className="page-header-banner case-header-banner">
        <button className="back-nav-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back to Roster
        </button>
        <h2>Student Verification Profile</h2>
        <p>Review and validate activity submissions for this student</p>
      </div>

      <div className="mentor-main-container student-case-container">
        {loading ? (
          <div className="loading-state">Loading student data...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <>
            {/* 2. Premium Student Profile Card */}
            {student && (
              <div className="ms-profile-card">
                <div className="ms-profile-header-bg"></div>
                <div className="ms-profile-content">
                  <div className="ms-avatar-wrapper">
                    <img src={student.profile_picture || defaultAvatar} alt={student.name} className="ms-avatar-img" />
                  </div>
                  <div className="ms-info-section">
                    <div className="ms-name-block">
                      <h3>{student.name}</h3>
                      <span className="ms-batch-tag">Batch {student.batch}</span>
                    </div>

                    <div className="ms-stats-grid">
                      <div className="ms-stat-item">
                        <User size={18} className="ms-icon" />
                        <div>
                          <label>Roll Number</label>
                          <span>{student.s_username}</span>
                        </div>
                      </div>
                      <div className="ms-stat-item">
                        <GraduationCap size={18} className="ms-icon" />
                        <div>
                          <label>Department / Div</label>
                          <span>{student.department} • {student.division}</span>
                        </div>
                      </div>
                      <div className="ms-stat-item">
                        <Hash size={18} className="ms-icon" />
                        <div>
                          <label>Year / Sem</label>
                          <span>FE • Sem {student.semester}</span>
                        </div>
                      </div>
                      <div className="ms-stat-item highlight-stat">
                        <Award size={20} className="ms-icon" />
                        <div>
                          <label>Total Credits Earned</label>
                          <span className="credits-val">{student.total_credits} Pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Pending Activities Table */}
            <div className="section-flex-header">
              <h3>Pending Verifications
                <span className="count-badge pending-count">{pendingActivities.length}</span>
              </h3>
            </div>
            <div className="modern-table-card">
              <div className="table-responsive-wrapper">
                <table className="modern-roster-table ms-activity-table">
                  <thead>
                    <tr>
                      <th style={{ width: '6%' }}>No</th>
                      <th style={{ width: '24%' }}>Event Details</th>
                      <th style={{ width: '15%' }}>Category</th>
                      <th style={{ width: '15%' }}>Date & Venue</th>
                      <th style={{ width: '10%' }}>Organized By</th>
                      <th style={{ width: '8%' }}>Pts</th>
                      <th style={{ width: '22%' }} className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPending.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-table-cell">No pending activities requiring verification.</td>
                      </tr>
                    ) : (
                      paginatedPending.map((act, index) => (
                        <tr key={act.id}>
                          <td className="sr-no-cell">{pendingStart + index + 1}</td>
                          <td>
                            <div className="event-name-primary">{act.event_name}</div>
                            <div className="event-type-sub">{act.event_type}</div>
                          </td>
                          <td>{act.subcategory}</td>
                          <td>
                            <div className="td-stack">
                              <span>{act.participation_date}</span>
                              <span className="td-subtext">{act.venue}</span>
                            </div>
                          </td>
                          <td>{act.organised_by}</td>
                          <td className="points-cell">{act.allocated_points}</td>
                          <td className="action-cell flex-actions">
                            <button className="action-pill-btn approve-btn" onClick={() => handleApprove(act.id)}>
                              <CheckCircle size={16} /> Approve
                            </button>
                            <button className="action-pill-btn reject-btn" onClick={() => handleRejectClick(act.id)}>
                              <XCircle size={16} /> Reject
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {pendingActivities.length > ITEMS_PER_PAGE && (
                <div className="pagination-wrapper">
                  <Pagination
                    count={Math.ceil(pendingActivities.length / ITEMS_PER_PAGE)}
                    page={pendingPage}
                    onChange={(e, val) => setPendingPage(val)}
                    color="primary"
                  />
                </div>
              )}
            </div>

            {/* 4. Processed Activities Table */}
            <div className="section-flex-header" style={{ marginTop: '3rem' }}>
              <h3>Activity History
                <span className="count-badge processed-count">{filteredProcessed.length}</span>
              </h3>
              <div className="search-input-wrapper small-search">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="roster-search-input"
                  placeholder="Search past activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="modern-table-card">
              <div className="table-responsive-wrapper">
                <table className="modern-roster-table ms-activity-table">
                  <thead>
                    <tr>
                      <th style={{ width: '5%' }}>No</th>
                      <th style={{ width: '20%' }}>Event Details</th>
                      <th style={{ width: '12%' }}>Date</th>
                      <th style={{ width: '6%' }}>Pts</th>
                      <th style={{ width: '12%' }}>Status</th>
                      <th style={{ width: '30%' }}>Remarks</th>
                      <th style={{ width: '15%' }} className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProcessed.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-table-cell">No history found matching "{searchQuery}"</td>
                      </tr>
                    ) : (
                      paginatedProcessed.map((act, index) => (
                        <tr key={act.id}>
                          <td className="sr-no-cell">{processedStart + index + 1}</td>
                          <td>
                            <div className="event-name-primary">{act.event_name}</div>
                            <div className="event-type-sub">{act.subcategory}</div>
                          </td>
                          <td>{act.participation_date}</td>
                          <td className="points-cell">{act.allocated_points}</td>
                          <td>
                            <span className={`status-pill ${act.status === 'Approved' ? 'pill-success' : 'pill-danger'}`}>
                              {act.status}
                            </span>
                          </td>
                          <td className="remarks-cell">{act.remarks || "—"}</td>
                          <td className="action-cell text-right">
                            <button className="action-pill-btn undo-btn" onClick={() => handleUndo(act.id)}>
                              <Undo size={16} /> Undo
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {filteredProcessed.length > ITEMS_PER_PAGE && (
                <div className="pagination-wrapper">
                  <Pagination
                    count={Math.ceil(filteredProcessed.length / ITEMS_PER_PAGE)}
                    page={processedPage}
                    onChange={(e, val) => setProcessedPage(val)}
                    color="primary"
                    shape="rounded"
                  />
                </div>
              )}
            </div>

            {/* 5. Reject Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)} className="custom-reject-modal">
              <div className="reject-modal-box">
                <div className="rmodal-header">
                  <div className="rmodal-icon"><XCircle size={24} /></div>
                  <h3>Reject Activity</h3>
                </div>
                <p className="rmodal-sub">Please provide a reason for rejecting this submission.</p>
                <textarea
                  className="rmodal-textarea"
                  placeholder="e.g., Invalid certificate, missing details..."
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className="rmodal-actions">
                  <button className="rmodal-cancel" onClick={() => setOpenModal(false)}>Cancel</button>
                  <button className="rmodal-confirm" onClick={handleRejectConfirm}>Confirm Rejection</button>
                </div>
              </div>
            </Modal>

          </>
        )}
      </div>

      <footer className="mentor-footer">
        <p>© {new Date().getFullYear()} FCRIT ABL Portal</p>
      </footer>
    </div>
  );
};

export default StudentDetails;
