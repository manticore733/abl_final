// import React from 'react'
// import MNavbar from '../../Components/MentorC/MNavbar';

// const mProfile = () => {
//   return (
//     <div>
//         <MNavbar />
//         <div className='mentor-profile'>

//         </div>
//     </div>
//   )
// }

// export default mProfile




//stataic template important


// import React, { useState } from "react";
// import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
// import MNavbar from "../../Components/MentorC/MNavbar";
// import { BarChart, PieChart, LineChart } from "@mui/x-charts";

// const mProfile = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   // Sample data
//   const students = [
//     { id: 1, name: "John Doe", rollNumber: "123", branch: "CSE" },
//     { id: 2, name: "Jane Smith", rollNumber: "124", branch: "ECE" },
//   ];

//   return (
//     <div>
//       <MNavbar />
//       <div className="mentor-profile" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>

//         {/* SECTION 1: Mentor Info & Student Table */}
//         <div style={{ display: "flex", gap: "20px" }}>
          
//           {/* Mentor Info Card (30%) */}
//           <Card sx={{ width: "30%", padding: "20px" }}>
//             <CardContent>
//               <Typography variant="h5">Mentor Name</Typography>
//               <Typography variant="body1">Department: CSE</Typography>
//               <Typography variant="body1">Designation: Professor</Typography>
//               <Typography variant="body1">Email: mentor@example.com</Typography>
//               <Typography variant="body1">Phone: 9876543210</Typography>
//               <Typography variant="h6" sx={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
//                 <img src="/student-icon.png" alt="Students" width="30" height="30" />
//                 Total Students: 20
//               </Typography>
//             </CardContent>
//           </Card>

//           {/* Student List Table (70%) */}
//           <Card sx={{ width: "70%", padding: "20px" }}>
//             <Typography variant="h6">Students Under Mentor</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Roll Number</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Branch</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {students.map((student) => (
//                     <TableRow key={student.id}>
//                       <TableCell>{student.rollNumber}</TableCell>
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.branch}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           onClick={() => setSelectedStudent(student)}
//                         >
//                           View Statistics
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Pagination count={5} variant="outlined" shape="rounded" sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }} />
//           </Card>
//         </div>

//         {/* SECTION 2: Student Statistics (Visible on Click) */}
//         {selectedStudent && (
//           <Card sx={{ padding: "20px" }}>
//             <Typography variant="h6">Statistics for {selectedStudent.name}</Typography>
//             <div style={{ display: "flex", gap: "20px" }}>
              
//               {/* Bar Chart: Category-wise Participation */}
//               <BarChart
//                 width={400}
//                 height={300}
//                 series={[{ data: [10, 5, 8, 7, 3], label: "Participation", type: "bar" }]}
//                 xAxis={[{ scaleType: "band", data: ["Technical", "Cultural", "Sports", "Social", "Internship"] }]}
//               />

//               {/* Pie Chart: Activity Status */}
//               <PieChart
//                 width={350}
//                 height={300}
//                 series={[{ 
//                   data: [
//                     { id: 0, value: 10, label: "Approved" }, 
//                     { id: 1, value: 5, label: "Rejected" }, 
//                     { id: 2, value: 3, label: "Pending" }
//                   ] 
//                 }]}
//                 legend={{ position: "bottom" }}
//               />

//               {/* Line Chart: Performance Trends */}
//               <LineChart
//                 width={400}
//                 height={300}
//                 series={[{ data: [2, 5, 8, 3, 7], label: "Performance Trend" }]}
//                 xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
//               />
//             </div>
//           </Card>
//         )}

//         {/* SECTION 3: Overall Statistics for All Students */}
//         <Card sx={{ padding: "20px" }}>
//           <Typography variant="h6">Overall Statistics for Students Under Mentor</Typography>
//           <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>

//             {/* Bar Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" }}>
//               <BarChart
//                 width={300}
//                 height={300}
//                 series={[{ data: [10, 5, 8, 7, 3], label: "Participation", type: "bar" }]}
//                 xAxis={[{ scaleType: "band", data: ["Technical", "Cultural", "Sports", "Social", "Internship"] }]}
//               />
//             </Card>

//             {/* Pie Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" ,display: "flex", 
//   flexDirection: "column", 
//   alignItems: "center", 
//   justifyContent: "center"  }}>
//               <PieChart
//                 width={300}
//                 height={300}
//                 series={[{ 
//                   data: [
//                     { id: 0, value: 40, label: "Approved" }, 
//                     { id: 1, value: 10, label: "Rejected" }, 
//                     { id: 2, value: 15, label: "Pending" }
//                   ] 
//                 }]}

