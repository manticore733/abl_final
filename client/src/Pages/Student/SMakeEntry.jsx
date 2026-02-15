// import React, { useState } from "react";
// import SNavbar from "../../Components/StudentC/SNavbar";
// import { submitStudentEntry } from "../../api/studentApi"; // Import API function
// import "./css/SMakeEntry.css";

// const SMakeEntry = () => {
//   const [eventName, setEventName] = useState("");
//   const [activityType, setActivityType] = useState("");
//   const [category, setCategory] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [venue, setVenue] = useState("");
//   const [activityLevel, setActivityLevel] = useState("");
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({}); // Stores validation errors

//   // 🔹 Validation Function
//   const validateForm = () => {
//     let isValid = true;
//     let errors = {};

//     // 🔹 Activity Name Validation (Alphabets only, max 25 characters)
//     if (!/^[A-Za-z\s]{1,25}$/.test(eventName)) {
//       errors.eventName = "Alphabets should be present (max 25 characters)";
//       isValid = false;
//     }

//     // 🔹 End Date Validation (Cannot be before Start Date)
//     if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
//       errors.endDate = "End date cannot be before start date";
//       isValid = false;
//     }

//     // 🔹 Activity Venue Validation (Alphabets only, max 25 characters)
//     if (!/^[A-Za-z\s]{1,25}$/.test(venue)) {
//       errors.venue = "Only alphabets allowed (max 25 characters)";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return; // Stop form submission if validation fails
//     }

//     const formData = {
//       a_name: eventName,
//       a_type: activityType,
//       a_sub_type: category,
//       a_start_date: startDate,
//       a_end_date: endDate,
//       a_venue: venue,
//       a_level: activityLevel,
//     };

//     try {
//       const response = await submitStudentEntry(formData);
//       setMessage(response.message || "Entry submitted successfully!");
//       setErrors({}); // Clear errors on success
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Error submitting entry.");
//     }
//   };

//   return (
//     <div>
//       <SNavbar />
//       <div className="make-entry-form">
//         <div className="container mt-5">
//           <h2 className="sentry-header mb-4">Activity Entry Form</h2>
//           {message && <div className="alert alert-info">{message}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
            
//               {/* 🔹 Activity Name */}
//               <div className="mb-3">
//                 <label htmlFor="eventName" className="form-label">Activity Name</label>
//                 <input type="text" className="form-control" id="eventName" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
//                 {errors.eventName && <small className="text-danger">{errors.eventName}</small>}
//               </div>

//               {/* 🔹 Activity Start Date */}
//               <div className="mb-3">
//                 <label htmlFor="startDate" className="form-label">Activity Start Date</label>
//                 <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//               </div>

//               {/* 🔹 Activity End Date */}
//               <div className="mb-3">
//                 <label htmlFor="endDate" className="form-label">Activity End Date</label>
//                 <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
//                 {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
//               </div>

//               {/* 🔹 Activity Venue */}
//               <div className="mb-3">
//                 <label htmlFor="venue" className="form-label">Activity Venue</label>
//                 <input type="text" className="form-control" id="venue" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
//                 {errors.venue && <small className="text-danger">{errors.venue}</small>}
//               </div>

//               {/* 🔹 Activity Type */}
//               <div className="mb-3">
//                 <label htmlFor="eventType" className="form-label">Activity Type</label>
//                 <select className="form-select" id="eventType" value={activityType} onChange={(e) => setActivityType(e.target.value)} required>
//                   <option value="">Select Activity Type</option>
//                   <option value="Technical">Technical</option>
//                   <option value="Cultural">Cultural</option>
//                   <option value="Social">Social</option>
//                   <option value="Sports">Sports</option>
//                   <option value="Internship">Internship</option>
//                 </select>
//               </div>

