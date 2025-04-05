
// //MOST DEFAULT STATIC TEMPLATE VERY IMPORTATNT DONT DELETEE



// import React, { useState } from "react";
// import {
//   Avatar, Card, Typography, Tabs, Tab, Box, Chip,
//   Table, TableBody, TableCell, TableContainer, TableRow, Paper
// } from "@mui/material";
// import { Email, Phone } from "@mui/icons-material";
// import AspectRatio from "@mui/joy/AspectRatio";
// import JoyCard from "@mui/joy/Card";
// import JoyCardContent from "@mui/joy/CardContent";
// import IconButton from "@mui/joy/IconButton";
// import Button from "@mui/joy/Button";
// import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";

// const eventList = [
//   { id: 1, title: "Hackathon 2025", date: "March 15-16, 2025", img: "https://placehold.co/300x200", status: "Completed" },
//   { id: 2, title: "AI Workshop", date: "April 10, 2025", img: "https://placehold.co/300x200", status: "Upcoming" },
//   { id: 3, title: "Web Dev Bootcamp", date: "May 5-7, 2025", img: "https://placehold.co/300x200", status: "Upcoming" },
//   { id: 4, title: "Cybersecurity Seminar", date: "June 20, 2025", img: "https://placehold.co/300x200", status: "Upcoming" },
// ];

// const CProfile = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const eventsPerPage = 2;

//   // Get current events to display based on page
//   const startIndex = currentPage * eventsPerPage;
//   const selectedEvents = eventList.slice(startIndex, startIndex + eventsPerPage);

//   return (
//     <div>
//       <CAdNavbar />
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6, mb: 6 }}>
        
//         {/* Top Section: Profile & About+Skills */}
//         <Box sx={{ display: "flex", width: "80%", gap: 2, mb: 2, pt: 25 }}>
          
//           {/* Profile Card */}
//           <Card sx={{ width: "70%", display: "flex", p: 2 }}>
//             <Avatar sx={{ width: 100, height: 100, mr: 3 }} src="https://i.pravatar.cc/100" alt="Profile Picture" />
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h5" fontWeight="bold">John Doe</Typography>
//               <Typography variant="subtitle1" color="text.secondary">Club Admin - Coding Club</Typography>
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 Passionate about organizing tech events and workshops to help students enhance their skills.
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                 <Email fontSize="small" sx={{ mr: 1 }} />
//                 <Typography variant="body2">johndoe@example.com</Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                 <Phone fontSize="small" sx={{ mr: 1 }} />
//                 <Typography variant="body2">+91 9876543210</Typography>
//               </Box>
//               <Tabs sx={{ mt: 2 }} value={0}>
//                 <Tab label="Events" />
//                 <Tab label="Tasks" />
//                 <Tab label="Team" />
//               </Tabs>
//             </Box>
//           </Card>

//           {/* About + Skills Card */}
//           <Card sx={{ width: "30%", p: 2 }}>
//             <Typography variant="h6">About</Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Experienced Club Admin, passionate about organizing tech events and workshops.
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
//             <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip label="Event Management" color="primary" />
//               <Chip label="Leadership" color="secondary" />
//               <Chip label="Public Speaking" color="success" />
//             </Box>
//           </Card>
//         </Box>

//         {/* Bottom Section: Events & Personal Details */}
//         <Box sx={{ display: "flex", width: "80%", gap: 2 }}>
          
//           {/* Events Section */}
//           <Card sx={{ width: "70%", p: 2 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>Events Organized</Typography>
//             <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
//               {selectedEvents.map((event) => (
//                 <JoyCard sx={{ width: "100%" }} key={event.id}>
//                   <div>
//                     <Typography level="title-lg">{event.title}</Typography>
//                     <Typography level="body-sm">{event.date}</Typography>
//                     <IconButton
//                       aria-label="bookmark event"
//                       variant="plain"
//                       color="neutral"
//                       size="sm"
//                       sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
//                     >
//                       <BookmarkAdd />
//                     </IconButton>
//                   </div>
//                   <AspectRatio minHeight="120px" maxHeight="200px">
//                     <img src={event.img} alt={event.title} loading="lazy" />
//                   </AspectRatio>
//                   <JoyCardContent orientation="horizontal">
//                     <div>
//                       <Typography level="body-xs">Status:</Typography>
//                       <Chip label={event.status} color={event.status === "Completed" ? "success" : "primary"} />
//                     </div>
//                     <Button
//                       variant="solid"
//                       size="md"
//                       color="primary"
//                       aria-label={`Explore ${event.title}`}
//                       sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 ,mt: 2.5}}
//                     >
//                       View
//                     </Button>
//                   </JoyCardContent>
//                 </JoyCard>
//               ))}
//             </Box>

//             {/* Pagination Controls */}
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//               <Button
//                 variant="outlined"
//                 disabled={currentPage === 0}
//                 onClick={() => setCurrentPage((prev) => prev - 1)}
//                 sx={{ mr: 2 }}
//               >
//                 Previous
//               </Button>
//               <Button
//                 variant="outlined"
//                 disabled={startIndex + eventsPerPage >= eventList.length}
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Card>

//           {/* Personal Details */}
//           <Card sx={{ width: "30%", p: 2 }}>
//             <Typography variant="h6">Personal Details</Typography>
//             <TableContainer component={Paper}>
//               <Table size="small">
//                 <TableBody>
//                   <TableRow>
//                     <TableCell><strong>Roll Number</strong></TableCell>
//                     <TableCell>21BCS1234</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell><strong>Branch</strong></TableCell>
//                     <TableCell>Computer Science</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell><strong>Semester</strong></TableCell>
//                     <TableCell>6th</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell><strong>Year of Joining</strong></TableCell>
//                     <TableCell>2021</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell><strong>Address</strong></TableCell>
//                     <TableCell>Pune, Maharashtra</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Card>

//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default CProfile;


























































































































/////////////////PERFECTLY WORKING NOW

// import React, { useState, useEffect } from "react";
// import {
//   Avatar, Card, Typography, Tabs, Tab, Box, Chip,
//   Table, TableBody, TableCell, TableContainer, TableRow, Paper,
//   TextField, Button
// } from "@mui/material";
// import { Email, Phone } from "@mui/icons-material";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import axios from "axios";

// const CProfile = () => {
//   const [clubAdmin, setClubAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [editData, setEditData] = useState({});
//   const [profilePic, setProfilePic] = useState(null);
//   const [events, setEvents] = useState([]); // 🆕 State for events



//   const rollNumber = sessionStorage.getItem("username");

//   // Base URL for profile pictures and API
//   const BASE_URL = "http://localhost:5000/";
//   const IMAGE_PATH = `${BASE_URL}clubadminpfp/${rollNumber}.jpg`; // Assuming image is stored as roll_number.jpg
//   const [page, setPage] = useState(0);
//   const EVENTS_PER_PAGE = 4; // 🆕 Display only 4 events at a time

//   // Fetch club admin details
//   const fetchClubAdmin = async () => {
//     try {
//       console.log(`Fetching club admin data for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`);
//       console.log("Fetched Club Admin Data:", response.data);

//       setClubAdmin(response.data);
//       setEditData(response.data); // Populate form with fetched data
//     } catch (error) {
//       console.error("Error fetching club admin details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   // 🆕 Fetch events created by this Club Admin
//   const fetchEvents = async () => {
//     try {
//       console.log(`Fetching events for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}/events`);
//       console.log("Fetched Events:", response.data);

//       setEvents(response.data); // Store events in state
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };







//   useEffect(() => {
//     if (rollNumber) {
//       fetchClubAdmin();
//       fetchEvents(); // 🆕 Fetch events when component mounts
//     }
//   }, [rollNumber]);

//   // Handle input change
//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   // Handle profile picture selection
//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting profile update...");
//     const formData = new FormData();
//     formData.append("name", editData.name);
//     formData.append("email", editData.email);
//     formData.append("phone_number", editData.phone_number);
//     formData.append("address", editData.address);

//     if (profilePic) {
//       formData.append("profile_picture", profilePic);
//     }

//     try {
//       console.log(`Sending PUT request to update profile...`);
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/profile/${rollNumber}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert("Profile updated successfully!");
//       fetchClubAdmin(); // 🔄 Immediately refetch data after update
//       setTabIndex(0); // 🔄 Switch back to "Events" tab after saving changes
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };



//   // Pagination Controls
//   const handleNextPage = () => {
//     if ((page + 1) * EVENTS_PER_PAGE < events.length) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <div>
//       <CAdNavbar />
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6, mb: 6 }}>
//         <Box sx={{ display: "flex", width: "80%", gap: 2, mb: 2, pt: 25 }}>
          