//                 slotProps={{
//                   legend: { direction: "row", position: { vertical: "bottom", horizontal: "center" } , padding: 2}
//                 }}
             
//               />
//             </Card>

//             {/* Line Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" }}>
//               <LineChart
//                 width={500}
//                 height={300}
//                 series={[{ data: [5, 10, 15, 12, 18], label: "Overall Performance" }]}
//                 xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
//               />
//             </Card>

//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default mProfile;



































///WORKING PERFECT


// import React, { useState ,useEffect} from "react";
// import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
// import MNavbar from "../../Components/MentorC/MNavbar";
// import { BarChart, PieChart, LineChart } from "@mui/x-charts";
// import axios from 'axios';
// import { Avatar } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import {Box, Divider } from "@mui/material";
// import AssessmentIcon from '@mui/icons-material/Assessment';




// const mProfile = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);


//   const [mentorInfo, setMentorInfo] = useState(null); // State to store mentor info
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const [studentsList, setStudentsList] = useState([]); // Store student data
//   const [loadingStudents, setLoadingStudents] = useState(true); // Loading state for students
// const [errorStudents, setErrorStudents] = useState(null); // Error state for students




//   useEffect(() => {
//     // Fetch mentor details on component mount
//     const mentorId = sessionStorage.getItem("mentorId"); // Fetch mentorId from sessionStorage
//     const mentorName = sessionStorage.getItem("username"); // Fetch mentor name from sessionStorage

//     if (!mentorId || !mentorName) {
//       setError("Mentor information is missing in session storage.");
//       setLoading(false);
//       return;
//     }

//     // Fetch data from API
//     const fetchMentorData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/mentor/mentor/profile/${mentorId}`);
//         setMentorInfo(response.data); // Set fetched data to state
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching mentor data:", err);
//         setError("Error fetching mentor details.");
//         setLoading(false);
//       }
//     };

//         // Fetch student list
//         const fetchStudents = async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost:5000/api/mentor/allstudentsformentor/${mentorId}`
//             );
//             setStudentsList(response.data.students);
//             setLoadingStudents(false);
//           } catch (err) {
//             console.error("Error fetching students:", err);
//             setErrorStudents("Error fetching students.");
//             setLoadingStudents(false);
//           }
//         };




//     fetchMentorData();

//     fetchStudents();
//   }, []);


//   // Sample data
//   const students = [
//     { id: 1, name: "John Doe", rollNumber: "123", branch: "CSE" },
//     { id: 2, name: "Jane Smith", rollNumber: "124", branch: "ECE" },
//   ];

//   return (
//     <div>
//       <MNavbar />
//       <div className="mentor-profile" style={{ padding: "50px", display: "flex", flexDirection: "column", gap: "20px" }}>

//         {/* SECTION 1: Mentor Info & Student Table */}
//         <div style={{ display: "flex", gap: "20px" }}>


//           {/*Mentor info card*/ }

          
//           <Card sx={{ display: "flex", width: "45%", borderRadius: "12px", overflow: "hidden", boxShadow: 3 }}>
//             {/* Left Section - Profile with Gradient */}
//             <Box sx={{
//                     width: "30%",
//                     background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "20px",
//                     color: "white",
//                   }}>
//                 {/* Profile Picture */}
//                 <Avatar sx={{ width: 80, height: 80, bgcolor: "white", mb: 2 }}>
//                   <PersonIcon sx={{ fontSize: 50, color: "#ff9a9e" }} />
//                 </Avatar>
//                 <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                   {sessionStorage.getItem("username")}
//                 </Typography>
//                 <Typography variant="body2">Mentor</Typography>
//               </Box>

//               {/* Right Section - Mentor Details */}
//               <CardContent sx={{ width: "65%", padding: "20px" }}>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>Information</Typography>
//               <Divider sx={{ my: 1 }} />

//               {loading ? (
//                 <Typography>Loading mentor details...</Typography>
//               ) : error ? (
//                 <Typography color="error">{error}</Typography>
//               ) : mentorInfo ? ( // ✅ Ensure mentorInfo is NOT null before accessing properties
//                 <>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body1"><strong>Department:</strong> {mentorInfo.m_branch}</Typography>
//                     <Typography variant="body1"><strong>Batch:</strong> {mentorInfo.m_batch}</Typography>
          
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//                     <Typography variant="body1"><strong>Semester:</strong> {mentorInfo.m_sem}</Typography>
//                     <Typography variant="body1"><strong>Section:</strong> {mentorInfo.m_csec}</Typography>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Students: 20</Typography>
//                 </>
//               ) : (
//                 <Typography color="error">Mentor data not available.</Typography>
//               )}
//             </CardContent>
//             </Card>