//               {/* 🔹 Activity Category */}
//               {activityType && (
//                 <div className="mb-3">
//                   <label htmlFor="category" className="form-label">Select Category of Your Activity</label>
//                   <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
//                     <option value="">Select Category</option>
//                     {activityType === "Technical" && (
//                       <>
//                         <option value="Attended/Organised Seminar">Attended/Organised Seminar</option>
//                         <option value="Delivering Seminar">Delivering Seminar</option>
//                         <option value="Attended Workshop">Attended Workshop</option>
//                         <option value="Organized Workshop">Organized Workshop</option>
//                         <option value="Delivered Workshop">Delivered Workshop</option>
//                         <option value="Attended/Organized Competition">Attended/Organized Competition</option>
//                         <option value="Won Competition">Won Competition</option>
//                       </>
//                     )}
//                     {activityType === "Social" && (
//                       <>
//                         <option value="Donated Blood">Donated Blood</option>
//                         <option value="Other Social Work">Other Social Work</option>
//                       </>
//                     )}
//                     {activityType === "Sports" && (
//                       <>
//                         <option value="Participated">Participated</option>
//                         <option value="Won Competition">Won Competition</option>
//                       </>
//                     )}
//                     {activityType === "Cultural" && (
//                       <>
//                         <option value="Participated">Participated</option>
//                         <option value="Won Competition">Won Competition</option>
//                       </>
//                     )}
//                     {activityType === "Internship" && (
//                       <>
//                         <option value="Technical Internship">Technical Internship</option>
//                         <option value="Managerial Internship">Managerial Internship</option>
//                         <option value="Field Trip">Field Trip</option>
//                       </>
//                     )}
//                   </select>
//                 </div>
//               )}

//               {/* 🔹 Activity Level */}
//               <div className="mb-3">
//                 <label htmlFor="activityLevel" className="form-label">Activity Level</label>
//                 <select className="form-select" id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} required>
//                   <option value="">Select Activity Level</option>
//                   <option value="Intra-Collegiate">Intra-Collegiate</option>
//                   <option value="Inter-Collegiate">Inter-Collegiate(University-Level)</option>
//                   <option value="State-Level">State Level</option>
//                   <option value="National-Level">National Level</option>
//                   <option value="International-Level">International Level</option>
//                 </select>
//               </div>
//             </div>

//             {/* 🔹 Submit Button */}
//             <button type="submit" className="entry-event-button btn btn-success">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SMakeEntry;







////////100 percet wokrs


// import React, { useState, useEffect } from "react";
// import SNavbar from "../../Components/StudentC/SNavbar";
// import axios from "axios";
// import { Card, CardContent, CardHeader, Paper } from "@mui/material";
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Grid,
// } from "@mui/material";

// // Dummy Club List
// const clubOptions = ["Tech Club", "Cultural Club", "Sports Club", "NSS", "Other"];

// // Points Mapping
// const pointsMapping = {
//   "Technical Seminar - Attending/Organizing": 1,
//   "Technical Seminar - Delivering": 2,
//   "Technical Workshop - Attending": 2,
//   "Technical Workshop - Organizing": 1,
//   "Technical Workshop - Delivering": 3,
//   "Technical Competition - Attending/Organizing": 1,
//   "Technical Competition - Winning (Intra College)": 1,
//   "Technical Competition - Winning (University)": 2,
//   "Technical Competition - Winning (State)": 3,
//   "Technical Competition - Winning (National)": 4,
//   "Passing NPTEL / Coursera / any other MOOCs - Passing": 2,
//   "Passing NPTEL / Coursera / any other MOOCs - First Class": 3,
//   "Passing NPTEL / Coursera / any other MOOCs - Distinction": 4,
//   "Technical Paper Publication/Presentation - National Level": 2,
//   "Technical Paper Publication/Presentation - International Level": 3,
//   "Tree Plantation Drive": 1,
//   "Blood Donation Drive - Organizing": 1,
//   "Blood Donation Drive - Donating": 2,
//   "Health Camps": 1,
//   "Road Safety Seminar": 1,
//   "Cleanliness Drive": 1,
//   "Animal Welfare Activity": 1,
//   "Nutrition Seminar": 1,
//   "Solid/E-Waste/Plastic Waste Management": 1,
//   "Visits to Old Age Homes/Ashrams": 1,
//   "Visits to Rural Villages": 1,
//   "Mangrove Cleaning Drive": 1,
//   "Other Social Activities": 1,
//   "Sports Festival": 1,
//   "University/State/National Competitions - Participation": 1,
//   "University/State/National Competitions - Winning (University)": 2,
//   "University/State/National Competitions - Winning (State)": 3,
//   "University/State/National Competitions - Winning (National)": 4,
//   "Yoga Workshops": 1,
//   "Fit India": 1,
//   "Marathon/Walkathon - Participating": 1,
//   "Marathon/Walkathon - Winning": 2,
//   "Zumba Workshops": 1,
//   "Cultural Events - Participation": 1,
//   "Cultural Events - Representation (University/State/National)": 2,
//   "Cultural Events - Winning (University)": 2,
//   "Cultural Events - Winning (State)": 3,
//   "Cultural Events - Winning (National)": 3,
//   "Internships": 3,
//   "Field Visits": 1,
//   "TnP Coordination": 2,
//   "Managerial Internship": 2,
// };

