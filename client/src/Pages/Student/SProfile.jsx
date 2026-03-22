import React, { useEffect, useState, useRef } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import { fetchStudentInfo, fetchStudentActivityInfo } from "../../api/studentApi";
import Chart from "chart.js/auto";
import { Grid, Box, Typography, Avatar, Pagination } from "@mui/material";
import { ChevronRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import './css/SProfile.css';
import profileImage from "../../assets/image.png";

const SProfile = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [activities, setActivities] = useState([]);
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

    activities.forEach((activity) => {
      if (categoryPoints.hasOwnProperty(activity.a_type)) {
        categoryPoints[activity.a_type] += activity.a_points_scored || 0;
      }
    });

    const ctx = document.getElementById("pointsPieChart");

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(categoryPoints),
          datasets: [
            {
              data: Object.values(categoryPoints),
              backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"],
              borderWidth: 0,
              hoverOffset: 4
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "75%",
          plugins: {
            legend: {
              position: "right",
              labels: {
                padding: 20,
                font: {
                  family: "'Inter', sans-serif",
                  size: 13
                }
              }
            }
          }
        },
      });
    }
  }, [activities]);

  // Helper to determine chip class based on status
  const getStatusChipClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "chip-completed";
      case "ongoing":
        return "chip-ongoing";
      case "upcoming":
        return "chip-upcoming";
      default:
        return "chip-completed";
    }
  };
  // Helper to format the ugly ISO timestamp into a clean date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }); // This turns "2025-03-12T00..." into "12 Mar 2025"
  };

  // Calculate paginated activities
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const currentActivities = activities.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="student-page-wrapper">
      <SNavbar />

      {/* 1. THE HERO SECTION (Deep Academic Blue) */}
      <div className="student-hero">
        <div className="student-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Profile
          </motion.h1>
          <div className="student-hero-instruction">
            View your academic details and activity points
          </div>
        </div>

        {/* Decorative background shapes mimicking SelectRole */}
        <div className="student-hero-shape student-shape-1"></div>
        <div className="student-hero-shape student-shape-2"></div>
      </div>

      <div className="student-main-container">

        {/* Overlapping Quick Stats Section */}
        <div className="profile-overlap-container">
          <Grid container spacing={3}>
            {/* Student Info Card */}
            <Grid item xs={12} md={7}>
              <motion.div
                className="profile-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="profile-cover"></div>
                <div className="profile-details-flex">
                  <div className="profile-picture-container">
                    <img src={profileImage} alt="Profile" className="profile-img-large" />
                  </div>
                  <div className="profile-info-content">
                    {studentInfo ? (
                      <>
                        <h2 className="profile-name-title">{studentInfo.s_name}</h2>
                        <div className="profile-badge-role">Student</div>
                        <div className="student-info-grid">
                          <div className="info-row">
                            <span className="info-label">Batch</span>
                            <span className="info-value">{studentInfo.s_batch}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Semester</span>
                            <span className="info-value">{studentInfo.s_sem}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Section</span>
                            <span className="info-value">{studentInfo.s_csec}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Branch</span>
                            <span className="info-value">{studentInfo.s_branch}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="loading-text">Loading student info...</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Grid>

            {/* Pie Chart Card */}
            <Grid item xs={12} md={5}>
              <motion.div
                className="profile-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="chart-title">Points Distribution</h3>
                <div className="sprofile-pie-chart-container">
                  <canvas id="pointsPieChart"></canvas>
                </div>
              </motion.div>
            </Grid>
          </Grid>
        </div>

        {/* Activity Details Section */}
        <div className="section-card activity-section">
          <Box sx={{ mb: 2 }}>
            <div className="section-header-flex">
              <h2>Activity Details</h2>
            </div>

            <div className="table-wrapper">
              {activities.length > 0 ? (
                <table className="modern-activity-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Activity Name</th>
                      <th>Type</th>
                      <th>Sub Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Venue</th>
                      <th>Level</th>
                      <th>Status</th>
                      <th>Points</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentActivities.map((activity, index) => (
                      <tr key={activity.a_id}>
                        <td className="sr-no-cell">{(page - 1) * itemsPerPage + index + 1}</td>
                        <td className="fw-600 dark-text">{activity.a_name}</td>
                        <td>{activity.a_type}</td>
                        <td>{activity.a_sub_type}</td>
                        <td>{formatDate(activity.a_start_date) || "N/A"}</td>
                        <td>{formatDate(activity.a_end_date) || "N/A"}</td>
                        <td>{activity.a_venue || "N/A"}</td>
                        <td>{activity.a_level || "N/A"}</td>
                        <td>
                          <span className={`status-chip ${getStatusChipClass(activity.a_status)}`}>
                            {activity.a_status}
                          </span>
                        </td>
                        <td className="points-cell">{activity.a_points_scored !== null ? activity.a_points_scored : "Pending"}</td>
                        <td>
                          <button className="action-btn-modern">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <p>No activities found.</p>
                </div>
              )}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontFamily: 'Inter',
                      fontWeight: 500
                    },
                    "& .Mui-selected": {
                      backgroundColor: '#1e3a8a',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1e293b',
                      }
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        </div>

      </div>

      {/* Footer */}
      <footer className="student-footer">
        <p>© {new Date().getFullYear()} FCRIT ABL Portal</p>
        <p className="footer-sub">Contact: info@fcrit.ac.in | Designed for Students</p>
      </footer>
    </div>
  );
};

export default SProfile;
