import * as adminService from "../services/adminService.js";
import * as analyticsService from "../services/analyticsService.js";

const sendResponse = (res, statusCode, success, data, message = null) => {
  return res.status(statusCode).json({ success, data, message });
};

// ==========================================
// 🏠 DASHBOARD
// ==========================================
export const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardMetrics();
    return sendResponse(res, 200, true, stats);
  } catch (error) {
    return sendResponse(res, 500, false, null, "Failed to load dashboard statistics.");
  }
};

// ==========================================
// 🧑‍🏫 MENTOR MANAGEMENT
// ==========================================
export const addMentor = async (req, res) => {
  try {
    const required = ['m_username', 'm_password', 'm_name', 'm_batch', 'm_csec', 'm_branch', 'year_of_joining'];
    const missing = required.filter(field => !req.body[field]);

    if (missing.length) return sendResponse(res, 400, false, null, `Missing fields: ${missing.join(', ')}`);

    await adminService.createMentor(req.body, req.file?.filename);
    return sendResponse(res, 201, true, null, "Mentor added successfully!");
  } catch (error) {
    if (error.message === "USERNAME_EXISTS") return sendResponse(res, 400, false, null, "Username already exists.");
    return sendResponse(res, 500, false, null, "Internal server error.");
  }
};

export const getMentorsByBranch = async (req, res) => {
  try {
    const mentors = await adminService.getMentorsList(req.params.branch);
    return sendResponse(res, 200, true, mentors);
  } catch (error) {
    return sendResponse(res, 500, false, null, "Internal server error");
  }
};

export const deleteMentor = async (req, res) => {
  try {
    await adminService.deleteMentor(req.params.m_id);
    return sendResponse(res, 200, true, null, "Mentor deleted successfully");
  } catch (error) {
    if (error.message === "NOT_FOUND") return sendResponse(res, 404, false, null, "Mentor not found");
    return sendResponse(res, 500, false, null, "Failed to delete mentor");
  }
};

export const incrementSemester = async (req, res) => {
  try {
    const updatedMentor = await adminService.incrementMentorSemester(req.params.m_id);
    return res.status(200).json(updatedMentor);
  } catch (error) {
    if (error.message === "NOT_FOUND") return sendResponse(res, 404, false, null, "Mentor not found");
    if (error.message === "MAX_SEMESTER") return sendResponse(res, 400, false, null, "Cannot increment beyond semester 8");
    return sendResponse(res, 500, false, null, "Failed to increment semester");
  }
};

// ==========================================
// 🎓 STUDENT MANAGEMENT & POINTS
// ==========================================
export const getStudentsWithPoints = async (req, res) => {
  try {
    const { section, branch, semester } = req.query;
    if (!section || !branch || !semester) return sendResponse(res, 400, false, null, "Missing parameters");

    const students = await adminService.getStudentsWithPointsList(section, branch, semester);
    return res.status(200).json(students);
  } catch (error) {
    if (error.message === "NO_STUDENTS") return res.status(404).json({ message: "No students found." });
    return sendResponse(res, 500, false, null, "Internal server error");
  }
};

export const getStudentByRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.query;
    if (!rollNumber) return res.status(400).json({ success: false, message: "Roll number is required" });

    const studentStats = await adminService.getStudentStatsByRoll(rollNumber);
    return res.status(200).json({ success: true, data: studentStats });
  } catch (error) {
    if (error.message === "NOT_FOUND") return res.status(404).json({ success: false, message: "Student not found" });
    return res.status(500).json({ success: false, message: "Error fetching student data" });
  }
};

// ==========================================
// 📊 ANALYTICS (Leave as is, handled by analyticsService)
// ==========================================
export const getVisualizationMetadata = async (req, res) => {
  try {
    const metadata = await analyticsService.getMetadata();
    return res.status(200).json({ success: true, data: metadata });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching metadata" });
  }
};

export const getStudentCategoryDistribution = async (req, res) => {
  try {
    const { rollNumber, department, batch, division, yearOfJoining } = req.query;
    const filters = {};
    if (department && department !== "All") filters.department = department;
    if (batch && batch !== "All") filters.batch = batch;
    if (division && division !== "All") filters.division = division;
    if (yearOfJoining && yearOfJoining !== "All") filters.year = yearOfJoining;

    const data = await analyticsService.getCategoryDistribution(filters);
    return res.status(200).json(data);
  } catch (error) {
    if (error.message === "NO_STUDENTS") return res.status(404).json({ message: "No students found." });
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getRemainingPointsSummary = async (req, res) => {
  return res.status(200).json({ message: "Endpoint active, mapping to service in progress." });
};

export const getStudentRemainingPointsHistogram = async (req, res) => {
  return res.status(200).json({ success: true, data: { histogramData: [], summaryStats: {} } });
};