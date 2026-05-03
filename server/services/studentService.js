// services/studentService.js
import * as studentRepo from "../repositories/studentRepository.js";

export const getProfile = async (studentId) => {
    const student = await studentRepo.getStudentById(studentId);
    if (!student) throw new Error("STUDENT_NOT_FOUND");
    return student;
};

// Merged the old entry submission with the new summary logic!
export const submitActivity = async (studentId, activityData) => {
    // 1. Verify student exists and get their roll number
    const student = await studentRepo.getStudentById(studentId);
    if (!student) throw new Error("STUDENT_NOT_FOUND");

    // 2. Format the data to match our Phase 1 Clean Database Schema
    const newActivityData = {
        s_id: studentId,
        roll_number: student.s_username, // Automatically mapped!
        event_name: activityData.event_name || activityData.a_name,
        event_type: activityData.event_type || activityData.a_type,
        subcategory: activityData.subcategory || activityData.a_sub_type || "General",
        sub_activity_type: activityData.sub_activity_type || null,
        organised_by: activityData.organised_by || null,
        participation_date: activityData.participation_date || activityData.a_start_date,
        venue: activityData.venue || activityData.a_venue || null,
        status: "Pending", // Always defaults to Pending for mentors to review
        allocated_points: 0
    };

    return await studentRepo.createActivity(newActivityData);
};

export const getActivities = async (studentId) => {
    const activities = await studentRepo.getActivitiesByStudentId(studentId);
    return activities; // Will just return [] if empty, which React loves!
};

export const editActivity = async (studentId, activityId, updatedData) => {
    const activity = await studentRepo.getActivityById(activityId);

    if (!activity) throw new Error("ACTIVITY_NOT_FOUND");

    // Security Check: Make sure the student owns this activity!
    if (activity.s_id !== studentId) throw new Error("UNAUTHORIZED_ACTION");

    // Cannot edit approved/rejected activities
    if (activity.status !== "Pending") throw new Error("CANNOT_EDIT_PROCESSED");

    return await studentRepo.updateActivity(activity, updatedData);
};

export const removeActivity = async (studentId, activityId) => {
    const activity = await studentRepo.getActivityById(activityId);

    if (!activity) throw new Error("ACTIVITY_NOT_FOUND");
    if (activity.s_id !== studentId) throw new Error("UNAUTHORIZED_ACTION");
    if (activity.status !== "Pending") throw new Error("CANNOT_DELETE_PROCESSED");

    await studentRepo.deleteActivity(activity);
};