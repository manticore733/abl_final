import express from "express";
import { assignPoints, fetchStudentDetails } from "../controller/mentorController.js";
import { getStudent,fetchStudentsUnderMentor,fetchPendingActivities,approveActivity,
    rejectActivity,undoActivityAction,
    fetchProcessedActivities,getStudentDetails,
    fetchMentorProfile,fetchAllStudentsForMentor,fetchStudentStatistics} from "../controller/mentorController.js"; // Import controller function

const router = express.Router();

// Route to fetch students assigned to a mentor
router.get("/students", fetchStudentDetails);
router.get("/student_details/:student_id", getStudent);
router.put("/assign_points/:a_id", assignPoints);





router.get("/studentsundermentor", fetchStudentsUnderMentor);








router.get("/student-pending-activities/:studentId", fetchPendingActivities);


router.put("/approve-activity/:activityId", approveActivity);
router.put("/reject-activity/:activityId", rejectActivity);


router.put("/undo-activity/:activityId", undoActivityAction);


router.get("/student-processed-activities/:studentId", fetchProcessedActivities);


router.get("/getstudentdetails/:studentId", getStudentDetails);


router.get("/mentor/profile/:mentorId", (req, res) => {
    console.log("✅ API Hit - Mentor Profile");
    fetchMentorProfile(req, res);
  });






  router.get("/allstudentsformentor/:mentorId", fetchAllStudentsForMentor);

  



  // Route to fetch statistics for a specific student under a mentor
router.get("/student-statistics/:studentId", fetchStudentStatistics);












export default router;