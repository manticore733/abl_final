import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./css/SMakeEntry.css";
import SNavbar from "../../Components/StudentC/SNavbar";
import { useToast } from "../../Components/ToastContext";

// Dummy Club List
const clubOptions = [
  "Nrtiya Nation", "Drama club", "Csi comps", "NSS", "Csi IT",
  "AIDL", "Gdsc", "Ecell", "ARC", "Eco club", "Cyber cell", "Marathi mandal",
];

// Points Mapping
const pointsMapping = {
  "Technical Seminar - Attending/Organizing": 1,
  "Technical Seminar - Delivering": 2,
  "Technical Workshop - Attending": 2,
  "Technical Workshop - Organizing": 1,
  "Technical Workshop - Delivering": 3,
  "Technical Competition - Attending/Organizing": 1,
  "Technical Competition - Winning (Intra College)": 1,
  "Technical Competition - Winning (University)": 2,
  "Technical Competition - Winning (State)": 3,
  "Technical Competition - Winning (National)": 4,
  "Passing NPTEL / Coursera / any other MOOCs - Passing": 2,
  "Passing NPTEL / Coursera / any other MOOCs - First Class": 3,
  "Passing NPTEL / Coursera / any other MOOCs - Distinction": 4,
  "Technical Paper Publication/Presentation - National Level": 2,
  "Technical Paper Publication/Presentation - International Level": 3,
  "Tree Plantation Drive": 1,
  "Blood Donation Drive - Organizing": 1,
  "Blood Donation Drive - Donating": 2,
  "Health Camps": 1,
  "Road Safety Seminar": 1,
  "Cleanliness Drive": 1,
  "Animal Welfare Activity": 1,
  "Nutrition Seminar": 1,
  "Solid/E-Waste/Plastic Waste Management": 1,
  "Visits to Old Age Homes/Ashrams": 1,
  "Visits to Rural Villages": 1,
  "Mangrove Cleaning Drive": 1,
  "Other Social Activities": 1,
  "Sports Festival": 1,
  "University/State/National Competitions - Participation": 1,
  "University/State/National Competitions - Winning (University)": 2,
  "University/State/National Competitions - Winning (State)": 3,
  "University/State/National Competitions - Winning (National)": 4,
  "Yoga Workshops": 1,
  "Fit India": 1,
  "Marathon/Walkathon - Participating": 1,
  "Marathon/Walkathon - Winning": 2,
  "Zumba Workshops": 1,
  "Cultural Events - Participation": 1,
  "Cultural Events - Representation (University/State/National)": 2,
  "Cultural Events - Winning (University)": 2,
  "Cultural Events - Winning (State)": 3,
  "Cultural Events - Winning (National)": 3,
  "Internships": 3,
  "Field Visits": 1,
  "TnP Coordination": 2,
  "Managerial Internship": 2,
};

const categoryOptions = {
  Technical: ["Technical Seminar", "Technical Workshop", "Technical Competition", "Passing NPTEL / Coursera / any other MOOCs", "Technical Paper Publication/Presentation"],
  Social: ["Tree Plantation Drive", "Blood Donation Drive", "Health Camps", "Road Safety Seminar", "Cleanliness Drive", "Animal Welfare Activity", "Nutrition Seminar", "Solid/E-Waste/Plastic Waste Management", "Visits to Old Age Homes/Ashrams", "Visits to Rural Villages", "Mangrove Cleaning Drive", "Other Social Activities"],
  Sports: ["Sports Festival", "University/State/National Competitions", "Yoga Workshops", "Fit India", "Marathon/Walkathon", "Zumba Workshops"],
  Cultural: ["Cultural Events"],
  Internship: ["Internships", "Field Visits", "TnP Coordination", "Managerial Internship"],
};

