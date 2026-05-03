// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AdNavbar from '../../Components/AdminC/AdNavbar';
// import './css/aHomepage.css';

// const AHomepage = () => {
//   const navigate = useNavigate();

//   // --- DUMMY STATE DATA (Replace with API calls later) ---
//   const [stats, setStats] = useState({
//     totalMentors: "1,284",
//     mentorGrowth: "+4%",
//     totalStudents: "15,402",
//     studentGrowth: "+12%",
//     engagement: "88.4%",
//     engagementGrowth: "+2.1%"
//   });

//   const [mentorsList, setMentorsList] = useState([
//     { id: 1, initials: "ER", name: "Dr. Elena Rodriguez", role: "Senior Faculty", dept: "Comparative Literature", deptColor: "blue", active: 42, efficiency: 94 },
//     { id: 2, initials: "JV", name: "Prof. Julian Vane", role: "Department Head", dept: "Journalism & Media", deptColor: "orange", active: 38, efficiency: 89 },
//     { id: 3, initials: "SC", name: "Dr. Sarah Chen", role: "Associate Professor", dept: "Creative Writing", deptColor: "blue", active: 29, efficiency: 97 },
//     { id: 4, initials: "MT", name: "Prof. Marcus Thorne", role: "Emeritus Faculty", dept: "Philosophy", deptColor: "orange", active: 12, efficiency: 76 }
//   ]);

//   return (
//     <div className="sa-page-wrapper">
//       <AdNavbar />

//       <main className="sa-main-content">

//         {/* Hero Section */}
//         <section className="sa-hero-section">
//           <div className="sa-hero-text">
//             <p className="sa-super-title">Academic Performance Oversight</p>
//             <h1 className="sa-hero-title">Empowering Curated <br /><span className="text-gradient">Excellence.</span></h1>
//           </div>
//           <div className="sa-hero-action">
//             <button className="sa-btn-hero" onClick={() => navigate('/add-mentor')}>
//               <span className="material-symbols-outlined">add</span> New Faculty Entry
//             </button>
//           </div>
//         </section>

//         {/* KPI Metric Cards */}

//         <section className="sa-kpi-grid">

//           {/* Card 1: Mentors */}
//           <div className="sa-kpi-card sa-card-white">
//             <div className="sa-kpi-bg-icon text-primary"><span className="material-symbols-outlined">school</span></div>
//             <div className="sa-kpi-header">
//               <span className="sa-kpi-lbl">Total Mentors</span>
//               <div className="sa-kpi-icon bg-primary-light text-primary"><span className="material-symbols-outlined">person</span></div>
//             </div>
//             <div className="sa-kpi-data">
//               <span className="sa-kpi-val">{stats.totalMentors}</span>
//               <span className="sa-kpi-growth text-teal">{stats.mentorGrowth}</span>
//             </div>
//             <p className="sa-kpi-sub">Across 24 departments</p>
//           </div>

//           {/* Card 2: Students */}
//           <div className="sa-kpi-card sa-card-gray">
//             <div className="sa-kpi-bg-icon text-teal"><span className="material-symbols-outlined">group</span></div>
//             <div className="sa-kpi-header">
//               <span className="sa-kpi-lbl">Total Students</span>
//               <div className="sa-kpi-icon bg-teal-light text-teal"><span className="material-symbols-outlined">groups</span></div>
//             </div>
//             <div className="sa-kpi-data">
//               <span className="sa-kpi-val">{stats.totalStudents}</span>
//               <span className="sa-kpi-growth text-teal">{stats.studentGrowth}</span>
//             </div>
//             <p className="sa-kpi-sub">Enrolled in editorial programs</p>
//           </div>

//           {/* Card 3: Engagement */}
//           <div className="sa-kpi-card sa-card-blue">
//             <div className="sa-kpi-bg-icon text-white"><span className="material-symbols-outlined">monitoring</span></div>
//             <div className="sa-kpi-header">
//               <span className="sa-kpi-lbl text-white">Active Engagement</span>
//               <div className="sa-kpi-icon bg-white-light text-white"><span className="material-symbols-outlined">trending_up</span></div>
//             </div>
//             <div className="sa-kpi-data">
//               <span className="sa-kpi-val text-white">{stats.engagement}</span>
//               <span className="sa-kpi-growth bg-white-light text-white">{stats.engagementGrowth}</span>
//             </div>
//             <p className="sa-kpi-sub text-white-dim">Global platform utilization</p>
//           </div>