// const categoryOptions = {
//   Technical: [
//     "Technical Seminar",
//     "Technical Workshop",
//     "Technical Competition",
//     "Passing NPTEL / Coursera / any other MOOCs",
//     "Technical Paper Publication/Presentation",
//   ],
//   Social: [
//     "Tree Plantation Drive",
//     "Blood Donation Drive",
//     "Health Camps",
//     "Road Safety Seminar",
//     "Cleanliness Drive",
//     "Animal Welfare Activity",
//     "Nutrition Seminar",
//     "Solid/E-Waste/Plastic Waste Management",
//     "Visits to Old Age Homes/Ashrams",
//     "Visits to Rural Villages",
//     "Mangrove Cleaning Drive",
//     "Other Social Activities",
//   ],
//   Sports: [
//     "Sports Festival",
//     "University/State/National Competitions",
//     "Yoga Workshops",
//     "Fit India",
//     "Marathon/Walkathon",
//     "Zumba Workshops",
//   ],
//   Cultural: ["Cultural Events"],
//   Internship: ["Internships", "Field Visits", "TnP Coordination", "Managerial Internship"],
// };


// const subCategoryOptions = {
//   "Technical Seminar": ["Attending/Organizing", "Delivering"],
//   "Technical Workshop": ["Attending", "Organizing", "Delivering"],
//   "Technical Competition": [
//     "Attending/Organizing",
//     "Winning (Intra College)",
//     "Winning (University)",
//     "Winning (State)",
//     "Winning (National)",
//   ],
//   "Passing NPTEL / Coursera / any other MOOCs": ["Passing", "First Class", "Distinction"],
//   "Technical Paper Publication/Presentation": ["National Level", "International Level"],
//   "Blood Donation Drive": ["Organizing", "Donating"],
//   "University/State/National Competitions": ["Participation", "Winning (University)", "Winning (State)", "Winning (National)"],
//   "Marathon/Walkathon": ["Participating", "Winning"],
//   "Cultural Events": ["Participation", "Representation (University/State/National)", "Winning (University)", "Winning (State)", "Winning (National)"],
// };






// const SMakeEntry = () => {
//   const [formData, setFormData] = useState({
//     s_id: "",
//     roll_number: "",
//     name: "",
//     department: "",
//     division: "",
//     semester: "",
//     event_name:"",
//     event_type: "",
//     subcategory: "",
//     sub_activity_type: "",
//     organised_by: "",
//     participation_date: "",
//     venue: "",
//     allocated_points: "",
//     status: "Pending",
//     remarks: "",
//   });

//   useEffect(() => {
//     const rollNumber = sessionStorage.getItem("username");
//     if (rollNumber) fetchStudentDetails(rollNumber);
//   }, []);

//   const fetchStudentDetails = async (rollNumber) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/student/student-details/${rollNumber}`
//       );
//       setFormData((prev) => ({
//         ...prev,
//         s_id: response.data.s_id,
//         roll_number: response.data.s_username,
//         name: response.data.name,
//         department: response.data.department,
//         division: response.data.division,
//         semester: response.data.semester,
//       }));
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//     }
//   };


  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedForm = { ...formData, [name]: value };

//     if (name === "event_type") {
//         updatedForm.subcategory = "";
//         updatedForm.sub_activity_type = "";
//         updatedForm.allocated_points = 0;
//     }

//     if (name === "subcategory") {
//         updatedForm.sub_activity_type = ""; // Reset sub-activity type

//         // Check if subcategory has an activity type or not
//         if (!subCategoryOptions[value]) {
//             updatedForm.allocated_points = pointsMapping[value] || 0;
//         }
//     }

//     if (name === "sub_activity_type") {
//         const key = `${updatedForm.subcategory} - ${value}`;
//         updatedForm.allocated_points = pointsMapping[key] || 0;
//     }

//     setFormData(updatedForm);
// };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting Data:", formData);
//       await axios.post(
//         "http://localhost:5000/api/student/activity-summary",
//         formData
//       );
//       alert("Activity added successfully!");
//     } catch (error) {
//       console.error("Error submitting activity:", error);
//     }
//   };

//   return (
//     <div>
//       <SNavbar />
//       <Container maxWidth="md" sx={{ mt: 10 }}>
        
//         <Typography variant="h5">Add Student Activity</Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {["roll_number", "name", "department", "division", "semester"].map(
//               (field) => (
//                 <Grid key={field} item xs={12} sm={6}>
//                   <TextField fullWidth label={field} value={formData[field]} disabled />
//                 </Grid>
//               )
//             )}

