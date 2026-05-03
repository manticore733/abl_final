// import express from "express";
// import {
//     submitStudentEntry, getStudentInfo, getStudentActivityInfo, addStudentActivitySummary,
//     getAllStudentActivitySummaries,
//     getStudentActivityByRollNumber,
//     updateStudentActivitySummary,
//     deleteStudentActivitySummary, getStudentDetailsByRollNumber
// } from "../controller/studentController.js";

// const router = express.Router();

// router.post("/make-entry", submitStudentEntry);
// router.get("/profile", getStudentInfo);
// router.get("/student-activity", getStudentActivityInfo);







// // Define routes
// router.post("/activity-summary", addStudentActivitySummary);
// router.get("/activity-summary", getAllStudentActivitySummaries);
// router.get("/activity-summary/:roll_number", getStudentActivityByRollNumber);
// router.put("/activity-summary/:id", updateStudentActivitySummary);
// router.delete("/activity-summary/:id", deleteStudentActivitySummary);
// // Fetch student details by roll number
// router.get("/student-details/:roll_number", getStudentDetailsByRollNumber);

// export default router;


// Routes/studentRoutes.js
import express from "express";
import { validateSession, requireRole } from "../middleware/authMiddleware.js";
import {
    getStudentInfo,
    getStudentDetailsByRollNumber,
    submitStudentEntry,
    addStudentActivitySummary,
    getStudentActivityInfo,
    getStudentActivityByRollNumber,
    updateStudentActivitySummary,
    deleteStudentActivitySummary
} from "../controller/studentController.js";

const router = express.Router();

// ==========================================
// 🛡️ SECURITY BARRIER
// Apply validateSession to ALL routes below. 
// Require the user to have specific roles.
// ==========================================
router.use(validateSession);
// We allow students to hit these, but admins and mentors might need to view them too!
router.use(requireRole(["student", "admin", "mentor", "clubadmin"]));

// ==========================================
// 🧑‍🎓 PROFILE ROUTES
// ==========================================
router.get("/profile", getStudentInfo);
router.get("/student-details/:roll_number", getStudentDetailsByRollNumber);

// ==========================================
// 📋 ACTIVITY MANAGEMENT ROUTES
// ==========================================
// Submission
router.post("/make-entry", submitStudentEntry);
router.post("/activity-summary", addStudentActivitySummary); // Alias

// Fetching
router.get("/student-activity", getStudentActivityInfo);
router.get("/activity-summary", getStudentActivityInfo); // Note: Removed the "getAll" logic. This now safely fetches the logged-in student's activities!
router.get("/activity-summary/:roll_number", getStudentActivityByRollNumber);

// Editing & Deleting
router.put("/activity-summary/:id", updateStudentActivitySummary);
router.delete("/activity-summary/:id", deleteStudentActivitySummary);

export default router;