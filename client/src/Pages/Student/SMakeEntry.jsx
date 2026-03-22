import React, { useState, useEffect } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Container, TextField, MenuItem, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import "./css/SMakeEntry.css";
import "./css/sHomepage.css";

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
  const [formData, setFormData] = useState({
    s_id: "", roll_number: "", name: "", department: "", division: "",
    semester: "", event_name: "", event_type: "", subcategory: "",
    sub_activity_type: "", organised_by: "", participation_date: "",
    venue: "", allocated_points: "", status: "Pending", remarks: "",
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
    if (!formData.organised_by) newErrors.organised_by = "Club Name / Organised by required!!";
    if (!formData.event_name.trim()) newErrors.event_name = "Event Name is required.";
    if (!formData.event_type) newErrors.event_type = "Event Type is required.";
    if (!formData.subcategory) newErrors.subcategory = "Subcategory is required.";
    if (subCategoryOptions[formData.subcategory] && !formData.sub_activity_type) {
      newErrors.sub_activity_type = "Sub Activity Type is required.";
    }
    if (!formData.participation_date) {
      newErrors.participation_date = "Participation Date is required.";
    } else {
      const year = new Date(formData.participation_date).getFullYear();
      if (year < 2021) newErrors.participation_date = "Date must be after 2021.";
    }
    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required.";
    } else if (/[!@#$%^&*]/.test(formData.venue)) {
      newErrors.venue = "Venue cannot contain special characters like @, #, $.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/student/activity-summary", formData);
      alert("Activity added successfully!");
      setFormData((prev) => ({
        ...prev, event_name: "", event_type: "", subcategory: "",
        sub_activity_type: "", organised_by: "", participation_date: "",
        venue: "", allocated_points: "",
      }));
      setErrors({});
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  return (
    <div className="student-page-wrapper">
      <SNavbar />

      <div className="student-hero" style={{ height: "35vh", minHeight: "250px" }}>
        <div className="student-hero-content">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Log Activity
          </motion.h1>
          <div className="student-hero-instruction">
            Submit your achievements and earn ABL points
          </div>
        </div>
        <div className="student-hero-shape student-shape-1"></div>
        <div className="student-hero-shape student-shape-2"></div>
      </div>

      <div className="student-main-container entry-overlap-container">
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="section-card form-card-enhancement">
              <CardHeader
                title="Activity Entry Form"
                sx={{
                  textAlign: "center", py: 1,
                  "& .MuiCardHeader-title": { fontWeight: 700, color: "#1e293b", fontSize: "1.5rem" },
                }}
              />
              <CardContent sx={{ px: { xs: 2, sm: 4 } }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>

                    {/* Read-only Student Info Section */}
                    <Grid item xs={12}>
                      <div className="form-section-title">Student Details</div>
                    </Grid>

                    {["roll_number", "name", "department", "division", "semester"].map((field) => (
                      <Grid key={field} item xs={12} sm={6} md={4}>
                        <div className="input-group">
                          <label>{field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</label>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder={`Enter ${field}`}
                            value={formData[field]}
                            disabled
                            className="modern-input disabled-input"
                          />
                        </div>
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <hr className="form-divider" />
                      <div className="form-section-title">Activity Information</div>
                    </Grid>

                    <Grid item xs={12}>
                      <div className="input-group">
                        <label>Event Name</label>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="e.g. Annual Tech Fest"
                          name="event_name"
                          value={formData.event_name}
                          onChange={handleChange}
                          error={!!errors.event_name}
                          helperText={errors.event_name}
                          className="modern-input"
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div className="input-group">
                        <label>Event Type</label>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          SelectProps={{ displayEmpty: true }}
                          name="event_type"
                          value={formData.event_type}
                          onChange={handleChange}
                          error={!!errors.event_type}
                          helperText={errors.event_type}
                          className="modern-input"
                        >
                          <MenuItem value="" disabled>Select Type</MenuItem>
                          {Object.keys(categoryOptions).map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div className="input-group">
                        <label>Subcategory</label>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          SelectProps={{ displayEmpty: true }}
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleChange}
                          disabled={!formData.event_type}
                          error={!!errors.subcategory}
                          helperText={errors.subcategory}
                          className="modern-input"
                        >
                          <MenuItem value="" disabled>Select Subcategory</MenuItem>
                          {categoryOptions[formData.event_type]?.map((event) => (
                            <MenuItem key={event} value={event}>{event}</MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div className="input-group">
                        <label>Sub Activity Type</label>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          SelectProps={{ displayEmpty: true }}
                          name="sub_activity_type"
                          value={formData.sub_activity_type}
                          onChange={handleChange}
                          disabled={!subCategoryOptions[formData.subcategory]}
                          error={!!errors.sub_activity_type}
                          helperText={errors.sub_activity_type}
                          className="modern-input"
                        >
                          <MenuItem value="" disabled>Select Activity</MenuItem>
                          {(subCategoryOptions[formData.subcategory] || []).map((sub) => (
                            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div className="input-group">
                        <label>Organised By</label>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          SelectProps={{ displayEmpty: true }}
                          name="organised_by"
                          value={formData.organised_by}
                          onChange={handleChange}
                          error={!!errors.organised_by}
                          helperText={errors.organised_by}
                          className="modern-input"
                        >
                          <MenuItem value="" disabled>Select Club</MenuItem>
                          {clubOptions.map((club) => (
                            <MenuItem key={club} value={club}>{club}</MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div className="input-group">
                        <label>Participation Date</label>
                        <TextField
                          type="date"
                          fullWidth
                          size="small"
                          name="participation_date"
                          value={formData.participation_date}
                          onChange={handleChange}
                          error={!!errors.participation_date}
                          helperText={errors.participation_date}
                          className="modern-input"
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div className="input-group">
                        <label>Venue</label>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="e.g. Seminar Hall"
                          name="venue"
                          value={formData.venue}
                          onChange={handleChange}
                          error={!!errors.venue}
                          helperText={errors.venue}
                          className="modern-input"
                        />
                      </div>
                    </Grid>

                    {/* Points Allocation - Removed the negative margin! */}
                    <Grid item xs={12} sm={6} md={4}>
                      <div className="input-group">
                        <label>Allocated Points</label>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="0"
                          name="allocated_points"
                          value={formData.allocated_points}
                          InputProps={{ readOnly: true }}
                          className="modern-input points-input"
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" className="modern-submit-btn" fullWidth>
                        Submit Activity
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </div>

      {/* Keeping your global footer here */}

      <footer className="student-footer">
        <p>© {new Date().getFullYear()} FCRIT ABL Portal</p>
        <p className="footer-sub">Contact: info@fcrit.ac.in | Designed for Students</p>
      </footer>

    </div>
  );
};

export default SMakeEntry;