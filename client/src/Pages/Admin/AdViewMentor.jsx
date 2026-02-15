// import React, { useState, useEffect } from "react";
// import AdNavbar from "../../Components/AdminC/AdNavbar";
// import "./css/AdViewMentor.css";
// import { getMentorsByBranch } from "../../api/adminApi"; // ✅ API for fetching mentors
// import { deleteMentor, incrementSemester } from "../../api/adminApi"; // ✅ API for delete & increment

// const AdViewMentor = () => {
//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [mentorData, setMentorData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];

//   // Fetch mentors based on selected branch
//   useEffect(() => {
//     const fetchMentors = async () => {
//       if (!selectedBranch) return;

//       setLoading(true);
//       setError("");

//       try {
//         const data = await getMentorsByBranch(selectedBranch);
//         setMentorData(data);
//       } catch (err) {
//         console.error("Error fetching mentors:", err);
//         setError("Failed to fetch mentors. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMentors();
//   }, [selectedBranch]);

//   // ✅ Delete Mentor Handler
//   const handleDelete = async (m_id) => {
//     if (!window.confirm("Are you sure you want to delete this mentor?")) return;

//     try {
//       await deleteMentor(m_id);
//       setMentorData(mentorData.filter((mentor) => mentor.m_id !== m_id)); // Remove from state
//     } catch (error) {
//       console.error("Error deleting mentor:", error);
//       alert("Failed to delete mentor.");
//     }
//   };

//   // ✅ Increment Semester Handler
//   const handleIncrementSemester = async (m_id, currentSemester) => {
//     if (currentSemester >= 8) {
//       alert("Mentor is already at the maximum semester.");
//       return;
//     }

//     try {
//       const updatedMentor = await incrementSemester(m_id);
//       setMentorData(
//         mentorData.map((mentor) =>
//           mentor.m_id === m_id ? { ...mentor, m_sem: updatedMentor.m_sem } : mentor
//         )
//       );
//     } catch (error) {
//       console.error("Error incrementing semester:", error);
//       alert("Failed to increment semester.");
//     }
//   };

//   return (
//     <div>
//       <AdNavbar />
//       <div className="mentor-view-main">
//         <h5 className="mentor-view-main-htext">
//           Select branch to view respective mentor details:
//         </h5>
//         <div className="branch-dropdown">
//           <select
//             className="form-control"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">Select Branch</option>
//             {branches.map((branch, index) => (
//               <option key={index} value={branch}>
//                 {branch}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mentor-info-table">
//           {loading ? (
//             <p>Loading mentors...</p>
//           ) : error ? (
//             <p className="text-danger">{error}</p>
//           ) : mentorData.length > 0 ? (
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Batch</th>
//                   <th>Semester</th>
//                   <th>Class Section</th>
//                   <th>Actions</th> {/* 🔹 Added Actions Column */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {mentorData.map((mentor, index) => (
//                   <tr key={index}>
//                     <td>{mentor.m_name}</td>
//                     <td>{mentor.m_batch}</td>
//                     <td>{mentor.m_sem}</td>
//                     <td>{mentor.m_csec}</td>
//                     <td>
//                       {/* 🔹 Increment Semester Button */}
//                       <button
//                         className="btn btn-warning btn-sm me-2"
//                         onClick={() => handleIncrementSemester(mentor.m_id, mentor.m_sem)}
//                       >
//                         <i className="bi bi-arrow-up-square-fill"></i>
//                       </button>

//                       {/* 🔹 Delete Mentor Button */}
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(mentor.m_id)}
//                       >
//                         <i className="bi bi-trash3"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : selectedBranch ? (
//             <p>No mentors found for {selectedBranch}</p>
//           ) : (
//             <p>Select a branch to view mentor details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdViewMentor;






import React, { useState, useEffect } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getMentorsByBranch, deleteMentor, incrementSemester } from "../../api/adminApi";
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Delete, ArrowUpward } from "@mui/icons-material";