//           {/* Profile Card */}
//           <Card sx={{ width: "70%", display: "flex", p: 2 }}>
//             {loading ? (
//               <Typography>Loading...</Typography>
//             ) : clubAdmin ? (
//               <>
//                 <Avatar 
//                   sx={{ width: 100, height: 100,ml:2.6, mr: 3.4,mt:3 }} 
//                   // src={IMAGE_PATH} 
//                   src={clubAdmin ? `http://localhost:5000/${clubAdmin.profile_picture.replace("\\", "/")}` : ""} 
//                   alt="Profile Picture" 
//                 />
//                 <Box sx={{ flexGrow: 1 ,p:2}}>
//                   <Typography variant="h5" fontWeight="bold">{clubAdmin.name}</Typography>
//                   <Typography variant="subtitle1" color="text.secondary">
//                     Club Admin - {clubAdmin.club_name}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Email fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.email}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Phone fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.phone_number}</Typography>
//                   </Box>

//                   {/* Tabs */}
//                   <Tabs sx={{ mt: 2 }} value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
//                     <Tab label="Events" />
//                     <Tab label="Edit Profile" />
//                   </Tabs>
//                 </Box>
//               </>
//             ) : (
//               <Typography>Error loading data</Typography>
//             )}
//           </Card>

//           {/* About + Skills Card */}
//           <Card sx={{ width: "30%", p: 2 }}>
//             <Typography variant="h6">About</Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Experienced Club Admin, passionate about organizing events and workshops.
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
//             <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip label="Event Management" color="primary" />
//               <Chip label="Leadership" color="secondary" />
//               <Chip label="Public Speaking" color="success" />
//             </Box>
//           </Card>
//         </Box>

     
//     {/* Bottom Section */}
// <Box sx={{ display: "flex", width: "80%", gap: 2 }}>

// {/* 🆕 Events Section */}
// {tabIndex === 0 && (
//   <Card sx={{ width: "70%", p: 2, mt: 0 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Events</Typography>

//     {events.length === 0 ? (
//       <Typography variant="body2">No events added yet.</Typography>
//     ) : (
//       <>
//         {/* Events Display (2 per row, 4 per page) */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//           {events
//             .slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE)
//             .map((event) => (
//               <Card key={event.id} sx={{ width: "45%", p: 2 }}>
//                 <Typography variant="h6">Event Name: {event.event_name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Description: {event.description}
//                 </Typography>
//                 <Typography variant="body3">Date: {event.start_date}</Typography>
//                 {event.poster_image && (
//                   <img 
//                     src={event.poster_image} 
//                     alt="Event Poster" 
//                     style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
//                   />
//                 )}
//               </Card>
//             ))}
//         </Box>

//         {/* Pagination Controls */}
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <Button 
//             onClick={handlePrevPage} 
//             disabled={page === 0} 
//             sx={{ mr: 2 }}
//           >
//             Previous
//           </Button>
//           <Button 
//             onClick={handleNextPage} 
//             disabled={(page + 1) * EVENTS_PER_PAGE >= events.length}
//           >
//             Next
//           </Button>
//         </Box>
//       </>
//     )}
//   </Card>
// )}

// {/* Edit Profile Section */}
// {tabIndex === 1 && (
//   <Card sx={{ width: "70%", p: 2 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
//     <form onSubmit={handleSubmit}>
//       <TextField
//         fullWidth margin="normal"
//         label="Full Name"
//         name="name"
//         value={editData.name || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Email"
//         name="email"
//         value={editData.email || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Phone Number"
//         name="phone_number"
//         value={editData.phone_number || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Address"
//         name="address"
//         value={editData.address || ""}
//         onChange={handleChange}
//       />
//       <Typography variant="body1" sx={{ mt: 2 }}>Change Profile Picture</Typography>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Save Changes
//       </Button>
//     </form>
//   </Card>
// )}

// {/* Personal Details Section */}
// <Card sx={{ width: "30%", p: 2 }}>
//   <Typography variant="h6">Personal Details</Typography>

//   {loading ? (
//     <Typography>Loading...</Typography>
//   ) : clubAdmin ? (
//     <TableContainer component={Paper}>
//       <Table size="medium">
//         <TableBody>
//           <TableRow>
//             <TableCell><strong>Roll Number</strong></TableCell>
//             <TableCell>{clubAdmin.roll_number}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Branch</strong></TableCell>
//             <TableCell>{clubAdmin.branch}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Semester</strong></TableCell>
//             <TableCell>{clubAdmin.semester}th</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Year of Joining</strong></TableCell>
//             <TableCell>{clubAdmin.year_of_joining}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   ) : (
//     <Typography>Error loading data</Typography>
//   )}
// </Card> 

// </Box>

//       </Box>
//     </div>
//   );
// };

// export default CProfile;
















////////////////////Working properly perfectly as welll. 


// import React, { useState, useEffect } from "react";
// import {
//   Avatar, Card, Typography, Tabs, Tab, Box, Chip,
//   Table, TableBody, TableCell, TableContainer, TableRow, Paper,
//   TextField, Button
// } from "@mui/material";
// import { Email, Phone } from "@mui/icons-material";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import axios from "axios";

// const CProfile = () => {
//   const [clubAdmin, setClubAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [editData, setEditData] = useState({});
//   const [profilePic, setProfilePic] = useState(null);
//   const [events, setEvents] = useState([]); // 🆕 State for events
//   const [selectedEvent, setSelectedEvent] = useState(null); // Stores event being edited
// const [editEventData, setEditEventData] = useState({}); // Stores form data
// const [openEditForm, setOpenEditForm] = useState(false); // Controls form visibility




//   const rollNumber = sessionStorage.getItem("username");

//   // Base URL for profile pictures and API
//   const BASE_URL = "http://localhost:5000/";
//   const IMAGE_PATH = `${BASE_URL}clubadminpfp/${rollNumber}.jpg`; // Assuming image is stored as roll_number.jpg
//   const [page, setPage] = useState(0);
//   const EVENTS_PER_PAGE = 4; // 🆕 Display only 4 events at a time

//   // Fetch club admin details
//   const fetchClubAdmin = async () => {
//     try {
//       console.log(`Fetching club admin data for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`);
//       console.log("Fetched Club Admin Data:", response.data);

//       setClubAdmin(response.data);
//       setEditData(response.data); // Populate form with fetched data
//     } catch (error) {
//       console.error("Error fetching club admin details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   // 🆕 Fetch events created by this Club Admin
//   const fetchEvents = async () => {
//     try {
//       console.log(`Fetching events for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}/events`);
//       console.log("Fetched Events:", response.data);

//       setEvents(response.data); // Store events in state
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };







//   useEffect(() => {
//     if (rollNumber) {
//       fetchClubAdmin();
//       fetchEvents(); // 🆕 Fetch events when component mounts
//     }
//   }, [rollNumber]);

//   // Handle input change
//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   // Handle profile picture selection
//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };


//   const handleEditClick = (event) => {
//     setSelectedEvent(event);
//     setEditEventData({ ...event }); // Prefill form with all event details
//     setOpenEditForm(true);
//   };


//   const handleEditEventChange = (e) => {
//     setEditEventData({
//       ...editEventData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdateEvent = async () => {
//     if (!selectedEvent || !selectedEvent.event_id) {
//       console.error("Error: selectedEvent is undefined", selectedEvent);
//       alert("Event ID is missing. Cannot update event.");
//       return;
//     }
  
//     try {
//       console.log("Updating event with ID:", selectedEvent.event_id);
//       console.log("Updated Data:", editEventData);
  
//       const formData = new FormData();
//       formData.append("event_name", editEventData.event_name);
//       formData.append("description", editEventData.description);
//       formData.append("event_type", editEventData.event_type);
//       formData.append("event_status", editEventData.event_status);
//       formData.append("start_date", editEventData.start_date);
//       formData.append("end_date", editEventData.end_date);
//       formData.append("start_time", editEventData.start_time);
//       formData.append("end_time", editEventData.end_time);
//       formData.append("location", editEventData.location);
//       formData.append("event_link", editEventData.event_link);
//       formData.append("entry_fee", editEventData.entry_fee);
  
//       if (editEventData.poster_image) {
//         formData.append("poster_image", editEventData.poster_image);
//       }
  
