// import express from "express";
// import { submitStudentEntry, getStudentInfo, getStudentActivityInfo } from "../controller/studentController.js";

// const router = express.Router();

// router.post("/make-entry", submitStudentEntry);
// router.get("/profile", getStudentInfo);
// router.get("/student-activity", getStudentActivityInfo);

// export default router;

















import express from "express";
import { submitStudentEntry, getStudentInfo, getStudentActivityInfo,  addStudentActivitySummary,
    getAllStudentActivitySummaries,
    getStudentActivityByRollNumber,
    updateStudentActivitySummary,
    deleteStudentActivitySummary,getStudentDetailsByRollNumber } from "../controller/studentController.js";

const router = express.Router();

router.post("/make-entry", submitStudentEntry);
router.get("/profile", getStudentInfo);
router.get("/student-activity", getStudentActivityInfo);







// Define routes
router.post("/activity-summary", addStudentActivitySummary);
router.get("/activity-summary", getAllStudentActivitySummaries);
router.get("/activity-summary/:roll_number", getStudentActivityByRollNumber);
router.put("/activity-summary/:id", updateStudentActivitySummary);
router.delete("/activity-summary/:id", deleteStudentActivitySummary);
// Fetch student details by roll number
router.get("/student-details/:roll_number", getStudentDetailsByRollNumber);

export default router;
