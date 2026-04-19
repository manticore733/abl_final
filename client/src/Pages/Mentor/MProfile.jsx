import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import html2pdf from "html2pdf.js";
import MNavbar from "../../Components/MentorC/MNavbar";
import { useToast } from "../../Components/ToastContext";
import StudentReportTemplate from './StudentReportTemplate';
import "./css/mProfile.css";

const MProfile = () => {
  const { showToast } = useToast();
  const barChartRef = useRef(null);
  const reportTemplateRef = useRef(null);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("All");

  const [mentorInfo, setMentorInfo] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentStatistics, setStudentStatistics] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const [filteredEventCounts, setFilteredEventCounts] = useState({});
  const [filteredSemesterWiseEvents, setFilteredSemesterWiseEvents] = useState({});

  // --- NEW: Preview State ---
  const [reportActivities, setReportActivities] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const mentorId = sessionStorage.getItem("mentorId");
    const mentorName = sessionStorage.getItem("username");

    if (!mentorId || !mentorName) {
      showToast('error', 'Auth Error', 'Mentor information is missing in session.');
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [mentorRes, studentRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/mentor/mentor/profile/${mentorId}`),
          axios.get(`http://localhost:5000/api/mentor/allstudentsformentor/${mentorId}`)
        ]);

        setMentorInfo(mentorRes.data);
        setStudentsList(studentRes.data.students || []);
      } catch (err) {
        showToast('error', 'Sync Error', 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [showToast]);

  const handleViewStatistics = async (student) => {
    setSelectedStudent(student);
    setLoadingStats(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/mentor/student-statistics/${student.s_id}`);
      const data = response.data;

      if (!data.eventCounts || !data.semesterWiseEvents || !data.statusCounts) {
        showToast('error', 'Data Error', 'Incomplete statistics for this student.');
        return;
      }

      setStudentStatistics(data);
      setFilteredEventCounts(data.eventCounts);
      setFilteredSemesterWiseEvents(data.semesterWiseEvents);
      setSelectedSemester("All");

      setTimeout(() => {
        barChartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      showToast('error', 'Fetch Error', 'Failed to load student statistics.');
    } finally {
      setLoadingStats(false);
    }
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);

    if (!studentStatistics) return;

    if (semester === "All") {
      setFilteredEventCounts(studentStatistics.eventCounts);
      setFilteredSemesterWiseEvents(studentStatistics.semesterWiseEvents);
    } else {
      const semesterData = studentStatistics.semesterWiseEvents[semester] || {};
      setFilteredEventCounts(semesterData);
      setFilteredSemesterWiseEvents({ [semester]: semesterData });
    }
  };


  const handleOpenPreview = async () => {
    if (!selectedStudent || !studentStatistics) return showToast('error', 'Selection Required', 'Select a student first.');
    showToast('info', 'Loading Preview', 'Fetching complete activity ledger...');

    try {
      const res = await axios.get(`http://localhost:5000/api/mentor/student-processed-activities/${selectedStudent.s_id}`);
      setReportActivities(res.data || []);
      setShowPreview(true); // Open the modal!
    } catch (error) {
      showToast('error', 'Fetch Failed', 'Could not compile the preview.');
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    showToast('info', 'Generating PDF', 'Formatting official document...');

    try {
      const element = reportTemplateRef.current;


      const originalStyle = element.style.cssText;
      element.style.width = '850px';
      element.style.maxWidth = '850px';
      element.style.overflow = 'visible';

      const opt = {
        margin: 0,
        filename: `${selectedStudent.s_username}_Academic_Report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          windowWidth: 850,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'px', format: [850, 1200], orientation: 'portrait' }, // 👈 Custom page size matching template
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();

      // 👇 Restore original styles
      element.style.cssText = originalStyle;

      showToast('success', 'Download Complete', 'PDF Report successfully generated.');
      setShowPreview(false);
    } catch (error) {
      showToast('error', 'Generation Failed', 'Could not compile the PDF report.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // --- SVG/CSS Chart Math Helpers ---
  const calculateDoughnut = (counts) => {
    const approved = counts?.Approved || 0;
    const pending = counts?.Pending || 0;
    const rejected = counts?.Rejected || 0;
    const total = approved + pending + rejected || 1;
    return {
      total: total === 1 && approved === 0 ? 0 : total,
      appPct: (approved / total) * 100,
      penPct: (pending / total) * 100,
      rejPct: (rejected / total) * 100,
    };
  };

  const generateRadarPoints = () => {
    const axes = [
      { key: "Technical", x: 50, y: 10 }, { key: "Social", x: 90, y: 38 },
      { key: "Sports", x: 75, y: 85 }, { key: "Cultural", x: 25, y: 85 }, { key: "Internships", x: 10, y: 38 }
    ];
    const maxVal = Math.max(...axes.map(a => filteredEventCounts[a.key] || 0), 1);
    const dataPoints = axes.map(axis => {
      const val = filteredEventCounts[axis.key] || 0;
      const ratio = Math.max(val / maxVal, 0.1);
      return { px: 50 + (axis.x - 50) * ratio, py: 50 + (axis.y - 50) * ratio, val, key: axis.key };
    });
    const polygonString = dataPoints.map(p => `${p.px},${p.py}`).join(" ");
    return { polygonString, dataPoints, axes };
  };

  const statusData = studentStatistics ? calculateDoughnut(studentStatistics.statusCounts) : { total: 0, appPct: 0, penPct: 0, rejPct: 0 };
  const radarData = generateRadarPoints();

  return (
    <div className="mp-page-wrapper">
      <MNavbar />

      <main className="mp-main-content">

        {/* Section 1: Hero & Action Card */}
        <section className="mp-hero-section">
          <div className="mp-hero-flex">

            <div className="mp-profile-card">
              <div className="mp-card-bg-accent"></div>
              <div className="mp-profile-identity">
                <div className="mp-avatar-box">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEJcquxrH7y_cQnVXrC6n6nJ8aF_j0fr9oxC_7TEJghpZyVHkUCWt43GBaQEZu3akDGiGNfY1LjcY9q2L7tzQBARICe_4s-LMUEcJvrYc61BCJjIh3PqHO3iG_wNpafKYTGvXZAEv4l3QkaBnMOBPf5xveHeYYW_b1ZLDVMtnAGFz_RgzXfbixHFu1-TTLqUnkKrtyqpH47wEVyMCMIAhhN40s3U61tnkm8-ux1rPzlpjraBlv5sRIRYYIJKUfZy72T1D2S0dv-9w" alt="Mentor" />
                  <div className="mp-verified-badge"><span className="material-symbols-outlined">verified</span></div>
                </div>
                <div className="mp-profile-text">
                  <h1>{sessionStorage.getItem("username") || "Mentor Name"}</h1>
                  <p className="text-primary">{mentorInfo?.m_branch ? `Department of ${mentorInfo.m_branch}` : "Academic Department"}</p>
                </div>
              </div>

              <div className="mp-profile-stats">
                <div className="mp-stat-box"><label>Batch</label><p>{mentorInfo?.m_batch || "—"}</p></div>
                <div className="mp-stat-box"><label>Semester</label><p>{mentorInfo?.m_sem || "—"}</p></div>
                <div className="mp-stat-box"><label>Section</label><p>{mentorInfo?.m_csec || "—"}</p></div>
                <div className="mp-stat-box highlight"><label>Students</label><p>{studentsList.length}</p></div>
              </div>
            </div>

            <div className="mp-action-card">
              <div className="mp-action-icon"><span className="material-symbols-outlined">analytics</span></div>
              <h3>Academic Report</h3>
              <p>Generate a comprehensive summary for the selected student.</p>
              <div className="mp-action-buttons">
                {/* Changed this button to open the Preview Modal instead! */}
                <button className="mp-btn-generate" onClick={handleOpenPreview} disabled={!selectedStudent}>
                  <span className="material-symbols-outlined">preview</span> Preview Report
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Student Performance Oversight */}
        <section className="mp-table-section">
          <div className="mp-panel editorial-shadow">
            <div className="mp-panel-header">
              <div>
                <h2>Student Performance Oversight</h2>
                <p>Real-time monitoring of credit accumulation and status</p>
              </div>
            </div>

            <div className="mp-table-wrapper">
              <table className="mp-table">
                <thead>
                  <tr>
                    <th>Sr No</th><th>Roll Number</th><th>Name</th><th>Division</th><th>Total Credits</th><th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6" className="text-center py-8">Loading students...</td></tr>
                  ) : studentsList.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-8">No students assigned to your batch.</td></tr>
                  ) : (
                    studentsList.map((student, index) => {
                      const maxTarget = 200;
                      const progressPct = Math.min((student.total_credits / maxTarget) * 100, 100);
                      const isLow = progressPct < 40;

                      return (
                        <tr key={student.s_id} className={selectedStudent?.s_id === student.s_id ? 'active-row' : ''}>
                          <td className="mp-td-sr">{(index + 1).toString().padStart(2, '0')}</td>
                          <td className="mp-td-mono">{student.s_username}</td>
                          <td className="font-bold">{student.name}</td>
                          <td>{student.division}</td>
                          <td>
                            <div className="mp-progress-cell">
                              <div className="mp-progress-track">
                                <div className={`mp-progress-fill ${isLow ? 'bg-tertiary' : 'bg-primary'}`} style={{ width: `${progressPct}%` }}></div>
                              </div>
                              <span className={isLow ? 'text-tertiary' : ''}>{student.total_credits}</span>
                            </div>
                          </td>
                          <td className="text-right">
                            <button className="mp-btn-details" onClick={() => handleViewStatistics(student)}>Details</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Analytical Charts (Conditional) */}
        {selectedStudent && (
          <section className="mp-analytics-section" ref={barChartRef}>
            <div className="mp-analytics-header">
              <h2>Academic Analytics</h2>
              <div className="mp-filter-group">
                <span className="mp-filter-label">Filter Period:</span>
                <select className="mp-filter-select" value={selectedSemester} onChange={handleSemesterChange}>
                  <option value="All">All Semesters</option>
                  {Array.from({ length: 8 }, (_, i) => (<option key={i + 1} value={(i + 1).toString()}>Semester {i + 1}</option>))}
                </select>
              </div>
            </div>

            {loadingStats ? (
              <div className="mp-loading-box">Generating Analytics Engine...</div>
            ) : (
              <div className="mp-charts-grid">

                {/* Chart 1: Participation by Type (SVG Radar Chart) */}
                <div className="mp-chart-card editorial-shadow">
                  <h3><span className="material-symbols-outlined text-primary">diversity_3</span> Participation by Type</h3>
                  <div className="mp-radar-wrapper">
                    <svg viewBox="0 0 100 100" className="mp-radar-svg">
                      <polygon points="50,10 90,38 75,85 25,85 10,38" className="mp-radar-bg" />
                      <line x1="50" y1="50" x2="50" y2="10" className="mp-radar-line" />
                      <line x1="50" y1="50" x2="90" y2="38" className="mp-radar-line" />
                      <line x1="50" y1="50" x2="75" y2="85" className="mp-radar-line" />
                      <line x1="50" y1="50" x2="25" y2="85" className="mp-radar-line" />
                      <line x1="50" y1="50" x2="10" y2="38" className="mp-radar-line" />
                      <polygon points={radarData.polygonString} className="mp-radar-data" />
                      {radarData.dataPoints.map((p, idx) => (
                        <circle key={idx} cx={p.px} cy={p.py} r="2.5" className="mp-radar-dot">
                          <title>{`${p.key}: ${p.val} Activities`}</title>
                        </circle>
                      ))}
                    </svg>
                    <div className="mp-radar-labels">
                      <span className="rad-lbl label-tech">TECHNICAL</span><span className="rad-lbl label-soc">SOCIAL</span><span className="rad-lbl label-spt">SPORTS</span><span className="rad-lbl label-cul">CULTURAL</span><span className="rad-lbl label-int">INTERNSHIPS</span>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Status Breakdown (SVG Doughnut) */}
                <div className="mp-chart-card editorial-shadow">
                  <h3><span className="material-symbols-outlined text-primary">donut_large</span> Activity Status Breakdown</h3>
                  <div className="mp-doughnut-wrapper">
                    <div className="mp-svg-container">
                      <svg viewBox="0 0 36 36" className="mp-circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        {statusData.appPct > 0 && <path className="circle-app" strokeDasharray={`${statusData.appPct}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />}
                        {statusData.penPct > 0 && <path className="circle-pen" strokeDasharray={`${statusData.penPct}, 100`} strokeDashoffset={`-${statusData.appPct}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />}
                        {statusData.rejPct > 0 && <path className="circle-rej" strokeDasharray={`${statusData.rejPct}, 100`} strokeDashoffset={`-${statusData.appPct + statusData.penPct}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />}
                      </svg>
                      <div className="mp-doughnut-center">
                        <span className="mp-d-num">{statusData.total}</span><span className="mp-d-lbl">Total Tasks</span>
                      </div>
                    </div>
                    <div className="mp-legend">
                      <div className="mp-leg-col text-center"><div className="mp-dot bg-primary mx-auto mb-1"></div><p>{Math.round(statusData.appPct)}% Approved</p></div>
                      <div className="mp-leg-col text-center"><div className="mp-dot bg-orange mx-auto mb-1"></div><p>{Math.round(statusData.penPct)}% Pending</p></div>
                      <div className="mp-leg-col text-center"><div className="mp-dot bg-error mx-auto mb-1"></div><p>{Math.round(statusData.rejPct)}% Rejected</p></div>
                    </div>
                  </div>
                </div>

                {/* Chart 3: 8-Semester Trend */}
                <div className="mp-chart-card editorial-shadow">
                  <h3><span className="material-symbols-outlined text-primary">show_chart</span> 8-Semester Trend</h3>
                  <div className="mp-trend-container">
                    <div className="mp-trend-chart">
                      {Array.from({ length: 8 }, (_, i) => {
                        const sem = (i + 1).toString();
                        const val = studentStatistics?.semesterWiseEvents[sem] ? Object.values(studentStatistics.semesterWiseEvents[sem]).reduce((a, b) => a + b, 0) : 0;
                        const trendMax = Math.max(...Object.values(studentStatistics?.semesterWiseEvents || {}).map(o => Object.values(o).reduce((a, b) => a + b, 0)), 1);
                        const height = val > 0 ? (val / trendMax) * 100 : 10;
                        return (
                          <div className="mp-trend-bar-group" key={sem} title={`Sem ${sem}: ${val}`}>
                            <div className={`mp-trend-bar ${val === trendMax && val > 0 ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${height}%` }}></div>
                            <span>S{sem}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mp-trend-insight">
                      <span className="material-symbols-outlined text-primary">trending_up</span>
                      <p>Participation has grown by <strong>24%</strong> compared to the previous semester.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </section>
        )}

      </main>

      {/* --- NEW: THE PREVIEW MODAL --- */}
      {showPreview && (
        <div className="mp-preview-overlay">
          <div className="mp-preview-modal">

            <div className="mp-preview-toolbar">
              <h3>Report Preview <span className="preview-pill">A4 Format</span></h3>
              <div className="mp-preview-actions">
                <button className="mp-btn-cancel" onClick={() => setShowPreview(false)}>Cancel</button>
                <button className="mp-btn-download" onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
                  <span className="material-symbols-outlined">download</span>
                  {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                </button>
              </div>
            </div>

            {/* Scrollable Preview Area */}
            <div className="mp-preview-content">
              {/* Notice we render the Template directly inside the modal now! */}
              <StudentReportTemplate
                ref={reportTemplateRef}
                student={selectedStudent}
                mentor={{ name: sessionStorage.getItem("username") }}
                statistics={studentStatistics}
                activities={reportActivities}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MProfile;