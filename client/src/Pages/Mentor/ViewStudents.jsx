// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MNavbar from "../../Components/MentorC/MNavbar";
// import { FetchStudentList } from "../../api/mentorApi";
// import "./css/ViewStudents.css";

// const ViewStudents = () => {
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const studentData = await FetchStudentList();
//       setStudents(studentData);
//     };
//     fetchData();
//   }, []);
 
//   const handleStudentClick = (s_id, s_name) => {
//     console.log("Navigating with:", { s_id, s_name }); 
//     navigate(`/get-student/${s_id}`, { state: { studentName: s_name } });
//   };

//   return (
//     <div>
//       <MNavbar />
//       <div className="mentor-view-students-page">
//         <h4 className="text-left mentorviewstudentlistheader">Student List For Mentoring Batch:</h4>
              

//         <div className="view-students-container">
//           {students.length === 0 ? (
//             <p className="text-center">No students found.</p>
//           ) : (
//             <table className="table-student-list">
//               <thead>
//                 <tr>
//                   <th>S_ID</th>
//                   <th>Student Name</th>
//                   <th>Roll No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.s_id}>
//                     <td>{student.s_id}</td>
//                     <td>
//                       <button
//                         className="student-name-btn"
//                         onClick={() => handleStudentClick(student.s_id, student.s_name)}
//                       >
//                         {student.s_name}
//                       </button>
//                     </td>
//                     <td>{student.s_username}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewStudents;


















































import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MNavbar from "../../Components/MentorC/MNavbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mentor/studentsundermentor", {
          withCredentials: true,
        });

        if (response.data && response.data.mentorId) {
          sessionStorage.setItem("mentorId", response.data.mentorId); // Store mentorId
        }

        if (typeof response.data === "string") {
          console.error("Received HTML instead of JSON:", response.data);
        } else {
          // setStudents(Array.isArray(response.data) ? response.data : []);
          setStudents(Array.isArray(response.data.students) ? response.data.students : []);


   
        }
      } catch (error) {
        console.error("Error fetching student list:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewActivities = (s_id, name) => {
    navigate(`/get-student/${s_id}`, { state: { studentName: name } });
  };

  return (
    <div>
      <MNavbar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Card sx={{ width: "80%", padding: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Student List for Mentoring Batch
          </Typography>

          {students.length === 0 ? (
            <Typography align="center">No students found.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#448aff" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Sr. No</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Roll No</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Semester</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Batch</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Division</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.s_id} sx={{ backgroundColor: index % 2 ? "#f9f9f9" : "white" }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.s_username}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>{student.division}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={() => handleViewActivities(student.s_id, student.name)}>
                          View Activities
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>
    </div>
  );
};

export default ViewStudents;
