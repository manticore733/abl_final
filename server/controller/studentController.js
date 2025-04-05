import Student from "../postgres/model/Student.js";
import StudentRoleMap from "../postgres/model/StudentRoleMap.js";
import StudentActivityParticipation from "../postgres/model/StudentActivityParticipation.js";
import Session from "../postgres/model/Session.js";
import StudentInfo from "../postgres/model/StudentInfo.js";
import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";
import StudentDetails from "../postgres/model/StudentDetails.js"



// Fetch student credentials by username
export const getStudentCredentials = async (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
  try {
    const student = await Student.findOne({
      where: { s_username: username }, // Search by username
      attributes: ["s_id", "s_username", "s_password"], // Only retrieve specific fields
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student credentials:", error);
    res.status(500).json({ error: "Failed to fetch student credentials" });
  }

};

// See if the role_id has value '2'.
export const verifyStudentRole = async (req, res) => {
  const { s_id } = req.params;
  try {
    const studentId = parseInt(s_id, 10); // Convert to integer
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const role = await StudentRoleMap.findOne({
      where: {
        student_id: studentId,
        role_id: 2, 
      },
      attributes: ["student_id", "role_id"], 
    });

    if (role) {
      return res
        .status(200)
        .json({ message: `Student ID: ${studentId} has role_id = 2.` });
    } else {
      return res
        .status(404)
        .json({ message: `Student ID: ${studentId} does NOT have role_id = 2.` });
    }
  } catch (error) {
    console.error("Error checking student role:", error);
    return res.status(500).json({ error: "Failed to verify student role" });
  }
};

/**
 * Handles student activity entry submission.
 * Extracts session token, retrieves s_id, and inserts activity data.
 */
export const submitStudentEntry = async (req, res) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({ where: { session_token: sessionToken } });
    if (!session) {
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session, which should match `s_id` in students table
    const sessionUserId = session.user_id;
    const studentIdConv = parseInt(sessionUserId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    // Find the corresponding student in the `students` table
    const student = await Student.findOne({ where: { s_id: studentIdConv } });

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    const s_id = student.s_id; // Extract correct student ID

    // Extract activity details from request body
    const { a_name, a_type, a_sub_type, a_start_date, a_end_date, a_venue, a_level } = req.body;

    // Insert new activity entry into `student_activity_participation`
    const newEntry = await StudentActivityParticipation.create({
      s_id,
      a_name,
      a_status: "Not Approved", // Default status
      a_type,
      a_sub_type: a_sub_type || null,
      a_start_date,
      a_end_date,
      a_venue,
      a_level,
      a_points_scored: null, // Initially NULL
    });

    return res.status(201).json({ message: "Entry submitted successfully!", newEntry });
  } catch (error) {
    console.error("Error submitting student activity entry:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export const getStudentInfo = async (req, res) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({ where: { session_token: sessionToken } });
    if (!session) {
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session (which is the student ID)
    const studentId = session.user_id;
    const studentIdConv = parseInt(studentId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    // Fetch student details from `student_info`
    const student = await StudentInfo.findOne({ where: { s_id: studentIdConv } });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStudentActivityInfo = async (req, res) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({ where: { session_token: sessionToken } });
    if (!session) {
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session (which is the student ID)
    const studentId = session.user_id;
    const studentIdConv = parseInt(studentId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    // Fetch student activities from `student_activity_participation`
    const activities = await StudentActivityParticipation.findAll({
      where: { s_id: studentIdConv },
      attributes: [
        "a_id", "a_name", "a_status", "a_type", "a_sub_type", 
        "a_start_date", "a_end_date", "a_venue", "a_level", "a_points_scored"
      ],
    });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities found for this student." });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching student activity info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


























// 📌 1. Add a new student activity summary
export const addStudentActivitySummary = async (req, res) => {
  try {
    const {
      s_id,
      roll_number,
      department,
      division,
      semester,
      event_name,
      event_type,
      subcategory,
      sub_activity_type,
      organised_by,
      participation_date,
      venue,
      status,
      allocated_points,
      remarks,
    } = req.body;

    const newActivity = await StudentActivitySummary.create({
      s_id,
      roll_number,
      department,
      division,
      semester,
      event_name,
      event_type,
      subcategory,
      sub_activity_type,
      organised_by,
      participation_date,
      venue,
      status,
      allocated_points,
      remarks,
    });

    res.status(201).json({ message: "Activity added successfully", data: newActivity });
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error: error.message });
  }
};

// 📌 2. Fetch all student activity summaries
export const getAllStudentActivitySummaries = async (req, res) => {
  try {
    const summaries = await StudentActivitySummary.findAll();
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

// 📌 3. Fetch student activity summary by roll number
export const getStudentActivityByRollNumber = async (req, res) => {
  try {
    const { roll_number } = req.params;
    const summaries = await StudentActivitySummary.findAll({ where: { roll_number } });

    if (summaries.length === 0) {
      return res.status(404).json({ message: "No records found for this roll number" });
    }

    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

// 📌 4. Update a student activity summary
export const updateStudentActivitySummary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const activity = await StudentActivitySummary.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.update(updatedData);
    res.status(200).json({ message: "Activity updated successfully", data: activity });
  } catch (error) {
    res.status(500).json({ message: "Error updating activity", error: error.message });
  }
};

// 📌 5. Delete a student activity summary
export const deleteStudentActivitySummary = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StudentActivitySummary.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity", error: error.message });
  }
};








// 📌 Fetch student details by roll number
export const getStudentDetailsByRollNumber = async (req, res) => {
  try {
    const { roll_number } = req.params;
    console.log("Fetching details for roll number:", roll_number); // Debug log

    const student = await StudentDetails.findOne({ where: { s_username: roll_number } });

    if (!student) {
      console.log("Student not found in DB for s_username:", roll_number);
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Student found:", student);
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