// <Grid item xs={12} sm={6}>
// <TextField
//   fullWidth
//   label="Event Name"
//   name="event_name"
//   value={formData.event_name}
//   onChange={handleChange}

// />
// </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Event Type"
//                 name="event_type"
//                 value={formData.event_type}
//                 onChange={handleChange}
//               >
//                 {Object.keys(categoryOptions).map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Subcategory"
//                 name="subcategory"
//                 value={formData.subcategory}
//                 onChange={handleChange}
//                 disabled={!formData.event_type}
//               >
//                 {categoryOptions[formData.event_type]?.map((event) => (
//                   <MenuItem key={event} value={event}>
//                     {event}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//             <TextField
//   select
//   fullWidth
//   label="Sub Activity Type"
//   name="sub_activity_type"
//   value={formData.sub_activity_type}
//   onChange={handleChange}
//   disabled={!subCategoryOptions[formData.subcategory]} // Disable if no sub-activities exist
// >
//   {(subCategoryOptions[formData.subcategory] || []).map((sub) => (
//     <MenuItem key={sub} value={sub}>
//       {sub}
//     </MenuItem>
//   ))}
// </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Organised By"
//                 name="organised_by"
//                 value={formData.organised_by}
//                 onChange={handleChange}
//               >
//                 {clubOptions.map((club) => (
//                   <MenuItem key={club} value={club}>
//                     {club}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 type="date"
//                 fullWidth
//                 label="Participation Date"
//                 name="participation_date"
//                 value={formData.participation_date}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Venue"
//                 name="venue"
//                 value={formData.venue}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//   <TextField
//     fullWidth
//     label="Allocated Points"
//     name="allocated_points"
//     value={formData.allocated_points}
//     InputProps={{ readOnly: true }} // Allows selection but prevents editing
//   />
// </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit Activity
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </div>
//   );
// };

// export default SMakeEntry;
























import React, { useState, useEffect } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import axios from "axios";
import { Card, CardContent, CardHeader, Paper } from "@mui/material";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
} from "@mui/material";

// Dummy Club List
const clubOptions = ["Nrtiya Nation", "Drama club", "Csi comps", "NSS", "Csi IT","AIDL","Gdsc","Ecell","ARC","Eco club","Cyber cell","Marathi mandal"];

//Rhythm club
// Nrtiya nation -dance club
// Drama club
// Csi comps
// Csi IT
// AIDL
// Gdsc
// Ecell
// ARC
// NSS
// Eco club
// Cyber cell 
// Marathi mandal
// Manthan magazine club
// IEEE
// Algozenith
// Aero FCRIT
// //

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
  Technical: [
    "Technical Seminar",
    "Technical Workshop",
    "Technical Competition",
    "Passing NPTEL / Coursera / any other MOOCs",
    "Technical Paper Publication/Presentation",
  ],
  Social: [
    "Tree Plantation Drive",
    "Blood Donation Drive",
    "Health Camps",
    "Road Safety Seminar",
    "Cleanliness Drive",
    "Animal Welfare Activity",
    "Nutrition Seminar",
    "Solid/E-Waste/Plastic Waste Management",
    "Visits to Old Age Homes/Ashrams",
    "Visits to Rural Villages",
    "Mangrove Cleaning Drive",
    "Other Social Activities",
  ],
  Sports: [
    "Sports Festival",
    "University/State/National Competitions",
    "Yoga Workshops",
    "Fit India",
    "Marathon/Walkathon",
    "Zumba Workshops",
  ],
  Cultural: ["Cultural Events"],
  Internship: ["Internships", "Field Visits", "TnP Coordination", "Managerial Internship"],
};


const subCategoryOptions = {
  "Technical Seminar": ["Attending/Organizing", "Delivering"],
  "Technical Workshop": ["Attending", "Organizing", "Delivering"],
  "Technical Competition": [
    "Attending/Organizing",
    "Winning (Intra College)",
    "Winning (University)",
    "Winning (State)",
    "Winning (National)",
  ],
  "Passing NPTEL / Coursera / any other MOOCs": ["Passing", "First Class", "Distinction"],
  "Technical Paper Publication/Presentation": ["National Level", "International Level"],
  "Blood Donation Drive": ["Organizing", "Donating"],
  "University/State/National Competitions": ["Participation", "Winning (University)", "Winning (State)", "Winning (National)"],
  "Marathon/Walkathon": ["Participating", "Winning"],
  "Cultural Events": ["Participation", "Representation (University/State/National)", "Winning (University)", "Winning (State)", "Winning (National)"],
};