const AdViewMentor = () => {
  const [selectedBranch, setSelectedBranch] = useState("all"); // Default to 'all'
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [mentorData, setMentorData] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];

  // Fetch mentors based on selected branch
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMentorsByBranch(selectedBranch);
        setMentorData(data);
        setFilteredMentors(data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to fetch mentors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [selectedBranch]);

  // Apply frontend filtering
  useEffect(() => {
    let filtered = mentorData;

    if (selectedDivision) {
      filtered = filtered.filter((mentor) => mentor.m_csec === selectedDivision);
    }

    if (selectedYear) {
      filtered = filtered.filter((mentor) => mentor.year_of_joining.toString().includes(selectedYear));
    }

    setFilteredMentors(filtered);
  }, [selectedDivision, selectedYear, mentorData]);

  // Delete Mentor Handler
  const handleDelete = async (m_id) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;
    try {
      await deleteMentor(m_id);
      setMentorData(mentorData.filter((mentor) => mentor.m_id !== m_id));
    } catch (error) {
      console.error("Error deleting mentor:", error);
      alert("Failed to delete mentor.");
    }
  };

  // Increment Semester Handler
  const handleIncrementSemester = async (m_id, currentSemester) => {
    if (currentSemester >= 8) {
      alert("Mentor is already at the maximum semester.");
      return;
    }

    try {
      const updatedMentor = await incrementSemester(m_id);
      setMentorData(
        mentorData.map((mentor) =>
          mentor.m_id === m_id ? { ...mentor, m_sem: updatedMentor.m_sem } : mentor
        )
      );
    } catch (error) {
      console.error("Error incrementing semester:", error);
      alert("Failed to increment semester.");
    }
  };

  return (
    <div>
      <AdNavbar />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            View Mentors
          </Typography>

          {/* Filters */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" ,marginTop : "10px"}}>
            {/* Branch Filter */}
            <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel id="branch-label">Select Branch</InputLabel>
                <Select
                  labelId="branch-label"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  input={<OutlinedInput label="Select Branch" />}>
                  <MenuItem value="all">All Branches</MenuItem>
                  {branches.map((branch, index) => (
                    <MenuItem key={index} value={branch}>
                      {branch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            {/* Division Filter */}
            {/* <FormControl fullWidth>
              <InputLabel>Select Division</InputLabel>
              <Select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
                <MenuItem value="">All Divisions</MenuItem>
                <MenuItem value="B">B</MenuItem>
                {[...new Set(mentorData.map((mentor) => mentor.m_csec))]
                  .filter((division) => division !== "B") // Avoid duplicate B
                  .map((division, index) => (
                    <MenuItem key={index} value={division}>
                      {division}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}

            
            {/* Division Filter */}
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel shrink>Select Division</InputLabel>
              <Select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                displayEmpty
                input={<OutlinedInput notched label="Select Division" />} >
                <MenuItem value="">All Divisions</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </Select>
            </FormControl>


            {/* Year of Joining Filter */}
            <TextField
              label="Year of Joining"
              variant="outlined"
              fullWidth
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>

          {/* Mentor Table */}


          <TableContainer component={Paper}>
            {loading ? (
              <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : filteredMentors.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow sx={{backgroundColor: "#64b5f6"}}>
                  <TableCell><strong>Sr. No.</strong></TableCell>
                    <TableCell> <strong>Name</strong></TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Class Section</TableCell>
                    <TableCell>Year of Joining</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMentors.map((mentor,index) => (
                    <TableRow key={mentor.m_id}>
                       <TableCell>{index + 1}</TableCell> {/* Serial Number */}
                      <TableCell>{mentor.m_name}</TableCell>
                      <TableCell>{mentor.m_batch}</TableCell>
                      <TableCell>{mentor.m_sem}</TableCell>
                      <TableCell>{mentor.m_csec}</TableCell>
                      <TableCell>{mentor.year_of_joining}</TableCell>
                      <TableCell>
                        <IconButton color="warning" onClick={() => handleIncrementSemester(mentor.m_id, mentor.m_sem)}>
                          <ArrowUpward />
                        </IconButton>
                        <Button variant="contained" onClick={() => handleDelete(mentor.m_id)} startIcon={<DeleteIcon />}  >
                          Delete 
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography sx={{ p: 2 }}>No mentors found for the selected criteria.</Typography>
            )}
          </TableContainer>




        </Paper>
      </Container>
    </div>
  );
};

export default AdViewMentor;
