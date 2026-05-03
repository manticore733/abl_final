// import express from "express";
// import { addMentor, getMentorsByBranch, deleteMentor, incrementSemester,
//      getStudentsWithPoints , getRemainingPointsSummary,

//      getStudentByRollNumber,getStudentRemainingPointsHistogram,getVisualizationMetadata,
//      getStudentCategoryDistribution


// } from "../controller/adminController.js";

// const router = express.Router();

// router.post("/add-mentor", addMentor); 
// router.get("/getMentors/:branch?", getMentorsByBranch);// ✅ Updated route to use a path parameter
// router.delete("/deleteMentor/:m_id", deleteMentor);
// router.put("/incrementSemester/:m_id", incrementSemester);
// router.get("/getStudents", getStudentsWithPoints);




// router.get('/remaining-points-summary', getRemainingPointsSummary);











// // Routes for student credits visualization
// router.get("/visualization/student-by-roll", getStudentByRollNumber);
// router.get("/visualization/remaining-points-histogram", getStudentRemainingPointsHistogram);
// router.get("/visualization/metadata", getVisualizationMetadata);

// router.get("/getStudentCategoryDistribution" , getStudentCategoryDistribution)






// export default router;




import express from "express";
import { validateSession, requireRole } from "../middleware/authMiddleware.js";
import { uploadProfile } from "../middleware/uploadMiddleware.js"; // ✅ IMPORT YOUR MIDDLEWARE
import {
     addMentor, getMentorsByBranch, deleteMentor, incrementSemester,
     getStudentsWithPoints, getRemainingPointsSummary,
     getStudentByRollNumber, getStudentRemainingPointsHistogram,
     getVisualizationMetadata, getStudentCategoryDistribution,
     getDashboardStats
} from "../controller/adminController.js";

const router = express.Router();

// ==========================================
// 🛡️ SECURITY BARRIER
// Apply validateSession to ALL routes below. 
// Require the user to specifically have the 'admin' role!
// ==========================================
router.use(validateSession);
router.use(requireRole(["admin"]));

// ==========================================
// 🏠 DASHBOARD
// ==========================================
router.get("/dashboard-stats", getDashboardStats);
router.get("/mentors", getMentorsByBranch);

// ==========================================
// 🧑‍🏫 MENTOR MANAGEMENT
// ==========================================
// ✅ PLUGGED IN YOUR MIDDLEWARE: uploadProfile.single('profile_pic')
router.post("/mentors", uploadProfile.single('profile_pic'), addMentor);

router.get("/mentors/branch/:branch?", getMentorsByBranch);
router.delete("/mentors/:m_id", deleteMentor);

// ==========================================
// 🎓 STUDENT MANAGEMENT
// ==========================================
router.get("/students", getStudentsWithPoints);
router.put("/students/increment-semester/:m_id", incrementSemester);
router.get("/students/points-summary", getRemainingPointsSummary);
router.get("/students/category-distribution", getStudentCategoryDistribution);

// ==========================================
// 📊 ANALYTICS & VISUALIZATION
// ==========================================
router.get("/visualization/metadata", getVisualizationMetadata);
router.get("/visualization/students/:rollNumber", getStudentByRollNumber);
router.get("/visualization/histogram", getStudentRemainingPointsHistogram);

export default router;