//                  {/* Student List Table (70%) */}
    
                          
//                   <Card sx={{ width: "70%", padding: "20px" }}>
//                     <Typography variant="h6"> <strong>Students Under Mentor</strong></Typography>

//                     {/* Show loading/error message for student data */}
//                     {loadingStudents ? (
//                       <Typography>Loading student list...</Typography>
//                     ) : errorStudents ? (
//                       <Typography color="error">{errorStudents}</Typography>
//                     ) : studentsList.length > 0 ? (
//                       <TableContainer component={Paper} sx={{mt:2}}>
//                         <Table>
//                           <TableHead>
//                             <TableRow sx={{ backgroundColor: "#448aff" }}>
//                               <TableCell><strong>Sr No.</strong></TableCell> {/* Added Serial Number Column */}
//                               <TableCell><strong>Roll Number</strong></TableCell>
//                               <TableCell><strong>Name</strong></TableCell>
//                               <TableCell><strong>Branch</strong></TableCell>
//                               <TableCell><strong>Division</strong></TableCell>
//                               <TableCell><strong>Total Credits</strong></TableCell>
//                               <TableCell><strong>Actions</strong></TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {studentsList.map((student, index) => (
//                               <TableRow key={student.id}>
//                                 <TableCell>{index + 1}</TableCell> {/* Serial Number increments automatically */}
//                                 <TableCell>{student.s_username}</TableCell>
//                                 <TableCell>{student.name}</TableCell>
//                                 <TableCell>{student.department}</TableCell>
//                                 <TableCell>{student.division}</TableCell>
//                                 <TableCell>{student.total_credits}</TableCell>
//                                 <TableCell>
//                                   <Button
//                                     variant="contained"
//                                     onClick={() => setSelectedStudent(student)} endIcon={<AssessmentIcon/>}>
//                                     View Statistics
//                                   </Button>
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     ) : (
//                       <Typography>No students found under this mentor.</Typography>
//                     )}

//                     {/* Pagination - Adjust count dynamically */}
//                     <Pagination
//                       count={Math.ceil(studentsList.length / 5)} // Adjust based on total students
//                       variant="outlined"
//                       shape="rounded"
//                       sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
//                     />
//                   </Card>

//         </div>





//         {/* SECTION 2: Student Statistics (Visible on Click) */}
//         {selectedStudent && (
//           <Card sx={{ padding: "20px" }}>
//             <Typography variant="h6">Statistics for {selectedStudent.name}</Typography>
//             <div style={{ display: "flex", gap: "20px" }}>
              
//               {/* Bar Chart: Category-wise Participation */}
//               <BarChart
//                 width={400}
//                 height={300}
//                 series={[{ data: [10, 5, 8, 7, 3], label: "Participation", type: "bar" }]}
//                 xAxis={[{ scaleType: "band", data: ["Technical", "Cultural", "Sports", "Social", "Internship"] }]}
//               />

//               {/* Pie Chart: Activity Status */}
//               <PieChart
//                 width={350}
//                 height={300}
//                 series={[{ 
//                   data: [
//                     { id: 0, value: 10, label: "Approved" }, 
//                     { id: 1, value: 5, label: "Rejected" }, 
//                     { id: 2, value: 3, label: "Pending" }
//                   ] 
//                 }]}
//                 legend={{ position: "bottom" }}
//               />

//               {/* Line Chart: Performance Trends */}
//               <LineChart
//                 width={400}
//                 height={300}
//                 series={[{ data: [2, 5, 8, 3, 7], label: "Performance Trend" }]}
//                 xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
//               />
//             </div>
//           </Card>
//         )}

//         {/* SECTION 3: Overall Statistics for All Students */}
//         <Card sx={{ padding: "20px" }}>
//           <Typography variant="h6">Overall Statistics for Students Under Mentor</Typography>
//           <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>

//             {/* Bar Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" }}>
//               <BarChart
//                 width={300}
//                 height={300}
//                 series={[{ data: [10, 5, 8, 7, 3], label: "Participation", type: "bar" }]}
//                 xAxis={[{ scaleType: "band", data: ["Technical", "Cultural", "Sports", "Social", "Internship"] }]}
//               />
//             </Card>

//             {/* Pie Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" ,display: "flex", 
//                 flexDirection: "column", 
//                 alignItems: "center", 
//                 justifyContent: "center"  }}>
//                             <PieChart
//                 width={300}
//                 height={300}
//                 series={[{ 
//                   data: [
//                     { id: 0, value: 40, label: "Approved" }, 
//                     { id: 1, value: 10, label: "Rejected" }, 
//                     { id: 2, value: 15, label: "Pending" }
//                   ] 
//                 }]}

//                 slotProps={{
//                   legend: { direction: "row", position: { vertical: "bottom", horizontal: "center" } , padding: 2}
//                 }}
             
//               />
//             </Card>

//             {/* Line Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" }}>
//               <LineChart
//                 width={500}
//                 height={300}
//                 series={[{ data: [5, 10, 15, 12, 18], label: "Overall Performance" }]}
//                 xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
//               />
//             </Card>

//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default mProfile;









































/////////////trying statistics





// import React, { useState ,useEffect} from "react";
// import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
// import MNavbar from "../../Components/MentorC/MNavbar";
// import { BarChart, PieChart, LineChart } from "@mui/x-charts";
// import axios from 'axios';
// import { Avatar } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import {Box, Divider } from "@mui/material";
// import AssessmentIcon from '@mui/icons-material/Assessment';




// const mProfile = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);


//   const [mentorInfo, setMentorInfo] = useState(null); // State to store mentor info
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const [studentsList, setStudentsList] = useState([]); // Store student data
//   const [loadingStudents, setLoadingStudents] = useState(true); // Loading state for students
// const [errorStudents, setErrorStudents] = useState(null); // Error state for students



// const [studentStatistics, setStudentStatistics] = useState(null);
// const [loadingStats, setLoadingStats] = useState(false);
// const [errorStats, setErrorStats] = useState(null);

// const [filteredEventCounts, setFilteredEventCounts] = useState({});
// const [filteredSemesterWiseEvents, setFilteredSemesterWiseEvents] = useState({});



//       // On button click, fetch data and update the selected student
//       const handleViewStatistics = (student) => {
//         setSelectedStudent(student);
//         fetchStudentStatistics(student.s_id);
//       };
              
      
//       const fetchStudentStatistics = async (studentId) => {
//         setLoadingStats(true);
//         setErrorStats(null);
      
//         try {
//           const response = await axios.get(`http://localhost:5000/api/mentor/student-statistics/${studentId}`);
//           setStudentStatistics(response.data);
//         } catch (err) {
//           console.error("Error fetching statistics:", err);
//           setErrorStats("Failed to fetch student statistics.");
//         } finally {
//           setLoadingStats(false);
//         }
//       };

      





//   useEffect(() => {
//     // Fetch mentor details on component mount
//     const mentorId = sessionStorage.getItem("mentorId"); // Fetch mentorId from sessionStorage
//     const mentorName = sessionStorage.getItem("username"); // Fetch mentor name from sessionStorage

//     if (!mentorId || !mentorName) {
//       setError("Mentor information is missing in session storage.");
//       setLoading(false);
//       return;
//     }

//     // Fetch data from API
//     const fetchMentorData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/mentor/mentor/profile/${mentorId}`);
//         setMentorInfo(response.data); // Set fetched data to state
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching mentor data:", err);
//         setError("Error fetching mentor details.");
//         setLoading(false);
//       }
//     };

//         // Fetch student list
//         const fetchStudents = async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost:5000/api/mentor/allstudentsformentor/${mentorId}`
//             );
//             setStudentsList(response.data.students);
//             setLoadingStudents(false);
//           } catch (err) {
//             console.error("Error fetching students:", err);
//             setErrorStudents("Error fetching students.");
//             setLoadingStudents(false);
//           }
//         };







//     fetchMentorData();

//     fetchStudents();
//   }, []);


//   // Sample data
//   const students = [
//     { id: 1, name: "John Doe", rollNumber: "123", branch: "CSE" },
//     { id: 2, name: "Jane Smith", rollNumber: "124", branch: "ECE" },
//   ];

//   return (
//     <div>
//       <MNavbar />
//       <div className="mentor-profile" style={{ padding: "50px", display: "flex", flexDirection: "column", gap: "20px" }}>

//         {/* SECTION 1: Mentor Info & Student Table */}
//         <div style={{ display: "flex", gap: "20px" }}>


//           {/*Mentor info card*/ }

          
//           <Card sx={{ display: "flex", width: "45%", borderRadius: "12px", overflow: "hidden", boxShadow: 3 }}>
//             {/* Left Section - Profile with Gradient */}
//             <Box sx={{
//                     width: "30%",
//                     background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "20px",
//                     color: "white",
//                   }}>
//                 {/* Profile Picture */}
//                 <Avatar sx={{ width: 80, height: 80, bgcolor: "white", mb: 2 }}>
//                   <PersonIcon sx={{ fontSize: 50, color: "#ff9a9e" }} />
//                 </Avatar>
//                 <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                   {sessionStorage.getItem("username")}
//                 </Typography>
//                 <Typography variant="body2">Mentor</Typography>
//               </Box>

//               {/* Right Section - Mentor Details */}
//               <CardContent sx={{ width: "65%", padding: "20px" }}>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>Information</Typography>
//               <Divider sx={{ my: 1 }} />

//               {loading ? (
//                 <Typography>Loading mentor details...</Typography>
//               ) : error ? (
//                 <Typography color="error">{error}</Typography>
//               ) : mentorInfo ? ( // ✅ Ensure mentorInfo is NOT null before accessing properties
//                 <>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body1"><strong>Department:</strong> {mentorInfo.m_branch}</Typography>
//                     <Typography variant="body1"><strong>Batch:</strong> {mentorInfo.m_batch}</Typography>
          
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//                     <Typography variant="body1"><strong>Semester:</strong> {mentorInfo.m_sem}</Typography>
//                     <Typography variant="body1"><strong>Section:</strong> {mentorInfo.m_csec}</Typography>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Students: 20</Typography>
//                 </>
//               ) : (
//                 <Typography color="error">Mentor data not available.</Typography>
//               )}
//             </CardContent>
//             </Card>





//                  {/* Student List Table (70%) */}
    
                          
//                   <Card sx={{ width: "70%", padding: "20px" }}>
//                     <Typography variant="h6"> <strong>Students Under Mentor</strong></Typography>

//                     {/* Show loading/error message for student data */}
//                     {loadingStudents ? (
//                       <Typography>Loading student list...</Typography>
//                     ) : errorStudents ? (
//                       <Typography color="error">{errorStudents}</Typography>
//                     ) : studentsList.length > 0 ? (
//                       <TableContainer component={Paper} sx={{mt:2}}>
//                         <Table>
//                           <TableHead>
//                             <TableRow sx={{ backgroundColor: "#448aff" }}>
//                               <TableCell><strong>Sr No.</strong></TableCell> {/* Added Serial Number Column */}
//                               <TableCell><strong>Roll Number</strong></TableCell>
//                               <TableCell><strong>Name</strong></TableCell>
//                               <TableCell><strong>Branch</strong></TableCell>
//                               <TableCell><strong>Division</strong></TableCell>
//                               <TableCell><strong>Total Credits</strong></TableCell>
//                               <TableCell><strong>Actions</strong></TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {studentsList.map((student, index) => (
//                               <TableRow key={student.id}>
//                                 <TableCell>{index + 1}</TableCell> {/* Serial Number increments automatically */}
//                                 <TableCell>{student.s_username}</TableCell>
//                                 <TableCell>{student.name}</TableCell>
//                                 <TableCell>{student.department}</TableCell>
//                                 <TableCell>{student.division}</TableCell>
//                                 <TableCell>{student.total_credits}</TableCell>
//                                 <TableCell>
//                                   <Button
//                                     variant="contained"
//                                     onClick={() => handleViewStatistics(student)} endIcon={<AssessmentIcon/>}>
//                                     View Statistics
//                                   </Button>
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     ) : (
//                       <Typography>No students found under this mentor.</Typography>
//                     )}

//                     {/* Pagination - Adjust count dynamically */}
//                     <Pagination
//                       count={Math.ceil(studentsList.length / 5)} // Adjust based on total students
//                       variant="outlined"
//                       shape="rounded"
//                       sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
//                     />
//                   </Card>

//         </div>





//         {/* SECTION 2: Student Statistics (Visible on Click) */}
//         {selectedStudent && (
//   <Card sx={{ padding: "20px" }}>
//     <Typography variant="h6">Statistics for {selectedStudent.name}</Typography>

//     {loadingStats ? (
//       <Typography>Loading statistics...</Typography>
//     ) : errorStats ? (
//       <Typography color="error">{errorStats}</Typography>
//     ) : studentStatistics ? (
//       <div style={{ display: "flex", gap: "20px" }}>
//         {/* Bar Chart: Event Type Participation */}
//         <BarChart
//           width={400}
//           height={300}
//           series={[{
//             data: Object.values(studentStatistics.eventCounts),
//             label: "Participation",
//             type: "bar"
//           }]}
//           xAxis={[{ scaleType: "band", data: Object.keys(studentStatistics.eventCounts) }]}
//         />

//         {/* Pie Chart: Activity Status */}
//         <PieChart
//           width={350}
//           height={300}
//           series={[{
//             data: Object.entries(studentStatistics.statusCounts).map(([label, value], index) => ({
//               id: index, value, label
//             }))
//           }]}
//           legend={{ position: "bottom" }}
//         />

//         {/* Line Chart: Semester-wise Performance */}
//         <LineChart
//           width={400}
//           height={300}
//           series={[{
//             data: Object.values(studentStatistics.semesterWiseEvents).map(event => Object.values(event).reduce((a, b) => a + b, 0)),
//             label: "Total Participation",
//           }]}
//           xAxis={[{ scaleType: "point", data: Object.keys(studentStatistics.semesterWiseEvents) }]}
//         />
//       </div>
//     ) : (
//       <Typography>No statistics available for this student.</Typography>
//     )}
//   </Card>
// )}








//         {/* SECTION 3: Overall Statistics for All Students */}
//         <Card sx={{ padding: "20px" }}>
//           <Typography variant="h6">Overall Statistics for Students Under Mentor</Typography>
//           <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>

//             {/* Bar Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" }}>
//               <BarChart
//                 width={300}
//                 height={300}
//                 series={[{ data: [10, 5, 8, 7, 3], label: "Participation", type: "bar" }]}
//                 xAxis={[{ scaleType: "band", data: ["Technical", "Cultural", "Sports", "Social", "Internship"] }]}
//               />
//             </Card>

//             {/* Pie Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" ,display: "flex", 
//                 flexDirection: "column", 
//                 alignItems: "center", 
//                 justifyContent: "center"  }}>
//                             <PieChart
//                 width={300}
//                 height={300}
//                 series={[{ 
//                   data: [
//                     { id: 0, value: 40, label: "Approved" }, 
//                     { id: 1, value: 10, label: "Rejected" }, 
//                     { id: 2, value: 15, label: "Pending" }
//                   ] 
//                 }]}

//                 slotProps={{
//                   legend: { direction: "row", position: { vertical: "bottom", horizontal: "center" } , padding: 12}
//                 }}
             
//               />
//             </Card>

//             {/* Line Chart Card */}
//             <Card sx={{ width: "32%", padding: "10px" }}>
//               <LineChart
//                 width={500}
//                 height={300}
//                 series={[{ data: [5, 10, 15, 12, 18], label: "Overall Performance" }]}
//                 xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
//               />
//             </Card>

//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default mProfile;





























///new things

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
import MNavbar from "../../Components/MentorC/MNavbar";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";
import axios from 'axios';
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Divider } from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';

