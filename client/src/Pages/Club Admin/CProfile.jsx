import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import "../Club Admin/css/CProfile.css";
import CAdEditProfile from './CAdEditProfile';

const CProfile = () => {
  const navigate = useNavigate();
  const rollNumber = sessionStorage.getItem("username");

  // --- STATE ---
  const [currentView, setCurrentView] = useState("main"); // SPA foundation
  const [clubAdmin, setClubAdmin] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [page, setPage] = useState(0);
  const EVENTS_PER_PAGE = 4;

  // --- API CALLS ---
  const fetchClubAdmin = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`);
      setClubAdmin(response.data);
    } catch (error) {
      console.error("Error fetching club admin details:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rollNumber) {
      fetchClubAdmin();
      fetchEvents();
    }
  }, [rollNumber]);

  // --- ACTIONS ---
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/clubadmin/events/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const handleEditEventClick = (event) => {
    // Route to CAddEvents and pass the data so it opens in "Edit Mode"
    navigate('/cadd-events', { state: { editMode: true, eventDetails: event } });
  };

  // Pagination Handlers
  const handleNextPage = () => { if ((page + 1) * EVENTS_PER_PAGE < events.length) setPage(page + 1); };
  const handlePrevPage = () => { if (page > 0) setPage(page - 1); };

  // --- HELPERS ---
  const getStatusDisplay = (statusStr, startDate, endDate) => {
    // Fallback logic if event_status isn't strictly defined
    const today = new Date().toISOString().split("T")[0];
    let status = statusStr ? statusStr.toUpperCase() : "PENDING";
    if (endDate && endDate < today) status = "COMPLETED";
    else if (startDate && startDate <= today && endDate >= today) status = "ACTIVE";

    switch (status) {
      case "ACTIVE": return { label: "ACTIVE", color: "blue" };
      case "COMPLETED": return { label: "COMPLETED", color: "primary" };
      default: return { label: "PENDING", color: "outline" };
    }
  };

  // ==========================================
  // RENDER: MAIN CONSOLE VIEW
  // ==========================================
  if (currentView === "main") {
    return (
      <div className="cap-page-wrapper">
        <CAdNavbar />

        <main className="cap-main-content">
          {/* Header */}
          <div className="cap-header-section">
            <h2>The Power Administrator</h2>
            <p>Precision control over institutional growth, member engagement, and academic excellence.</p>
          </div>

          {loading ? (
            <div className="cap-loading">Loading administrative console...</div>
          ) : (
            <>
              {/* Top Row: Identity & Impact */}
              <div className="cap-top-grid">

                {/* 1. Admin Profile Card */}
                <div className="cap-card cap-profile-card">
                  <div className="cap-avatar-wrapper">
                    <img
                      src={clubAdmin?.profile_picture ? `http://localhost:5000/${clubAdmin.profile_picture.replace("\\", "/")}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuBVNQb2Hf-Geye0Zp_EmrrO2eJ8DRcTNgoujhv2EfvID_QgInzrYory1UsdnbMhc9__f5f6APWcPBiu7EGJ8nAsQ4hU5gfR3simJwnmH-sjkrPcyVqTBByw4IVxr0ALzJ-coUsrJOJr4m1r5rc0tMcuzMb_06KygyVdmXZNHf0rZNeyDuADjPMvafk91ODsoFKDRJPNvXN_unAO6uVbYkWCEYYocyx0Lbpzu3LDt85LTpUua09m4uX4NuAS8EmstAKBHA0o5IthpG4"}
                      alt="Admin Avatar"
                    />
                  </div>
                  <h3>{clubAdmin?.name || "Admin Name"}</h3>
                  <p className="cap-role">Head of Operations • {clubAdmin?.club_name || "Club"}</p>

                  <div className="cap-stats-list">
                    <div className="cap-stat-row">
                      <span>Events Managed</span>
                      <span className="cap-val-primary">{events.length}</span>
                    </div>
                    <div className="cap-progress-bar"><div className="cap-progress-fill" style={{ width: '85%' }}></div></div>
                    <div className="cap-stat-row mt-3">
                      <span>Member Growth</span>
                      <span className="cap-val-secondary">+24%</span>
                    </div>
                  </div>

                  <button className="cap-btn-gradient w-full mt-6" onClick={() => setCurrentView('edit_profile')}>
                    Update Credentials
                  </button>
                </div>

                {/* 2. Biography & Impact */}
                <div className="cap-card cap-impact-card">
                  <div className="cap-impact-bg-circle"></div>
                  <div className="cap-impact-content">
                    <div className="cap-pill-legacy">
                      <span className="material-symbols-outlined">star</span> Legacy Impact
                    </div>
                    <h3>The Digital Transformation Lead</h3>
                    <p>
                      Spearheading the university initiatives, {clubAdmin?.name?.split(' ')[0] || "this admin"} has successfully managed
                      multiple events in the automated academic ecosystem. By focusing on data-driven decision making and
                      student engagement metrics, administrative overhead was reduced significantly.
                    </p>
                    <div className="cap-impact-kpis">
                      <div className="cap-kpi-box">
                        <label>Efficiency</label>
                        <p>94%</p>
                      </div>
                      <div className="cap-kpi-box">
                        <label>Impact Score</label>
                        <p>8.9</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Expertise Matrix */}
                <div className="cap-card cap-skills-card">
                  <h3>Expertise Matrix</h3>
                  <div className="cap-skills-list">
                    <div className="cap-skill-item">
                      <div className="cap-skill-lbl"><span>Strategic Planning</span><span className="text-primary">Advanced</span></div>
                      <div className="cap-skill-track">
                        <div className="cap-skill-fill bg-primary"></div><div className="cap-skill-fill bg-primary"></div><div className="cap-skill-fill bg-primary"></div><div className="cap-skill-fill bg-gray"></div>
                      </div>
                    </div>
                    <div className="cap-skill-item">
                      <div className="cap-skill-lbl"><span>Data Analysis</span><span className="text-secondary">Expert</span></div>
                      <div className="cap-skill-track">
                        <div className="cap-skill-fill bg-secondary"></div><div className="cap-skill-fill bg-secondary"></div><div className="cap-skill-fill bg-secondary"></div><div className="cap-skill-fill bg-secondary"></div>
                      </div>
                    </div>
                    <div className="cap-skill-item">
                      <div className="cap-skill-lbl"><span>Conflict Mgmt</span><span className="text-tertiary">Senior</span></div>
                      <div className="cap-skill-track">
                        <div className="cap-skill-fill bg-tertiary"></div><div className="cap-skill-fill bg-tertiary"></div><div className="cap-skill-fill bg-tertiary"></div><div className="cap-skill-fill bg-gray"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Half: Events Console */}
              <section className="cap-console-section">
                <div className="cap-console-header">
                  <div>
                    <h3>Events Management Console</h3>
                    <p>Real-time oversight of all active and upcoming academic engagements.</p>
                  </div>
                  <div className="cap-console-actions">
                    <button className="cap-btn-outline"><span className="material-symbols-outlined">download</span> Export Report</button>
                    <button className="cap-btn-primary" onClick={() => navigate('/cadd-events')}><span className="material-symbols-outlined">add</span> Create Event</button>
                  </div>
                </div>

                {/* Robust Filter Set (Visual Only for now) */}
                <div className="cap-filter-bar">
                  <div className="cap-input-group flex-1">
                    <label>Search Events</label>
                    <div className="cap-search-input">
                      <span className="material-symbols-outlined">search</span>
                      <input type="text" placeholder="Filter by event name..." />
                    </div>
                  </div>
                  <div className="cap-input-group">
                    <label>Date Range</label>
                    <input type="date" className="cap-date-input" />
                  </div>
                  <div className="cap-input-group">
                    <label>Status Filter</label>
                    <div className="cap-status-filters">
                      <label><input type="checkbox" defaultChecked /> Active</label>
                      <label><input type="checkbox" defaultChecked /> Pending</label>
                      <label><input type="checkbox" /> Completed</label>
                    </div>
                  </div>
                  <button className="cap-btn-dark"><span className="material-symbols-outlined">filter_list</span> Apply</button>
                </div>

                {/* Data Table */}
                <div className="cap-table-wrapper">
                  <table className="cap-table">
                    <thead>
                      <tr>
                        <th className="text-center">Sr No</th>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="text-center">Registrations</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-8 text-sub">No events found. Create one to get started.</td></tr>
                      ) : (
                        events.slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE).map((event, index) => {
                          const status = getStatusDisplay(event.event_status, event.start_date, event.end_date);
                          return (
                            <tr key={event.event_id}>
                              <td className="text-center font-bold text-sub">
                                {(page * EVENTS_PER_PAGE) + index + 1}
                              </td>
                              <td>
                                <div className="cap-event-name-cell">
                                  <div className="cap-event-icon bg-primary-light text-primary">
                                    <span className="material-symbols-outlined">event</span>
                                  </div>
                                  <strong>{event.event_name}</strong>
                                </div>
                              </td>
                              <td className="text-sub">{event.start_date}</td>
                              <td>
                                <span className={`cap-status-badge bg-${status.color}-light text-${status.color}`}>
                                  <span className={`cap-dot bg-${status.color}`}></span> {status.label}
                                </span>
                              </td>
                              <td className="text-center font-bold">{event.entry_fee === "Free" || event.entry_fee === "free" ? "Free" : `₹${event.entry_fee}`}</td>
                              <td className="text-right">
                                <div className="cap-action-btns">
                                  <button title="Edit Event" onClick={() => handleEditEventClick(event)}>
                                    <span className="material-symbols-outlined">edit</span>
                                  </button>
                                  <button title="Analytics"><span className="material-symbols-outlined">bar_chart</span></button>
                                  <button title="Delete Event" onClick={() => handleDeleteEvent(event.event_id)} className="hover-error">
                                    <span className="material-symbols-outlined">delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {events.length > 0 && (
                  <div className="cap-pagination">
                    <p>Showing {page * EVENTS_PER_PAGE + 1} to {Math.min((page + 1) * EVENTS_PER_PAGE, events.length)} of {events.length} events</p>
                    <div className="cap-page-controls">
                      <button onClick={handlePrevPage} disabled={page === 0}><span className="material-symbols-outlined">chevron_left</span></button>
                      <button className="active">{page + 1}</button>
                      <button onClick={handleNextPage} disabled={(page + 1) * EVENTS_PER_PAGE >= events.length}><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    );
  }

  // ==========================================
  // RENDER: EDIT PROFILE VIEW
  // ==========================================
  if (currentView === "edit_profile") {
    return (
      <div className="cap-page-wrapper">
        <CAdNavbar />
        {/* Pass data and callback functions as props */}
        <CAdEditProfile
          adminData={clubAdmin}
          rollNumber={rollNumber}
          onBack={() => setCurrentView('main')}
          onSaveSuccess={() => {
            fetchClubAdmin(); // Refresh data immediately!
            setCurrentView('main');
          }}
        />
      </div>
    );
  }


};

export default CProfile;