//         </section>

//         {/* Directory Table Section */}
//         <section className="sa-directory-section">

//           <div className="sa-directory-header">
//             <div>
//               <h2>Faculty Directory</h2>
//               <p>Editorial mentors and efficiency analytics</p>
//             </div>
//             <div className="sa-directory-actions">
//               <div className="sa-avatar-stack hidden md:flex">
//                 <div className="sa-avatar"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhzZ2VdW4BP4hsUPtzl9QXxbewGTTNpDtA-a0iRLchWmGJXo_-GyUP7B5isXwyGXhgXoDp2RCvZCHD0HhbxFB9Kj-T9i5KTl9OeDRHHL1WzrgPgPUyz70etw0REFc7Du6AYjn46eqbh8B-b_sJEPcm2sVOxYYbBxw_jKhbsZ8fSYl_cM_7pcrGveN8lznGhJGGpYS1G2JxEVQi4ICzhSZ9Ft2h6JaC4DeJaYmbWMM4XlbBm-_W7eMQKLIoAusQRXOFZ6jCKK5qCJ4" alt="A" /></div>
//                 <div className="sa-avatar"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__NekquXg88hQX7xXApDXp4Ig7L88dC6Qpew1eAA28k_rdfTxF_uzbrgSs7RSzPFPEAGHzVVCOq1J2l3zFiaCKdPRsTS8zjskFXPZPy8qZ98hBO2J4W-Z7HSVrhhVBLcT6NgJPXRL4FV709nen8o3bFSjTSwA8ow965vvEhdsEklM5LqKxkrdHXK7VITk5K17Gf2v8f5_Dt4zXfXpUqDMfQTwt2jTsbfImvtbxCud8lnP3VevqALzshO-3ZuKsc3r1c_v0qVP5gc" alt="B" /></div>
//                 <div className="sa-avatar"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGObk0nEu3-2_0jK4uSbKYIYaefrCHHujvunfetVyG35Yu4ib-Vxbqzn4c8pUCNzNF1qy8nuJe4qVYVRFfp5mjFCyaTzUaJGuCs-VotenqwJcb7TWmP99dsARILPDlYEhvrjCrIBj-p7VMcLC43sh1_ZOcJhJ5QuV49T8Ipu6eIKDK3A4D19lh0qSx0d4s-PtcNDmpTpQTNS9IC5CEYPp61ckkvqnNDZ6ilY7BEXGk2UFEf0e0FP61n9HUCijguE98xcLASBjIrI" alt="C" /></div>
//                 <div className="sa-avatar sa-avatar-count">+120</div>
//               </div>
//               <button className="sa-btn-outline"><span className="material-symbols-outlined">download</span> Export List</button>
//             </div>
//           </div>

//           <div className="sa-filter-bar">
//             <div className="sa-search-input">
//               <span className="material-symbols-outlined">search</span>
//               <input type="text" placeholder="Search by mentor name..." />
//             </div>
//             <div className="sa-select-group">
//               <select defaultValue="">
//                 <option value="" disabled>Department</option>
//                 <option>Comparative Literature</option>
//                 <option>Journalism & Media</option>
//               </select>
//               <select defaultValue="">
//                 <option value="" disabled>Semester</option>
//                 <option>Fall 2026</option>
//                 <option>Spring 2026</option>
//               </select>
//             </div>
//           </div>