//       console.log("FormData Entries:");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, ":", value);
//       }
  
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/events/${selectedEvent.event_id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
  
//       alert("Event updated successfully!");
//       fetchEvents(); // Refresh event list
//       setOpenEditForm(false); // Close form
//       setSelectedEvent(null); // Reset selected event
//     } catch (error) {
//       console.error("Error updating event:", error);
//       alert("Failed to update event.");
//     }
//   };
  
  
  


//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting profile update...");
//     const formData = new FormData();
//     formData.append("name", editData.name);
//     formData.append("email", editData.email);
//     formData.append("phone_number", editData.phone_number);
//     formData.append("address", editData.address);

//     if (profilePic) {
//       formData.append("profile_picture", profilePic);
//     }

//     try {
//       console.log(`Sending PUT request to update profile...`);
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/profile/${rollNumber}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert("Profile updated successfully!");
//       fetchClubAdmin(); // 🔄 Immediately refetch data after update
//       setTabIndex(0); // 🔄 Switch back to "Events" tab after saving changes
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };



//   // Pagination Controls
//   const handleNextPage = () => {
//     if ((page + 1) * EVENTS_PER_PAGE < events.length) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <div>
//       <CAdNavbar />
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6, mb: 6 }}>
//         <Box sx={{ display: "flex", width: "80%", gap: 2, mb: 2, pt: 25 }}>
          
//           {/* Profile Card */}
//           <Card sx={{ width: "70%", display: "flex", p: 2 }}>
//             {loading ? (
//               <Typography>Loading...</Typography>
//             ) : clubAdmin ? (
//               <>
//                 <Avatar 
//                   sx={{ width: 100, height: 100,ml:2.6, mr: 3.4,mt:3 }} 
//                   // src={IMAGE_PATH} 
//                   src={clubAdmin ? `http://localhost:5000/${clubAdmin.profile_picture.replace("\\", "/")}` : ""} 
//                   alt="Profile Picture" 
//                 />
//                 <Box sx={{ flexGrow: 1 ,p:2}}>
//                   <Typography variant="h5" fontWeight="bold">{clubAdmin.name}</Typography>
//                   <Typography variant="subtitle1" color="text.secondary">
//                     Club Admin - {clubAdmin.club_name}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Email fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.email}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Phone fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.phone_number}</Typography>
//                   </Box>

//                   {/* Tabs */}
//                   <Tabs sx={{ mt: 2 }} value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
//                     <Tab label="Events" />
//                     <Tab label="Edit Profile" />
//                   </Tabs>
//                 </Box>
//               </>
//             ) : (
//               <Typography>Error loading data</Typography>
//             )}
//           </Card>

//           {/* About + Skills Card */}
//           <Card sx={{ width: "30%", p: 2 }}>
//             <Typography variant="h6">About</Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Experienced Club Admin, passionate about organizing events and workshops.
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
//             <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip label="Event Management" color="primary" />
//               <Chip label="Leadership" color="secondary" />
//               <Chip label="Public Speaking" color="success" />
//             </Box>
//           </Card>
//         </Box>

     
//     {/* Bottom Section */}
// <Box sx={{ display: "flex", width: "80%", gap: 2 }}>

// {/* 🆕 Events Section */}
// {tabIndex === 0 && (
//   <Card sx={{ width: "70%", p: 2, mt: 0 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Events</Typography>

//     {events.length === 0 ? (
//       <Typography variant="body2">No events added yet.</Typography>
//     ) : (
//       <>
//         {/* Events Display (2 per row, 4 per page) */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//           {events
//             .slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE)
//             .map((event) => (
//               <Card key={event.id} sx={{ width: "45%", p: 2 }}>
//                 <Typography variant="h6">Event Name: {event.event_name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Description: {event.description}
//                 </Typography>
//                 <Typography variant="body3">Date: {event.start_date}</Typography>
//                 {event.poster_image && (
//                   <img 
//                     src={event.poster_image} 
//                     alt="Event Poster" 
//                     style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
//                   />
//                 )}
//                 <Button 
//         variant="outlined" 
//         color="primary" 
//         sx={{ mt: 2 }}
//         onClick={() => handleEditClick(event)} // Open edit form
//       >
//         Edit
//       </Button>
//               </Card>
//             ))}
//         </Box>

//         {/* Pagination Controls */}
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <Button 
//             onClick={handlePrevPage} 
//             disabled={page === 0} 
//             sx={{ mr: 2 }}
//           >
//             Previous
//           </Button>
//           <Button 
//             onClick={handleNextPage} 
//             disabled={(page + 1) * EVENTS_PER_PAGE >= events.length}
//           >
//             Next
//           </Button>
//         </Box>
//       </>
//     )}
//   </Card>
// )}



// {/* Edit Profile Section */}
// {tabIndex === 1 && (
//   <Card sx={{ width: "70%", p: 2 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
//     <form onSubmit={handleSubmit}>
//       <TextField
//         fullWidth margin="normal"
//         label="Full Name"
//         name="name"
//         value={editData.name || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Email"
//         name="email"
//         value={editData.email || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Phone Number"
//         name="phone_number"
//         value={editData.phone_number || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Address"
//         name="address"
//         value={editData.address || ""}
//         onChange={handleChange}
//       />
//       <Typography variant="body1" sx={{ mt: 2 }}>Change Profile Picture</Typography>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Save Changes
//       </Button>
//     </form>
//   </Card>
// )}

// {/* Personal Details Section */}
// <Card sx={{ width: "30%", p: 2 }}>
//   <Typography variant="h6">Personal Details</Typography>

//   {loading ? (
//     <Typography>Loading...</Typography>
//   ) : clubAdmin ? (
//     <TableContainer component={Paper} sx={{p:2}}>
//       <Table size="medium">
//         <TableBody>
//           <TableRow>
//             <TableCell><strong>Roll Number</strong></TableCell>
//             <TableCell>{clubAdmin.roll_number}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Branch</strong></TableCell>
//             <TableCell>{clubAdmin.branch}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Semester</strong></TableCell>
//             <TableCell>{clubAdmin.semester}th</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Year of Joining</strong></TableCell>
//             <TableCell>{clubAdmin.year_of_joining}</TableCell>
//           </TableRow>
//           <TableRow>
//           <TableCell><strong>Address</strong></TableCell>
//           <TableCell>{clubAdmin.address}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   ) : (
//     <Typography>Error loading data</Typography>
//   )}
// </Card> 

// </Box>


// {/* 🆕 Edit Event Form (Now below the entire section) */}
// {openEditForm && (
//   <Card sx={{ width: "80%", p: 3, mt: 4 }}>
//     <Typography variant="h6">Edit Event</Typography>
    
//     <TextField fullWidth margin="normal" label="Event Name" name="event_name"
//       value={editEventData.event_name || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Description" name="description"
//       value={editEventData.description || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Event Type" name="event_type"
//       value={editEventData.event_type || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Event Status" name="event_status"
//       value={editEventData.event_status || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Start Date" name="start_date" type="date"
//       value={editEventData.start_date || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="End Date" name="end_date" type="date"
//       value={editEventData.end_date || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Start Time" name="start_time" type="time"
//       value={editEventData.start_time || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="End Time" name="end_time" type="time"
//       value={editEventData.end_time || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Location" name="location"
//       value={editEventData.location || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Event Link" name="event_link"
//       value={editEventData.event_link || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Entry Fee" name="entry_fee"
//       value={editEventData.entry_fee || ""} onChange={handleEditEventChange} />
    
//     <Typography variant="body1" sx={{ mt: 2 }}>Change Event Poster</Typography>
//     <input type="file" accept="image/*" onChange={handleFileChange} />
    
//     <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={handleUpdateEvent}>
//       Save Changes
//     </Button>
    
//     <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={() => setOpenEditForm(false)}>
//       Cancel
//     </Button>
//   </Card>
// )}

//       </Box>
//     </div>
//   );
// };

// export default CProfile;






























































//////////working here proper with  deletetion function here

// import React, { useState, useEffect } from "react";
// import {
//   Avatar, Card, Typography, Tabs, Tab, Box, Chip,
//   Table, TableBody, TableCell, TableContainer, TableRow, Paper,
//   TextField, Button
// } from "@mui/material";
// import { Email, Phone } from "@mui/icons-material";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import axios from "axios";

// const CProfile = () => {
//   const [clubAdmin, setClubAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [editData, setEditData] = useState({});
//   const [profilePic, setProfilePic] = useState(null);
//   const [events, setEvents] = useState([]); // 🆕 State for events
//   const [selectedEvent, setSelectedEvent] = useState(null); // Stores event being edited
// const [editEventData, setEditEventData] = useState({}); // Stores form data
// const [openEditForm, setOpenEditForm] = useState(false); // Controls form visibility




//   const rollNumber = sessionStorage.getItem("username");

