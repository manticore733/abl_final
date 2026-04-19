import React, { useState } from "react";
import { addClubEvent } from "../../api/eventApi";
import "./css/CAddEvents.css";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import { useToast } from "../../Components/ToastContext"; // <-- IMPORTED TOAST CONTEXT

const CAddEvents = () => {
  const { showToast } = useToast(); // <-- INITIALIZED TOAST HOOK

  const [formData, setFormData] = useState({
    roll_number: "",
    club_name: "",
    admin_name: "",
    event_name: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: "",
    entry_fee: "",
    event_type: "",
    event_mode: "",
    event_link: "",
    poster_image: null,
    poster_preview: null,
  });

  const [errors, setErrors] = useState({});

  const eventTypes = ["Technical", "Cultural", "Sports", "Social"];
  const eventModes = ["Online", "Offline", "Hybrid"];

  // Validate Input Fields
  const validateForm = () => {
    let newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!/^\d+$/.test(formData.roll_number)) newErrors.roll_number = "Must be a valid number.";
    if (!/^[A-Za-z\s]+$/.test(formData.admin_name)) newErrors.admin_name = "Only alphabets allowed.";
    if (!/^[A-Za-z\s]+$/.test(formData.club_name)) newErrors.club_name = "Only alphabets allowed.";

    if (formData.start_date && formData.start_date < today) newErrors.start_date = "Cannot be before today.";
    if (formData.end_date && formData.end_date < today) newErrors.end_date = "Cannot be before today.";
    if (formData.start_date && formData.end_date && formData.end_date < formData.start_date) newErrors.end_date = "Cannot be before Start Date.";
    if (formData.start_time && formData.end_time && formData.end_time < formData.start_time) newErrors.end_time = "Cannot be before Start Time.";

    if (!/[A-Za-z]/.test(formData.location)) newErrors.location = "Must contain at least one letter.";
    if (!/^(free|Free|\d+)$/.test(formData.entry_fee)) newErrors.entry_fee = 'Enter "Free" or an amount.';

    if (
      formData.event_link &&
      !/^(https?:\/\/[^\s$.?#].[^\s]*)$|^(https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform(\?.*)?)$/.test(formData.event_link)
    ) {
      newErrors.event_link = "Enter a valid URL.";
    }

    if (!formData.event_mode) newErrors.event_mode = "Please select a mode.";
    if (!formData.event_type) newErrors.event_type = "Please select a type.";
    if (!formData.poster_image) newErrors.poster_image = "Poster image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value, type, files, name } = e.target;
    const fieldName = id || name;

    if (type === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        poster_image: file,
        poster_preview: file ? URL.createObjectURL(file) : null,
      }));
      if (file) setErrors(prev => ({ ...prev, poster_image: null }));
    } else {
      setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
      if (errors[fieldName]) setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // REPLACED ALERT WITH TOAST
      showToast('error', 'Validation Error', 'Please fix the highlighted errors before publishing.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "poster_image" && value) {
        data.append("poster_image", value);
      } else if (key !== "poster_preview") {
        data.append(key, value);
      }
    });

    try {
      const response = await addClubEvent(data);
      // REPLACED ALERT WITH TOAST
      showToast('success', 'Event Published!', response.message || "Your event has been successfully published.");

      setFormData({
        roll_number: "", club_name: "", admin_name: "", event_name: "",
        description: "", start_date: "", end_date: "", start_time: "",
        end_time: "", location: "", entry_fee: "", event_type: "",
        event_mode: "", event_link: "", poster_image: null, poster_preview: null,
      });
      setErrors({});
    } catch (error) {
      // REPLACED ALERT WITH TOAST
      showToast('error', 'Publish Failed', error.response?.data?.message || "Failed to publish event. Please try again.");
    }
  };

  return (
    <div className="ca-page-wrapper">
      <CAdNavbar />
      <main className="ca-main-content">

        {/* Centered Form Area (Sidebar Removed) */}
        <div className="ca-form-container">
          <header className="ca-form-header">
            <nav className="ca-breadcrumbs">
              <span>Events</span>
              <span className="material-symbols-outlined">chevron_right</span>
              <span className="current">New Campaign</span>
            </nav>
            <h1>Create New Event</h1>
            <p>Set up your next campus initiative with curated editorial precision.</p>
          </header>

          <form className="ca-form" onSubmit={handleSubmit}>

            {/* Section 1: Admin Identity */}
            <section className="ca-form-section">
              <div className="ca-section-header">
                <span className="material-symbols-outlined">verified_user</span>
                <h2>Club Admin Identity</h2>
              </div>
              <div className="ca-grid-2">
                <div className="ca-input-group">
                  <label>Your Name</label>
                  <input type="text" id="admin_name" value={formData.admin_name} onChange={handleInputChange} className={errors.admin_name ? 'error' : ''} placeholder="e.g., Alex Chen" />
                  {errors.admin_name && <span className="ca-error-msg">{errors.admin_name}</span>}
                </div>
                <div className="ca-input-group">
                  <label>Roll Number</label>
                  <input type="text" id="roll_number" value={formData.roll_number} onChange={handleInputChange} className={errors.roll_number ? 'error' : ''} placeholder="e.g., 1021101" />
                  {errors.roll_number && <span className="ca-error-msg">{errors.roll_number}</span>}
                </div>
                <div className="ca-input-group full-width">
                  <label>Club Name</label>
                  <input type="text" id="club_name" value={formData.club_name} onChange={handleInputChange} className={errors.club_name ? 'error' : ''} placeholder="e.g., The Editorial Board" />
                  {errors.club_name && <span className="ca-error-msg">{errors.club_name}</span>}
                </div>
              </div>
            </section>

            {/* Section 2: Event Details */}
            <section className="ca-form-section">
              <div className="ca-section-header">
                <span className="material-symbols-outlined">description</span>
                <h2>Event Details</h2>
              </div>
              <div className="ca-input-group full-width mb-4">
                <label>Event Name</label>
                <input type="text" id="event_name" value={formData.event_name} onChange={handleInputChange} className={errors.event_name ? 'error' : ''} placeholder="e.g., Annual Symposium 2026" />
                {errors.event_name && <span className="ca-error-msg">{errors.event_name}</span>}
              </div>
              <div className="ca-input-group full-width mb-4 relative-icon">
                <label>Location</label>
                <span className="material-symbols-outlined input-icon">location_on</span>
                <input type="text" id="location" value={formData.location} onChange={handleInputChange} className={`with-icon ${errors.location ? 'error' : ''}`} placeholder="Campus Auditorium or Building Name" />
                {errors.location && <span className="ca-error-msg">{errors.location}</span>}
              </div>
              <div className="ca-input-group full-width">
                <label>Event Description</label>
                <textarea id="description" rows="4" value={formData.description} onChange={handleInputChange} className={errors.description ? 'error' : ''} placeholder="Craft a compelling narrative for your event..."></textarea>
                {errors.description && <span className="ca-error-msg">{errors.description}</span>}
              </div>
            </section>

            {/* Section 3: Schedule */}
            <section className="ca-form-section">
              <div className="ca-section-header">
                <span className="material-symbols-outlined">calendar_month</span>
                <h2>Schedule</h2>
              </div>
              <div className="ca-grid-2">
                <div className="ca-input-group">
                  <label>Start Date</label>
                  <input type="date" id="start_date" value={formData.start_date} onChange={handleInputChange} className={errors.start_date ? 'error' : ''} />
                  {errors.start_date && <span className="ca-error-msg">{errors.start_date}</span>}
                </div>
                <div className="ca-input-group">
                  <label>Start Time</label>
                  <input type="time" id="start_time" value={formData.start_time} onChange={handleInputChange} className={errors.start_time ? 'error' : ''} />
                  {errors.start_time && <span className="ca-error-msg">{errors.start_time}</span>}
                </div>
                <div className="ca-input-group">
                  <label>End Date</label>
                  <input type="date" id="end_date" value={formData.end_date} onChange={handleInputChange} className={errors.end_date ? 'error' : ''} />
                  {errors.end_date && <span className="ca-error-msg">{errors.end_date}</span>}
                </div>
                <div className="ca-input-group">
                  <label>End Time</label>
                  <input type="time" id="end_time" value={formData.end_time} onChange={handleInputChange} className={errors.end_time ? 'error' : ''} />
                  {errors.end_time && <span className="ca-error-msg">{errors.end_time}</span>}
                </div>
              </div>
            </section>

            {/* Section 4: Logistics & Access */}
            <section className="ca-form-section">
              <div className="ca-section-header">
                <span className="material-symbols-outlined">hub</span>
                <h2>Logistics & Access</h2>
              </div>
              <div className="ca-grid-2 mb-4">
                <div className="ca-input-group relative-icon">
                  <label>Entry Fee</label>
                  <span className="input-icon text-symbol">$</span>
                  <input type="text" id="entry_fee" value={formData.entry_fee} onChange={handleInputChange} className={`with-icon ${errors.entry_fee ? 'error' : ''}`} placeholder="Free or 150" />
                  {errors.entry_fee && <span className="ca-error-msg">{errors.entry_fee}</span>}
                </div>

                <div className="ca-input-group">
                  <label>Event Type</label>
                  <select id="event_type" value={formData.event_type} onChange={handleInputChange} className={errors.event_type ? 'error' : ''}>
                    <option value="">Select Category</option>
                    {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  {errors.event_type && <span className="ca-error-msg">{errors.event_type}</span>}
                </div>

                <div className="ca-input-group">
                  <label>Event Mode</label>
                  <select id="event_mode" value={formData.event_mode} onChange={handleInputChange} className={errors.event_mode ? 'error' : ''}>
                    <option value="">Select Mode</option>
                    {eventModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                  </select>
                  {errors.event_mode && <span className="ca-error-msg">{errors.event_mode}</span>}
                </div>

                <div className="ca-input-group">
                  <label>Registration / Event Link</label>
                  <input type="url" id="event_link" value={formData.event_link} onChange={handleInputChange} className={errors.event_link ? 'error' : ''} placeholder="https://docs.google.com/..." />
                  {errors.event_link && <span className="ca-error-msg">{errors.event_link}</span>}
                </div>
              </div>
            </section>

            {/* Section 5: Visual Media */}
            <section className="ca-form-section">
              <div className="ca-section-header">
                <span className="material-symbols-outlined">image</span>
                <h2>Visual Media</h2>
              </div>

              <label htmlFor="poster_image" className={`ca-upload-zone ${errors.poster_image ? 'error-zone' : ''}`}>
                {formData.poster_preview ? (
                  <div className="ca-preview-wrapper">
                    <img src={formData.poster_preview} alt="Poster Preview" />
                    <div className="ca-preview-overlay">
                      <span className="material-symbols-outlined">edit</span> Change Image
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="ca-upload-icon">
                      <span className="material-symbols-outlined">upload_file</span>
                    </div>
                    <h3>Upload Poster Image</h3>
                    <p>Click to browse. Recommended: High-resolution (4:5 ratio).</p>
                  </>
                )}
                <input type="file" id="poster_image" accept="image/*" onChange={handleInputChange} className="hidden-file-input" />
              </label>
              {errors.poster_image && <span className="ca-error-msg text-center mt-2">{errors.poster_image}</span>}
            </section>

            {/* Form Actions */}
            <div className="ca-form-actions">
              <button type="button" className="ca-btn-draft">Save Draft</button>
              <button type="submit" className="ca-btn-publish">
                Publish Event <span className="material-symbols-outlined">send</span>
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default CAddEvents;