const SMakeEntry = () => {
  const [formData, setFormData] = useState({
    s_id: "",
    roll_number: "",
    name: "",
    department: "",
    division: "",
    semester: "",
    event_name:"",
    event_type: "",
    subcategory: "",
    sub_activity_type: "",
    organised_by: "",
    participation_date: "",
    venue: "",
    allocated_points: "",
    status: "Pending",
    remarks: "",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  useEffect(() => {
    const rollNumber = sessionStorage.getItem("username");
    if (rollNumber) fetchStudentDetails(rollNumber);
  }, []);

  const fetchStudentDetails = async (rollNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/student-details/${rollNumber}`
      );
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
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types

    if (name === "event_type") {
        updatedForm.subcategory = "";
        updatedForm.sub_activity_type = "";
        updatedForm.allocated_points = 0;
    }

    if (name === "subcategory") {
        updatedForm.sub_activity_type = ""; // Reset sub-activity type

        // Check if subcategory has an activity type or not
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

  if(!formData.organised_by) newErrors.organised_by = "Club Name / Organised by required!!"
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
  return Object.keys(newErrors).length === 0; // Return true if no errors
};








  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call validation function
  if (!validateForm()) return; // Stop if validation fails

    try {
      console.log("Submitting Data:", formData);
      await axios.post(
        "http://localhost:5000/api/student/activity-summary",
        formData
      );
      alert("Activity added successfully!");

      // Reset form and clear errors after success
        // Preserve student details while clearing other inputs
        setFormData((prev) => ({
          ...prev,
          event_name: "",
          event_type: "",
          subcategory: "",
          sub_activity_type: "",
          organised_by: "",
          participation_date: "",
          venue: "",
          allocated_points: "",
        }));
    setErrors({});


    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  return (
    <div>
      <SNavbar />
      <Container maxWidth="sm" sx={{ mt: 7 }}> {/* Reduced width for a better look */}
        <Card sx={{ boxShadow: 4, borderRadius: 3, p: 2 }}> {/* Enhanced card styling */}
          <CardHeader
            title="Activity Entry Form"
            sx={{  color: "black", textAlign: "center", py: 2 }} 
          />
          <CardContent    >

            <form onSubmit={handleSubmit}  >
              <Grid container spacing={2}>
                {["roll_number", "name", "department", "division", "semester"].map((field) => (
                  <Grid key={field} item xs={12} sm={6}>
                    <TextField fullWidth label= {field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}    value={formData[field]} disabled />
                  </Grid>
                ))}
  
                <Grid item xs={12}>
                  <TextField fullWidth label="Event Name" name="event_name" 
                  value={formData.event_name} onChange={handleChange}  error={!!errors.event_name} helperText={errors.event_name} />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Event Type" name="event_type" 
                  value={formData.event_type} onChange={handleChange}   error={!!errors.event_type} helperText={errors.event_type}     >
                    {Object.keys(categoryOptions).map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} disabled={!formData.event_type} 
                  error={!!errors.subcategory}  helperText={errors.subcategory}  >
                    {categoryOptions[formData.event_type]?.map((event) => (
                      <MenuItem key={event} value={event}>{event}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Sub Activity Type" name="sub_activity_type" 
                  value={formData.sub_activity_type} onChange={handleChange} 
                  disabled={!subCategoryOptions[formData.subcategory]} error={!!errors.sub_activity_type}   helperText={errors.sub_activity_type}        >

                    {(subCategoryOptions[formData.subcategory] || []).map((sub) => (
                      <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Organised By" name="organised_by" 
                  value={formData.organised_by} onChange={handleChange}  error={!!errors.organised_by} helperText={errors.organised_by}      >
                    {clubOptions.map((club) => (
                      <MenuItem key={club} value={club}>{club}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField type="date" fullWidth label="Participation Date" name="participation_date" value={formData.participation_date} 
                  onChange={handleChange} InputLabelProps={{ shrink: true }}   error={!!errors.participation_date} helperText={errors.participation_date} />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Venue" name="venue" 
                  value={formData.venue} onChange={handleChange}  error={!!errors.venue}
                  helperText={errors.venue}
               />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Allocated Points" name="allocated_points" value={formData.allocated_points} InputProps={{ readOnly: true }} />
                </Grid>
  
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt:2}}>
                    Submit Activity
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );


};

export default SMakeEntry;
