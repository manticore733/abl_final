import React, { useEffect, useState, useRef } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import { fetchStudentInfo, fetchStudentActivityInfo } from "../../api/studentApi";
import Chart from "chart.js/auto";
import { Grid, Box, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import './css/SProfile.css';
import profileImage from "../../assets/image.png";
import { Link, useNavigate } from "react-router-dom";

const SProfile = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };




  const [studentInfo, setStudentInfo] = useState(null);
  const [activities, setActivities] = useState([]);
  const [catPoints, setCatPoints] = useState({ Technical: 0, Cultural: 0, Social: 0, Sports: 0, Internship: 0 });
  const [totalPoints, setTotalPoints] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const chartRef = useRef(null);

  useEffect(() => {
    const getStudentData = async () => {
      const data = await fetchStudentInfo();
      if (data) setStudentInfo(data);
    };

    const getStudentActivities = async () => {
      const activityData = await fetchStudentActivityInfo();
      if (activityData) setActivities(activityData);
    };

    getStudentData();
    getStudentActivities();
  }, []);

  useEffect(() => {
    if (!activities.length) return;

    const categoryPoints = {
      Technical: 0,
      Cultural: 0,
      Social: 0,
      Sports: 0,
      Internship: 0,
    };

    let total = 0;

    activities.forEach((activity) => {
      if (categoryPoints.hasOwnProperty(activity.a_type)) {
        const points = activity.a_points_scored || 0;
        categoryPoints[activity.a_type] += points;
        total += points;
      }
    });

    setCatPoints(categoryPoints);
    setTotalPoints(total);

    const ctx = document.getElementById("pointsPieChart");

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(categoryPoints),
          datasets: [{
            data: Object.values(categoryPoints),
            backgroundColor: ["#3a388b", "#4b2d98", "#2170e4", "#0058be", "#fd9d1a"],
            borderWidth: 0,
            hoverOffset: 4
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "80%",
          plugins: {
            legend: { display: false } // Hidden to match the clean Lumina look
          }
        },
      });
    }
  }, [activities]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getIconForType = (type) => {
    switch (type?.toLowerCase()) {
      case "technical": return "code";
      case "social": return "diversity_3";
      case "internship": return "business_center";
      case "sports": return "sports_basketball";
      case "cultural": return "palette";
      default: return "event_note";
    }
  };

  const getPillClassForLevel = (level) => {
    switch (level?.toLowerCase()) {
      case "international": return "sp-pill-intl";
      case "national": return "sp-pill-nat";
      case "state": return "sp-pill-state";
      case "university": return "sp-pill-uni";
      default: return "sp-pill-default";
    }
  };

  const totalPages = Math.ceil(activities.length / itemsPerPage);
  // ADD THESE THREE LINES RIGHT HERE:
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const currentActivities = activities.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  return (
    <div className="sp-page-wrapper">
      {/* NEW: Top Navigation Bar perfectly matching the Homepage */}
      <nav className="sh-top-nav">
        <div className="sh-nav-left">
          <span className="sh-brand-text">Academic Portal</span>
          <div className="sh-desktop-links">
            <Link className="sh-nav-link" to="/sHomepage">Dashboard</Link>
            <Link className="sh-nav-link" to="/student-calendar">Schedule</Link>
            <Link className="sh-nav-link" to="/make-entry">Grades</Link>
          </div>
        </div>
        <div className="sh-nav-right">
          <div className="sh-search-box">
            <span className="material-symbols-outlined">search</span>
            <input placeholder="Search records..." type="text" />
          </div>
          <button className="sh-icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="sh-icon-btn">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button onClick={handleLogout} className="sh-icon-btn logout-icon-btn" title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
          <Link to="/profile">
            {/* Added border-active class so the user knows they are ON the profile page */}
            <img className="sh-profile-avatar border-active" alt="Student Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-01cNusPj6qq-SqdEc78yD6RCE2i37nxrydaMSyXPS0x8xyoL2-jPlLqLKdJHXJPqzsBLaJVv_x19BKsfrWF00x9arEtsk-oZ6k_J0SNo2tVGpuoNGSFCGeEbMNRWWaeVNmOpS6XsmGRqt9ATEfZi526ZUaNLUIGRIHuWtbAHqsDJ-x18LdyNtbAVeG9r0r5d6Ahe_jIO-AXGewrH017f1xSJXK4pZHA-A-g_VJU4zeU-r9bxZK126UWiQK6ygAd6NZjQeoBxQXY" />
          </Link>
        </div>
      </nav>

      <main className="sp-main-content">
        <div className="sp-container">

          {/* 1. IMMERSIVE HERO SECTION */}
          <section className="sp-hero-section">
            {/* Abstract Background Blurs */}
            <div className="sp-hero-bg-blurs">
              <div className="sp-blur-blob blur-blue"></div>
              <div className="sp-blur-blob blur-purple"></div>
            </div>

            <div className="sp-hero-content-flex">
              {/* Glassmorphic Identity Card */}
              <motion.div className="sp-glass-card sp-identity-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="sp-identity-header">
                  <div className="sp-avatar-box">
                    <img src={profileImage} alt="Profile" />
                  </div>
                  <div>
                    <span className="sp-label-tiny">Student Profile</span>
                    <h1 className="sp-profile-name">{studentInfo ? studentInfo.s_name : "Loading..."}</h1>
                    <p className="sp-profile-degree">{studentInfo ? studentInfo.s_branch : ""}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Data Tiles */}
              <div className="sp-hero-tiles">
                <motion.div className="sp-glass-card sp-tile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <span className="sp-label-tiny">Semester</span>
                  <span className="sp-tile-value">{studentInfo?.s_sem || "-"}</span>
                </motion.div>
                <motion.div className="sp-glass-card sp-tile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <span className="sp-label-tiny">Section</span>
                  <span className="sp-tile-value">{studentInfo?.s_csec || "-"}</span>
                </motion.div>
                <motion.div className="sp-glass-card sp-tile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <span className="sp-label-tiny">Batch</span>
                  <span className="sp-tile-value">{studentInfo?.s_batch || "-"}</span>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 2. ASYMMETRICAL CONTENT GRID */}
          <div className="sp-bento-grid">

            {/* Left: Holistic Performance */}
            <div className="sp-panel sp-col-7">
              <div className="sp-panel-header-flex">
                <div>
                  <h2 className="sp-panel-title">Holistic Performance</h2>
                  <p className="sp-panel-subtitle">Activity Points Distribution</p>
                </div>
                <div className="sp-percentile-pill">Top Contributor</div>
              </div>

              <div className="sp-performance-flex">
                {/* Chart Area */}
                <div className="sp-chart-container">
                  <div className="sp-chart-center-label">
                    <span className="sp-chart-total">{totalPoints}</span>
                    <span className="sp-label-tiny">Total Pts</span>
                  </div>
                  <canvas id="pointsPieChart"></canvas>
                </div>

                {/* Progress Bars */}
                <div className="sp-progress-container">
                  <div className="sp-progress-block">
                    <div className="sp-progress-labels">
                      <span>Technical Proficiency</span>
                      <span className="text-indigo">{catPoints.Technical} pts</span>
                    </div>
                    <div className="sp-progress-track"><div className="sp-progress-fill fill-indigo" style={{ width: `${Math.min((catPoints.Technical / 50) * 100, 100)}%` }}></div></div>
                  </div>
                  <div className="sp-progress-block">
                    <div className="sp-progress-labels">
                      <span>Cultural Engagement</span>
                      <span className="text-purple">{catPoints.Cultural} pts</span>
                    </div>
                    <div className="sp-progress-track"><div className="sp-progress-fill fill-purple" style={{ width: `${Math.min((catPoints.Cultural / 50) * 100, 100)}%` }}></div></div>
                  </div>
                  <div className="sp-progress-block">
                    <div className="sp-progress-labels">
                      <span>Social Impact</span>
                      <span className="text-blue">{catPoints.Social} pts</span>
                    </div>
                    <div className="sp-progress-track"><div className="sp-progress-fill fill-blue" style={{ width: `${Math.min((catPoints.Social / 50) * 100, 100)}%` }}></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Aggregate Score & Events */}
            <div className="sp-col-5 sp-flex-col">
              {/* Aggregate Card */}
              <div className="sp-aggregate-card">
                <div className="sp-glow-orb"></div>
                <span className="sp-label-tiny text-white-50">Aggregate Score</span>
                <div className="sp-score-flex">
                  <span className="sp-score-huge">{totalPoints}</span>
                  <span className="sp-score-unit">pts</span>
                </div>
                <div className="sp-score-footer">
                  <div className="sp-icon-circle"><span className="material-symbols-outlined">trending_up</span></div>
                  <span>Points calculated from verified activities</span>
                </div>
              </div>

              {/* Events Count Card */}
              <div className="sp-panel sp-events-card">
                <div>
                  <span className="sp-label-tiny">Activities Logged</span>
                  <span className="sp-events-count">{activities.length}</span>
                </div>
                <div className="sp-events-icon"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span></div>
              </div>
            </div>
          </div>

          {/* 3. ENGAGEMENT LEDGER (Custom Table) */}
          <section className="sp-ledger-section">
            <div className="sp-ledger-header">
              <div>
                <h2 className="sp-panel-title">Engagement Ledger</h2>
                <p className="sp-panel-subtitle">Recent extracurricular & academic milestones</p>
              </div>
              <button className="sp-view-history-btn">
                View Full History <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <div className="sp-table-wrapper">
              <table className="sp-ledger-table">
                <thead>
                  <tr>
                    {/* NEW: Added Sr No Header */}
                    <th className="text-center" style={{ width: "60px" }}>No.</th>
                    <th>Activity & Focus</th>
                    <th>Classification</th>
                    <th>Date / Venue</th>
                    <th className="text-right">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {currentActivities.length > 0 ? (
                    currentActivities.map((act, index) => (
                      <tr key={act.a_id} className="sp-ledger-row group">

                        {/* NEW: Serial Number Cell. Notice it now holds 'sp-td-first' */}
                        <td className="sp-td-first sp-sr-cell">
                          {(page - 1) * itemsPerPage + index + 1}
                        </td>

                        {/* UPDATED: Removed 'sp-td-first' from this td */}
                        <td>
                          <div className="sp-activity-cell">
                            <div className={`sp-act-icon icon-${act.a_type?.toLowerCase() || 'default'}`}>
                              <span className="material-symbols-outlined">{getIconForType(act.a_type)}</span>
                            </div>
                            <div>
                              <div className="sp-act-title">{act.a_name}</div>
                              <div className="sp-act-subtitle">{act.a_sub_type || act.a_type}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`sp-level-pill ${getPillClassForLevel(act.a_level)}`}>
                            {act.a_level || act.a_status}
                          </span>
                        </td>
                        <td className="sp-act-contribution">
                          {formatDate(act.a_start_date)}
                          <br /><span className="sp-venue-text">{act.a_venue || "N/A"}</span>
                        </td>
                        <td className="sp-td-last text-right">
                          <span className={`sp-act-points ${act.a_status === "Approved" ? "text-approved" : "text-pending"}`}>
                            {act.a_status === "Approved" ? `+${act.a_points_scored}` : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center py-8">No activities logged yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": { fontFamily: 'Inter', fontWeight: 600 },
                    "& .Mui-selected": { backgroundColor: '#3a388b', color: 'white', '&:hover': { backgroundColor: '#21005e' } }
                  }}
                />
              </Box>
            )}
          </section>

        </div>
      </main>

      {/* Footer - Now fully spanning the bottom */}
      <footer className="sh-footer">
        <div className="sh-footer-content">
          <div>
            <p className="sh-copyright">© 2024 Academic Editorial University. All rights reserved.</p>
          </div>
          <div className="sh-footer-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SProfile;