//   // Base URL for profile pictures and API
//   const BASE_URL = "http://localhost:5000/";
//   const IMAGE_PATH = `${BASE_URL}clubadminpfp/${rollNumber}.jpg`; // Assuming image is stored as roll_number.jpg
//   const [page, setPage] = useState(0);
//   const EVENTS_PER_PAGE = 4; // 🆕 Display only 4 events at a time

//   // Fetch club admin details
//   const fetchClubAdmin = async () => {
//     try {
//       console.log(`Fetching club admin data for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`);
//       console.log("Fetched Club Admin Data:", response.data);

//       setClubAdmin(response.data);
//       setEditData(response.data); // Populate form with fetched data
//     } catch (error) {
//       console.error("Error fetching club admin details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   // 🆕 Fetch events created by this Club Admin
//   const fetchEvents = async () => {
//     try {
//       console.log(`Fetching events for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}/events`);
//       console.log("Fetched Events:", response.data);

//       setEvents(response.data); // Store events in state
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };







//   useEffect(() => {
//     if (rollNumber) {
//       fetchClubAdmin();
//       fetchEvents(); // 🆕 Fetch events when component mounts
//     }
//   }, [rollNumber]);

//   // Handle input change
//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   // Handle profile picture selection
//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };


//   const handleEditClick = (event) => {
//     setSelectedEvent(event);
//     setEditEventData({ ...event }); // Prefill form with all event details
//     setOpenEditForm(true);
//   };


//   const handleEditEventChange = (e) => {
//     setEditEventData({
//       ...editEventData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdateEvent = async () => {
//     if (!selectedEvent || !selectedEvent.event_id) {
//       console.error("Error: selectedEvent is undefined", selectedEvent);
//       alert("Event ID is missing. Cannot update event.");
//       return;
//     }
  
//     try {
//       console.log("Updating event with ID:", selectedEvent.event_id);
//       console.log("Updated Data:", editEventData);
  
//       const formData = new FormData();
//       formData.append("event_name", editEventData.event_name);
//       formData.append("description", editEventData.description);
//       formData.append("event_type", editEventData.event_type);
//       formData.append("event_status", editEventData.event_status);
//       formData.append("start_date", editEventData.start_date);
//       formData.append("end_date", editEventData.end_date);
//       formData.append("start_time", editEventData.start_time);
//       formData.append("end_time", editEventData.end_time);
//       formData.append("location", editEventData.location);
//       formData.append("event_link", editEventData.event_link);
//       formData.append("entry_fee", editEventData.entry_fee);
  
//       if (editEventData.poster_image) {
//         formData.append("poster_image", editEventData.poster_image);
//       }
  
//       console.log("FormData Entries:");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, ":", value);
//       }
  
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/events/${selectedEvent.event_id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
  
//       alert("Event updated successfully!");
//       fetchEvents(); // Refresh event list
//       setOpenEditForm(false); // Close form
//       setSelectedEvent(null); // Reset selected event
//     } catch (error) {
//       console.error("Error updating event:", error);
//       alert("Failed to update event.");
//     }
//   };
  
  
//   const handleDeleteEvent = async (eventId) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) {
//       return;
//     }
  
//     try {
//       await axios.delete(`http://localhost:5000/api/clubadmin/events/${eventId}`);
//       alert("Event deleted successfully");
  
//       // Remove the deleted event from the UI
//       setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       alert("Failed to delete event");
//     }
//   };


//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting profile update...");
//     const formData = new FormData();
//     formData.append("name", editData.name);
//     formData.append("email", editData.email);
//     formData.append("phone_number", editData.phone_number);
//     formData.append("address", editData.address);

//     if (profilePic) {
//       formData.append("profile_picture", profilePic);
//     }

//     try {
//       console.log(`Sending PUT request to update profile...`);
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/profile/${rollNumber}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert("Profile updated successfully!");
//       fetchClubAdmin(); // 🔄 Immediately refetch data after update
//       setTabIndex(0); // 🔄 Switch back to "Events" tab after saving changes
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };



//   // Pagination Controls
//   const handleNextPage = () => {
//     if ((page + 1) * EVENTS_PER_PAGE < events.length) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <div>
//       <CAdNavbar />
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6, mb: 6 }}>
//         <Box sx={{ display: "flex", width: "80%", gap: 2, mb: 2, pt: 25 }}>
          
//           {/* Profile Card */}
//           <Card sx={{ width: "70%", display: "flex", p: 2 }}>
//             {loading ? (
//               <Typography>Loading...</Typography>
//             ) : clubAdmin ? (
//               <>
//                 <Avatar 
//                   sx={{ width: 100, height: 100,ml:2.6, mr: 3.4,mt:3 }} 
//                   // src={IMAGE_PATH} 
//                   src={clubAdmin ? `http://localhost:5000/${clubAdmin.profile_picture.replace("\\", "/")}` : ""} 
//                   alt="Profile Picture" 
//                 />
//                 <Box sx={{ flexGrow: 1 ,p:2}}>
//                   <Typography variant="h5" fontWeight="bold">{clubAdmin.name}</Typography>
//                   <Typography variant="subtitle1" color="text.secondary">
//                     Club Admin - {clubAdmin.club_name}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Email fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.email}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Phone fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.phone_number}</Typography>
//                   </Box>

//                   {/* Tabs */}
//                   <Tabs sx={{ mt: 2 }} value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
//                     <Tab label="Events" />
//                     <Tab label="Edit Profile" />
//                   </Tabs>
//                 </Box>
//               </>
//             ) : (
//               <Typography>Error loading data</Typography>
//             )}
//           </Card>

//           {/* About + Skills Card */}
//           <Card sx={{ width: "30%", p: 2 }}>
//             <Typography variant="h6">About</Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Experienced Club Admin, passionate about organizing events and workshops.
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
//             <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip label="Event Management" color="primary" />
//               <Chip label="Leadership" color="secondary" />
//               <Chip label="Public Speaking" color="success" />
//             </Box>
//           </Card>
//         </Box>

     
//     {/* Bottom Section */}
// <Box sx={{ display: "flex", width: "80%", gap: 2 }}>

// {/* 🆕 Events Section */}
// {tabIndex === 0 && (
//   <Card sx={{ width: "70%", p: 2, mt: 0 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Events</Typography>

//     {events.length === 0 ? (
//       <Typography variant="body2">No events added yet.</Typography>
//     ) : (
//       <>
//         {/* Events Display (2 per row, 4 per page) */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//           {events
//             .slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE)
//             .map((event) => (
//               <Card key={event.id} sx={{ width: "45%", p: 2 }}>
//                 <Typography variant="h6">Event Name: {event.event_name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Description: {event.description}
//                 </Typography>
//                 <Typography variant="body3">Date: {event.start_date}</Typography>
//                 {event.poster_image && (
//                   <img 
//                     src={event.poster_image} 
//                     alt="Event Poster" 
//                     style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
//                   />
//                 )}
//                 <Button 
//         variant="outlined" 
//         color="primary" 
//         sx={{ mt: 2 }}
//         onClick={() => handleEditClick(event)} // Open edit form
//       >
//         Edit
//       </Button>

//       <Button variant="outlined" color="primary" sx ={{ mt:2,ml:18}} onClick={() => handleDeleteEvent(event.event_id)}> Delete</Button>

//               </Card>
//             ))}
//         </Box>

//         {/* Pagination Controls */}
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <Button 
//             onClick={handlePrevPage} 
//             disabled={page === 0} 
//             sx={{ mr: 2 }}
//           >
//             Previous
//           </Button>
//           <Button 
//             onClick={handleNextPage} 
//             disabled={(page + 1) * EVENTS_PER_PAGE >= events.length}
//           >
//             Next
//           </Button>
//         </Box>
//       </>
//     )}
//   </Card>
// )}



// {/* Edit Profile Section */}
// {tabIndex === 1 && (
//   <Card sx={{ width: "70%", p: 2 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
//     <form onSubmit={handleSubmit}>
//       <TextField
//         fullWidth margin="normal"
//         label="Full Name"
//         name="name"
//         value={editData.name || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Email"
//         name="email"
//         value={editData.email || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Phone Number"
//         name="phone_number"
//         value={editData.phone_number || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Address"
//         name="address"
//         value={editData.address || ""}
//         onChange={handleChange}
//       />
//       <Typography variant="body1" sx={{ mt: 2 }}>Change Profile Picture</Typography>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Save Changes
//       </Button>
//     </form>
//   </Card>
// )}

// {/* Personal Details Section */}
// <Card sx={{ width: "30%", p: 2 }}>
//   <Typography variant="h6">Personal Details</Typography>

