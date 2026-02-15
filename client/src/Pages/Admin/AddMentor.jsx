// import React, { useState } from "react";
// import AdNavbar from "../../Components/AdminC/AdNavbar";
// import "./css/AddMentor.css";
// import { addMentor } from "../../api/mentorAddApi"; // Updated API function

// const AddMentor = () => {
//   const [formData, setFormData] = useState({
//     m_username: "",
//     m_password: "",
//     m_name: "",
//     m_batch: "",
//     m_sem: "",
//     m_csec: "",
//     m_branch: "",
//   });

//   const [errors, setErrors] = useState({}); // State to track validation errors

//   const branches = ["Computer", "Mechanical", "EXTC", "IT", "Electrical"];
//   const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString()); // ["1", "2", ..., "8"]
//   const sections = ["A", "B"];
//   const batches = ["1", "2", "3", "4"];

//   // Handle changes for form inputs
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     setErrors({ ...errors, [id]: "" }); // Clear error when user starts typing
//   };

//   // ✅ Form Validation Function
//   const validateForm = () => {
//     let isValid = true;
//     let newErrors = {};

//     Object.keys(formData).forEach((field) => {
//       if (!formData[field]) {
//         newErrors[field] = "This field is required";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return; // Stop submission if validation fails
//     }

//     try {
//       await addMentor(formData);
//       alert("Mentor added successfully!");
//     } catch (error) {
//       console.error("Error adding mentor:", error);
//       alert("Failed to add mentor.");
//     }
//   };

//   return (
//     <div>
//       <AdNavbar />
//       <form className="main-box row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
//         <div className="add-mentor-text"> Assign a Mentor to Batch </div>

//         {/* Mentor Authentication Details */}
//         <div className="col-sm-4">
//           <label htmlFor="m_name" className="form-label">Name</label>
//           <input type="text" className="form-control" id="m_name" value={formData.m_name} onChange={handleInputChange} />
//           {errors.m_name && <small className="text-danger">{errors.m_name}</small>}
//         </div>

//         <div className="col-sm-4">
//           <label htmlFor="m_username" className="form-label">Username</label>
//           <input type="text" className="form-control" id="m_username" value={formData.m_username} onChange={handleInputChange} />
//           {errors.m_username && <small className="text-danger">{errors.m_username}</small>}
//         </div>

//         <div className="col-sm-4">
//           <label htmlFor="m_password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="m_password" value={formData.m_password} onChange={handleInputChange} />
//           {errors.m_password && <small className="text-danger">{errors.m_password}</small>}
//         </div>

//         {/* Mentor Details */}
//         <div className="col-sm-4">
//           <label htmlFor="m_batch" className="form-label">Batch</label>
//           <select className="form-control" id="m_batch" value={formData.m_batch} onChange={handleInputChange}>
//             <option value="">Select Batch</option>
//             {batches.map((batch, index) => (
//               <option key={index} value={batch}>{batch}</option>
//             ))}
//           </select>
//           {errors.m_batch && <small className="text-danger">{errors.m_batch}</small>}
//         </div>

//         <div className="col-sm-4">
//           <label htmlFor="m_sem" className="form-label">Semester</label>
//           <select className="form-control" id="m_sem" value={formData.m_sem} onChange={handleInputChange}>
//             <option value="">Select Semester</option>
//             {semesters.map((sem, index) => (
//               <option key={index} value={sem}>{sem}</option>
//             ))}
//           </select>
//           {errors.m_sem && <small className="text-danger">{errors.m_sem}</small>}
//         </div>

//         <div className="col-sm-4">
//           <label htmlFor="m_csec" className="form-label">Class Section</label>
//           <select className="form-control" id="m_csec" value={formData.m_csec} onChange={handleInputChange}>
//             <option value="">Select Section</option>
//             {sections.map((sec, index) => (
//               <option key={index} value={sec}>{sec}</option>
//             ))}
//           </select>
//           {errors.m_csec && <small className="text-danger">{errors.m_csec}</small>}
//         </div>

