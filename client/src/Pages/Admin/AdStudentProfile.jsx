import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdStudentProfile.css";

const AdStudentProfile = () => {
    const navigate = useNavigate();
    // We can grab data passed from the View Students page via useLocation later!
    // const { state } = useLocation(); 

    // --- STATIC DUMMY DATA ---
    const studentMeta = {
        name: "Marcus Chen",
        roll: "CS2024042",
        branch: "Computer Science",
        batch: "Class of 2024",
        semester: "Sem 6 (Junior)",
        status: "Active Enrolment",
        mentor: "Dr. Elena Sterling",
        holisticStatus: "EXCEPTIONAL",
        totalCredits: 85,
        requiredCredits: 100,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWO8dJIcJyf_Xm9Nm0LMzo6Y2z5cMHWdLUIH6UewPfJYfu9mHxQWg7wOKsA8gIA_VWWb668eJ5AVoUUmsVAZJN-W5vtiHTxff18ogpeNcgc9U6Hb3ovrLlvOYuUfhVkVg23U32TU6XvBe60Im7Xz9DsbwygCOo38J0YC_am8v1hQM5-nAczH631uR6jy0CYmqmurjs66tNugsuCYXwBJwYIjheW5vFlPwnlNFaDs7IxHyrUCV2mexXQwMI4DNjqVHXcsPKBR7EUzU"
    };

    const creditCategories = [
        { id: 1, name: "Technical Mastery", current: 25, max: 30, colorClass: "bg-primary", textClass: "text-primary" },
        { id: 2, name: "Cultural & Literary", current: 15, max: 20, colorClass: "bg-secondary", textClass: "text-secondary" },
        { id: 3, name: "Social Impact", current: 10, max: 15, colorClass: "bg-tertiary", textClass: "text-tertiary" },
        { id: 4, name: "Sports & Wellbeing", current: 20, max: 20, colorClass: "bg-gradient-blue", textClass: "text-primary-dim" },
        { id: 5, name: "Professional Internships", current: 15, max: 15, colorClass: "bg-cyan", textClass: "text-cyan" }
    ];

    const auditTrail = [
        { id: 1, title: "Hackathon: Global AI Summit", subtitle: "First Runner Up", category: "Technical", catColor: "cat-blue", date: "Oct 12, 2023", credits: "5.0", status: "Approved", approvedBy: "Dr. Elena Sterling" },
        { id: 2, title: "Varsity Football Tournament", subtitle: "Team Captain", category: "Sports", catColor: "cat-orange", date: "Nov 05, 2023", credits: "4.0", status: "Approved", approvedBy: "Coach Ryan Miller" },
        { id: 3, title: "TechCorp Summer Internship", subtitle: "Backend Development Intern", category: "Internship", catColor: "cat-cyan", date: "Aug 20, 2023", credits: "15.0", status: "Approved", approvedBy: "Dr. Elena Sterling" },
        { id: 4, title: "Community Literacy Drive", subtitle: "Volunteer Lead", category: "Social Impact", catColor: "cat-brown", date: "Dec 15, 2023", credits: "3.5", status: "Approved", approvedBy: "Prof. Sarah Jenkins" }
    ];

    // --- HELPER COMPONENT FOR THE MAIN RING ---
    const BigCircularProgress = ({ current, max }) => {
        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        const percentage = Math.min((current / max) * 100, 100);
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="asp-big-ring-wrapper">
                <svg viewBox="0 0 200 200" className="asp-big-svg">
                    <circle className="asp-ring-bg" cx="100" cy="100" r={radius}></circle>
                    <circle className="asp-ring-fill" cx="100" cy="100" r={radius} strokeDasharray={circumference} strokeDashoffset={offset}></circle>
                </svg>
                <div className="asp-ring-text">
                    <span className="asp-ring-score">{current}</span>
                    <span className="asp-ring-max">/ {max} CREDITS</span>
                </div>
                <div className="asp-ring-icon"><span className="material-symbols-outlined">trending_up</span></div>
            </div>
        );
    };

    return (
        <div className="asp-page-wrapper">
            <AdNavbar />

            <main className="asp-main-content">

                {/* --- HEADER --- */}
                <div className="asp-header">
                    <div>
                        <nav className="asp-breadcrumbs">
                            <span onClick={() => navigate('/aHomepage')}>Dashboard</span>
                            <span>/</span>
                            <span onClick={() => navigate('/ad-view-students')}>Students</span>
                            <span>/</span>
                            <span className="current">{studentMeta.name}</span>
                        </nav>
                        <h1 className="asp-title">Student Holistic Profile</h1>
                    </div>
                    <div className="asp-header-actions">
                        <button className="asp-btn-outline">
                            <span className="material-symbols-outlined">download</span> Full Transcript
                        </button>
                        <button className="asp-btn-primary">
                            <span className="material-symbols-outlined">verified</span> Finalize Credit Audit
                        </button>
                    </div>
                </div>

                {/* --- TOP GRID: IDENTITY & PROGRESS --- */}
                <section className="asp-top-grid">

                    {/* Identity Card */}
                    <div className="asp-identity-card">
                        <div className="asp-profile-img-container">
                            <img src={studentMeta.avatar} alt={studentMeta.name} />
                        </div>
                        <h2>{studentMeta.name}</h2>
                        <p className="asp-roll-text">Roll: {studentMeta.roll}</p>

                        <div className="asp-badge-row">
                            <span className="asp-mentor-badge">
                                <span className="material-symbols-outlined">person</span> Mentor: {studentMeta.mentor}
                            </span>
                            <span className="asp-status-badge">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {studentMeta.holisticStatus}
                            </span>
                        </div>

                        <div className="asp-meta-grid">
                            <div className="asp-meta-item">
                                <label>Branch</label>
                                <p>{studentMeta.branch}</p>
                            </div>
                            <div className="asp-meta-item">
                                <label>Batch</label>
                                <p>{studentMeta.batch}</p>
                            </div>
                            <div className="asp-meta-item">
                                <label>Semester</label>
                                <p>{studentMeta.semester}</p>
                            </div>
                            <div className="asp-meta-item">
                                <label>Status</label>
                                <p className="text-secondary">{studentMeta.status}</p>
                            </div>
                        </div>
                    </div>

                    {/* Credit Ecosystem Card */}
                    <div className="asp-ecosystem-card">
                        <BigCircularProgress current={studentMeta.totalCredits} max={studentMeta.requiredCredits} />

                        <div className="asp-breakdown-container">
                            <h3>Credit Distribution Breakdown</h3>

                            <div className="asp-bars-wrapper">
                                {creditCategories.map(cat => (
                                    <div className="asp-bar-group" key={cat.id}>
                                        <div className="asp-bar-labels">
                                            <span className="asp-bar-title">{cat.name}</span>
                                            <span className={`asp-bar-score ${cat.textClass}`}>{cat.current} / {cat.max}</span>
                                        </div>
                                        <div className="asp-bar-track">
                                            <div className={`asp-bar-fill ${cat.colorClass}`} style={{ width: `${(cat.current / cat.max) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </section>

                {/* --- AUDIT TRAIL TABLE --- */}
                <section className="asp-audit-section">
                    <div className="asp-audit-header">
                        <h3>Academic Audit Trail</h3>
                        <div className="asp-audit-filters">
                            <div className="asp-search-box">
                                <span className="material-symbols-outlined">filter_list</span>
                                <input type="text" placeholder="Filter by activity..." />
                            </div>
                            <select>
                                <option>All Categories</option>
                                <option>Technical</option>
                                <option>Cultural</option>
                                <option>Sports</option>
                            </select>
                        </div>
                    </div>

                    <div className="asp-table-container">
                        <table className="asp-table">
                            <thead>
                                <tr>
                                    <th>Activity Name</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Credits</th>
                                    <th>Status</th>
                                    <th>Approved By</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditTrail.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <p className="asp-activity-title">{item.title}</p>
                                            <p className="asp-activity-sub">{item.subtitle}</p>
                                        </td>
                                        <td><span className={`asp-cat-pill ${item.catColor}`}>{item.category}</span></td>
                                        <td className="asp-date-cell">{item.date}</td>
                                        <td className="asp-credit-cell">{item.credits}</td>
                                        <td>
                                            <div className="asp-status-cell">
                                                <span className="material-symbols-outlined">check_circle</span> {item.status}
                                            </div>
                                        </td>
                                        <td className="asp-approver-cell">{item.approvedBy}</td>
                                        <td className="text-right">
                                            <button className="asp-btn-icon" title="View Proof">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="asp-pagination">
                            <p>Showing {auditTrail.length} of 12 Entries</p>
                            <div className="asp-page-btns">
                                <button disabled>Previous</button>
                                <button className="active">Next</button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default AdStudentProfile;