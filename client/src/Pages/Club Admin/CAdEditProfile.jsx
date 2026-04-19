import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../Components/ToastContext';
import './css/CAdEditProfile.css';

const CAdEditProfile = ({ adminData, rollNumber, onBack, onSaveSuccess }) => {
    const { showToast } = useToast();

    // Initialize form state with passed-in data
    const [editFormData, setEditFormData] = useState({
        name: adminData?.name || "",
        clubName: adminData?.club_name || "",
        email: adminData?.email || "",
        phone: adminData?.phone_number || "",
        address: adminData?.address || "",
        skills: adminData?.skills || ["Editorial Strategy", "Student Mentorship"], // Dummy fallback if DB has no skills array
    });

    const [newSkill, setNewSkill] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(
        adminData?.profile_picture ? `http://localhost:5000/${adminData.profile_picture.replace("\\", "/")}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuCkTQb8SBWe-m5UMF9ojLg1wboRAtA2swhzmiMTdSS0rRLbii8D2vUvBrCgo5ceJQB5RlMQsK33xjRDzFt5AfvNR7IPbQqucbZtr6vwhUeOc7ermeAQ7x26DENfUQt9kJNTp31uUnzAeTyilxK0zvH4AJH_V7GvDuTwCUiw9fcogVWXKfXIxoENQBIWo2NXaNiA6N36FNYl_ptqafaU-0PKug1HHzaxKqaZpskpgQsz2n3fpmlE7vwt4bGBacvbjuXQc_oAwFqXxmU"
    );

    const handleInputChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    // --- Dynamic Skills Logic ---
    const handleAddSkill = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            if (newSkill.trim() && !editFormData.skills.includes(newSkill.trim())) {
                setEditFormData({ ...editFormData, skills: [...editFormData.skills, newSkill.trim()] });
                setNewSkill("");
            }
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setEditFormData({
            ...editFormData,
            skills: editFormData.skills.filter(s => s !== skillToRemove)
        });
    };

    // --- Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", editFormData.name);
        formData.append("email", editFormData.email);
        formData.append("phone_number", editFormData.phone);
        formData.append("address", editFormData.address);
        // Note: Add logic here to append 'skills' if your backend supports saving arrays

        if (profilePic) {
            formData.append("profile_picture", profilePic);
        }

        try {
            await axios.put(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            showToast('success', 'Profile Updated', 'Your administrative credentials have been saved.');
            onSaveSuccess(); // Tells parent to refresh data and switch back to main view
        } catch (error) {
            console.error("Error updating profile:", error);
            showToast('error', 'Update Failed', 'Could not save profile settings.');
        }
    };

    return (
        <main className="cap-main-content cap-edit-mode">

            {/* Decorative Background Icon */}
            <div className="cap-edit-bg-icon">
                <span className="material-symbols-outlined">school</span>
            </div>

            <header className="cap-edit-header">
                <button type="button" className="cap-back-btn" onClick={onBack}>
                    <span className="material-symbols-outlined">arrow_back</span> Back to Dashboard
                </button>
                <h1>Edit Admin Profile</h1>
                <p>Update your personal identity and club information within the network.</p>
            </header>

            <div className="cap-form-card">
                <form onSubmit={handleSubmit}>

                    {/* Profile Photo Section */}
                    <section className="cap-photo-section">
                        <div className="cap-photo-wrapper">
                            <img src={profilePicPreview} alt="Profile" />
                            <label htmlFor="photo-upload" className="cap-photo-btn">
                                <span className="material-symbols-outlined">photo_camera</span>
                            </label>
                            <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </div>
                        <div className="cap-photo-text">
                            <h3>Profile Photo</h3>
                            <p>Upload a high-resolution portrait. Recommended size 400x400px.</p>
                            <div className="cap-photo-actions">
                                <label htmlFor="photo-upload" className="cap-btn-primary-small cursor-pointer">Change Photo</label>
                                <button type="button" className="cap-btn-gray-small" onClick={() => setProfilePicPreview("https://lh3.googleusercontent.com/aida-public/AB6AXuCkTQb8SBWe-m5UMF9ojLg1wboRAtA2swhzmiMTdSS0rRLbii8D2vUvBrCgo5ceJQB5RlMQsK33xjRDzFt5AfvNR7IPbQqucbZtr6vwhUeOc7ermeAQ7x26DENfUQt9kJNTp31uUnzAeTyilxK0zvH4AJH_V7GvDuTwCUiw9fcogVWXKfXIxoENQBIWo2NXaNiA6N36FNYl_ptqafaU-0PKug1HHzaxKqaZpskpgQsz2n3fpmlE7vwt4bGBacvbjuXQc_oAwFqXxmU")}>Remove</button>
                            </div>
                        </div>
                    </section>

                    {/* Core Info Grid */}
                    <section className="cap-input-grid">
                        <div className="cap-input-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={editFormData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="cap-input-group">
                            <label>Club Name</label>
                            <input type="text" name="clubName" value={editFormData.clubName} onChange={handleInputChange} disabled title="Contact Super Admin to change club name" />
                        </div>
                        <div className="cap-input-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="cap-input-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" value={editFormData.phone} onChange={handleInputChange} required />
                        </div>
                    </section>

                    {/* Biography / Address */}
                    <section className="cap-input-group full-width mt-6">
                        <label>About Me / Address</label>
                        <textarea name="address" rows="4" value={editFormData.address} onChange={handleInputChange} required></textarea>
                    </section>

                    {/* Dynamic Skills Tagging */}
                    <section className="cap-skills-section mt-8">
                        <label>Specialized Skills</label>
                        <div className="cap-skills-container">
                            {editFormData.skills.map((skill, idx) => (
                                <span key={idx} className="cap-skill-tag">
                                    {skill} <span className="material-symbols-outlined" onClick={() => handleRemoveSkill(skill)}>close</span>
                                </span>
                            ))}
                        </div>
                        <div className="cap-skill-input-wrapper">
                            <input
                                type="text"
                                placeholder="Add a skill and press Enter..."
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={handleAddSkill}
                            />
                            <button type="button" onClick={handleAddSkill}><span className="material-symbols-outlined">add_circle</span></button>
                        </div>
                    </section>

                    {/* Action Footer */}
                    <footer className="cap-form-footer">
                        <button type="button" className="cap-btn-text" onClick={onBack}>Discard Changes</button>
                        <button type="submit" className="cap-btn-gradient">Save Profile Settings</button>
                    </footer>

                </form>
            </div>

            <div className="cap-footer-meta">
                Last updated: {new Date().toLocaleDateString()} • Profile Strength: 85%
            </div>
        </main>
    );
};

export default CAdEditProfile;