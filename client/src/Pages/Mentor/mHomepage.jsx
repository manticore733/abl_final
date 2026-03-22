import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MNavbar from '../../Components/MentorC/MNavbar';
import './css/mHomepage.css';
import { Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Users,
  FileCheck,
  Activity,
  BellRing,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

const mHomepage = () => {

  const [mentorName, setMentorName] = useState("Mentor");

  useEffect(() => {
    const fetchAndStoreMentorInfo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mentor/mentorcreds', {
          withCredentials: true,
        });

        const { mentorId, m_branch, m_batch, m_csec, m_sem } = res.data;

        sessionStorage.setItem("mentorId", mentorId);
        sessionStorage.setItem("m_branch", m_branch);
        sessionStorage.setItem("m_batch", m_batch);
        sessionStorage.setItem("m_csec", m_csec);
        sessionStorage.setItem("m_sem", m_sem);

        // Extract basic ID or assign a placeholder generic name for greeting
        setMentorName(mentorId || "Mentor");

        console.log("✅ Mentor info stored in sessionStorage!");
      } catch (error) {
        console.error("⛔ Failed to fetch mentor credentials:", error);
      }
    };

    fetchAndStoreMentorInfo();
  }, []);

  // Dummy mock data for recent submissions feeding notifications
  const recentSubmissions = [
    { id: 1, user: "Pranav Batki", action: "submitted a cultural activity", time: "2 hours ago", status: "Pending" },
    { id: 2, user: "Rohan Sharma", action: "uploaded a tech certificate", time: "5 hours ago", status: "Pending" },
    { id: 3, user: "Ananya Desai", action: "requested activity verification", time: "Yesterday", status: "Pending" },
    { id: 4, user: "Karan Johar", action: "completed internal internship", time: "Yesterday", status: "Approved" },
    { id: 5, user: "Smriti Irani", action: "submitted sports achievement", time: "2 days ago", status: "Pending" },
  ];

  return (
    <div className="mentor-page-wrapper">
      <MNavbar />

      {/* 1. HERO SECTION (Deep Academic Blue) */}
      <div className="mentor-hero">
        <div className="mentor-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome back, {mentorName}!
          </motion.h1>
          <div className="mentor-hero-instruction">
            Mentor Control Center &bull; Quick access to student activities
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="mentor-hero-shape mentor-shape-1"></div>
        <div className="mentor-hero-shape mentor-shape-2"></div>
      </div>

      <div className="mentor-main-container">
        {/* 2. OVERLAPPING QUICK STATS */}
        <div className="stats-overlap-container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Users size={32} className="stat-icon primary-text" />
                <div className="stat-value primary-text">64</div>
                <div className="stat-label">Assigned Students</div>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FileCheck size={32} className="stat-icon secondary-text" />
                <div className="stat-value secondary-text">12</div>
                <div className="stat-label">Pending Reviews</div>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Award size={32} className="stat-icon success-text" />
                <div className="stat-value success-text">342</div>
                <div className="stat-label">Total Verifications</div>
              </motion.div>
            </Grid>
          </Grid>
        </div>

        {/* 3. MAIN DASHBOARD PANELS */}
        <Box sx={{ mt: 6, mb: 10 }}>
          <Grid container spacing={4}>

            {/* Quick Actions (Left Side) */}
            <Grid item xs={12} md={7}>
              <div className="section-card">
                <div className="section-header-flex">
                  <h2>Mentor Hub Tools</h2>
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Link to="/view-students" className="action-card-link">
                      <motion.div
                        className="action-pro-card"
                        whileHover={{ y: -5, borderColor: '#3b82f6' }}
                      >
                        <div className="action-icon-wrapper bg-blue-light">
                          <Users size={24} className="text-blue" />
                        </div>
                        <h3>View Students</h3>
                        <p>Access your batch, check individual profiles, and monitor progression.</p>
                      </motion.div>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Link to="#" className="action-card-link">
                      <motion.div
                        className="action-pro-card"
                        whileHover={{ y: -5, borderColor: '#10b981' }}
                      >
                        <div className="action-icon-wrapper bg-green-light">
                          <FileCheck size={24} className="text-green" />
                        </div>
                        <h3>Activity Approvals</h3>
                        <p>Review and verify certificates uploaded by your assigned students.</p>
                      </motion.div>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Link to="#" className="action-card-link">
                      <motion.div
                        className="action-pro-card"
                        whileHover={{ y: -5, borderColor: '#f59e0b' }}
                      >
                        <div className="action-icon-wrapper bg-yellow-light">
                          <TrendingUp size={24} className="text-yellow" />
                        </div>
                        <h3>Analytics</h3>
                        <p>View class performance reports and point distribution charts.</p>
                      </motion.div>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Link to="#" className="action-card-link">
                      <motion.div
                        className="action-pro-card"
                        whileHover={{ y: -5, borderColor: '#8b5cf6' }}
                      >
                        <div className="action-icon-wrapper bg-purple-light">
                          <Activity size={24} className="text-purple" />
                        </div>
                        <h3>Batch Insights</h3>
                        <p>Check the overall status of your assigned branch and section.</p>
                      </motion.div>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>

            {/* Notifications / Inbox (Right Side) */}
            <Grid item xs={12} md={5}>
              <div className="section-card">
                <div className="section-header-flex">
                  <h2>Activity Inbox</h2>
                  <BellRing size={20} className="text-slate-400" />
                </div>
                <div className="inbox-list">
                  {recentSubmissions.map((item) => (
                    <motion.div
                      key={item.id}
                      className="inbox-item"
                      whileHover={{ backgroundColor: '#f8fafc' }}
                    >
                      <div className="inbox-content">
                        <h4>{item.user}</h4>
                        <p>{item.action}</p>
                        <span className="inbox-time">{item.time}</span>
                      </div>
                      <div className="inbox-status">
                        <span className={`status-badge ${item.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
                          {item.status}
                        </span>
                        <ChevronRight size={16} className="text-slate-400 ml-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button className="view-all-btn">
                  View All Submissions
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* Footer */}
      <footer className="mentor-footer">
        <p>© {new Date().getFullYear()} FCRIT ABL Portal</p>
        <p className="footer-sub">Contact: info@fcrit.ac.in | Designed for Mentors</p>
      </footer>
    </div>
  );
};

export default mHomepage;
