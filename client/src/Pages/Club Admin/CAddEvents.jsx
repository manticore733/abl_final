// import React, { useState } from "react";
// import "./css/CAddEvents.css";
// import { addEvent } from "../../api/eventApi"; // Import the API function
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";

// const CAddEvents = () => {
//   const [formData, setFormData] = useState({
//     e_name: "",
//     e_org: "",
//     e_cost: "",
//     e_type: "",
//     e_category: "",
//     e_img: null,
//     e_date:"",
//     e_link:"",
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { id, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, e_img: files[0] });
//     } else {
//       setFormData({ ...formData, [id]: value });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("e_name", formData.e_name);
//     data.append("e_org", formData.e_org);
//     data.append("e_cost", formData.e_cost);
//     data.append("e_type", formData.e_type);
//     data.append("e_category", formData.e_category);
//     data.append("e_img", formData.e_img);
//     data.append("e_date", formData.e_date);
//     data.append("e_link", formData.e_link);


//     try {
//       await addEvent(data); // Call the API function
//       alert("Activity added successfully!");
//     } catch (error) {
//       alert("Failed to add Activity.");
//     }
//   };

//   return (
//     <div>
//       <CAdNavbar />
//       <form className="cad-event-form" onSubmit={handleSubmit}>
//         <form1 >
//           <div className="add-event-text-header">Add Activity</div>
//           <div className="cad-add-event-text event-name">Activity Name:</div>
//           <input
//             className="form-control-1 form-control-sm"
//             type="text"
//             id="e_name"
//             value={formData.e_name}
//             onChange={handleInputChange}
//             required
//           />
//           <div className="cad-add-event-text">Organizer Name:</div>
//           <input
//             className="form-control-1 form-control-sm"
//             type="text"
//             id="e_org"
//             value={formData.e_org}
//             onChange={handleInputChange}
//             required
//           />
//           <div className="cad-add-event-text">Activity Registration Fee:</div>
//           <input
//             className="form-control-1 form-control-sm"
//             type="number"
//             id="e_cost"
//             value={formData.e_cost}
//             onChange={handleInputChange}
//             required
//           />
//           <div className="cad-add-event-text">Activity Type:</div>
//           <select
//             className="form-select-1"
//             id="e_type"
//             value={formData.e_type}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select</option>
//             <option value="Internal">Intracollegiate </option>
//           </select>
//           <div className="cad-add-event-text">Activity Category:</div>
//           <select
//             className="form-select-1"
//             id="e_category"
//             value={formData.e_category}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select</option>
//             <option value="Technical">Technical</option>
//             <option value="Cultural">Cultural</option>
//             <option value="Sports">Sports</option>
//             <option value="Internship">Social</option>
//             <option value="Internship">Internship</option>
//           </select>
//           <div className="cad-add-event-text">Add Image</div>
//           <div className="mb-3">
//             <input
//               type="file"
//               className="form-control-1"
//               id="e_img"
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="cad-add-event-text">Enter the date on which activity is taking place:</div>
//           <input
//             className="form-control-1 form-control-sm"
//             type="date"
//             id="e_date"
//             value={formData.e_date}
//             onChange={handleInputChange}
//             required
//           />
//           <div className="cad-add-event-text event-name">Activity Registration Link:</div>
//           <input
//             className="form-control-1 form-control-sm"
//             type="text"
//             id="e_link"
//             value={formData.e_link}
//             onChange={handleInputChange}
//             required
//           />
//           <div className="event-buttons col-12">
//             <button className="event-button btn btn-success" type="submit">
//               Submit
//             </button>
//           </div>
//         </form1>
//       </form>
//     </div>
//   );
// };

// export default CAddEvents;
// //sample form link: https://docs.google.com/forms/d/e/FORM_ID/viewform

























































































import React, { useState } from "react";
import { 
  Container, TextField, Button, Grid, Card, CardContent, MenuItem, 
  Typography 
} from "@mui/material";
import { addClubEvent } from "../../api/eventApi";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";

