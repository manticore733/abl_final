// repositories/studentRepository.js
import StudentDetails from "../postgres/model/StudentDetails.js";
import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";

// 1. Fetch Student Profile
export const getStudentById = async (studentId) => {
    return await StudentDetails.findOne({ where: { s_id: studentId } });
};

export const getStudentByRollNumber = async (rollNumber) => {
    return await StudentDetails.findOne({ where: { s_username: rollNumber } });
};

// 2. Activity Management
export const createActivity = async (activityData) => {
    return await StudentActivitySummary.create(activityData);
};

export const getActivitiesByStudentId = async (studentId) => {
    return await StudentActivitySummary.findAll({ where: { s_id: studentId } });
};

export const getActivityById = async (activityId) => {
    return await StudentActivitySummary.findByPk(activityId);
};

export const updateActivity = async (activity, updatedData) => {
    return await activity.update(updatedData);
};

export const deleteActivity = async (activity) => {
    return await activity.destroy();
};