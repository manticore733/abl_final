import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/sHomepage.css";

const SHomepage = () => {
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

  return (
    <div className="sh-page-wrapper">
      {/* Top Navigation Bar */}
      <nav className="sh-top-nav">
        <div className="sh-nav-left">
          <span className="sh-brand-text">ABL Portal</span>
          <div className="sh-desktop-links">
            <Link className="sh-nav-link active" to="/sHomepage">Dashboard</Link>
            <Link className="sh-nav-link" to="/student-calendar">Schedule</Link>
            <Link className="sh-nav-link" to="/make-entry">Grades</Link>
            <Link className="sh-nav-link" to="#">Financials</Link>
            <Link className="sh-nav-link" to="#">Messages</Link>
          </div>
        </div>
        <div className="sh-nav-right">
          <div className="sh-search-box">
            <span className="material-symbols-outlined">search</span>
            <input placeholder="Search resources..." type="text" />
          </div>
          <button className="sh-icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="sh-icon-btn">
            <span className="material-symbols-outlined">settings</span>
          </button>

          {/* Logout Button moved to Navbar */}
          <button onClick={handleLogout} className="sh-icon-btn logout-icon-btn" title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>

          <Link to="/profile">
            <img className="sh-profile-avatar" alt="Student Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-01cNusPj6qq-SqdEc78yD6RCE2i37nxrydaMSyXPS0x8xyoL2-jPlLqLKdJHXJPqzsBLaJVv_x19BKsfrWF00x9arEtsk-oZ6k_J0SNo2tVGpuoNGSFCGeEbMNRWWaeVNmOpS6XsmGRqt9ATEfZi526ZUaNLUIGRIHuWtbAHqsDJ-x18LdyNtbAVeG9r0r5d6Ahe_jIO-AXGewrH017f1xSJXK4pZHA-A-g_VJU4zeU-r9bxZK126UWiQK6ygAd6NZjQeoBxQXY" />
          </Link>
        </div>
      </nav>

      {/* Main Content Canvas - Now perfectly centered without the sidebar! */}
      <main className="sh-main-content">
        <div className="sh-content-container">

          {/* Hero Section */}
          <section className="sh-hero-section">
            <div className="sh-hero-card primary-gradient editorial-shadow">
              <div className="sh-hero-overlay"></div>
              <div className="sh-hero-decor">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
              <div className="sh-hero-content">
                <span className="sh-hero-tag">Featured Event</span>
                <h1>Annual Research & Innovation Summit 2024</h1>
                <p>Join world-renowned scholars and industry leaders for a 3-day exploration of the future of digital humanities.</p>
              </div>
              <img className="sh-hero-img" alt="Modern university auditorium with students" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmvB39QEUq7oZP_edyC1stteyuZls8F8OWnsyH_nY6d28agaEl0X089fWkkgPSjZ0O0mguJV-V73-tou7V0js--IsrY0vz1zn2DhdmJ_mvSJekStxRyHmgh5cLPdzQBpogwAGm1Lom40HWa4AAbWxGG63MLHpVJs76yy1NL3K2qlicAlx1rbssEd_7lKtwTnqqUWM0HCgPzueDdFSQ-hXt86KZ1Xy1od5nTdb3LSLyy8RVK9lBtpVhPVk_AruY3xdcbwY0VwFd0C0" />
            </div>

            {/* KPI Metric Cards */}
            <div className="sh-kpi-grid">
              <div className="sh-kpi-card editorial-shadow border-blue">
                <div className="sh-kpi-info">
                  <p className="sh-kpi-eyebrow">Academic Progress</p>
                  <h3>120</h3>
                  <p className="sh-kpi-label">Earned Credits</p>
                </div>
                <div className="sh-kpi-icon bg-blue-light text-blue">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
              </div>
              <div className="sh-kpi-card editorial-shadow border-cyan">
                <div className="sh-kpi-info">
                  <p className="sh-kpi-eyebrow">Campus Life</p>
                  <h3>14</h3>
                  <p className="sh-kpi-label">Upcoming Events</p>
                </div>
                <div className="sh-kpi-icon bg-cyan-light text-cyan">
                  <span className="material-symbols-outlined">event_available</span>
                </div>
              </div>
              <div className="sh-kpi-card editorial-shadow border-orange">
                <div className="sh-kpi-info">
                  <p className="sh-kpi-eyebrow">Achievements</p>
                  <h3>05</h3>
                  <p className="sh-kpi-label">Certificates Won</p>
                </div>
                <div className="sh-kpi-icon bg-orange-light text-orange">
                  <span className="material-symbols-outlined">verified</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Grid: Announcements & Events */}
          <div className="sh-bento-grid">
            {/* Announcements Sidebar */}
            <aside className="sh-announcements-panel">
              <div className="sh-panel-card">
                <div className="sh-panel-header">
                  <h2>Announcements</h2>
                  <button>View All</button>
                </div>
                <div className="announcements-scroll-container no-scrollbar">
                  <div className="announcements-scroll-content">
                    <div className="sh-announcement-card editorial-shadow">
                      <span className="sh-tag tag-blue">Academic</span>
                      <h4>Spring Semester Registration Deadline</h4>
                      <p>Ensure all course selections are finalized by Friday, March 15th to avoid late fees.</p>
                      <div className="sh-ann-footer">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="sh-announcement-card border-left-cyan">
                      <span className="sh-tag tag-cyan">Finance</span>
                      <h4>New Scholarship Opportunity: STEM Global</h4>
                      <p>Applications for the 2024 STEM excellence grant are now open for senior students.</p>
                      <div className="sh-ann-footer">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>Yesterday</span>
                      </div>
                    </div>
                    <div className="sh-announcement-card">
                      <span className="sh-tag tag-orange">Security</span>
                      <h4>Scheduled Portal Maintenance</h4>
                      <p>The academic portal will be offline this Saturday from 2 AM to 4 AM for system updates.</p>
                      <div className="sh-ann-footer">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                    <div className="sh-announcement-card editorial-shadow">
                      <span className="sh-tag tag-blue">Academic</span>
                      <h4>Spring Semester Registration Deadline</h4>
                      <p>Ensure all course selections are finalized by Friday, March 15th to avoid late fees.</p>
                      <div className="sh-ann-footer">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="sh-announcement-card border-left-cyan">
                      <span className="sh-tag tag-cyan">Finance</span>
                      <h4>New Scholarship Opportunity: STEM Global</h4>
                      <p>Applications for the 2024 STEM excellence grant are now open for senior students.</p>
                      <div className="sh-ann-footer">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>Yesterday</span>
                      </div>
                    </div>
                    <div className="sh-announcement-card">
                      <span className="sh-tag tag-orange">Security</span>
                      <h4>Scheduled Portal Maintenance</h4>
                      <p>The academic portal will be offline this Saturday from 2 AM to 4 AM for system updates.</p>
                      <div className="sh-ann-footer">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Discover Events Section */}
            <section className="sh-events-section">
              <div className="sh-events-header">
                <div>
                  <h2>Discover Events</h2>
                  <p>Curated workshops and seminars for your profile.</p>
                </div>
                <div className="sh-search-bar">
                  <span className="material-symbols-outlined">search</span>
                  <input placeholder="Filter by keyword..." type="text" />
                </div>
              </div>
              <div className="sh-filter-tabs no-scrollbar">
                <button className="active">Ongoing</button>
                <button>Upcoming</button>
                <button>Completed</button>
                <button>My Workshops</button>
              </div>

              <div className="sh-event-grid">
                {/* Event Card 1 */}
                <div className="sh-event-card editorial-shadow">
                  <div className="sh-event-img-box">
                    <img alt="Collaboration in a modern tech workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDhXv1PQCmOAZnYep-0zDZRFPHW6x_ExRh2dxjV52N6emhbJ2c0fRxlA1-pYfgyPO9YLV8G50R_XLqkDYZHn8pM8Mm3bSHGpBE2KS-LpLaWZt7ALYpRbMOcLejDNwci34HqbgR6rB0_gWB3kwc-6ZYTnS2xrKKa3sOeC2Ip3RXPy65NWQdI9DTsVHy2ttEvuW-qXLRdoNlLOL732A_yq-4vIj6hBh4ri--QKtSXfhbnKxJcUgK27o7wITdX_wuSGIT_LZBPOGDeqs" />
                    <div className="sh-event-tags">
                      <span className="tag-blur-blue">Workshop</span>
                      <span className="tag-blur-green">Live</span>
                    </div>
                  </div>
                  <div className="sh-event-body">
                    <h3>AI in Modern Journalism</h3>
                    <div className="sh-event-meta">
                      <div><span className="material-symbols-outlined">calendar_today</span> March 12, 2024</div>
                      <div><span className="material-symbols-outlined">location_on</span> Room 402</div>
                    </div>
                    <div className="sh-event-footer">
                      <div className="sh-avatar-stack">
                        <img alt="Attendee avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2fYJ40Y5VUwfGiZpuYUP0V03_zXAaJTgakLj5tKxUolthyrP49J1atDIPjuf3a6pDPTXS2c47j-gIx7MQEkVwKwO_CRXLVZRcFK_6qQE5gwAuIf9q_dIxyZvgaEC-Y5R5dpGnyWK5bZNcSaY0BVAVBRGHKkvyE4dEmFTnYDE3NP-AruHF8pyz3exEbvnROHOAIanwPgfBVnv1aRVx0Vldh_W7cC-dEwO5znxDaltM8JTyPiUoJoQ58d27D46meY-C1Xf_hjkdF24" />
                        <img alt="Attendee avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZaTfzJ7QfWA-3PaOBIUh5yu_H5CrEw1EfNArDeQYlZB2WwuKcxRJQ2n6wZEepWTpHFAP4L_CMZvWlnjFfT_JWNC85rdxVR0IFQOR1WhBnzHosHONTFP1ndcU77FWJHjGaBqLq6_yjFqK0jiE3m_D5AjKvvn-xpPfr51pECUXtNE5qmtb2dWiafDjjbYwtf6-vVI8ihe9-Wq2KL8zpHJDuoAQQQowHuw1m9RpOMI7Rjlu1Vj_4eIZxlcXQmfGLRqjGgirr2giC6M" />
                        <img alt="Attendee avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdwOtvguC-Jar1Mkt7Y-EZcs2iOx4X2lPbti4z7W76jAU46Z5bmXKwnI4N10WiJbzOWDYeZxhqtOmSZuRv9JOOSC887NSeGDCESC0UpbxsigqxMACrDcMcjcaNg1D8yPw9yJLxzgOZcJkxwDMACDYM2uMFq86qhKqjPhI-5TjqZ6wLk6TX5J5VrWGfS7Ckmk1xHZUQohT83hXCbxCZMTbehCepUogXK0t_VtQcvE8A-HE8ky_kcnvVxeACIOHO1PIwBCjZxGgLhBs" />
                        <div className="sh-avatar-count">+42</div>
                      </div>
                      <button className="sh-enroll-btn">Enroll <span className="material-symbols-outlined">arrow_forward</span></button>
                    </div>
                  </div>
                </div>

                {/* Event Card 2 */}
                <div className="sh-event-card editorial-shadow">
                  <div className="sh-event-img-box">
                    <img alt="University students discussing research" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOkOStPGpjzdA03cqI0D-oUV52rPXfYSVtPQbTcwxc-y2QJSiYLoVU0zxJzBd4Lx0aLf1ZbIrGDJ_Mc2Vt7LHOBuKe8-7r291PuVRg7ZRnrNM46o9beTErG1BTYV--hkp1ryXBCUJarcrhdM6iOtCOlEKPw7ItMvui8b2PwfurG5ssgRS-uu2vX_XaHhElrDGJbLmAt1FpF4HDmKT9qRY9Haj03-Qr_ewJdifCMYAbFeVqrmNhUtFEm03pZ8X0MeNfC7hDWqGLOxw" />
                    <div className="sh-event-tags">
                      <span className="tag-blur-cyan">Seminar</span>
                      <span className="tag-blur-orange">Filling Fast</span>
                    </div>
                  </div>
                  <div className="sh-event-body">
                    <h3>Sustainable Urban Architecture</h3>
                    <div className="sh-event-meta">
                      <div><span className="material-symbols-outlined">calendar_today</span> March 14, 2024</div>
                      <div><span className="material-symbols-outlined">location_on</span> Great Hall</div>
                    </div>
                    <div className="sh-event-footer">
                      <div className="sh-avatar-stack">
                        <img alt="Attendee avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABUPcyAO6QC4PB2I_-ZVUw2baczCbhQecW4K29Nt0fRccsdsYEgksrcLC8NP2jI6DwcCu5J-Yu1W1wRLWL9UWYUUphlRZvhVFbf95RvGFI4YJCgEuBeSN0dOFhMCL6vYWWMWvJbIpA5Uh-gnIWr3nLPIWdtT4qqinU1hxwCKfYXdrQ6Sj1frheC4cswUNryprkB_D82rVMAVnzdSvGOCy8SNdPh5LywCCAUge8Ncmr6HxKBJwQfglL2_YhQ_8dF-DqcnuqPJH3wyc" />
                        <img alt="Attendee avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSVQXbhywQXFpDSXxNU-HM3dPk-6jgVBOLtonvUesp_bA696dwkHRDxL91jrupBgDeaQqxezZ5oNqpjsYXyuNyorGr-ahyJbz4daaVXSYMlt0zJC1Xup8lSySyVrcDokNGjnwS06cc7JXvvnufZVaLyphvpWuxtJ1fZ36z82FXZ6gETXvi0cAVB6sIQjdUh8ZQkigVxCRSKBZ5DNhCBqE0rcjx6Lt7gZtWliSxoT1Byx6oruILm1oGxugaYQgdfMH7ROU2YAq88RU" />
                        <div className="sh-avatar-count">+115</div>
                      </div>
                      <button className="sh-enroll-btn">Enroll <span className="material-symbols-outlined">arrow_forward</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Student Testimonials Section */}
          <section className="sh-testimonials-section">
            <div className="sh-test-header">
              <h2>Voices of Scholar Pulse</h2>
              <p>Transforming the academic experience, one student at a time.</p>
            </div>
            <div className="sh-test-grid">
              <div className="sh-test-card editorial-shadow">
                <div className="sh-stars">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="sh-test-quote">"The new dashboard has completely changed how I track my research progress. It feels more like a creative workspace than a portal."</p>
                <div className="sh-test-user">
                  <img alt="Female student testimonial" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1fqfHcCCCWgXYpM6qU-_XGIra6GPR1bFlEtNoqoW-kgmY1n3gZqmmmM-JoEmjLMJxIdC9k5OOAph9O-jUayIM1XqDHjOx3OHPAa5ySBqut8LMWcAqIgT-Zp4gNE86NtoFYX6TKi3dEIwGQX5yJU_dTaRPvT-RYsGeXABI5RUrMDjAJZky7sYlbav9x3uQIIemZ0tz4_CL4L5Z3gacgINzSU0b_UyHYhe4UbwMgHqnxKRiug2Ab5Q9b-o2lcxA5dmu9GG0eZtTIuY" />
                  <div>
                    <h4>Elena Rodriguez</h4>
                    <p>PhD Candidate, Digital Arts</p>
                  </div>
                </div>
              </div>

              <div className="sh-test-card editorial-shadow">
                <div className="sh-stars">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="sh-test-quote">"I've never missed an announcement since the upgrade. The notification system and clean UI make everything so easy to find."</p>
                <div className="sh-test-user">
                  <img alt="Male student testimonial" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2_pm1aXoL99xSQ6lVfkJ9LcxyEiOS03drRvXew3MmlZ9K6W6gFfta7Eurh60C9atCDjfzTQ-nX4y_dqZ0VjlkuxxTY6PUT3HErD7YzQv4Q96Y2NAKexted6iD5mwlJBjiERh4lCNP1QM3-Aaq9_jgYtcyuppcremzqwhDeEd63KkQCVdxB0tPY4YD5QhLiCgWi1J9vNDIHBQr3LEwk7o4MrESA4aFXJZj0QlL8G45hEKesLb5Y8oRvV14l2p5g4-snAopcfHVSq4" />
                  <div>
                    <h4>James Wilson</h4>
                    <p>Undergraduate, Computer Science</p>
                  </div>
                </div>
              </div>

              <div className="sh-test-card editorial-shadow">
                <div className="sh-stars">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="sh-test-quote">"The editorial feel of the student hub is amazing. It makes me feel proud to be part of such a forward-thinking institution."</p>
                <div className="sh-test-user">
                  <img alt="Female student testimonial" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUeuTGacJGb3wpe-BfaSOa4E5LJI6Avb-0x1KmEFJdrs7yvSqhpZhBXMPHCiYUFj_U2EGeKfyCfOqw_TfkN9FeSpubBf7PTxNh8dRJBpdzY6b4MGvNr8me3DIm4qQU0zyHsGpqjtXZNdjJSQ1xDC-UwxaviW-QxVaLXOoyiZ5g3ZztNl_VwFyWTmXKlYQZ7RjTmnA56S_LkJSSWq6JzqKTVuewoEcs20Yx6_QLIaFSmHrNa9HabHTI1I8fAWLjDJ-enW19MzskEWM" />
                  <div>
                    <h4>Sarah Chen</h4>
                    <p>Graduate, Global Affairs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sh-test-pagination">
              <button><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
              <div className="sh-page-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <button><span className="material-symbols-outlined">arrow_forward_ios</span></button>
            </div>
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

export default SHomepage;