const subCategoryOptions = {
  "Technical Seminar": ["Attending/Organizing", "Delivering"],
  "Technical Workshop": ["Attending", "Organizing", "Delivering"],
  "Technical Competition": ["Attending/Organizing", "Winning (Intra College)", "Winning (University)", "Winning (State)", "Winning (National)"],
  "Passing NPTEL / Coursera / any other MOOCs": ["Passing", "First Class", "Distinction"],
  "Technical Paper Publication/Presentation": ["National Level", "International Level"],
  "Blood Donation Drive": ["Organizing", "Donating"],
  "University/State/National Competitions": ["Participation", "Winning (University)", "Winning (State)", "Winning (National)"],
  "Marathon/Walkathon": ["Participating", "Winning"],
  "Cultural Events": ["Participation", "Representation (University/State/National)", "Winning (University)", "Winning (State)", "Winning (National)"],
};

const SMakeEntry = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", { method: "POST", credentials: "include" });
      if (response.ok) navigate("/", { replace: true });
    } catch (error) { console.error("Error during logout:", error); }
  };

  const [formData, setFormData] = useState({
    s_id: "", roll_number: "", name: "", department: "", division: "",
    semester: "", event_name: "", event_type: "", subcategory: "",
    sub_activity_type: "", organised_by: "", participation_date: "",
    venue: "", allocated_points: 0, status: "Pending", remarks: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const rollNumber = sessionStorage.getItem("username");
    if (rollNumber) fetchStudentDetails(rollNumber);
  }, []);

  const fetchStudentDetails = async (rollNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/student-details/${rollNumber}`);
      setFormData((prev) => ({
        ...prev,
        s_id: response.data.s_id,
        roll_number: response.data.s_username,
        name: response.data.name,
        department: response.data.department,
        division: response.data.division,
        semester: response.data.semester,
      }));
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };
    setErrors({ ...errors, [e.target.name]: "" });

    if (name === "event_type") {
      updatedForm.subcategory = "";
      updatedForm.sub_activity_type = "";
      updatedForm.allocated_points = 0;
    }
    if (name === "subcategory") {
      updatedForm.sub_activity_type = "";
      if (!subCategoryOptions[value]) {
        updatedForm.allocated_points = pointsMapping[value] || 0;
      }
    }
    if (name === "sub_activity_type") {
      const key = `${updatedForm.subcategory} - ${value}`;
      updatedForm.allocated_points = pointsMapping[key] || 0;
    }

    setFormData(updatedForm);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.organised_by) newErrors.organised_by = "Required";
    if (!formData.event_name.trim()) newErrors.event_name = "Required";
    if (!formData.event_type) newErrors.event_type = "Required";
    if (!formData.subcategory) newErrors.subcategory = "Required";
    if (subCategoryOptions[formData.subcategory] && !formData.sub_activity_type) {
      newErrors.sub_activity_type = "Required";
    }
    if (!formData.participation_date) {
      newErrors.participation_date = "Required";
    } else {
      const year = new Date(formData.participation_date).getFullYear();
      if (year < 2021) newErrors.participation_date = "Must be after 2021";
    }
    if (!formData.venue.trim()) {
      newErrors.venue = "Required";
    } else if (/[!@#$%^&*]/.test(formData.venue)) {
      newErrors.venue = "No special chars allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Optional: Trigger an error toast if validation fails!
      showToast('error', 'Submission Failed', 'Please fill out all required fields.');
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/student/activity-summary", formData);
      showToast('success', 'Success', 'Activity submitted successfully!');
      setFormData((prev) => ({
        ...prev, event_name: "", event_type: "", subcategory: "",
        sub_activity_type: "", organised_by: "", participation_date: "",
        venue: "", allocated_points: 0,
      }));
      setErrors({});
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  return (
    <div className="sme-page-wrapper">

      {/* Top Navigation Bar (Unified with Profile/Calendar) */}
      <SNavbar />
      {/* Main Content Area */}
      <main className="sme-main-content">

        {/* Editorial Header */}
        <header className="sme-header">
          <span className="sme-eyebrow">Student Portal</span>
          <h1 className="sme-page-title">Activity Submission</h1>
          <p className="sme-page-desc">
            Log your extracurricular achievements and academic milestones. Curate your digital portfolio for internal review and credit allocation.
          </p>
        </header>

        {/* Form Container */}
        <div className="sme-form-card editorial-shadow">
          <form onSubmit={handleSubmit}>

            {/* Section 1: Student Identity (Read-only) */}
            <section className="sme-form-section">
              <div className="sme-section-heading">
                <div className="sme-icon-box text-primary bg-primary-light">
                  <span className="material-symbols-outlined">person_outline</span>
                </div>
                <h2>Student Identity</h2>
              </div>

              <div className="sme-grid-identity">
                <div className="sme-input-group">
                  <label>Roll Number</label>
                  <div className="sme-readonly-field">{formData.roll_number || "-"}</div>
                </div>
                <div className="sme-input-group col-span-2">
                  <label>Full Name</label>
                  <div className="sme-readonly-field">{formData.name || "Loading..."}</div>
                </div>
                <div className="sme-input-group">
                  <label>Department</label>
                  <div className="sme-readonly-field">{formData.department || "-"}</div>
                </div>
                <div className="sme-input-group">
                  <label>Division</label>
                  <div className="sme-readonly-field">{formData.division || "-"}</div>
                </div>
                <div className="sme-input-group">
                  <label>Semester</label>
                  <div className="sme-readonly-field">{formData.semester || "-"}</div>
                </div>
              </div>
            </section>

            {/* Section 2: Activity Entry */}
            <section className="sme-form-section no-border">
              <div className="sme-section-heading">
                <div className="sme-icon-box text-cyan bg-cyan-light">
                  <span className="material-symbols-outlined">edit_note</span>
                </div>
                <h2>Activity Entry</h2>
              </div>

              <div className="sme-grid-entry">
                {/* Event Name */}
                <div className="sme-input-group col-span-2">
                  <label htmlFor="event_name">
                    Event Name {errors.event_name && <span className="sme-error">({errors.event_name})</span>}
                  </label>
                  <input
                    type="text" id="event_name" name="event_name"
                    placeholder="e.g., Global Tech Symposium 2024"
                    className={`sme-input ${errors.event_name ? 'input-error' : ''}`}
                    value={formData.event_name} onChange={handleChange}
                  />
                </div>

                {/* Event Type */}
                <div className="sme-input-group">
                  <label htmlFor="event_type">
                    Event Type {errors.event_type && <span className="sme-error">({errors.event_type})</span>}
                  </label>
                  <div className="sme-select-wrapper">
                    <select id="event_type" name="event_type" className={`sme-input ${errors.event_type ? 'input-error' : ''}`} value={formData.event_type} onChange={handleChange}>
                      <option value="">Select Category</option>
                      {Object.keys(categoryOptions).map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined sme-select-icon">expand_more</span>
                  </div>
                </div>

                {/* Subcategory */}
                <div className="sme-input-group">
                  <label htmlFor="subcategory">
                    Subcategory {errors.subcategory && <span className="sme-error">({errors.subcategory})</span>}
                  </label>
                  <div className="sme-select-wrapper">
                    <select id="subcategory" name="subcategory" className={`sme-input ${errors.subcategory ? 'input-error' : ''}`} value={formData.subcategory} onChange={handleChange} disabled={!formData.event_type}>
                      <option value="">Select Subcategory</option>
                      {categoryOptions[formData.event_type]?.map((event) => (
                        <option key={event} value={event}>{event}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined sme-select-icon">expand_more</span>
                  </div>
                </div>

                {/* Sub Activity Type */}
                <div className="sme-input-group">
                  <label htmlFor="sub_activity_type">
                    Sub Activity Type {errors.sub_activity_type && <span className="sme-error">({errors.sub_activity_type})</span>}
                  </label>
                  <div className="sme-select-wrapper">
                    <select id="sub_activity_type" name="sub_activity_type" className={`sme-input ${errors.sub_activity_type ? 'input-error' : ''}`} value={formData.sub_activity_type} onChange={handleChange} disabled={!subCategoryOptions[formData.subcategory]}>
                      <option value="">Select Activity Type</option>
                      {(subCategoryOptions[formData.subcategory] || []).map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined sme-select-icon">expand_more</span>
                  </div>
                </div>

                {/* Organised By */}
                <div className="sme-input-group">
                  <label htmlFor="organised_by">
                    Organised By {errors.organised_by && <span className="sme-error">({errors.organised_by})</span>}
                  </label>
                  <div className="sme-select-wrapper">
                    <select id="organised_by" name="organised_by" className={`sme-input ${errors.organised_by ? 'input-error' : ''}`} value={formData.organised_by} onChange={handleChange}>
                      <option value="">Organization Name</option>
                      {clubOptions.map((club) => (
                        <option key={club} value={club}>{club}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined sme-select-icon">expand_more</span>
                  </div>
                </div>

                {/* Participation Date */}
                <div className="sme-input-group">
                  <label htmlFor="participation_date">
                    Participation Date {errors.participation_date && <span className="sme-error">({errors.participation_date})</span>}
                  </label>
                  <input
                    type="date" id="participation_date" name="participation_date"
                    className={`sme-input ${errors.participation_date ? 'input-error' : ''}`}
                    value={formData.participation_date} onChange={handleChange}
                  />
                </div>

                {/* Venue */}
                <div className="sme-input-group">
                  <label htmlFor="venue">
                    Venue {errors.venue && <span className="sme-error">({errors.venue})</span>}
                  </label>
                  <input
                    type="text" id="venue" name="venue"
                    placeholder="Physical or Virtual Location"
                    className={`sme-input ${errors.venue ? 'input-error' : ''}`}
                    value={formData.venue} onChange={handleChange}
                  />
                </div>

                {/* Allocated Points Box */}
                <div className="sme-points-box col-span-2">
                  <div className="sme-points-text">
                    <h4>Credit Allocation</h4>
                    <p>Based on current selection and academic guidelines.</p>
                  </div>
                  <div className="sme-points-value">
                    <span className="sme-big-num">{formData.allocated_points}</span>
                    <span className="sme-unit">Points</span>
                  </div>
                </div>

              </div>

              {/* Form Actions */}
              <div className="sme-form-actions">
                <button type="button" className="sme-btn-draft" onClick={() => showToast('info', 'Draft Saved', 'Your activity progress has been saved locally.')}>
                  Save as Draft
                </button>
                <button type="submit" className="sme-btn-submit">
                  <span>Submit for Review</span>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </section>

          </form>
        </div>

        {/* Supportive Info Cards */}
        <aside className="sme-info-cards">
          <div className="sme-info-card">
            <div className="sme-info-icon bg-orange-light text-orange">
              <span className="material-symbols-outlined">info</span>
            </div>
            <h3>Submission Guide</h3>
            <p>Ensure all certificates are attached in the next step. Late submissions might require department head approval.</p>
          </div>
          <div className="sme-info-card">
            <div className="sme-info-icon bg-primary-light text-primary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h3>Verification Timeline</h3>
            <p>Most activities are verified within 3-5 working days by your assigned mentor.</p>
          </div>
          <div className="sme-info-card">
            <div className="sme-info-icon bg-cyan-light text-cyan">
              <span className="material-symbols-outlined">stars</span>
            </div>
            <h3>Credit Milestone</h3>
            <p>You are currently 45 points away from reaching the 'Gold' achievement tier for this semester.</p>
          </div>
        </aside>

      </main>

      {/* Footer */}
      <footer className="sh-footer">
        <div className="sh-footer-content">
          <div><p className="sh-copyright">© 2024 Academic Editorial University. All rights reserved.</p></div>
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

export default SMakeEntry;