const CAddEvents = () => {
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
    event_mode: "",   // ✅ Add this
    event_link: "",
    poster_image: null,
    poster_preview: null,
  });

  const [errors, setErrors] = useState({});

   // Event type options
   const eventTypes = ["Technical", "Cultural", "Sports", "Social"];

   const eventMode = ["Online","Offline"]

   // Validate Input Fields
   const validateForm = () => {
    let newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    // Roll Number - Must be a number
    if (!/^\d+$/.test(formData.roll_number)) {
      newErrors.roll_number = "Roll Number must be a number.";
    }

    // Name fields - Only alphabets
    ["admin_name", "club_name"].forEach((field) => {
      if (!/^[A-Za-z\s]+$/.test(formData[field])) {
        newErrors[field] = "Only alphabets are allowed.";
      }
    });

    // Start & End Date Validations
    if (formData.start_date && formData.start_date < today) {
      newErrors.start_date = "Start Date cannot be before today.";
    }
    if (formData.end_date && formData.end_date < today) {
      newErrors.end_date = "End Date cannot be before today.";
    }
    // Allow same start & end date, but prevent end_date from being before start_date
if (formData.start_date && formData.end_date && formData.end_date < formData.start_date) {
  newErrors.end_date = "End Date cannot be before Start Date.";
}
    // if (formData.start_date && formData.end_date && formData.end_date < formData.start_date) {
    //   newErrors.end_date = "End Date cannot be before Start Date.";
    // }

    // Start & End Time Validations
    if (formData.start_time && formData.end_time && formData.end_time < formData.start_time) {
      newErrors.end_time = "End Time cannot be before Start Time.";
    }

    // Location - Cannot be empty & must contain at least one letter
    if (!/[A-Za-z]/.test(formData.location)) {
      newErrors.location = "Location must contain at least one letter.";
    }

    // Entry Fee - Must be either "free" or a valid number
    if (!/^(free|Free|\d+)$/.test(formData.entry_fee)) {
      newErrors.entry_fee = 'Entry Fee must be "free" or a valid number.';
    }

    // Event Link - If provided, must be a valid URL
    // if (formData.event_link && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.event_link)) {
    //   newErrors.event_link = "Enter a valid URL.";
    // }
    // Allow general URLs and Google Forms URLs
    if (
      formData.event_link &&
      !/^(https?:\/\/[^\s$.?#].[^\s]*)$|^(https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform(\?.*)?)$/.test(formData.event_link)
    ) {
      newErrors.event_link = "Enter a valid URL.";
    }

    if (!formData.event_mode) {
      newErrors.event_mode = "Please select an event mode.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };


  // Handle input changes
  
  const handleInputChange = (e) => {
    const { id, value, type, files, name } = e.target;
  
    if (type === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        poster_image: file,
        poster_preview: file ? URL.createObjectURL(file) : null,
      }));
    } else {
      // Fix for dropdown selection: Use `name` instead of `id`
      setFormData((prevData) => ({ ...prevData, [id || name]: value }));
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("🚀 Submitting Data:", formData); // Debugging line

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
      alert(response.message || "Event added successfully!");

      // Clear form after submission
      setFormData({
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
        event_link: "",
        poster_image: null,
        poster_preview: null,
      });


      setErrors({});
    } catch (error) {
      console.error("❌ Error adding event:", error);
      alert(error.response?.data?.message || "Failed to add event.");
    }
  };

  return (
    <div> 
      <CAdNavbar />
      <Container maxWidth="md" sx={{ mt: 2, padding: 15 }}>
        <Card elevation={3} sx={{ padding: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Add Club Event
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                {[
                  { label: "Your Roll Number", id: "roll_number" },
                  { label: "Your Name", id: "admin_name" },
                  { label: "Club Name", id: "club_name" },
                  { label: "Event Name", id: "event_name" },
                  { label: "Location", id: "location" },
                ].map(({ label, id }) => (
                  <Grid item xs={12} key={id}>
                    <TextField 
                      fullWidth 
                      label={label} 
                      id={id}
                      value={formData[id]}
                      onChange={handleInputChange}
                      required
                      error={!!errors[id]}
                      helperText={errors[id]}
                    />
                  </Grid>
                ))}

                {/* Description */}
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Event Description" 
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    required 
                  />
                </Grid>


                 


                {/* Dates */}
                {[
                  { label: "Start Date", id: "start_date", type: "date" },
                  { label: "End Date", id: "end_date", type: "date" },
                ].map(({ label, id, type }) => (
                  <Grid item xs={6} key={id}>
                    <TextField 
                      fullWidth 
                      type={type}
                      label={label} 
                      id={id}
                      value={formData[id]}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      error={!!errors[id]}
                      helperText={errors[id]}
                    />
                  </Grid>
                ))}

                {/* Times */}
                {[
                  { label: "Start Time", id: "start_time", type: "time" },
                  { label: "End Time", id: "end_time", type: "time" },
                ].map(({ label, id, type }) => (
                  <Grid item xs={6} key={id}>
                    <TextField 
                      fullWidth 
                      type={type}
                      label={label} 
                      id={id}
                      value={formData[id]}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      error={!!errors[id]}
                      helperText={errors[id]}
                    />
                  </Grid>
                ))}


    
                {/* Entry Fee */}
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Entry Fee (Free or Amount)" 
                    id="entry_fee"
                    value={formData.entry_fee}
                    onChange={handleInputChange}
                    required
                    error={!!errors.entry_fee}
                    helperText={errors.entry_fee}
                  />
                </Grid>



                {/* Event Type (Dropdown) */}
                <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Event Type"
                  id="event_type"
                  name="event_type"  // Ensure name is set correctly
                  value={formData.event_type}
                  onChange={handleInputChange}
                  required
                  error={!!errors.event_type}
                  helperText={errors.event_type}
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>

                </Grid>

                {/* Event Mode (Dropdown) */}
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Event Mode"
                    id="event_mode"
                    name="event_mode"  // ✅ Ensure `name` is set correctly
                    value={formData.event_mode}
                    onChange={handleInputChange}
                    required
                  >
                    {eventMode.map((mode) => (
                      <MenuItem key={mode} value={mode}>
                        {mode}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>



                {/* Event Link (Optional) */}
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Event Link " 
                    id="event_link"
                    value={formData.event_link}
                    onChange={handleInputChange}
                    error={!!errors.event_link}
                    helperText={errors.event_link}
                  />
                </Grid>



                 {/* Image Upload */}
              <Grid item xs={12}>
                 <Typography variant="body1">Upload Poster Image:</Typography>
                 <input 
                  type="file" 
                  id="poster_image" 
                  accept="image/*" 
                  onChange={handleInputChange} 
                  required
                />

                {/* Show Image Preview */}
                {formData.poster_preview && (
                  <img 
                    src={formData.poster_preview} 
                    alt="Preview" 
                    style={{ marginTop: 10, maxWidth: "100%", height: "auto", borderRadius: 8 }}
                  />
                )}
              </Grid>

                {/* Submit */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
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

export default CAddEvents;

































































