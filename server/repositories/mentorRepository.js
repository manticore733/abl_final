import MentorInfo from "../postgres/model/MentorInfo.js";
import StudentDetails from "../postgres/model/StudentDetails.js";
import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";

// Fetch mentor profile
export const getMentorProfile = async (mentorId) => {
    return await MentorInfo.findOne({ where: { m_id: mentorId } });
};

// Fetch students assigned to this mentor based on batch/branch/division
export const getStudentsByMentorCriteria = async (batch, branch, division, year) => {
    return await StudentDetails.findAll({
        where: {
            batch: batch.trim(),
            department: branch.trim(),
            division: division.trim(),
            year: year
        }
    });
};

// Find an activity by ID
export const getActivityById = async (activityId) => {
    return await StudentActivitySummary.findOne({ where: { id: activityId } });
};

// Update activity status
export const updateActivity = async (activity, updates) => {
    return await activity.update(updates);
};

// Update student's total credits
export const updateStudentCredits = async (studentId, pointsToAdd) => {
    const student = await StudentDetails.findOne({ where: { s_id: studentId } });
    if (student) {
        student.total_credits += pointsToAdd;
        await student.save();
    }
};


// Fetch a student by their roll number
export const getStudentByRollNumber = async (rollNumber) => {
    return await StudentDetails.findOne({ where: { s_username: rollNumber } });
};

// Fetch only approved activities for the report
export const getApprovedActivities = async (rollNumber) => {
    return await StudentActivitySummary.findAll({
        where: { roll_number: rollNumber, status: "Approved" },
    });
};