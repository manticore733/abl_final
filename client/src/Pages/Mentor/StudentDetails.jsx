

/////100% works all things n all perfeectly 



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Modal,
  Avatar,Grid,
  TextField,
} from "@mui/material";
import MNavbar from "../../Components/MentorC/MNavbar";

const StudentDetails = () => {
  const { id: s_id } = useParams();

  // State for activities
  const [pendingActivities, setPendingActivities] = useState([]);
  const [processedActivities, setProcessedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    // State for student info & activities
    const [student, setStudent] = useState(null);

  // Reject Modal
  const [openModal, setOpenModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectActivityId, setRejectActivityId] = useState(null);


  // Define fetchStudentData outside useEffect
const fetchStudentData = async () => {
  try {
    setLoading(true);
    const studentRes = await axios.get(
      `http://localhost:5000/api/mentor/getstudentdetails/${s_id}`
    );
    setStudent(studentRes.data);
  } catch (error) {
    setError("Failed to fetch student details.");
  } finally {
    setLoading(false);
  }
};

  // Fetch activities
  // useEffect(() => {


  //   const fetchActivities = async () => {
  //     try {
  //       setLoading(true);

  //       // Fetch pending activities
  //       const pendingRes = await axios.get(
  //         `http://localhost:5000/api/mentor/student-pending-activities/${s_id}`
  //       );
  //       setPendingActivities(pendingRes.data);

  //       // Fetch approved/rejected activities
  //       try {
  //         const processedRes = await axios.get(
  //           `http://localhost:5000/api/mentor/student-processed-activities/${s_id}`
  //         );
  //         setProcessedActivities(processedRes.data);
  //       } catch (error) {
  //         if (error.response && error.response.status === 404) {
  //           setProcessedActivities([]); // No approved/rejected activities, set empty array
  //         } else {
  //           setError("Failed to fetch processed activities.");
  //         }
  //       }
  //     } catch (error) {
  //       setError("Failed to fetch activities.");
  //       console.error("Error fetching activities:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStudentData();

  //   fetchActivities();
  // }, [s_id]);

  useEffect(() => {
    fetchStudentData(); // always fetch student details
  
    const fetchActivities = async () => {
      setLoading(true);
      setError(""); // reset error first
  
      try {
        const [pendingRes, processedRes] = await Promise.allSettled([
          axios.get(`http://localhost:5000/api/mentor/student-pending-activities/${s_id}`),
          axios.get(`http://localhost:5000/api/mentor/student-processed-activities/${s_id}`),
        ]);
  
        if (pendingRes.status === "fulfilled") {
          setPendingActivities(pendingRes.value.data);
        } else {
          setPendingActivities([]);
          console.warn("Pending activities fetch failed:", pendingRes.reason);
        }
  
        if (processedRes.status === "fulfilled") {
          setProcessedActivities(processedRes.value.data);
        } else if (processedRes.reason.response?.status === 404) {
          setProcessedActivities([]); // no processed activities
        } else {
          console.warn("Processed activities fetch failed:", processedRes.reason);
        }
  
      } catch (error) {
        console.error("Unexpected error in fetchActivities:", error);
        setError("Something went wrong while loading activities.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchActivities();
  }, [s_id]);
  



  // Approve Activity
 
  const handleApprove = async (activityId) => {
    if (!window.confirm("Are you sure you want to approve this activity?")) return;
  
    try {
      await axios.put(`http://localhost:5000/api/mentor/approve-activity/${activityId}`);
  
      // Update UI
      setPendingActivities((prev) => prev.filter((act) => act.id !== activityId));
      setProcessedActivities((prev) => [
        ...prev,
        { ...pendingActivities.find((act) => act.id === activityId), status: "Approved" },
      ]);
  
      // ✅ Fetch updated student details (including new total credits)
      fetchStudentData();
    } catch (err) {
      console.error("Error approving activity:", err);
    }
  };
  



  // Reject Activity (open modal)
  const handleRejectClick = (activityId) => {
    setRejectActivityId(activityId);
    setOpenModal(true);
  };

  // Confirm Reject Activity
  

  const handleRejectConfirm = async () => {
    if (!rejectReason) {
      alert("Please enter a rejection reason.");
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/mentor/reject-activity/${rejectActivityId}`, {
        rejectionReason: rejectReason,
      });
  
      // Update UI
      setPendingActivities((prev) => prev.filter((act) => act.id !== rejectActivityId));
      setProcessedActivities((prev) => [
        ...prev,
        { ...pendingActivities.find((act) => act.id === rejectActivityId), status: "Rejected", remarks: rejectReason },
      ]);
  
      setOpenModal(false);
      setRejectReason("");
  
      // ✅ Fetch updated student details (including new total credits)
      fetchStudentData();
    } catch (err) {
      console.error("Error rejecting activity:", err);
    }
  };
  









  // Undo Activity
 

  const handleUndo = async (activityId) => {
    if (!window.confirm("Are you sure you want to undo this action?")) return;
  
    try {
      await axios.put(`http://localhost:5000/api/mentor/undo-activity/${activityId}`);
  
      // Update UI
      setProcessedActivities((prev) => prev.filter((act) => act.id !== activityId));
      setPendingActivities((prev) => [
        ...prev,
        { ...processedActivities.find((act) => act.id === activityId), status: "Pending" },
      ]);
  
      // ✅ Fetch updated student details (including new total credits)
      fetchStudentData();
    } catch (err) {
      console.error("Error undoing activity:", err);
    }
  };
  








  return (
    <div>
      <MNavbar />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Student Activities
        </Typography>


        {/* 🔹 STUDENT PROFILE CARD */}
        {student && (
          <Card sx={{ marginBottom: "20px", padding: "15px", display: "flex", alignItems: "center" }}>
            <Avatar
              src={student.profile_picture || "/default-avatar.png"}
              alt={student.name}
              sx={{ width: 100, height: 100, marginRight: "20px" }}
            />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {student.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Roll Number:</strong>{student.s_username}</Typography>
                  <Typography><strong>Department:</strong>{student.department}</Typography>
                  <Typography><strong>Division:</strong>{student.division}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Batch:</strong>{student.batch}</Typography>
                  <Typography><strong>Year:</strong>{student.year}</Typography>
                  <Typography><strong>Gender:</strong> {student.gender}</Typography>
                  <Typography><strong>Total Credits:</strong> {student.total_credits}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <Typography color="textSecondary">Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {/* 🔹 PENDING ACTIVITIES SECTION */}
            <Card sx={{ marginBottom: "20px", padding: "10px" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Pending Activities
                </Typography>
                <TableContainer component={Paper} sx={{pt:2}}>
                  <Table>
                    <TableHead>
                      <TableRow  sx={{ backgroundColor: "#448aff" }}  >
                      <TableCell sx={{ fontWeight: "bold" }}>Sr. No</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Event Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Subcategory</TableCell>
                        <TableCell  sx={{ fontWeight: "bold" }}>Organized By</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Venue</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Points</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} >Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingActivities.map((act, index) => (
                        <TableRow key={act.id}>
                          <TableCell>{index + 1}</TableCell> {/* Sr. No */}
                          <TableCell>{act.event_name}</TableCell>
                          <TableCell>{act.event_type}</TableCell>
                          <TableCell>{act.subcategory}</TableCell>
                          <TableCell>{act.organised_by}</TableCell>
                          <TableCell>{act.participation_date}</TableCell>
                          <TableCell>{act.venue}</TableCell>
                          <TableCell>{act.allocated_points}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="success" onClick={() => handleApprove(act.id)}>Approve</Button>
                            <Button variant="contained" color="error" onClick={() => handleRejectClick(act.id)} sx={{ marginLeft: 1 }}>Reject</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* 🔹 PROCESSED ACTIVITIES SECTION */}
            <Card sx={{ padding: "10px" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Processed Activities
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow  sx={{ backgroundColor: "#448aff" }}>
                      <TableCell sx={{ fontWeight: "bold"}}>Sr. No</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Event Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Subcategory</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Organized By</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Venue</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Points</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Remarks</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Undo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {processedActivities.map((act, index) => (
                          <TableRow key={act.id}>
                            <TableCell>{index + 1}</TableCell> {/* Sr. No */}
                            <TableCell>{act.event_name}</TableCell>
                            <TableCell>{act.event_type}</TableCell>
                            <TableCell>{act.subcategory}</TableCell>
                            <TableCell>{act.organised_by}</TableCell>
                            <TableCell>{act.participation_date}</TableCell>
                            <TableCell>{act.venue}</TableCell>
                            <TableCell>{act.allocated_points}</TableCell>
                            <TableCell style={{ color: act.status === "Approved" ? "green" : "red" }}>{act.status}</TableCell>
                            <TableCell>{act.remarks || "—"}</TableCell>
                            <TableCell>
                              <Button variant="contained" color="secondary" onClick={() => handleUndo(act.id)}>Undo</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                  </Table>

                   {/* 🔹 REJECT MODAL */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <div style={{ padding: "20px", backgroundColor: "white", margin: "auto", marginTop: "100px", width: "300px" }}>
                <h3>Reject Activity</h3>
                <TextField
                  label="Rejection Reason"
                  fullWidth
                  multiline
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <Button variant="contained" color="error" onClick={handleRejectConfirm} style={{ marginTop: "10px" }}>
                  Confirm Reject
                </Button>
              </div>
            </Modal>






                </TableContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
