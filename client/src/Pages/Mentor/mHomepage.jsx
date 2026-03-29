import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useToast } from '../../Components/ToastContext';
import './css/mHomepage.css';
import MNavbar from '../../Components/MentorC/MNavbar';

const MHomepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [mentorName, setMentorName] = useState("Mentor");
  const [isLoading, setIsLoading] = useState(true);

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

        setMentorName(mentorId || "Mentor");
        setIsLoading(false);
      } catch (error) {
        console.error("⛔ Failed to fetch mentor credentials:", error);
        showToast('error', 'Connection Error', 'Failed to sync mentor profile data.');
        setIsLoading(false);
      }
    };

    fetchAndStoreMentorInfo();
  }, [showToast]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        showToast('success', 'Logged Out', 'You have securely logged out of the portal.');
        navigate("/", { replace: true });
      }
    } catch (error) {
      showToast('error', 'Logout Failed', 'An error occurred while logging out.');
    }
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  // Dummy Data mapped to the new UI structure
  const pendingApprovals = [
    { id: 1, initials: "JD", name: "Julianna Drago", activity: "Tech Ethics Symposium", category: "Technical", date: "Oct 24, 2023" },
    { id: 2, initials: "MA", name: "Marcus Aurelius", activity: "Community Outreach", category: "Social", date: "Oct 23, 2023" },
    { id: 3, initials: "SL", name: "Sarah Linn", activity: "Varsity Swim Finals", category: "Sports", date: "Oct 22, 2023" },
  ];

  const recentFeed = [
    { id: 1, type: "approve", text: "Approved: Creative Writing Workshop", student: "Elena Gilbert", time: "2 hours ago", color: "text-green", bg: "bg-green-light", icon: "check_circle" },
    { id: 2, type: "approve", text: "Approved: Python for Data Science", student: "David Miller", time: "5 hours ago", color: "text-green", bg: "bg-green-light", icon: "check_circle" },
    { id: 3, type: "reject", text: "Rejected: Uncertified Marathon", student: "Peter Parker", time: "Yesterday", color: "text-red", bg: "bg-red-light", icon: "cancel" },
  ];

  const activeStudents = [
    { id: 1, img: "17", name: "Alex Johnson", progress: 85, color: "bg-primary" },
    { id: 2, img: "18", name: "Sarah Chen", progress: 92, color: "bg-cyan" },
    { id: 3, img: "19", name: "Sofia Martinez", progress: 64, color: "bg-orange" },
  ];

  return (
    <div className="mh-page-wrapper">

      {/* 1. UNIFIED TOP NAVBAR */}
      <MNavbar />

      <main className="mh-main-content">
        <div className="mh-container">

          {/* 2. IMMERSIVE HERO */}
          <section className="mh-hero-section">
            <div className="mh-hero-bg-icon">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <div className="mh-hero-content">
              <p className="mh-hero-eyebrow">Welcome back, Mentor</p>
              <h1 className="mh-hero-title">Academic Pulse Overview</h1>
              <p className="mh-hero-desc">
                {isLoading
                  ? "Loading your dashboard data..."
                  : `Hello ${mentorName}, your students have submitted 15 new activities for review today. Overall performance is up by 12% compared to last semester.`}
              </p>
            </div>
          </section>

          {/* 3. KPI BENTO GRID */}
          <div className="mh-kpi-grid">
            <div className="mh-kpi-card editorial-shadow">
              <div className="mh-kpi-header">
                <div className="mh-kpi-icon bg-primary-light text-primary"><span className="material-symbols-outlined">group</span></div>
                <span className="mh-kpi-badge bg-primary-light text-primary">+3 this week</span>
              </div>
              <p className="mh-kpi-label">Assigned Students</p>
              <h3 className="mh-kpi-value">42</h3>
            </div>
            <div className="mh-kpi-card editorial-shadow">
              <div className="mh-kpi-header">
                <div className="mh-kpi-icon bg-orange-light text-orange"><span className="material-symbols-outlined">rule</span></div>
                <span className="mh-kpi-badge bg-orange-light text-orange">High Priority</span>
              </div>
              <p className="mh-kpi-label">Pending Reviews</p>
              <h3 className="mh-kpi-value">15</h3>
            </div>
            <div className="mh-kpi-card editorial-shadow">
              <div className="mh-kpi-header">
                <div className="mh-kpi-icon bg-cyan-light text-cyan"><span className="material-symbols-outlined">military_tech</span></div>
                <span className="mh-kpi-badge bg-cyan-light text-cyan">Top 5%</span>
              </div>
              <p className="mh-kpi-label">Average Credit Score</p>
              <h3 className="mh-kpi-value">88</h3>
            </div>
            <div className="mh-kpi-card editorial-shadow">
              <div className="mh-kpi-header">
                <div className="mh-kpi-icon bg-primary-light text-primary"><span className="material-symbols-outlined">bar_chart</span></div>
                <span className="mh-kpi-badge bg-primary-light text-primary">Record High</span>
              </div>
              <p className="mh-kpi-label">Activity Submissions</p>
              <h3 className="mh-kpi-value">124</h3>
            </div>
          </div>

          {/* 4. SPLIT DASHBOARD LAYOUT */}
          <div className="mh-dashboard-split">

            {/* LEFT COLUMN (The Work) */}
            <div className="mh-col-main">

              {/* Pending Approvals Table */}
              <div className="mh-panel editorial-shadow">
                <div className="mh-panel-header border-bottom">
                  <h2>Pending Approvals</h2>
                  <button className="mh-view-all text-primary">View All</button>
                </div>
                <div className="mh-table-wrapper">
                  <table className="mh-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Activity</th>
                        <th>Date</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApprovals.map(app => (
                        <tr key={app.id}>
                          <td>
                            <div className="mh-student-cell">
                              <div className="mh-avatar-initials">{app.initials}</div>
                              <span className="mh-student-name">{app.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="mh-activity-name">{app.activity}</span>
                            <span className="mh-activity-cat">{app.category}</span>
                          </td>
                          <td className="mh-date-cell">{app.date}</td>
                          <td className="text-right">
                            <div className="mh-action-btns">
                              <button className="mh-action-btn text-primary" title="View"><span className="material-symbols-outlined">visibility</span></button>
                              <button className="mh-action-btn text-green" title="Approve"><span className="material-symbols-outlined">check_circle</span></button>
                              <button className="mh-action-btn text-red" title="Reject"><span className="material-symbols-outlined">cancel</span></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CSS Bar Chart: Activity Distribution */}
              <div className="mh-panel editorial-shadow mh-chart-panel">
                <div className="mh-panel-header">
                  <h2>Student Activity Distribution</h2>
                  <div className="mh-chart-legend">
                    <span><div className="mh-dot bg-primary"></div> Technical</span>
                    <span><div className="mh-dot bg-cyan"></div> Social</span>
                    <span><div className="mh-dot bg-orange"></div> Sports</span>
                  </div>
                </div>

                <div className="mh-bar-chart">
                  {/* Mock Chart Bars */}
                  <div className="mh-bar-group"><div className="mh-bar bg-primary" style={{ height: "85%" }}></div><span>Mon</span></div>
                  <div className="mh-bar-group"><div className="mh-bar bg-cyan" style={{ height: "60%" }}></div><span>Tue</span></div>
                  <div className="mh-bar-group"><div className="mh-bar bg-orange" style={{ height: "40%" }}></div><span>Wed</span></div>
                  <div className="mh-bar-group"><div className="mh-bar bg-primary-light text-primary" style={{ height: "75%" }}></div><span>Thu</span></div>
                  <div className="mh-bar-group"><div className="mh-bar bg-primary" style={{ height: "95%" }}></div><span>Fri</span></div>
                  <div className="mh-bar-group"><div className="mh-bar bg-cyan" style={{ height: "55%" }}></div><span>Sat</span></div>
                  <div className="mh-bar-group"><div className="mh-bar bg-orange" style={{ height: "30%" }}></div><span>Sun</span></div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (The Feed & Insights) */}
            <div className="mh-col-side">

              {/* Recent Approvals Feed */}
              <div className="mh-panel">
                <h2 className="mh-panel-title mb-6">Recent Approvals</h2>
                <div className="mh-feed-list">
                  {recentFeed.map((feed, index) => (
                    <div className="mh-feed-item" key={feed.id}>
                      {/* Only draw a line if it's not the last item */}
                      {index !== recentFeed.length - 1 && <div className="mh-feed-line"></div>}
                      <div className={`mh-feed-icon ${feed.bg} ${feed.color}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{feed.icon}</span>
                      </div>
                      <div className="mh-feed-text">
                        <p className="mh-feed-action">{feed.text}</p>
                        <p className="mh-feed-student">Student: {feed.student}</p>
                        <p className="mh-feed-time">{feed.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Insight Card */}
              <div className="mh-insight-card">
                <div className="mh-insight-header text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <h3>Mentor Insight</h3>
                </div>
                <p>Engagement in "Social" activities is currently below target for the Sophomore group. Consider suggesting the upcoming University Volunteer Fair.</p>
                <button className="mh-insight-btn" onClick={() => showToast('info', 'Broadcast Sent', 'Suggestion sent to Sophomore group.')}>
                  Broadcast Suggestion <span className="material-symbols-outlined">send</span>
                </button>
              </div>

              {/* Active Mentorships */}
              <div className="mh-panel editorial-shadow">
                <h2 className="mh-panel-title mb-4">Active Mentorships</h2>
                <div className="mh-mentorship-list">
                  {activeStudents.map(student => (
                    <div className="mh-mentorship-item" key={student.id}>
                      <div className="mh-mentor-student-info">
                        <img src={`http://googleusercontent.com/profile/picture/${student.img}`} alt="Student" />
                        <div>
                          <p className="mh-ms-name">{student.name}</p>
                          <div className="mh-progress-track">
                            <div className={`mh-progress-fill ${student.color}`} style={{ width: `${student.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <span className={`mh-ms-percent ${student.color.replace('bg-', 'text-')}`}>{student.progress}%</span>
                    </div>
                  ))}
                </div>
                <button className="mh-view-all-btn text-primary mt-6" onClick={() => navigate('/view-students')}>
                  View All Students
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mentors */}
      <button className="mh-fab" onClick={() => showToast('info', 'Quick Action', 'Opening assignment modal...')} title="Quick Assign Task">
        <span className="material-symbols-outlined">add_task</span>
      </button>

      {/* Unified Footer */}
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

export default MHomepage;