//   {loading ? (
//     <Typography>Loading...</Typography>
//   ) : clubAdmin ? (
//     <TableContainer component={Paper} sx={{p:2}}>
//       <Table size="medium">
//         <TableBody>
//           <TableRow>
//             <TableCell><strong>Roll Number</strong></TableCell>
//             <TableCell>{clubAdmin.roll_number}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Branch</strong></TableCell>
//             <TableCell>{clubAdmin.branch}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Semester</strong></TableCell>
//             <TableCell>{clubAdmin.semester}th</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Year of Joining</strong></TableCell>
//             <TableCell>{clubAdmin.year_of_joining}</TableCell>
//           </TableRow>
//           <TableRow>
//           <TableCell><strong>Address</strong></TableCell>
//           <TableCell>{clubAdmin.address}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   ) : (
//     <Typography>Error loading data</Typography>
//   )}
// </Card> 

// </Box>


// {/* 🆕 Edit Event Form (Now below the entire section) */}
// {openEditForm && (
//   <Card sx={{ width: "80%", p: 3, mt: 4 }}>
//     <Typography variant="h6">Edit Event</Typography>
    
//     <TextField fullWidth margin="normal" label="Event Name" name="event_name"
//       value={editEventData.event_name || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Description" name="description"
//       value={editEventData.description || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Event Type" name="event_type"
//       value={editEventData.event_type || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Event Status" name="event_status"
//       value={editEventData.event_status || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Start Date" name="start_date" type="date"
//       value={editEventData.start_date || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="End Date" name="end_date" type="date"
//       value={editEventData.end_date || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Start Time" name="start_time" type="time"
//       value={editEventData.start_time || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="End Time" name="end_time" type="time"
//       value={editEventData.end_time || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Location" name="location"
//       value={editEventData.location || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Event Link" name="event_link"
//       value={editEventData.event_link || ""} onChange={handleEditEventChange} />
    
//     <TextField fullWidth margin="normal" label="Entry Fee" name="entry_fee"
//       value={editEventData.entry_fee || ""} onChange={handleEditEventChange} />
    
//     <Typography variant="body1" sx={{ mt: 2 }}>Change Event Poster</Typography>
//     <input type="file" accept="image/*" onChange={handleFileChange} />
    
//     <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={handleUpdateEvent}>
//       Save Changes
//     </Button>
    
//     <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={() => setOpenEditForm(false)}>
//       Cancel
//     </Button>
//   </Card>
// )}

//       </Box>
//     </div>
//   );
// };

// export default CProfile;
























//////////////////FINALly 

// import React, { useState, useEffect } from "react";
// import {
//   Avatar, Card, Typography, Tabs, Tab, Box, Chip,
//   Table, TableBody, TableCell, TableContainer, TableRow, Paper,
//   TextField, Button
// } from "@mui/material";
// import { Email, Phone } from "@mui/icons-material";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import axios from "axios";

// const CProfile = () => {
//   const [clubAdmin, setClubAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [editData, setEditData] = useState({});
//   const [profilePic, setProfilePic] = useState(null);
//   const [events, setEvents] = useState([]); // 🆕 State for events
//   const [selectedEvent, setSelectedEvent] = useState(null); // Stores event being edited
// const [editEventData, setEditEventData] = useState({}); // Stores form data
// const [openEditForm, setOpenEditForm] = useState(false); // Controls form visibility
// const [errors, setErrors] = useState({});




//   const rollNumber = sessionStorage.getItem("username");

//   // Base URL for profile pictures and API
//   const BASE_URL = "http://localhost:5000/";
//   const IMAGE_PATH = `${BASE_URL}clubadminpfp/${rollNumber}.jpg`; // Assuming image is stored as roll_number.jpg
//   const [page, setPage] = useState(0);
//   const EVENTS_PER_PAGE = 4; // 🆕 Display only 4 events at a time

//   // Fetch club admin details
//   const fetchClubAdmin = async () => {
//     try {
//       console.log(`Fetching club admin data for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`);
//       console.log("Fetched Club Admin Data:", response.data);

//       setClubAdmin(response.data);
//       setEditData(response.data); // Populate form with fetched data
//     } catch (error) {
//       console.error("Error fetching club admin details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   // 🆕 Fetch events created by this Club Admin
//   const fetchEvents = async () => {
//     try {
//       console.log(`Fetching events for roll number: ${rollNumber}`);
//       const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}/events`);
//       console.log("Fetched Events:", response.data);

//       setEvents(response.data); // Store events in state
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };







//   useEffect(() => {
//     if (rollNumber) {
//       fetchClubAdmin();
//       fetchEvents(); // 🆕 Fetch events when component mounts
//     }
//   }, [rollNumber]);

//   // Handle input change
//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   // Handle profile picture selection
//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };


//   const handleEditClick = (event) => {
//     setSelectedEvent(event);
//     setEditEventData({ ...event }); // Prefill form with all event details
//     setOpenEditForm(true);
//   };


//   const handleEditEventChange = (e) => {
//     setEditEventData({
//       ...editEventData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdateEvent = async () => {
//     if (!validateEditEventForm()) {
//       return; // Stop submission if validation fails
//     }



//     if (!selectedEvent || !selectedEvent.event_id) {
//       console.error("Error: selectedEvent is undefined", selectedEvent);
//       alert("Event ID is missing. Cannot update event.");
//       return;
//     }
  
//     try {
//       console.log("Updating event with ID:", selectedEvent.event_id);
//       console.log("Updated Data:", editEventData);
  
//       const formData = new FormData();
//       formData.append("event_name", editEventData.event_name);
//       formData.append("description", editEventData.description);
//       formData.append("event_type", editEventData.event_type);
//       formData.append("event_status", editEventData.event_status);
//       formData.append("start_date", editEventData.start_date);
//       formData.append("end_date", editEventData.end_date);
//       formData.append("start_time", editEventData.start_time);
//       formData.append("end_time", editEventData.end_time);
//       formData.append("location", editEventData.location);
//       formData.append("event_link", editEventData.event_link);
//       formData.append("entry_fee", editEventData.entry_fee);
  
//       if (editEventData.poster_image) {
//         formData.append("poster_image", editEventData.poster_image);
//       }
  
//       console.log("FormData Entries:");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, ":", value);
//       }
  
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/events/${selectedEvent.event_id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
  
//       alert("Event updated successfully!");
//       fetchEvents(); // Refresh event list
//       setOpenEditForm(false); // Close form
//       setSelectedEvent(null); // Reset selected event
//     } catch (error) {
//       console.error("Error updating event:", error);
//       alert("Failed to update event.");
//     }
//   };
  
  
//   const handleDeleteEvent = async (eventId) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) {
//       return;
//     }
  
//     try {
//       await axios.delete(`http://localhost:5000/api/clubadmin/events/${eventId}`);
//       alert("Event deleted successfully");
  
//       // Remove the deleted event from the UI
//       setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       alert("Failed to delete event");
//     }
//   };



//   const validateEditEventForm = () => {
//     let newErrors = {};
//     const today = new Date().toISOString().split("T")[0];
  
//     // Name fields - Only alphabets
//     ["event_name"].forEach((field) => { 
//       if (!/^[A-Za-z\s]+$/.test(editEventData[field])) {  // 🔥 Use editEventData
//         newErrors[field] = "Only alphabets are allowed.";
//       }
//     });
  
//     // Start & End Date Validations
//     if (editEventData.start_date && editEventData.start_date < today) {
//       newErrors.start_date = "Start Date cannot be before today.";
//     }
//     if (editEventData.end_date && editEventData.end_date < today) {
//       newErrors.end_date = "End Date cannot be before today.";
//     }
//     if (editEventData.start_date && editEventData.end_date && editEventData.end_date < editEventData.start_date) {
//       newErrors.end_date = "End Date cannot be before Start Date.";
//     }
  
//     // Start & End Time Validations
//     // if (editEventData.start_time && editEventData.end_time && editEventData.end_time < editEventData.start_time) {
//     //   newErrors.end_time = "End Time cannot be before Start Time.";
//     // }
    
//     // Start & End Time Validations
//     // Start & End Time Validations
// if (editEventData.start_time && editEventData.end_time) {
//   // Extract only HH:MM (first 5 characters) to avoid the '00:00:00' issue
//   const startTime = editEventData.start_time.slice(0, 5);
//   const endTime = editEventData.end_time.slice(0, 5);

//   console.log("Checking Time Validation:", startTime, endTime); // Debug log

//   if (startTime === "00:00" || endTime === "00:00") {
//     newErrors.start_time = "Start Time cannot be 00:00.";
//     newErrors.end_time = "End Time cannot be 00:00.";
//   } else if (endTime < startTime) {
//     newErrors.end_time = "End Time cannot be before Start Time.";
//   }
// }
  
//     // Location - Cannot be empty & must contain at least one letter
//     if (!/[A-Za-z]/.test(editEventData.location)) {
//       newErrors.location = "Location must contain at least one letter.";
//     }
  
//     // Entry Fee - Must be either "free" or a valid number
//     if (!/^(free|Free|\d+)$/.test(editEventData.entry_fee)) {
//       newErrors.entry_fee = 'Entry Fee must be "free" or a valid number.';
//     }
  
//     // Event Link - If provided, must be a valid URL
//     if (editEventData.event_link && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(editEventData.event_link)) {
//       newErrors.event_link = "Enter a valid URL.";
//     }
  
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Returns true if no errors
//   };
  

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting profile update...");
//     const formData = new FormData();
//     formData.append("name", editData.name);
//     formData.append("email", editData.email);
//     formData.append("phone_number", editData.phone_number);
//     formData.append("address", editData.address);

//     if (profilePic) {
//       formData.append("profile_picture", profilePic);
//     }

//     try {
//       console.log(`Sending PUT request to update profile...`);
//       await axios.put(
//         `http://localhost:5000/api/clubadmin/profile/${rollNumber}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert("Profile updated successfully!");
//       fetchClubAdmin(); // 🔄 Immediately refetch data after update
//       setTabIndex(0); // 🔄 Switch back to "Events" tab after saving changes
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };



