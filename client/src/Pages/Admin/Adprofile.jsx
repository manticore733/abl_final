import React, { useState } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdProfile.css";

const AdProfile = () => {
  // --- STATIC DUMMY DATA (Ready for API integration) ---
  const [adminData, setAdminData] = useState({
    name: "Dean Sarah Jenkins",
    role: "Dean of Academic Affairs",
    email: "s.jenkins@scholarpulse.edu",
    phone: "+1 (555) 892-4431",
    office: "Founders Hall, Suite 402",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9tymg20Pmi_mOlhVLbc299IMCCrVLW24mzafDCzKZB4az4vKsfaMcAGo33SCfRGSMwJfoKVxjorXxEkZmFbAMgR1j8aWujySDCjbSF8bwyazXamZ7Ggkhk22UcWnH-zVUT39V_YChvrcto_0q41RN9zvK01lf9_sgTQyR6zb-Q0zf5mO15QFwtoAZ3PUl4EIsgd46i0j_Y5ouUNUVKZRHSmcY03erREUe7_sSJjMrgLPY3_blgZFG011hliu_p-PM7CWjsGzune4",
    expertise: ["Curriculum Design", "Faculty Governance", "Strategic Planning", "Student Success"]
  });

  const [impactStats, setImpactStats] = useState({
    totalStudents: "12,482",
    studentGrowth: "+4.2%",
    activeMentors: "412",
  });

  const [recentUpdates, setRecentUpdates] = useState([
    { id: 1, title: "Revised 2024 Tenure Policy Draft", time: "Modified 4 hours ago", dept: "Regulatory Affairs", icon: "description" },
    { id: 2, title: "Approved Faculty Grant Allocations", time: "Modified Yesterday", dept: "Financial Services", icon: "verified" },
    { id: 3, title: "Updated Department Head Directory", time: "Modified 2 days ago", dept: "HR Systems", icon: "assignment_ind" }
  ]);

  return (
    <div className="ap-page-wrapper">
      <AdNavbar />

      <main className="ap-main-content">
        <div className="ap-grid-container">

          {/* --- LEFT COLUMN: PROFILE CARD & EXPERTISE --- */}
          <div className="ap-left-column">

            {/* Main Profile Card */}
            <div className="ap-profile-card group">
              <span className="material-symbols-outlined ap-watermark">verified_user</span>

              <div className="ap-profile-content">
                <div className="ap-avatar-wrapper">
                  <img src={adminData.avatar} alt={adminData.name} />
                </div>

                <h1 className="ap-name">{adminData.name}</h1>
                <p className="ap-role">{adminData.role}</p>

                <div className="ap-contact-list">
                  <div className="ap-contact-item">
                    <div className="ap-contact-icon"><span className="material-symbols-outlined">mail</span></div>
                    <div className="ap-contact-text">
                      <p className="ap-contact-label">Professional Email</p>
                      <p className="ap-contact-value">{adminData.email}</p>
                    </div>
                  </div>

                  <div className="ap-contact-item">
                    <div className="ap-contact-icon"><span className="material-symbols-outlined">call</span></div>
                    <div className="ap-contact-text">
                      <p className="ap-contact-label">Direct Office Line</p>
                      <p className="ap-contact-value">{adminData.phone}</p>
                    </div>
                  </div>

                  <div className="ap-contact-item">
                    <div className="ap-contact-icon"><span className="material-symbols-outlined">location_on</span></div>
                    <div className="ap-contact-text">
                      <p className="ap-contact-label">Campus Office</p>
                      <p className="ap-contact-value">{adminData.office}</p>
                    </div>
                  </div>
                </div>

                <button className="ap-btn-edit">
                  <span className="material-symbols-outlined">edit</span> Edit Executive Profile
                </button>
              </div>
            </div>

            {/* Expertise Focus */}
            <div className="ap-expertise-card">
              <h3>Expertise Focus</h3>
              <div className="ap-expertise-tags">
                {adminData.expertise.map((skill, index) => (
                  <span key={index} className="ap-tag">{skill}</span>
                ))}
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: IMPACT & ACTIVITY --- */}
          <div className="ap-right-column">

            {/* Institutional Impact */}
            <section className="ap-impact-section">
              <div className="ap-section-header">
                <h2>Institutional Impact</h2>
                <div className="ap-divider"></div>
                <span className="ap-q-badge">Q3 Performance</span>
              </div>

              <div className="ap-impact-grid">
                {/* Impact Card 1 */}
                <div className="ap-impact-card">
                  <div className="ap-impact-top">
                    <div className="ap-impact-icon bg-primary-light text-primary">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <span className="ap-impact-trend text-primary">
                      <span className="material-symbols-outlined">trending_up</span> {impactStats.studentGrowth}
                    </span>
                  </div>
                  <div className="ap-impact-bottom">
                    <p className="ap-impact-value">{impactStats.totalStudents}</p>
                    <p className="ap-impact-label">Total Students under Jurisdiction</p>
                  </div>
                </div>

                {/* Impact Card 2 */}
                <div className="ap-impact-card">
                  <div className="ap-impact-top">
                    <div className="ap-impact-icon bg-tertiary-light text-tertiary">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <span className="ap-impact-trend text-tertiary">Active Now</span>
                  </div>
                  <div className="ap-impact-bottom">
                    <p className="ap-impact-value">{impactStats.activeMentors}</p>
                    <p className="ap-impact-label">Active Academic Mentors</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent System Updates */}
            <section className="ap-updates-section">
              <div className="ap-section-header">
                <h2>Recent System Updates</h2>
                <div className="ap-divider"></div>
              </div>

              <div className="ap-updates-list">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="ap-update-item">
                    <div className="ap-update-info">
                      <div className="ap-update-icon">
                        <span className="material-symbols-outlined">{update.icon}</span>
                      </div>
                      <div>
                        <p className="ap-update-title">{update.title}</p>
                        <p className="ap-update-meta">{update.time} • {update.dept}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined ap-arrow-icon">arrow_forward_ios</span>
                  </div>
                ))}

                <button className="ap-btn-view-log">
                  View Full Activity Log <span className="material-symbols-outlined">history</span>
                </button>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
};

export default AdProfile;