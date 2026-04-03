import React, { forwardRef } from 'react';
import './css/StudentReportTemplate.css';

const StudentReportTemplate = forwardRef(({ student, mentor, statistics, activities }, ref) => {

    if (!student || !statistics) return null;

    // Perfect Pentagon Coordinates for Radar Chart
    const axes = [
        { key: "Technical", x: 50, y: 5 },
        { key: "Social", x: 95, y: 38 },
        { key: "Sports", x: 78, y: 88 },
        { key: "Cultural", x: 22, y: 88 },
        { key: "Internships", x: 5, y: 38 }
    ];
    const maxVal = Math.max(...axes.map(a => statistics.eventCounts[a.key] || 0), 1);

    const dataPoints = axes.map(axis => {
        const val = statistics.eventCounts[axis.key] || 0;
        const ratio = Math.max(val / maxVal, 0.05); // Smallest visible point
        return { px: 50 + (axis.x - 50) * ratio, py: 50 + (axis.y - 50) * ratio };
    });
    const polygonString = dataPoints.map(p => `${p.px},${p.py}`).join(" ");

    const approvedActivities = activities?.filter(act => act.status === 'Approved') || [];
    const totalActivities = Object.values(statistics.statusCounts || {}).reduce((a, b) => a + b, 0);
    const estimatedGPA = student.total_credits ? (student.total_credits / 20).toFixed(2) : "0.00";

    return (
        <div ref={ref} className="srt-document">
            {/* Header */}
            <header className="srt-header srt-avoid-break">
                <div className="srt-header-text">
                    <h1>Academic Performance Report</h1>
                    <p>Official University Document</p>
                </div>
            </header>

            <div className="srt-body">
                {/* Profile Identity */}
                <div className="srt-profile-section srt-avoid-break">
                    <div className="srt-profile-info">
                        <div className="srt-uni-title">
                            <label>Institution</label>
                            <h2>Scholar Pulse University</h2>
                        </div>
                        <div className="srt-info-grid">
                            <div>
                                <label>Student Name</label>
                                <p>{student.name}</p>
                            </div>
                            <div>
                                <label>Roll Number</label>
                                <p>{student.s_username}</p>
                            </div>
                            <div>
                                <label>Academic Semester</label>
                                <p>Semester {student.semester} ({new Date().getFullYear()})</p>
                            </div>
                            <div>
                                <label>Degree Program</label>
                                <p>B.Tech {student.department || "Engineering"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="srt-avatar-wrapper">
                        <img src={student.profile_picture || "https://lh3.googleusercontent.com/aida-public/AB6AXuB6vjvjSn13E7IPPmo22I-bczeZkkdI58R2mdlygVgEA6lSl9YjMMYkwY6uinVH4QfjI9ApIRbyvZVeSYEUg7XzgqaoQpD4yTM0GvHYEqUZqhCq1dFU6J6ICQCJteLWJV6aiPgscVL8WXFOpDqO8wB-FUle6KVSO3zBZM54lxaG4UqVEeDR2K3US5YpeqpyuHWnziyVKXznVNZDFaZn1HuaVmP7uq1SLmNvnj-oMltpTf_0s0L-PJGRjHm_rTfdQw7MAvdXV6jxlws"} alt="Student" />
                        <div className="srt-crest"><span className="material-symbols-outlined">school</span></div>
                    </div>
                </div>

                {/* KPI Bento */}
                <div className="srt-kpi-row srt-avoid-break">
                    <div className="srt-kpi-card srt-kpi-light">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        <div className="srt-kpi-text">
                            <h3>{student.total_credits}<span className="srt-kpi-sub">/200</span></h3>
                            <label>Total Credits</label>
                        </div>
                    </div>
                    <div className="srt-kpi-card srt-kpi-solid">
                        <span className="material-symbols-outlined">stars</span>
                        <div className="srt-kpi-text">
                            <h3>{estimatedGPA}</h3>
                            <label>Estimated GPA</label>
                        </div>
                    </div>
                    <div className="srt-kpi-card srt-kpi-light">
                        <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
                        <div className="srt-kpi-text">
                            <h3>{totalActivities}</h3>
                            <label>Total Activities</label>
                        </div>
                    </div>
                </div>

                {/* Visualizations */}
                <div className="srt-charts-row srt-avoid-break">
                    <div className="srt-chart-col">
                        <h4 className="srt-section-title"><span className="srt-dot bg-primary"></span> Skill Distribution</h4>
                        <div className="srt-chart-box">
                            <svg viewBox="0 0 100 100" className="srt-radar-svg">
                                {/* Web Backgrounds */}
                                <polygon points="50,5 95,38 78,88 22,88 5,38" className="srt-radar-bg" />
                                <polygon points="50,20 80,42 68,76 32,76 20,42" className="srt-radar-bg" />
                                <polygon points="50,35 65,46 58,64 42,64 35,46" className="srt-radar-bg" />
                                {/* Cross Lines */}
                                <line x1="50" y1="50" x2="50" y2="5" className="srt-radar-line" />
                                <line x1="50" y1="50" x2="95" y2="38" className="srt-radar-line" />
                                <line x1="50" y1="50" x2="78" y2="88" className="srt-radar-line" />
                                <line x1="50" y1="50" x2="22" y2="88" className="srt-radar-line" />
                                <line x1="50" y1="50" x2="5" y2="38" className="srt-radar-line" />
                                {/* Data Polygon */}
                                <polygon points={polygonString} className="srt-radar-data" />
                                {/* Data Dots */}
                                {dataPoints.map((p, i) => <circle key={i} cx={p.px} cy={p.py} r="2" fill="#0053cc" />)}
                            </svg>
                            <span className="srt-rad-lbl srt-lbl-tech">Technical</span>
                            <span className="srt-rad-lbl srt-lbl-soc">Social</span>
                            <span className="srt-rad-lbl srt-lbl-spt">Sports</span>
                            <span className="srt-rad-lbl srt-lbl-cul">Cultural</span>
                            <span className="srt-rad-lbl srt-lbl-int">Internship</span>
                        </div>
                    </div>

                    <div className="srt-chart-col">
                        <h4 className="srt-section-title"><span className="srt-dot bg-cyan"></span> 8-Semester Trend</h4>
                        <div className="srt-chart-box">
                            <div className="srt-trend-chart">
                                {Array.from({ length: 8 }, (_, i) => {
                                    const sem = (i + 1).toString();
                                    const val = statistics.semesterWiseEvents[sem] ? Object.values(statistics.semesterWiseEvents[sem]).reduce((a, b) => a + b, 0) : 0;
                                    const trendMax = Math.max(...Object.values(statistics.semesterWiseEvents || {}).map(o => Object.values(o).reduce((a, b) => a + b, 0)), 1);
                                    const height = val > 0 ? (val / trendMax) * 100 : 5;
                                    return (
                                        <div className="srt-trend-bar-group" key={sem}>
                                            <span className="srt-trend-val">{val > 0 ? val : ''}</span>
                                            <div className={`srt-trend-bar ${val === trendMax && val > 0 ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${height}%` }}></div>
                                            <span className="srt-trend-label">S{sem}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Ledger Table */}
                <div className="srt-ledger-section">
                    <h4 className="srt-section-title srt-avoid-break"><span className="srt-dot bg-tertiary"></span> Activity Ledger</h4>
                    <table className="srt-table">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Activity Name</th>
                                <th>Category</th>
                                <th>Points</th>
                                <th>Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {approvedActivities.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No approved activities found.</td></tr>
                            ) : (
                                approvedActivities.map((act, idx) => (
                                    <tr key={act.id} className="srt-avoid-break">
                                        <td>{(idx + 1).toString().padStart(3, '0')}</td>
                                        <td className="srt-fw-bold">{act.event_name}</td>
                                        <td><span className={`srt-badge srt-badge-${act.event_type?.toLowerCase()}`}>{act.event_type}</span></td>
                                        <td className="srt-text-primary srt-fw-bold">{act.allocated_points}</td>
                                        <td>{act.participation_date}</td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer / Signatures */}
            <footer className="srt-footer srt-avoid-break">
                <div className="srt-footer-left">
                    <label>Document Verified On</label>
                    <p>{new Date().toUTCString()}</p>
                </div>
                <div className="srt-footer-right">
                    <div className="srt-signature">
                        <span>{mentor.name || "Mentor"}</span>
                    </div>
                    <label>Assigned Academic Mentor</label>
                    <p>Scholar Pulse University Editorial Office</p>
                </div>
            </footer>
        </div>
    );
});

export default StudentReportTemplate;