//   // Pagination Controls
//   const handleNextPage = () => {
//     if ((page + 1) * EVENTS_PER_PAGE < events.length) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <div>
//       <CAdNavbar />
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6, mb: 6 }}>
//         <Box sx={{ display: "flex", width: "80%", gap: 2, mb: 2, pt: 25 }}>
          
//           {/* Profile Card */}
//           <Card sx={{ width: "70%", display: "flex", p: 2 }}>
//             {loading ? (
//               <Typography>Loading...</Typography>
//             ) : clubAdmin ? (
//               <>
//                 <Avatar 
//                   sx={{ width: 100, height: 100,ml:2.6, mr: 3.4,mt:3 }} 
//                   // src={IMAGE_PATH} 
//                   src={clubAdmin ? `http://localhost:5000/${clubAdmin.profile_picture.replace("\\", "/")}` : ""} 
//                   alt="Profile Picture" 
//                 />
//                 <Box sx={{ flexGrow: 1 ,p:2}}>
//                   <Typography variant="h5" fontWeight="bold">{clubAdmin.name}</Typography>
//                   <Typography variant="subtitle1" color="text.secondary">
//                     Club Admin - {clubAdmin.club_name}
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Email fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.email}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Phone fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{clubAdmin.phone_number}</Typography>
//                   </Box>

//                   {/* Tabs */}
//                   <Tabs sx={{ mt: 2 }} value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
//                     <Tab label="Events" />
//                     <Tab label="Edit Profile" />
//                   </Tabs>
//                 </Box>
//               </>
//             ) : (
//               <Typography>Error loading data</Typography>
//             )}
//           </Card>

//           {/* About + Skills Card */}
//           <Card sx={{ width: "30%", p: 2 }}>
//             <Typography variant="h6">About</Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Experienced Club Admin, passionate about organizing events and workshops.
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
//             <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip label="Event Management" color="primary" />
//               <Chip label="Leadership" color="secondary" />
//               <Chip label="Public Speaking" color="success" />
//             </Box>
//           </Card>
//         </Box>

     
//     {/* Bottom Section */}
// <Box sx={{ display: "flex", width: "80%", gap: 2 }}>

// {/* 🆕 Events Section */}
// {tabIndex === 0 && (
//   <Card sx={{ width: "70%", p: 2, mt: 0 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Events Organised</Typography>

//     {events.length === 0 ? (
//       <Typography variant="body2">No events added yet.</Typography>
//     ) : (
//       <>
//         {/* Events Display (2 per row, 4 per page) */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2,ml:7,mt:2 }}>
//           {events
//             .slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE)
//             .map((event) => (
//               <Card key={event.id} sx={{ width: "45%", p: 2 }}>
//                 <Typography variant="h6">Event Name: {event.event_name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Description: {event.description}
//                 </Typography>
//                 <Typography variant="body3">Date: {event.start_date}</Typography>
//                 {event.poster_image && (
//                   <img 
//                     src={event.poster_image} 
//                     alt="Event Poster" 
//                     style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
//                   />
//                 )}
//                 <Button 
//                   variant="outlined" 
//                   color="primary" 
//                   sx={{ mt: 2 }}
//                   onClick={() => handleEditClick(event)} // Open edit form
//                 >
//                   Edit
//                 </Button>

//                 <Button variant="outlined" color="primary" sx ={{ mt:2,ml:18}} onClick={() => handleDeleteEvent(event.event_id)}> Delete</Button>

//               </Card>
//             ))}
//         </Box>

//         {/* Pagination Controls */}
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <Button 
//             onClick={handlePrevPage} 
//             disabled={page === 0} 
//             sx={{ mr: 2 }}
//           >
//             Previous
//           </Button>
//           <Button 
//             onClick={handleNextPage} 
//             disabled={(page + 1) * EVENTS_PER_PAGE >= events.length}
//           >
//             Next
//           </Button>
//         </Box>
//       </>
//     )}
//   </Card>
// )}



// {/* Edit Profile Section */}
// {tabIndex === 1 && (
//   <Card sx={{ width: "70%", p: 2 }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
//     <form onSubmit={handleSubmit}>
//       <TextField
//         fullWidth margin="normal"
//         label="Full Name"
//         name="name"
//         value={editData.name || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Email"
//         name="email"
//         value={editData.email || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Phone Number"
//         name="phone_number"
//         value={editData.phone_number || ""}
//         onChange={handleChange}
//       />
//       <TextField
//         fullWidth margin="normal"
//         label="Address"
//         name="address"
//         value={editData.address || ""}
//         onChange={handleChange}
//       />
//       <Typography variant="body1" sx={{ mt: 2 }}>Change Profile Picture</Typography>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Save Changes
//       </Button>
//     </form>
//   </Card>
// )}

// {/* Personal Details Section */}
// <Card sx={{ width: "30%", p: 2 }}>
//   <Typography variant="h6">Personal Details</Typography>

//   {loading ? (
//     <Typography>Loading...</Typography>
//   ) : clubAdmin ? (
//     <TableContainer component={Paper} sx={{p:2}}>
//       <Table size="medium">
//         <TableBody>
//           <TableRow>
//             <TableCell><strong>Roll Number</strong></TableCell>
//             <TableCell>{clubAdmin.roll_number}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Branch</strong></TableCell>
//             <TableCell>{clubAdmin.branch}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Semester</strong></TableCell>
//             <TableCell>{clubAdmin.semester}th</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell><strong>Year of Joining</strong></TableCell>
//             <TableCell>{clubAdmin.year_of_joining}</TableCell>
//           </TableRow>
//           <TableRow>
//           <TableCell><strong>Address</strong></TableCell>
//           <TableCell>{clubAdmin.address}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   ) : (
//     <Typography>Error loading data</Typography>
//   )}
// </Card> 

// </Box>


// {/* 🆕 Edit Event Form (Now below the entire section) */}
// {openEditForm && (
//   <Card sx={{ width: "80%", p: 3, mt: 4 }}>
//     <Typography variant="h6">Edit Event</Typography>

//     {/* Event Name */}
//     <TextField fullWidth margin="normal" label="Event Name" name="event_name"
//       value={editEventData.event_name || ""} onChange={handleEditEventChange}
//       error={!!errors.event_name} helperText={errors.event_name} />

//     {/* Description */}
//     <TextField fullWidth margin="normal" label="Description" name="description"
//       value={editEventData.description || ""} onChange={handleEditEventChange}
//       error={!!errors.description} helperText={errors.description} />

//     {/* Event Type */}
//     <TextField fullWidth margin="normal" label="Event Type" name="event_type"
//       value={editEventData.event_type || ""} onChange={handleEditEventChange}
//       error={!!errors.event_type} helperText={errors.event_type} />

//     {/* Event Status */}
//     <TextField fullWidth margin="normal" label="Event Status" name="event_status"
//       value={editEventData.event_status || ""} onChange={handleEditEventChange}
//       error={!!errors.event_status} helperText={errors.event_status} />

//     {/* Start Date & End Date */}
//     {[
//       { label: "Start Date", name: "start_date", type: "date" },
//       { label: "End Date", name: "end_date", type: "date" },
//     ].map(({ label, name, type }) => (
//       <TextField key={name} fullWidth margin="normal" type={type} label={label} name={name}
//         value={editEventData[name] || ""} onChange={handleEditEventChange}
//         InputLabelProps={{ shrink: true }} required
//         error={!!errors[name]} helperText={errors[name]} />
//     ))}