//           <div className="sa-table-wrapper">
//             <table className="sa-table">
//               <thead>
//                 <tr>
//                   <th className="w-16">Sr. No.</th>
//                   <th>Mentor Name</th>
//                   <th>Department</th>
//                   <th>Active Mentoring</th>
//                   <th className="text-center">Efficiency</th>
//                   <th className="text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mentorsList.map((mentor, index) => (
//                   <tr key={mentor.id}>
//                     <td className="sa-text-sub font-bold text-center">0{index + 1}</td>
//                     <td>
//                       <div className="sa-mentor-cell">
//                         <div className={`sa-mentor-initials bg-${mentor.deptColor}-light text-${mentor.deptColor}`}>
//                           {mentor.initials}
//                         </div>
//                         <div>
//                           <strong>{mentor.name}</strong>
//                           <span className="sa-mentor-role">{mentor.role}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <span className={`sa-dept-pill bg-${mentor.deptColor}-light text-${mentor.deptColor}-dark`}>
//                         {mentor.dept}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="sa-mentoring-cell">
//                         <strong>{mentor.active}</strong> <span>Students</span>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="sa-efficiency-cell">
//                         <div className="sa-progress-track">
//                           <div className={`sa-progress-fill bg-${mentor.deptColor}`} style={{ width: `${mentor.efficiency}%` }}></div>
//                         </div>
//                         <span className={`text-${mentor.deptColor}`}><strong>{mentor.efficiency}%</strong></span>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <button className="sa-action-btn"><span className="material-symbols-outlined">more_vert</span></button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="sa-pagination">
//             <p>Showing 1-4 of 124 mentors</p>
//             <div className="sa-page-controls">
//               <button disabled><span className="material-symbols-outlined">chevron_left</span> Prev</button>
//               <button className="active">1</button>
//               <button>2</button>
//               <button>3</button>
//               <button>Next <span className="material-symbols-outlined">chevron_right</span></button>
//             </div>
//           </div>

//         </section>
//       </main>
//     </div>
//   );
// };

// export default AHomepage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdNavbar from '../../Components/AdminC/AdNavbar';
import './css/aHomepage.css';
import apiClient from "../../apiClient";