//         <div className="col-sm-4">
//           <label htmlFor="m_branch" className="form-label">Branch</label>
//           <select className="form-control" id="m_branch" value={formData.m_branch} onChange={handleInputChange}>
//             <option value="">Select Branch</option>
//             {branches.map((branch, index) => (
//               <option key={index} value={branch}>{branch}</option>
//             ))}
//           </select>
//           {errors.m_branch && <small className="text-danger">{errors.m_branch}</small>}
//         </div>

//         <div>
//           <button type="submit" className="btn btn-outline-success">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddMentor;




































































import React, { useState, useRef } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Typography,
  Input,
} from "@mui/material";
import { AccountCircle, Person, School} from "@mui/icons-material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import UploadFile from "@mui/icons-material/UploadFile";

import axios from "axios";



const steps = ["Personal Details", " Creating Login Details", "Academic Assignment"];


const AddMentor = () => {
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
    profile_pic: null,
    profile_pic_preview: "",
  });

  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const inputRefs = useRef({});
  const [showPassword, setShowPassword] = useState(false);



  const branches = ["Computer", "Mechanical", "EXTC", "IT", "Electrical"];
  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const sections = ["A", "B"];
  const batches = ["1", "2", "3", "4"];

  const handleTogglePassword = () => setShowPassword(!showPassword);
  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  // Handle dropdown change
  const handleDropdownChange = (id) => (e) => {
    setFormData({ ...formData, [id]: e.target.value });
    setErrors({ ...errors, [id]: "" });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, profile_pic: file, profile_pic_preview: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

    // File input hidden ref
    const fileInputRef = useRef(null);
    const handleUploadClick = () => fileInputRef.current?.click();

  // Validate form fields
  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    if (activeStep === 0) {



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

     
      if (!formData.profile_pic) {
        newErrors.profile_pic = "Profile picture is required";
      }
      

    } 
    
    else if (activeStep === 1) {


      if (!formData.m_username) newErrors.m_username = "Username is required";
      if (!formData.m_password) newErrors.m_password = "Password is required";

    } 
    
    
    else if (activeStep === 2) {
      ["m_batch", "m_sem", "m_csec", "m_branch", "year_of_joining"].forEach((field) => {
        if (!formData[field]) newErrors[field] = "This field is required";
      });
    }





    if (Object.keys(newErrors).length > 0) {
      isValid = false;
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      inputRefs.current[firstErrorKey]?.focus();
    }

    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {

      setActiveStep((prev) => prev + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (!window.confirm("Are you sure you want to submit?")) return;

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post("http://localhost:5000/api/admin/add-mentor", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Mentor added successfully!");
      setFormData({
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
        profile_pic: null,
        profile_pic_preview: "",
      });
      setActiveStep(0);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add mentor.");
    }
  };

  return (

<div>
  <AdNavbar/>



    <Container maxWidth="md" sx={{mb:2}}>
      <Box sx={{ mt: 10, p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
          Assign a Mentor to Batch
        </Typography>

        {/* Stepper */}
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel icon={index === 0 ? <AccountCircle /> : index === 1 ? <Person /> : <School />}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Forms */}



        <Box>
          
          {activeStep === 0 && (
            <>
              <TextField fullWidth label="Name" id="m_name"  value={formData.m_name} onChange={handleInputChange} error={!!errors.m_name} helperText={errors.m_name} sx={{ mb: 2 }} />
              <TextField fullWidth label="Email" id="m_email"   value={formData.m_email} onChange={handleInputChange} error={!!errors.m_email} helperText={errors.m_email}   sx= {{mb:2}}/>
              <TextField fullWidth label="Phone Number" id="m_phone"  value={formData.m_phone} onChange={handleInputChange} error={!!errors.m_phone} helperText={errors.m_phone}   sx= {{mb:2}}/>
              <TextField fullWidth label="Designation" id="m_designation"  value={formData.m_designation} onChange={handleInputChange} error={!!errors.m_designation} helperText={errors.m_designation}   sx= {{mb:2}}/>
              
              {/* <Input type="file" onChange={handleFileChange} /> */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Show file name in a TextField for consistency */}
                  <TextField
                    fullWidth
                    label="Profile Picture"
                    value={formData.profile_pic ? formData.profile_pic.name : ""}
                    error={!!errors.profile_pic}
                    helperText={errors.profile_pic}
                    InputProps={{ readOnly: true }}
                  />

                  {/* Image Preview - Only show if a file is selected */}
                  {formData.profile_pic_preview && (
                    <Box
                      component="img"
                      src={formData.profile_pic_preview}
                      alt="Profile Preview"
                      sx={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", alignSelf: "center" }}
                    />
                  )}

                  {/* File Upload (Hidden) */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  {/* Button to trigger file upload */}
                  <Button
                    variant="contained"
                    onClick={handleUploadClick}
                    startIcon={<UploadFile />}
                  >
                    Upload Profile Picture
                  </Button>
                </Box>

            </>
          )}


          {activeStep === 1 && (
            <>
              <TextField fullWidth label="Username" id="m_username"  value={formData.m_username} onChange={handleInputChange} error={!!errors.m_username} helperText={errors.m_username} sx={{ mb: 2 }} />
              {/* <TextField fullWidth type="password" label="Password" id="m_password"  value={formData.m_password} onChange={handleInputChange} error={!!errors.m_password} helperText={errors.m_password} sx={{ mb: 2 }} /> */}
            
              <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}  // ✅ Toggle password visibility
                    label="Password"
                    id="m_password"
                    value={formData.m_password}  // ✅ Ensure input retains value
                    onChange={handleInputChange}
                    error={!!errors.m_password}
                    helperText={errors.m_password}
                    sx={{ mb: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                              
            </>


          )}


          

                {activeStep === 2 && (
                  <>
                    <TextField
                      fullWidth
                      type="number"
                      label="Year of Joining"
                      id="year_of_joining"
                      onChange={handleInputChange}
                      value={formData.year_of_joining}
                      error={!!errors.year_of_joining}
                      helperText={errors.year_of_joining}
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      select
                      fullWidth
                      label="Batch"
                      id="m_batch"
                      value={formData.m_batch}
                      onChange={handleDropdownChange("m_batch")}
                      error={!!errors.m_batch}
                      helperText={errors.m_batch}
                      sx={{ mb: 2 }}
                    >
                      {batches.map((batch) => (
                        <MenuItem key={batch} value={batch}>
                          {batch}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      label="Division"
                      id="m_csec"
                      value={formData.m_csec}
                      onChange={handleDropdownChange("m_csec")}
                      error={!!errors.m_csec}
                      helperText={errors.m_csec}
                      sx={{ mb: 2 }}
                    >
                      {sections.map((section) => (
                        <MenuItem key={section} value={section}>
                          {section}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      label="Semester"
                      id="m_sem"
                      value={formData.m_sem}
                      onChange={handleDropdownChange("m_sem")}
                      error={!!errors.m_sem}
                      helperText={errors.m_sem}
                      sx={{ mb: 2 }}
                    >
                      {semesters.map((sem) => (
                        <MenuItem key={sem} value={sem}>
                          {sem}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      label="Department"
                      id="m_branch"
                      value={formData.m_branch}
                      onChange={handleDropdownChange("m_branch")}
                      error={!!errors.m_branch}
                      helperText={errors.m_branch}
                      sx={{ mb: 2 }}
                    >
                      {branches.map((branch) => (
                        <MenuItem key={branch} value={branch}>
                          {branch}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                )}


        </Box>
        

            {/* Buttons */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
              {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
              {activeStep < steps.length - 1 ? <Button variant="contained" onClick={handleNext}>Next</Button> : <Button variant="contained" onClick={handleSubmit}>Submit</Button>}
            </Box>



          </Box>
    </Container>
    </div>
  );
};

export default AddMentor;