//     {/* Start Time & End Time */}
//     {[
//       { label: "Start Time", name: "start_time", type: "time" },
//       { label: "End Time", name: "end_time", type: "time" },
//     ].map(({ label, name, type }) => (
//       <TextField key={name} fullWidth margin="normal" type={type} label={label} name={name}
//         value={editEventData[name] || ""} onChange={handleEditEventChange}
//         InputLabelProps={{ shrink: true }} required
//         error={!!errors[name]} helperText={errors[name]} />
//     ))}

//     {/* Location */}
//     <TextField fullWidth margin="normal" label="Location" name="location"
//       value={editEventData.location || ""} onChange={handleEditEventChange}
//       error={!!errors.location} helperText={errors.location} />

//     {/* Event Link */}
//     <TextField fullWidth margin="normal" label="Event Link" name="event_link"
//       value={editEventData.event_link || ""} onChange={handleEditEventChange}
//       error={!!errors.event_link} helperText={errors.event_link} />

//     {/* Entry Fee */}
//     <TextField fullWidth margin="normal" label="Entry Fee" name="entry_fee"
//       value={editEventData.entry_fee || ""} onChange={handleEditEventChange}
//       error={!!errors.entry_fee} helperText={errors.entry_fee} />

//     {/* Change Event Poster */}
//     <Typography variant="body1" sx={{ mt: 2 }}>Change Event Poster</Typography>
//     <input type="file" accept="image/*" onChange={handleFileChange} />

//     {/* Buttons */}
//     <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={handleUpdateEvent}>
//       Save Changes
//     </Button>

//     <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={() => setOpenEditForm(false)}>
//       Cancel
//     </Button>
//   </Card>
// )}


//       </Box>
//     </div>
//   );
// };

// export default CProfile;
























//////finally color modifications