const AHomepage = () => {
  const navigate = useNavigate();

  // ✅ Real State Variables
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMentors: 0,
    totalStudents: 0,
    engagement: "0%",
    // Growth metrics are hardcoded for now until we build historical tracking
    mentorGrowth: "+0%",
    studentGrowth: "+0%",
    engagementGrowth: "+0%"
  });

  const [mentorsList, setMentorsList] = useState([]);

  // ✅ Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Run both API requests concurrently for speed
        const [statsRes, mentorsRes] = await Promise.all([
          apiClient.get('/api/admin/dashboard-stats'),
          apiClient.get('/api/admin/mentors')
        ]);

        if (statsRes.data.success) {
          setStats((prev) => ({
            ...prev,
            totalMentors: statsRes.data.data.totalMentors,
            totalStudents: statsRes.data.data.totalStudents,
            engagement: statsRes.data.data.engagementRate + "%"
          }));
        }

        if (mentorsRes.data.success) {
          setMentorsList(mentorsRes.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load admin dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper to generate a consistent color based on department name
  const getDeptColor = (dept) => {
    const colors = ["blue", "teal", "orange", "purple", "cyan"];
    const index = dept ? dept.length % colors.length : 0;
    return colors[index];
  };

  return (
    <div className="sa-page-wrapper">
      <AdNavbar />

      <main className="sa-main-content">

        {/* Hero Section */}
        <section className="sa-hero-section">
          <div className="sa-hero-text">
            <p className="sa-super-title">Academic Performance Oversight</p>
            <h1 className="sa-hero-title">Empowering Curated <br /><span className="text-gradient">Excellence.</span></h1>
          </div>
          <div className="sa-hero-action">
            <button className="sa-btn-hero" onClick={() => navigate('/add-mentor')}>
              <span className="material-symbols-outlined">add</span> New Faculty Entry
            </button>
          </div>
        </section>

        {/* KPI Metric Cards */}
        <section className="sa-kpi-grid">
          {/* Card 1: Mentors */}
          <div className="sa-kpi-card sa-card-white">
            <div className="sa-kpi-bg-icon text-primary"><span className="material-symbols-outlined">school</span></div>
            <div className="sa-kpi-header">
              <span className="sa-kpi-lbl">Total Mentors</span>
              <div className="sa-kpi-icon bg-primary-light text-primary"><span className="material-symbols-outlined">person</span></div>
            </div>
            <div className="sa-kpi-data">
              <span className="sa-kpi-val">{isLoading ? "..." : stats.totalMentors}</span>
              <span className="sa-kpi-growth text-teal">{stats.mentorGrowth}</span>
            </div>
            <p className="sa-kpi-sub">Registered in the system</p>
          </div>

          {/* Card 2: Students */}
          <div className="sa-kpi-card sa-card-gray">
            <div className="sa-kpi-bg-icon text-teal"><span className="material-symbols-outlined">group</span></div>
            <div className="sa-kpi-header">
              <span className="sa-kpi-lbl">Total Students</span>
              <div className="sa-kpi-icon bg-teal-light text-teal"><span className="material-symbols-outlined">groups</span></div>
            </div>
            <div className="sa-kpi-data">
              <span className="sa-kpi-val">{isLoading ? "..." : stats.totalStudents}</span>
              <span className="sa-kpi-growth text-teal">{stats.studentGrowth}</span>
            </div>
            <p className="sa-kpi-sub">Enrolled in the portal</p>
          </div>

          {/* Card 3: Engagement */}
          <div className="sa-kpi-card sa-card-blue">
            <div className="sa-kpi-bg-icon text-white"><span className="material-symbols-outlined">monitoring</span></div>
            <div className="sa-kpi-header">
              <span className="sa-kpi-lbl text-white">Active Engagement</span>
              <div className="sa-kpi-icon bg-white-light text-white"><span className="material-symbols-outlined">trending_up</span></div>
            </div>
            <div className="sa-kpi-data">
              <span className="sa-kpi-val text-white">{isLoading ? "..." : stats.engagement}</span>
              <span className="sa-kpi-growth bg-white-light text-white">{stats.engagementGrowth}</span>
            </div>
            <p className="sa-kpi-sub text-white-dim">Students with logged activities</p>
          </div>
        </section>

        {/* Directory Table Section */}
        <section className="sa-directory-section">
          <div className="sa-directory-header">
            <div>
              <h2>Faculty Directory</h2>
              <p>Editorial mentors and efficiency analytics</p>
            </div>
            <div className="sa-directory-actions">
              <button className="sa-btn-outline"><span className="material-symbols-outlined">download</span> Export List</button>
            </div>
          </div>

          <div className="sa-table-wrapper">
            <table className="sa-table">
              <thead>
                <tr>
                  <th className="w-16">Sr. No.</th>
                  <th>Mentor Name</th>
                  <th>Department</th>
                  <th>Active Mentoring</th>
                  <th className="text-center">Efficiency</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="6" className="text-center py-8">Loading mentors...</td></tr>
                ) : mentorsList.length > 0 ? (
                  mentorsList.map((mentor, index) => {
                    const deptColor = getDeptColor(mentor.department);
                    return (
                      <tr key={mentor.m_id || index}>
                        <td className="sa-text-sub font-bold text-center">{(index + 1).toString().padStart(2, '0')}</td>
                        <td>
                          <div className="sa-mentor-cell">
                            <div className={`sa-mentor-initials bg-${deptColor}-light text-${deptColor}`}>
                              {mentor.name ? mentor.name.substring(0, 2).toUpperCase() : "M"}
                            </div>
                            <div>
                              <strong>{mentor.name}</strong>
                              <span className="sa-mentor-role">{mentor.designation || "Faculty"}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`sa-dept-pill bg-${deptColor}-light text-${deptColor}-dark`}>
                            {mentor.department || "General"}
                          </span>
                        </td>
                        <td>
                          <div className="sa-mentoring-cell">
                            <strong>{mentor.studentCount || 0}</strong> <span>Students</span>
                          </div>
                        </td>
                        <td>
                          <div className="sa-efficiency-cell">
                            <div className="sa-progress-track">
                              <div className={`sa-progress-fill bg-${deptColor}`} style={{ width: `${mentor.efficiency || 80}%` }}></div>
                            </div>
                            <span className={`text-${deptColor}`}><strong>{mentor.efficiency || 80}%</strong></span>
                          </div>
                        </td>
                        <td className="text-right">
                          <button className="sa-action-btn"><span className="material-symbols-outlined">more_vert</span></button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="6" className="text-center py-8">No mentors found. Add one above!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AHomepage;