const mProfile = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("All"); // ✅ Fixed missing state

  const [mentorInfo, setMentorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [studentsList, setStudentsList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [errorStudents, setErrorStudents] = useState(null);

  const [studentStatistics, setStudentStatistics] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [errorStats, setErrorStats] = useState(null);

  const [filteredEventCounts, setFilteredEventCounts] = useState({});
  const [filteredSemesterWiseEvents, setFilteredSemesterWiseEvents] = useState({});

  // Handle student selection and fetch statistics
  const handleViewStatistics = (student) => {
    setSelectedStudent(student);
    fetchStudentStatistics(student.s_id);
  };

  const fetchStudentStatistics = async (studentId) => {
    setLoadingStats(true);
    setErrorStats(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/mentor/student-statistics/${studentId}`);
      const data = response.data;

      if (!data.eventCounts || !data.semesterWiseEvents || !data.statusCounts) {
        setErrorStats("Missing necessary data in student statistics.");
        return;
      }

      setStudentStatistics(data);
      setSelectedSemester("All"); // ✅ Reset to "All" when new student is selected
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setErrorStats("Failed to fetch student statistics.");
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    const mentorId = sessionStorage.getItem("mentorId");
    const mentorName = sessionStorage.getItem("username");

    if (!mentorId || !mentorName) {
      setError("Mentor information is missing in session storage.");
      setLoading(false);
      return;
    }

    const fetchMentorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mentor/mentor/profile/${mentorId}`);
        setMentorInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching mentor data:", err);
        setError("Error fetching mentor details.");
        setLoading(false);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mentor/allstudentsformentor/${mentorId}`);
        setStudentsList(response.data.students);
        setLoadingStudents(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setErrorStudents("Error fetching students.");
        setLoadingStudents(false);
      }
    };

    fetchMentorData();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (studentStatistics) {
      setFilteredEventCounts(studentStatistics.eventCounts || {});
      setFilteredSemesterWiseEvents(studentStatistics.semesterWiseEvents || {});
    }
  }, [studentStatistics]);

  // Handle semester change
  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);

    if (!studentStatistics) return;

    if (semester === "All") {
      setFilteredEventCounts(studentStatistics.eventCounts);
      setFilteredSemesterWiseEvents(studentStatistics.semesterWiseEvents);
    } else {
      const semesterData = studentStatistics.semesterWiseEvents[semester] || {};
      setFilteredEventCounts(semesterData);
      setFilteredSemesterWiseEvents({ [semester]: semesterData });
    }
  };


  return (
    <div>
      <MNavbar />
      <div className="mentor-profile" style={{ padding: "50px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* SECTION 1: Mentor Info & Student Table */}
        <div style={{ display: "flex", gap: "20px" }}>


          {/*Mentor info card*/ }

          
          <Card sx={{ display: "flex", width: "45%", borderRadius: "12px", overflow: "hidden", boxShadow: 3 }}>
            {/* Left Section - Profile with Gradient */}
            <Box sx={{
                    width: "30%",
                    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    color: "white",
                  }}>
                {/* Profile Picture */}
                <Avatar sx={{ width: 80, height: 80, bgcolor: "white", mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 50, color: "#ff9a9e" }} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {sessionStorage.getItem("username")}
                </Typography>
                <Typography variant="body2">Mentor</Typography>
              </Box>

              {/* Right Section - Mentor Details */}
              <CardContent sx={{ width: "65%", padding: "20px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Information</Typography>
              <Divider sx={{ my: 1 }} />

              {loading ? (
                <Typography>Loading mentor details...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : mentorInfo ? ( // ✅ Ensure mentorInfo is NOT null before accessing properties
                <>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1"><strong>Department:</strong> {mentorInfo.m_branch}</Typography>
                    <Typography variant="body1"><strong>Batch:</strong> {mentorInfo.m_batch}</Typography>
          
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="body1"><strong>Semester:</strong> {mentorInfo.m_sem}</Typography>
                    <Typography variant="body1"><strong>Section:</strong> {mentorInfo.m_csec}</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Students: 20</Typography>
                </>
              ) : (
                <Typography color="error">Mentor data not available.</Typography>
              )}
            </CardContent>
            </Card>





                 {/* Student List Table (70%) */}
    
                          
                  <Card sx={{ width: "70%", padding: "20px" }}>
                    <Typography variant="h6"> <strong>Students Under Mentor</strong></Typography>

                    {/* Show loading/error message for student data */}
                    {loadingStudents ? (
                      <Typography>Loading student list...</Typography>
                    ) : errorStudents ? (
                      <Typography color="error">{errorStudents}</Typography>
                    ) : studentsList.length > 0 ? (
                      <TableContainer component={Paper} sx={{mt:2}}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#448aff" }}>
                              <TableCell><strong>Sr No.</strong></TableCell> {/* Added Serial Number Column */}
                              <TableCell><strong>Roll Number</strong></TableCell>
                              <TableCell><strong>Name</strong></TableCell>
                              <TableCell><strong>Branch</strong></TableCell>
                              <TableCell><strong>Division</strong></TableCell>
                              <TableCell><strong>Total Credits</strong></TableCell>
                              <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {studentsList.map((student, index) => (
                              <TableRow key={student.id}>
                                <TableCell>{index + 1}</TableCell> {/* Serial Number increments automatically */}
                                <TableCell>{student.s_username}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.department}</TableCell>
                                <TableCell>{student.division}</TableCell>
                                <TableCell>{student.total_credits}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleViewStatistics(student)} endIcon={<AssessmentIcon/>}>
                                    View Statistics
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Typography>No students found under this mentor.</Typography>
                    )}

                    {/* Pagination - Adjust count dynamically */}
                    <Pagination
                      count={Math.ceil(studentsList.length / 5)} // Adjust based on total students
                      variant="outlined"
                      shape="rounded"
                      sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
                    />
                  </Card>

        </div>





        {/* SECTION 2: Student Statistics (Visible on Click) */}
        
        {selectedStudent && (
  <Card sx={{ padding: "20px", marginTop: "20px" }}>
    <Typography variant="h6" gutterBottom>
      Statistics for {selectedStudent.name}
    </Typography>

    {loadingStats ? (
      <Typography>Loading statistics...</Typography>
    ) : errorStats ? (
      <Typography color="error">{errorStats}</Typography>
    ) : studentStatistics ? (
      <>
        {/* Semester Filter */}
        <Box sx={{ marginBottom: 2 }}>
  <Typography variant="subtitle1">Filter by Semester:</Typography>
  <select 
    value={selectedSemester} 
    onChange={handleSemesterChange} 
    style={{ padding: "5px", marginLeft: "10px", borderRadius: "5px" }}
  >
    <option value="All">All Semesters</option>
    {Array.from({ length: 8 }, (_, i) => (i + 1).toString()).map((semester) => (
      <option key={semester} value={semester}>
        Semester {semester}
      </option>
    ))}
  </select>
</Box>

        {/* Graphs Container */}
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          
          {/* Bar Chart: Event Type Participation */}
          <Card sx={{ width: "30%", padding: "10px" }}>
            <Typography variant="subtitle1" sx={{ textAlign: "center", marginBottom: "10px" }}>
              Student Participation ({selectedSemester})
            </Typography>
            <BarChart
              width={350}
              height={300}
              series={[{
                data: Object.values(filteredEventCounts), 
                label: "Participation", 
                type: "bar"
              }]}
              xAxis={[{ scaleType: "band", data: Object.keys(filteredEventCounts) }]}
            />
          </Card>

          {/* Pie Chart: Activity Status */}
          <Card sx={{ width: "30%", padding: "10px" }}>
            <Typography variant="subtitle1" sx={{ textAlign: "center", marginBottom: "10px" }}>
              Activity Status Breakdown
            </Typography>
            <PieChart
              width={350}
              height={300}
              series={[{
                data: Object.entries(studentStatistics.statusCounts).map(([label, value], index) => ({
                  id: index, value, label
                }))
              }]}
              legend={{ position: "bottom" }}
            />
          </Card>

          {/* Line Chart: Semester-wise Performance */}
          <Card sx={{ width: "30%", padding: "10px" }}>
  <Typography variant="subtitle1" sx={{ textAlign: "center", marginBottom: "10px" }}>
    Semester-wise Total Participation
  </Typography>
  <LineChart
    width={350}
    height={300}
    series={[{
      data: Array.from({ length: 8 }, (_, i) => {
        const sem = (i + 1).toString();
        return studentStatistics.semesterWiseEvents[sem]
          ? Object.values(studentStatistics.semesterWiseEvents[sem]).reduce((a, b) => a + b, 0)
          : 0;  // Fill missing semesters with 0
      }),
      label: "Total Participation",
    }]}
    xAxis={[{ 
      scaleType: "point", 
      data: Array.from({ length: 8 }, (_, i) => (i + 1).toString()) // Always show 1-8 on x-axis
    }]}
  />
</Card>

        </Box>
      </>
    ) : (
      <Typography>No statistics available for this student.</Typography>
    )}
  </Card>
)}








        {/* SECTION 3: Overall Statistics for All Students */}
        <Card sx={{ padding: "20px" }}>
          <Typography variant="h6">Overall Statistics for Students Under Mentor</Typography>
          <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>

            {/* Bar Chart Card */}
            <Card sx={{ width: "32%", padding: "10px" }}>
              <BarChart
                width={300}
                height={300}
                series={[{ data: [10, 5, 8, 7, 3], label: "Participation", type: "bar" }]}
                xAxis={[{ scaleType: "band", data: ["Technical", "Cultural", "Sports", "Social", "Internship"] }]}
              />
            </Card>

            {/* Pie Chart Card */}
            <Card sx={{ width: "32%", padding: "10px" ,display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center"  }}>
                            <PieChart
                width={300}
                height={300}
                series={[{ 
                  data: [
                    { id: 0, value: 40, label: "Approved" }, 
                    { id: 1, value: 10, label: "Rejected" }, 
                    { id: 2, value: 15, label: "Pending" }
                  ] 
                }]}

                slotProps={{
                  legend: { direction: "row", position: { vertical: "bottom", horizontal: "center" } , padding: 12}
                }}
             
              />
            </Card>

            {/* Line Chart Card */}
            <Card sx={{ width: "32%", padding: "10px" }}>
              <LineChart
                width={500}
                height={300}
                series={[{ data: [5, 10, 15, 12, 18], label: "Overall Performance" }]}
                xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
              />
            </Card>

          </div>
        </Card>
      </div>
    </div>
  );
};

export default mProfile;