import React, { useState, useEffect } from "react";
import {
  Avatar, Card, Typography, Tabs, Tab, Box, Chip,
  Table, TableBody, TableCell, TableContainer, TableRow, Paper,
  TextField, Button
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import axios from "axios";
import "../Club Admin/css/CProfile.css"

const CProfile = () => {
  const [clubAdmin, setClubAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [editData, setEditData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [events, setEvents] = useState([]); // 🆕 State for events
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores event being edited
const [editEventData, setEditEventData] = useState({}); // Stores form data
const [openEditForm, setOpenEditForm] = useState(false); // Controls form visibility
const [errors, setErrors] = useState({});




  const rollNumber = sessionStorage.getItem("username");

  // Base URL for profile pictures and API
  const BASE_URL = "http://localhost:5000/";
  const IMAGE_PATH = `${BASE_URL}clubadminpfp/${rollNumber}.jpg`; // Assuming image is stored as roll_number.jpg
  const [page, setPage] = useState(0);
  const EVENTS_PER_PAGE = 4; // 🆕 Display only 4 events at a time

  // Fetch club admin details
  const fetchClubAdmin = async () => {
    try {
      console.log(`Fetching club admin data for roll number: ${rollNumber}`);
      const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}`);
      console.log("Fetched Club Admin Data:", response.data);

      setClubAdmin(response.data);
      setEditData(response.data); // Populate form with fetched data
    } catch (error) {
      console.error("Error fetching club admin details:", error);
    } finally {
      setLoading(false);
    }
  };




  // 🆕 Fetch events created by this Club Admin
  const fetchEvents = async () => {
    try {
      console.log(`Fetching events for roll number: ${rollNumber}`);
      const response = await axios.get(`http://localhost:5000/api/clubadmin/profile/${rollNumber}/events`);
      console.log("Fetched Events:", response.data);

      setEvents(response.data); // Store events in state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };







  useEffect(() => {
    if (rollNumber) {
      fetchClubAdmin();
      fetchEvents(); // 🆕 Fetch events when component mounts
    }
  }, [rollNumber]);

  // Handle input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle profile picture selection
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };


  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditEventData({ ...event }); // Prefill form with all event details
    setOpenEditForm(true);
  };


  const handleEditEventChange = (e) => {
    setEditEventData({
      ...editEventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEvent = async () => {
    if (!validateEditEventForm()) {
      return; // Stop submission if validation fails
    }



    if (!selectedEvent || !selectedEvent.event_id) {
      console.error("Error: selectedEvent is undefined", selectedEvent);
      alert("Event ID is missing. Cannot update event.");
      return;
    }
  
    try {
      console.log("Updating event with ID:", selectedEvent.event_id);
      console.log("Updated Data:", editEventData);
  
      const formData = new FormData();
      formData.append("event_name", editEventData.event_name);
      formData.append("description", editEventData.description);
      formData.append("event_type", editEventData.event_type);
      formData.append("event_status", editEventData.event_status);
      formData.append("start_date", editEventData.start_date);
      formData.append("end_date", editEventData.end_date);
      formData.append("start_time", editEventData.start_time);
      formData.append("end_time", editEventData.end_time);
      formData.append("location", editEventData.location);
      formData.append("event_link", editEventData.event_link);
      formData.append("entry_fee", editEventData.entry_fee);
  
      if (editEventData.poster_image) {
        formData.append("poster_image", editEventData.poster_image);
      }
  
      console.log("FormData Entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }
  
      await axios.put(
        `http://localhost:5000/api/clubadmin/events/${selectedEvent.event_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      alert("Event updated successfully!");
      fetchEvents(); // Refresh event list
      setOpenEditForm(false); // Close form
      setSelectedEvent(null); // Reset selected event
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };
  
  
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
  
    try {
      await axios.delete(`http://localhost:5000/api/clubadmin/events/${eventId}`);
      alert("Event deleted successfully");
  
      // Remove the deleted event from the UI
      setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };



  const validateEditEventForm = () => {
    let newErrors = {};
    const today = new Date().toISOString().split("T")[0];
  
    // Name fields - Only alphabets
    ["event_name"].forEach((field) => { 
      if (!/^[A-Za-z\s]+$/.test(editEventData[field])) {  // 🔥 Use editEventData
        newErrors[field] = "Only alphabets are allowed.";
      }
    });
  
    // Start & End Date Validations
    if (editEventData.start_date && editEventData.start_date < today) {
      newErrors.start_date = "Start Date cannot be before today.";
    }
    if (editEventData.end_date && editEventData.end_date < today) {
      newErrors.end_date = "End Date cannot be before today.";
    }
    if (editEventData.start_date && editEventData.end_date && editEventData.end_date < editEventData.start_date) {
      newErrors.end_date = "End Date cannot be before Start Date.";
    }
  
  
    
    // Start & End Time Validations
if (editEventData.start_time && editEventData.end_time) {
  // Extract only HH:MM (first 5 characters) to avoid the '00:00:00' issue
  const startTime = editEventData.start_time.slice(0, 5);
  const endTime = editEventData.end_time.slice(0, 5);

  console.log("Checking Time Validation:", startTime, endTime); // Debug log

  if (startTime === "00:00" || endTime === "00:00") {
    newErrors.start_time = "Start Time cannot be 00:00.";
    newErrors.end_time = "End Time cannot be 00:00.";
  } else if (endTime < startTime) {
    newErrors.end_time = "End Time cannot be before Start Time.";
  }
}
  
    // Location - Cannot be empty & must contain at least one letter
    if (!/[A-Za-z]/.test(editEventData.location)) {
      newErrors.location = "Location must contain at least one letter.";
    }
  
    // Entry Fee - Must be either "free" or a valid number
    if (!/^(free|Free|\d+)$/.test(editEventData.entry_fee)) {
      newErrors.entry_fee = 'Entry Fee must be "free" or a valid number.';
    }
  
    // Event Link - If provided, must be a valid URL
    if (editEventData.event_link && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(editEventData.event_link)) {
      newErrors.event_link = "Enter a valid URL.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting profile update...");
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("phone_number", editData.phone_number);
    formData.append("address", editData.address);

    if (profilePic) {
      formData.append("profile_picture", profilePic);
    }

    try {
      console.log(`Sending PUT request to update profile...`);
      await axios.put(
        `http://localhost:5000/api/clubadmin/profile/${rollNumber}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Profile updated successfully!");
      fetchClubAdmin(); // 🔄 Immediately refetch data after update
      setTabIndex(0); // 🔄 Switch back to "Events" tab after saving changes
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };



  // Pagination Controls
  const handleNextPage = () => {
    if ((page + 1) * EVENTS_PER_PAGE < events.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <CAdNavbar />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 0, mb: 6}}>
        <Box sx={{ display: "flex", width: "80%", gap: 2, mb: 2, pt: 10 }}>
          
          {/* Profile Card */}
          <Card sx={{ width: "70%", display: "flex", p: 2 }}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : clubAdmin ? (
              <>
                <Avatar 
                  sx={{ width: 100, height: 100,ml:2.6, mr: 3.4,mt:3 }} 
                  // src={IMAGE_PATH} 
                  src={clubAdmin ? `http://localhost:5000/${clubAdmin.profile_picture.replace("\\", "/")}` : ""} 
                  alt="Profile Picture" 
                />
                <Box sx={{ flexGrow: 1 ,p:2}}>
                  <Typography variant="h5" fontWeight="bold">{clubAdmin.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Club Admin - {clubAdmin.club_name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Email fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{clubAdmin.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Phone fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{clubAdmin.phone_number}</Typography>
                  </Box>

                  {/* Tabs */}
                  <Tabs sx={{ mt: 2 }} value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                    <Tab label="Events" />
                    <Tab label="Edit Profile" />
                  </Tabs>
                </Box>
              </>
            ) : (
              <Typography>Error loading data</Typography>
            )}
          </Card>

          {/* About + Skills Card */}
          <Card sx={{ width: "30%", p: 2 }} className="about-section">
            <Typography variant="h6">About</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Experienced Club Admin, passionate about organizing events and workshops.
            </Typography>
            <Typography variant="h6" sx={{ mt: 4 }}>Skills</Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="Event Management" color="primary" />
              <Chip label="Leadership" color="secondary" />
              <Chip label="Public Speaking" color="success" />
            </Box>
          </Card>
        </Box>

     
    {/* Bottom Section */}
<Box sx={{ display: "flex", width: "80%", gap: 2 }}>

{/* 🆕 Events Section */}
{tabIndex === 0 && (
  <Card sx={{ width: "70%", p: 2, mt: 0 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Events Organised</Typography>

    {events.length === 0 ? (
      <Typography variant="body2">No events added yet.</Typography>
    ) : (
      <>
        {/* Events Display (2 per row, 4 per page) */}
        <Box sx={{ 
          display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", mt: 2 
        }}>
          {events
            .slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE)
            .map((event) => (
              <Card key={event.id} sx={{ 
                width: "300px", minHeight: "320px", display: "flex", 
                flexDirection: "column", justifyContent: "space-between", 
                p: 2, boxShadow: 3, borderRadius: 2, 
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 } // 🔥 Adds hover effect
              }}>
                
                {/* Event Details */}
                <Box sx={{ textAlign: "center"}}>
                  <Typography variant="h6">Event Name: {event.event_name}</Typography>
                  {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Description: {event.description}
                  </Typography> */}
                  <Typography variant="body2" sx={{ mt: 0.5 }}>Date: {event.start_date}</Typography>
                </Box>

                {/* Image (Fixed Size) */}
                {event.poster_image && (
                  <Box sx={{ 
                    width: "100%", height: 160, overflow: "hidden", 
                    display: "flex", justifyContent: "center", alignItems: "center"
                  }}>
                    <img 
                      src={event.poster_image} 
                      alt="Event Poster" 
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                    />
                  </Box>
                )}

                {/* Buttons (Aligned at Bottom) */}
      {/* Buttons (Edit Left, Delete Right) */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => handleEditClick(event)} sx={{ml:1.3}}>
          Edit
        </Button>

        <Button 
          variant="outlined" 
          color="error" 
          onClick={() => handleDeleteEvent(event.event_id)}>
          Delete
        </Button>
      </Box>
              </Card>
            ))}
        </Box>

        {/* Pagination Controls */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button 
            onClick={handlePrevPage} 
            disabled={page === 0} 
            sx={{ mr: 2 }}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNextPage} 
            disabled={(page + 1) * EVENTS_PER_PAGE >= events.length}
          >
            Next
          </Button>
        </Box>
      </>
    )}
  </Card>
)}





{/* Edit Profile Section */}
{tabIndex === 1 && (
  <Card sx={{ width: "70%", p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth margin="normal"
        label="Full Name"
        name="name"
        value={editData.name || ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal"
        label="Email"
        name="email"
        value={editData.email || ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal"
        label="Phone Number"
        name="phone_number"
        value={editData.phone_number || ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal"
        label="Address"
        name="address"
        value={editData.address || ""}
        onChange={handleChange}
      />
      <Typography variant="body1" sx={{ mt: 2 }}>Change Profile Picture</Typography>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </form>
  </Card>
)}

{/* Personal Details Section */}
<Card sx={{ width: "30%", p: 2 }}>
  <Typography variant="h6">Personal Details</Typography>

  {loading ? (
    <Typography>Loading...</Typography>
  ) : clubAdmin ? (
    <TableContainer component={Paper} sx={{p:2}}>
      <Table size="medium">
        <TableBody>
          <TableRow>
            <TableCell><strong>Roll Number</strong></TableCell>
            <TableCell>{clubAdmin.roll_number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Branch</strong></TableCell>
            <TableCell>{clubAdmin.branch}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Semester</strong></TableCell>
            <TableCell>{clubAdmin.semester}th</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Year of Joining</strong></TableCell>
            <TableCell>{clubAdmin.year_of_joining}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell><strong>Address</strong></TableCell>
          <TableCell>{clubAdmin.address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Error loading data</Typography>
  )}
</Card> 

</Box>


{/* 🆕 Edit Event Form (Now below the entire section) */}
{openEditForm && (
  <Card sx={{ width: "80%", p: 3, mt: 4 }}>
    <Typography variant="h6">Edit Event</Typography>

    {/* Event Name */}
    <TextField fullWidth margin="normal" label="Event Name" name="event_name"
      value={editEventData.event_name || ""} onChange={handleEditEventChange}
      error={!!errors.event_name} helperText={errors.event_name} />

    {/* Description */}
    <TextField fullWidth margin="normal" label="Description" name="description"
      value={editEventData.description || ""} onChange={handleEditEventChange}
      error={!!errors.description} helperText={errors.description} />

    {/* Event Type */}
    <TextField fullWidth margin="normal" label="Event Type" name="event_type"
      value={editEventData.event_type || ""} onChange={handleEditEventChange}
      error={!!errors.event_type} helperText={errors.event_type} />

    {/* Event Status */}
    <TextField fullWidth margin="normal" label="Event Status" name="event_status"
      value={editEventData.event_status || ""} onChange={handleEditEventChange}
      error={!!errors.event_status} helperText={errors.event_status} />

    {/* Start Date & End Date */}
    {[
      { label: "Start Date", name: "start_date", type: "date" },
      { label: "End Date", name: "end_date", type: "date" },
    ].map(({ label, name, type }) => (
      <TextField key={name} fullWidth margin="normal" type={type} label={label} name={name}
        value={editEventData[name] || ""} onChange={handleEditEventChange}
        InputLabelProps={{ shrink: true }} required
        error={!!errors[name]} helperText={errors[name]} />
    ))}

    {/* Start Time & End Time */}
    {[
      { label: "Start Time", name: "start_time", type: "time" },
      { label: "End Time", name: "end_time", type: "time" },
    ].map(({ label, name, type }) => (
      <TextField key={name} fullWidth margin="normal" type={type} label={label} name={name}
        value={editEventData[name] || ""} onChange={handleEditEventChange}
        InputLabelProps={{ shrink: true }} required
        error={!!errors[name]} helperText={errors[name]} />
    ))}

    {/* Location */}
    <TextField fullWidth margin="normal" label="Location" name="location"
      value={editEventData.location || ""} onChange={handleEditEventChange}
      error={!!errors.location} helperText={errors.location} />

    {/* Event Link */}
    <TextField fullWidth margin="normal" label="Event Link" name="event_link"
      value={editEventData.event_link || ""} onChange={handleEditEventChange}
      error={!!errors.event_link} helperText={errors.event_link} />

    {/* Entry Fee */}
    <TextField fullWidth margin="normal" label="Entry Fee" name="entry_fee"
      value={editEventData.entry_fee || ""} onChange={handleEditEventChange}
      error={!!errors.entry_fee} helperText={errors.entry_fee} />

    {/* Change Event Poster */}
    <Typography variant="body1" sx={{ mt: 2 }}>Change Event Poster</Typography>
    <input type="file" accept="image/*" onChange={handleFileChange} />

    {/* Buttons */}
    <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={handleUpdateEvent}>
      Save Changes
    </Button>

    <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={() => setOpenEditForm(false)}>
      Cancel
    </Button>
  </Card>
)}


      </Box>
    </div>
  );
};

export default CProfile;


































































