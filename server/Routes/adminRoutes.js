import express from "express";
import { addMentor, getMentorsByBranch, deleteMentor, incrementSemester,
     getStudentsWithPoints , getRemainingPointsSummary,
    
     getStudentByRollNumber,getStudentRemainingPointsHistogram,getVisualizationMetadata,
     getStudentCategoryDistribution


} from "../controller/adminController.js";

const router = express.Router();

router.post("/add-mentor", addMentor); 
router.get("/getMentors/:branch?", getMentorsByBranch);// ✅ Updated route to use a path parameter
router.delete("/deleteMentor/:m_id", deleteMentor);
router.put("/incrementSemester/:m_id", incrementSemester);
router.get("/getStudents", getStudentsWithPoints);




router.get('/remaining-points-summary', getRemainingPointsSummary);











// Routes for student credits visualization
router.get("/visualization/student-by-roll", getStudentByRollNumber);
router.get("/visualization/remaining-points-histogram", getStudentRemainingPointsHistogram);
router.get("/visualization/metadata", getVisualizationMetadata);

router.get("/getStudentCategoryDistribution" , getStudentCategoryDistribution)






export default router;

