// import Mentor from "../postgres/model/Mentor.js";
// import MentorInfo from "../postgres/model/MentorInfo.js";
// import StudentDetails from "../postgres/model/StudentDetails.js";
// import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";

// // --- Dashboard Metrics ---
// export const countMentors = async () => await Mentor.count();
// export const countStudents = async () => await StudentDetails.count();
// export const countEngagedStudents = async () => {
//     return await StudentActivitySummary.count({
//         distinct: true,
//         col: 's_id',
//         where: { status: "Approved" }
//     });
// };

// // --- Mentor Management ---
// // Keep your existing createMentor and deleteMentor DB queries here!

// export const getMentorsWithProfile = async (whereCondition) => {
//     return await Mentor.findAll({
//         include: [{ model: MentorInfo, as: 'profile', where: whereCondition }],
//         attributes: ['m_id', 'm_username', 'm_name']
//     });
// };

// export const getMentorProfileById = async (m_id) => {
//     return await MentorInfo.findOne({ where: { m_id } });
// };

// export const updateMentorProfile = async (profile, data) => {
//     return await profile.update(data);
// };

// // --- Student Management ---
// export const getStudentsByFilter = async (filter) => {
//     return await StudentDetails.findAll({ where: filter, raw: true });
// };

// export const getApprovedPointsForStudent = async (s_id) => {
//     return await StudentActivitySummary.sum("allocated_points", {
//         where: { s_id, status: "Approved" }
//     });
// };

// export const getStudentByRoll = async (rollNumber) => {
//     return await StudentDetails.findOne({ where: { s_username: rollNumber } });
// };

import Mentor from "../postgres/model/Mentor.js";
import MentorInfo from "../postgres/model/MentorInfo.js";
import StudentDetails from "../postgres/model/StudentDetails.js";
import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";

// ==========================================
// 📊 A. DASHBOARD & METRICS
// ==========================================

export const countTotalMentors = async () => {
    return await Mentor.count();
};

export const countTotalStudents = async () => {
    return await StudentDetails.count();
};

export const countEngagedStudents = async () => {
    return await StudentActivitySummary.count({
        distinct: true,
        col: 's_id',
        where: { status: "Approved" }
    });
};

// ==========================================
// 🧑‍🏫 B. MENTOR MANAGEMENT
// ==========================================

export const checkUsernameExists = async (username) => {
    return await Mentor.findOne({ where: { m_username: username } });
};

// We use a "Transaction" here to ensure that if the Mentor record saves, 
// but the MentorInfo fails, it rolls BOTH back. No half-created mentors!
export const createMentorRecord = async (mentorData, profileData) => {
    const newMentor = await Mentor.create(mentorData);

    // Link the profile to the newly created mentor's ID
    profileData.m_id = newMentor.m_id;
    await MentorInfo.create(profileData);

    return newMentor;
};

export const getAllMentors = async (filters = {}) => {
    return await Mentor.findAll({
        include: [{
            model: MentorInfo,
            as: 'profile',
            where: filters
        }],
        attributes: ['m_id', 'm_username', 'm_name']
    });
};

export const getMentorById = async (m_id) => {
    return await MentorInfo.findOne({ where: { m_id } });
};

export const updateMentorProfile = async (m_id, updatedData) => {
    // 1. Find the mentor profile
    const profile = await MentorInfo.findOne({ where: { m_id } });
    // 2. Update it
    if (profile) {
        return await profile.update(updatedData);
    }
    return null;
};

export const deleteMentorRecord = async (m_id) => {
    // Because you set up associations in Phase 1, destroying the Mentor 
    // will usually cascade and delete the MentorInfo too!
    return await Mentor.destroy({ where: { m_id } });
};

// ==========================================
// 🎓 C. STUDENT OVERSIGHT
// ==========================================

export const getStudentsByFilter = async (filters) => {
    return await StudentDetails.findAll({
        where: filters,
        raw: true
    });
};

export const getStudentByRollNumber = async (rollNumber) => {
    return await StudentDetails.findOne({
        where: { s_username: rollNumber }
    });
};

export const getStudentApprovedPoints = async (s_id) => {
    return await StudentActivitySummary.sum("allocated_points", {
        where: { s_id, status: "Approved" }
    });
};
