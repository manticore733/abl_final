import React, { useState, useEffect } from 'react';
import CAdNavbar from '../../Components/CAdminC/CAdNavbar';
import "./css/cHomepage.css";
import { Link, useNavigate } from "react-router-dom";

const CAdHomepage = () => {
  const navigate = useNavigate();

  // Fetch Admin details from session
  const clubName = sessionStorage.getItem("club_name") || "The Editorial Board";
  const adminName = sessionStorage.getItem("username") || "Admin User";

  // --- STATE FOR DASHBOARD DATA ---
  // In the future, populate these via an axios.get() inside useEffect
  const [stats, setStats] = useState({
    eventsHosted: 42,
    totalEngagement: "8.4k",
    established: "September 2023"
  });

  const [activeEvents, setActiveEvents] = useState([
    {
      id: 1,
      title: "Annual Creative Writing Workshop",
      stats: "452 Students Registered • 12 Volunteers",
      status: "Live Now",
      statusColor: "green",
      icon: "draw"
    },
    {
      id: 2,
      title: "Digital Journalism Summit",
      stats: "128 Students Registered • 5 Speakers",
      status: "Starts in 2d",
      statusColor: "blue",
      icon: "podcasts"
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "Sarah Jenkins", action: "registered for Workshop.", time: "2 minutes ago", icon: "person_add", color: "blue" },
    { id: 2, user: "Marcus Chen", action: 'left a comment: "Excited for this!"', time: "15 minutes ago", icon: "comment", color: "teal" },
    { id: 3, user: "System", action: "Event Journalism Summit updated.", time: "1 hour ago", icon: "system_update", color: "orange" }
  ]);

  return (
    <div className="ca-page-wrapper">
      <CAdNavbar />

      <main className="ca-dash-main">

        {/* 1. Club Identity Banner */}
        <section className="ca-hero-banner">
          <div className="ca-hero-bg-icon">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div className="ca-hero-content">
            <div className="ca-hero-text">
              <div className="ca-status-pill-group">
                <span className="ca-status-pill">Active Status</span>
                <span className="ca-est-text">Est. {stats.established}</span>
              </div>
              <h2 className="ca-club-title">{clubName}</h2>
              <p className="ca-club-desc">Curating academic excellence and student voices across the university ecosystem.</p>
            </div>
            <div className="ca-hero-kpis">
              <div className="ca-kpi-box">
                <p className="ca-kpi-val">{stats.eventsHosted}</p>
                <p className="ca-kpi-lbl">Events Hosted</p>
              </div>
              <div className="ca-kpi-box">
                <p className="ca-kpi-val">{stats.totalEngagement}</p>
                <p className="ca-kpi-lbl">Total Engagement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid Layout */}
        <div className="ca-dash-grid">

          {/* LEFT COLUMN (Analytics & Events) */}
          <div className="ca-dash-left">

            {/* 2. Engagement Analytics */}
            <section className="ca-panel">
              <div className="ca-panel-header">
                <div>
                  <p className="ca-super-title">Performance Insight</p>
                  <h3>Event Registration Trends</h3>
                </div>
                <div className="ca-filter-btns">
                  <button className="active">Last 6 Months</button>
                  <button>Yearly</button>
                </div>
              </div>

              {/* CSS-Based Bar Chart (No external libraries needed!) */}
              <div className="ca-chart-container">
                <div className="ca-bar-group"><div className="ca-bar h-40"></div><span>Jan</span></div>
                <div className="ca-bar-group"><div className="ca-bar h-60"></div><span>Feb</span></div>
                <div className="ca-bar-group"><div className="ca-bar ca-bar-primary h-80"></div><span className="text-primary">Mar</span></div>
                <div className="ca-bar-group"><div className="ca-bar h-50"></div><span>Apr</span></div>
                <div className="ca-bar-group"><div className="ca-bar h-70"></div><span>May</span></div>
                <div className="ca-bar-group"><div className="ca-bar ca-bar-teal h-90"></div><span className="text-teal">Jun</span></div>
              </div>
            </section>

            {/* 3. Active Events Hub */}
            <section className="ca-events-section">
              <div className="ca-section-title-row">
                <h3>Active Events Hub</h3>
                <a href="/cadd-events">View All <span className="material-symbols-outlined">chevron_right</span></a>
              </div>

              <div className="ca-events-grid">
                {activeEvents.map(event => (
                  <div className="ca-event-card" key={event.id}>
                    <div className="ca-event-card-header">
                      <div className={`ca-event-icon bg-${event.iconColor || 'default'}`}>
                        <span className="material-symbols-outlined">{event.icon}</span>
                      </div>
                      <span className={`ca-live-pill pill-${event.statusColor}`}>{event.status}</span>
                    </div>
                    <h4>{event.title}</h4>
                    <p>{event.stats}</p>
                    <div className="ca-event-actions">
                      <button className="ca-btn-secondary">Quick Edit</button>
                      <button className="ca-btn-primary">View Analytics</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Actions & Feed) */}
          <div className="ca-dash-right">

            {/* 4. Quick Action Card */}
            <div className="ca-action-card">
              <div className="ca-action-content">
                <h4>Grow Your Impact</h4>
                <p>Ready to launch your next big initiative? Create a new event template in seconds.</p>
                <button onClick={() => navigate('/cadd-events')} className="ca-btn-create">
                  <span className="material-symbols-outlined">add_circle</span> Create New Event
                </button>
              </div>
              <span className="material-symbols-outlined ca-action-bg-icon">rocket_launch</span>
            </div>

            {/* 5. Recent Activity Feed */}
            <section className="ca-panel">
              <p className="ca-super-title mb-4">Recent Activity</p>
              <div className="ca-feed-list">
                {recentActivity.map(act => (
                  <div className="ca-feed-item" key={act.id}>
                    <div className="ca-feed-avatar">
                      <div className={`ca-mini-icon bg-${act.color}`}>
                        <span className="material-symbols-outlined">{act.icon}</span>
                      </div>
                    </div>
                    <div className="ca-feed-text">
                      <p><strong>{act.user}</strong> {act.action}</p>
                      <span>{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="ca-btn-outline w-full mt-4">View Full Log</button>
            </section>

            {/* System Alert */}
            <div className="ca-alert-box">
              <div className="ca-alert-header">
                <span className="material-symbols-outlined">info</span>
                <h5>System Alert</h5>
              </div>
              <p>Quarterly Engagement Report is now available for download. Review your club's reach metrics.</p>
            </div>

          </div>
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
}

export default CAdHomepage;