// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdNavbar from "../../Components/AdminC/AdNavbar";
// import "./css/AddMentor.css"; // We will create this next
// import { useToast } from "../../Components/ToastContext"; // Assuming you have this

// const AddMentor = () => {
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const [formData, setFormData] = useState({
//     m_username: "",
//     m_password: "",
//     m_name: "",
//     m_email: "",
//     m_phone: "",
//     m_designation: "",
//     year_of_joining: "",
//     m_batch: "",
//     m_sem: "",
//     m_csec: "",
//     m_branch: "",
//     m_welcome_msg: "", // Added for the new UI field
//     profile_pic: null,
//     profile_pic_preview: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const fileInputRef = useRef(null);

//   // Dropdown options
//   const branches = ["Computer", "Mechanical", "EXTC", "IT", "Electrical"];
//   const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
//   const sections = ["A", "B"];
//   const batches = ["1", "2", "3", "4"];

//   const handleTogglePassword = () => setShowPassword(!showPassword);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     if (errors[id]) setErrors({ ...errors, [id]: "" });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setFormData({ ...formData, profile_pic: file, profile_pic_preview: event.target.result });
//       };
//       reader.readAsDataURL(file);
//       if (errors.profile_pic) setErrors({ ...errors, profile_pic: "" });
//     }
//   };

//   const handleUploadClick = () => fileInputRef.current?.click();

//   // Unified validation for the single-page form
//   const validateForm = () => {
//     let newErrors = {};
//     let isValid = true;

//     if (!formData.m_name) newErrors.m_name = "Name is required";

//     if (!formData.m_email) {
//       newErrors.m_email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.m_email)) {
//       newErrors.m_email = "Invalid email format";
//     }

//     if (!formData.m_phone) {
//       newErrors.m_phone = "Phone is required";
//     } else if (!/^\d{10}$/.test(formData.m_phone)) {
//       newErrors.m_phone = "Invalid phone number (10 digits)";
//     }

//     if (!formData.m_designation) newErrors.m_designation = "Designation is required";
//     if (!formData.profile_pic) newErrors.profile_pic = "Profile picture is required";
//     if (!formData.m_username) newErrors.m_username = "Username is required";
//     if (!formData.m_password) newErrors.m_password = "Password is required";

//     ["m_batch", "m_sem", "m_csec", "m_branch", "year_of_joining"].forEach((field) => {
//       if (!formData[field]) newErrors[field] = "This field is required";
//     });

//     if (Object.keys(newErrors).length > 0) {
//       isValid = false;
//       setErrors(newErrors);
//       if (showToast) showToast('error', 'Validation Error', 'Please fix the highlighted fields.');
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => {
//         // Exclude preview and welcome msg if not needed by backend
//         if (key !== "profile_pic_preview" && key !== "m_welcome_msg") {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       await axios.post("http://localhost:5000/api/admin/add-mentor", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (showToast) showToast('success', 'Mentor Added', 'Profile has been successfully created.');

//       // Reset Form
//       setFormData({
//         m_username: "", m_password: "", m_name: "", m_email: "", m_phone: "",
//         m_designation: "", year_of_joining: "", m_batch: "", m_sem: "", m_csec: "",
//         m_branch: "", m_welcome_msg: "", profile_pic: null, profile_pic_preview: "",
//       });

//     } catch (error) {
//       if (showToast) showToast('error', 'Submission Failed', error.response?.data?.error || "Failed to add mentor.");
//     }
//   };

//   return (
//     <div className="am-page-wrapper">
//       <AdNavbar />

//       <main className="am-main-content">

//         {/* Header & Back Navigation */}
//         <div className="am-header-section">
//           <button className="am-back-btn" onClick={() => navigate('/aHomepage')}>
//             <span className="material-symbols-outlined">arrow_back</span> Back to Dashboard
//           </button>
//           <h1>Add New Mentor</h1>
//           <p>Onboard a new academic professional to the Scholar Pulse network. Curate their profile to ensure seamless student matching.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="am-form">

//           {/* SECTION 1: Mentor Identity */}
//           <div className="am-card">
//             <div className="am-card-header">
//               <div>
//                 <h2>Mentor Identity</h2>
//                 <p>Primary contact and identifying information</p>
//               </div>
//               <div className="am-photo-upload-container">
//                 <div
//                   className={`am-photo-dropzone ${errors.profile_pic ? 'am-error-border' : ''}`}
//                   onClick={handleUploadClick}
//                 >
//                   {formData.profile_pic_preview ? (
//                     <img src={formData.profile_pic_preview} alt="Preview" className="am-photo-preview" />
//                   ) : (
//                     <span className="material-symbols-outlined am-upload-icon">add_a_photo</span>
//                   )}
//                   <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
//                 </div>
//                 <div className="am-photo-text">
//                   <strong>Profile Photo</strong>
//                   <span>Min. 400×400px</span>
//                 </div>
//               </div>
//             </div>

//             <div className="am-card-grid">
//               <div className="am-input-group">
//                 <label>Full Legal Name</label>
//                 <div className={`am-input-wrapper ${errors.m_name ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">person</span>
//                   <input type="text" id="m_name" value={formData.m_name} onChange={handleInputChange} placeholder="e.g. Dr. Julian Rivers" />
//                 </div>
//                 {errors.m_name && <span className="am-error-text">{errors.m_name}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Institutional Email</label>
//                 <div className={`am-input-wrapper ${errors.m_email ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">alternate_email</span>
//                   <input type="email" id="m_email" value={formData.m_email} onChange={handleInputChange} placeholder="j.rivers@scholarpulse.edu" />
//                 </div>
//                 {errors.m_email && <span className="am-error-text">{errors.m_email}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Primary Phone</label>
//                 <div className={`am-input-wrapper ${errors.m_phone ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">call</span>
//                   <input type="tel" id="m_phone" value={formData.m_phone} onChange={handleInputChange} placeholder="9876543210" />
//                 </div>
//                 {errors.m_phone && <span className="am-error-text">{errors.m_phone}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Designation</label>
//                 <div className={`am-input-wrapper ${errors.m_designation ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">work</span>
//                   <input type="text" id="m_designation" value={formData.m_designation} onChange={handleInputChange} placeholder="e.g. Senior Professor" />
//                 </div>
//                 {errors.m_designation && <span className="am-error-text">{errors.m_designation}</span>}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 2: Academic Details */}
//           <div className="am-card">
//             <div className="am-card-header no-border">
//               <div>
//                 <h2>Academic Details</h2>
//                 <p>Expertise and departmental affiliation</p>
//               </div>
//             </div>

//             <div className="am-card-grid">
//               <div className="am-input-group">
//                 <label>Year of Joining</label>
//                 <div className={`am-input-wrapper ${errors.year_of_joining ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">calendar_today</span>
//                   <input type="number" id="year_of_joining" value={formData.year_of_joining} onChange={handleInputChange} placeholder="e.g. 2023" />
//                 </div>
//                 {errors.year_of_joining && <span className="am-error-text">{errors.year_of_joining}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Batch</label>
//                 <select id="m_batch" value={formData.m_batch} onChange={handleInputChange} className={`am-select ${errors.m_batch ? 'am-error-border' : ''}`}>
//                   <option value="" disabled>Select Batch</option>
//                   {batches.map(b => <option key={b} value={b}>{b}</option>)}
//                 </select>
//                 {errors.m_batch && <span className="am-error-text">{errors.m_batch}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Division</label>
//                 <select id="m_csec" value={formData.m_csec} onChange={handleInputChange} className={`am-select ${errors.m_csec ? 'am-error-border' : ''}`}>
//                   <option value="" disabled>Select Division</option>
//                   {sections.map(s => <option key={s} value={s}>{s}</option>)}
//                 </select>
//                 {errors.m_csec && <span className="am-error-text">{errors.m_csec}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Semester</label>
//                 <select id="m_sem" value={formData.m_sem} onChange={handleInputChange} className={`am-select ${errors.m_sem ? 'am-error-border' : ''}`}>
//                   <option value="" disabled>Select Semester</option>
//                   {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
//                 </select>
//                 {errors.m_sem && <span className="am-error-text">{errors.m_sem}</span>}
//               </div>

//               <div className="am-input-group full-width">
//                 <label>Department</label>
//                 <select id="m_branch" value={formData.m_branch} onChange={handleInputChange} className={`am-select ${errors.m_branch ? 'am-error-border' : ''}`}>
//                   <option value="" disabled>Select Department</option>
//                   {branches.map(b => <option key={b} value={b}>{b}</option>)}
//                 </select>
//                 {errors.m_branch && <span className="am-error-text">{errors.m_branch}</span>}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 3: Portal Configuration */}
//           <div className="am-card">
//             <div className="am-card-header no-border">
//               <div>
//                 <h2>Portal Configuration</h2>
//                 <p>Administrative controls and platform permissions</p>
//               </div>
//             </div>

//             <div className="am-card-grid">
//               <div className="am-input-group">
//                 <label>Username</label>
//                 <div className={`am-input-wrapper ${errors.m_username ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">account_circle</span>
//                   <input type="text" id="m_username" value={formData.m_username} onChange={handleInputChange} placeholder="Enter username" />
//                 </div>
//                 {errors.m_username && <span className="am-error-text">{errors.m_username}</span>}
//               </div>

//               <div className="am-input-group">
//                 <label>Password</label>
//                 <div className={`am-input-wrapper ${errors.m_password ? 'am-error' : ''}`}>
//                   <span className="material-symbols-outlined">lock</span>
//                   <input type={showPassword ? "text" : "password"} id="m_password" value={formData.m_password} onChange={handleInputChange} placeholder="••••••••" />
//                   <span className="material-symbols-outlined cursor-pointer" onClick={handleTogglePassword}>
//                     {showPassword ? "visibility_off" : "visibility"}
//                   </span>
//                 </div>
//                 {errors.m_password && <span className="am-error-text">{errors.m_password}</span>}
//               </div>

//               <div className="am-input-group full-width">
//                 <label>Auto-Welcome Message</label>
//                 <div className="am-input-wrapper align-top">
//                   <textarea id="m_welcome_msg" value={formData.m_welcome_msg} onChange={handleInputChange} rows="4" placeholder="Hello! I am looking forward to our academic journey together..."></textarea>
//                 </div>
//                 <span className="am-helper-text">This message will be sent to students upon successful mentor-student pairing.</span>
//               </div>
//             </div>
//           </div>

//           {/* Footer Actions */}
//           <div className="am-form-actions">
//             <button type="button" className="am-btn-discard" onClick={() => navigate('/aHomepage')}>Discard</button>
//             <button type="submit" className="am-btn-submit">
//               <span className="material-symbols-outlined">person_add</span> Create Mentor Profile
//             </button>
//           </div>

//         </form>
//       </main>
//     </div>
//   );
// };

// export default AddMentor;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AddMentor.css";
import { useToast } from "../../Components/ToastContext";
import apiClient from "../../apiClient";

const AddMentor = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    m_username: "",
    m_password: "",
    m_name: "",
    m_email: "",
    m_phone: "",
    m_designation: "",
    year_of_joining: "",
    m_batch: "",
    m_sem: "",
    m_csec: "",
    m_branch: "",
    m_welcome_msg: "",
    profile_pic: null,
    profile_pic_preview: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  // Dropdown options
  const branches = ["Computer", "Mechanical", "EXTC", "IT", "Electrical"];
  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const sections = ["A", "B"];
  const batches = ["1", "2", "3", "4"];

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) setErrors({ ...errors, [id]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, profile_pic: file, profile_pic_preview: event.target.result });
      };
      reader.readAsDataURL(file);
      if (errors.profile_pic) setErrors({ ...errors, profile_pic: "" });
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.m_name) newErrors.m_name = "Name is required";

    if (!formData.m_email) {
      newErrors.m_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.m_email)) {
      newErrors.m_email = "Invalid email format";
    }

    if (!formData.m_phone) {
      newErrors.m_phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.m_phone)) {
      newErrors.m_phone = "Invalid phone number (10 digits)";
    }

    if (!formData.m_designation) newErrors.m_designation = "Designation is required";
    if (!formData.profile_pic) newErrors.profile_pic = "Profile picture is required";
    if (!formData.m_username) newErrors.m_username = "Username is required";
    if (!formData.m_password) newErrors.m_password = "Password is required";

    ["m_batch", "m_sem", "m_csec", "m_branch", "year_of_joining"].forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });

    if (Object.keys(newErrors).length > 0) {
      isValid = false;
      setErrors(newErrors);
      if (showToast) showToast('error', 'Validation Error', 'Please fix the highlighted fields.');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "profile_pic_preview" && key !== "m_welcome_msg") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // ✅ REPLACED AXIOS WITH APICLIENT
      await apiClient.post("/api/admin/mentors", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (showToast) showToast('success', 'Mentor Added', 'Profile has been successfully created.');

      // Reset Form
      setFormData({
        m_username: "", m_password: "", m_name: "", m_email: "", m_phone: "",
        m_designation: "", year_of_joining: "", m_batch: "", m_sem: "", m_csec: "",
        m_branch: "", m_welcome_msg: "", profile_pic: null, profile_pic_preview: "",
      });

    } catch (error) {
      if (showToast) showToast('error', 'Submission Failed', error.response?.data?.error || "Failed to add mentor.");
    }
  };

  return (
    <div className="am-page-wrapper">
      <AdNavbar />

      <main className="am-main-content">

        {/* Header & Back Navigation */}
        <div className="am-header-section">
          <button className="am-back-btn" onClick={() => navigate('/aHomepage')}>
            <span className="material-symbols-outlined">arrow_back</span> Back to Dashboard
          </button>
          <h1>Add New Mentor</h1>
          <p>Onboard a new academic professional to the Scholar Pulse network. Curate their profile to ensure seamless student matching.</p>
        </div>

        <form onSubmit={handleSubmit} className="am-form">

          {/* SECTION 1: Mentor Identity */}
          <div className="am-card">
            <div className="am-card-header">
              <div>
                <h2>Mentor Identity</h2>
                <p>Primary contact and identifying information</p>
              </div>
              <div className="am-photo-upload-container">
                <div
                  className={`am-photo-dropzone ${errors.profile_pic ? 'am-error-border' : ''}`}
                  onClick={handleUploadClick}
                >
                  {formData.profile_pic_preview ? (
                    <img src={formData.profile_pic_preview} alt="Preview" className="am-photo-preview" />
                  ) : (
                    <span className="material-symbols-outlined am-upload-icon">add_a_photo</span>
                  )}
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                </div>
                <div className="am-photo-text">
                  <strong>Profile Photo</strong>
                  <span>Min. 400×400px</span>
                </div>
              </div>
            </div>

            <div className="am-card-grid">
              <div className="am-input-group">
                <label>Full Legal Name</label>
                <div className={`am-input-wrapper ${errors.m_name ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">person</span>
                  <input type="text" id="m_name" value={formData.m_name} onChange={handleInputChange} placeholder="e.g. Dr. Julian Rivers" />
                </div>
                {errors.m_name && <span className="am-error-text">{errors.m_name}</span>}
              </div>

              <div className="am-input-group">
                <label>Institutional Email</label>
                <div className={`am-input-wrapper ${errors.m_email ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">alternate_email</span>
                  <input type="email" id="m_email" value={formData.m_email} onChange={handleInputChange} placeholder="j.rivers@scholarpulse.edu" />
                </div>
                {errors.m_email && <span className="am-error-text">{errors.m_email}</span>}
              </div>

              <div className="am-input-group">
                <label>Primary Phone</label>
                <div className={`am-input-wrapper ${errors.m_phone ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">call</span>
                  <input type="tel" id="m_phone" value={formData.m_phone} onChange={handleInputChange} placeholder="9876543210" />
                </div>
                {errors.m_phone && <span className="am-error-text">{errors.m_phone}</span>}
              </div>

              <div className="am-input-group">
                <label>Designation</label>
                <div className={`am-input-wrapper ${errors.m_designation ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">work</span>
                  <input type="text" id="m_designation" value={formData.m_designation} onChange={handleInputChange} placeholder="e.g. Senior Professor" />
                </div>
                {errors.m_designation && <span className="am-error-text">{errors.m_designation}</span>}
              </div>
            </div>
          </div>

          {/* SECTION 2: Academic Details */}
          <div className="am-card">
            <div className="am-card-header no-border">
              <div>
                <h2>Academic Details</h2>
                <p>Expertise and departmental affiliation</p>
              </div>
            </div>

            <div className="am-card-grid">
              <div className="am-input-group">
                <label>Year of Joining</label>
                <div className={`am-input-wrapper ${errors.year_of_joining ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">calendar_today</span>
                  <input type="number" id="year_of_joining" value={formData.year_of_joining} onChange={handleInputChange} placeholder="e.g. 2023" />
                </div>
                {errors.year_of_joining && <span className="am-error-text">{errors.year_of_joining}</span>}
              </div>

              <div className="am-input-group">
                <label>Batch</label>
                <select id="m_batch" value={formData.m_batch} onChange={handleInputChange} className={`am-select ${errors.m_batch ? 'am-error-border' : ''}`}>
                  <option value="" disabled>Select Batch</option>
                  {batches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.m_batch && <span className="am-error-text">{errors.m_batch}</span>}
              </div>

              <div className="am-input-group">
                <label>Division</label>
                <select id="m_csec" value={formData.m_csec} onChange={handleInputChange} className={`am-select ${errors.m_csec ? 'am-error-border' : ''}`}>
                  <option value="" disabled>Select Division</option>
                  {sections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.m_csec && <span className="am-error-text">{errors.m_csec}</span>}
              </div>

              <div className="am-input-group">
                <label>Semester</label>
                <select id="m_sem" value={formData.m_sem} onChange={handleInputChange} className={`am-select ${errors.m_sem ? 'am-error-border' : ''}`}>
                  <option value="" disabled>Select Semester</option>
                  {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
                {errors.m_sem && <span className="am-error-text">{errors.m_sem}</span>}
              </div>

              <div className="am-input-group full-width">
                <label>Department</label>
                <select id="m_branch" value={formData.m_branch} onChange={handleInputChange} className={`am-select ${errors.m_branch ? 'am-error-border' : ''}`}>
                  <option value="" disabled>Select Department</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.m_branch && <span className="am-error-text">{errors.m_branch}</span>}
              </div>
            </div>
          </div>

          {/* SECTION 3: Portal Configuration */}
          <div className="am-card">
            <div className="am-card-header no-border">
              <div>
                <h2>Portal Configuration</h2>
                <p>Administrative controls and platform permissions</p>
              </div>
            </div>

            <div className="am-card-grid">
              <div className="am-input-group">
                <label>Username</label>
                <div className={`am-input-wrapper ${errors.m_username ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">account_circle</span>
                  <input type="text" id="m_username" value={formData.m_username} onChange={handleInputChange} placeholder="Enter username" />
                </div>
                {errors.m_username && <span className="am-error-text">{errors.m_username}</span>}
              </div>

              <div className="am-input-group">
                <label>Password</label>
                <div className={`am-input-wrapper ${errors.m_password ? 'am-error' : ''}`}>
                  <span className="material-symbols-outlined">lock</span>
                  <input type={showPassword ? "text" : "password"} id="m_password" value={formData.m_password} onChange={handleInputChange} placeholder="••••••••" />
                  <span className="material-symbols-outlined cursor-pointer" onClick={handleTogglePassword}>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </div>
                {errors.m_password && <span className="am-error-text">{errors.m_password}</span>}
              </div>

              <div className="am-input-group full-width">
                <label>Auto-Welcome Message</label>
                <div className="am-input-wrapper align-top">
                  <textarea id="m_welcome_msg" value={formData.m_welcome_msg} onChange={handleInputChange} rows="4" placeholder="Hello! I am looking forward to our academic journey together..."></textarea>
                </div>
                <span className="am-helper-text">This message will be sent to students upon successful mentor-student pairing.</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="am-form-actions">
            <button type="button" className="am-btn-discard" onClick={() => navigate('/aHomepage')}>Discard</button>
            <button type="submit" className="am-btn-submit">
              <span className="material-symbols-outlined">person_add</span> Create Mentor Profile
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default AddMentor;