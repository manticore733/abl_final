import * as mentorRepo from "../repositories/mentorRepository.js";

// Business Logic: Get all students for a specific mentor
export const getAssignedStudents = async (mentorId) => {
    const mentor = await mentorRepo.getMentorProfile(mentorId);
    if (!mentor) throw new Error("MENTOR_NOT_FOUND");

    const students = await mentorRepo.getStudentsByMentorCriteria(
        mentor.m_batch,
        mentor.m_branch,
        mentor.m_csec,
        mentor.year_of_joining
    );

    return students;
};

// Business Logic: Approve an activity
export const approveStudentActivity = async (activityId) => {
    const activity = await mentorRepo.getActivityById(activityId);

    if (!activity || activity.status !== "Pending") {
        throw new Error("INVALID_ACTIVITY");
    }

    // 1. Mark as approved
    await mentorRepo.updateActivity(activity, { status: "Approved" });

    // 2. Add points to the student's total
    await mentorRepo.updateStudentCredits(activity.s_id, activity.allocated_points);

    return activity;
};

// Business Logic: Reject an activity
export const rejectStudentActivity = async (activityId, reason) => {
    const activity = await mentorRepo.getActivityById(activityId);

    if (!activity || activity.status !== "Pending") {
        throw new Error("INVALID_ACTIVITY");
    }

    await mentorRepo.updateActivity(activity, {
        status: "Rejected",
        remarks: reason
    });

    return activity;
};

export const calculateAndAssignPoints = async (activityId, type, subType, level) => {
    const activity = await mentorRepo.getActivityById(activityId);

    if (!activity) {
        throw new Error("ACTIVITY_NOT_FOUND");
    }

    // 🧠 The Business Rules (University Point Policy)
    const pointsMapping = {
        Technical: {
            "Attended/Organised Seminar": 1,
            "Delivering Seminar": 2,
            "Attended Workshop": 2,
            "Organized Workshop": 1,
            "Delivered Workshop": 3,
            "Attended/Organized Competition": 1,
            "Won Competition": null,
        },
        Social: {
            "Donated Blood": 2,
            "Other Social Work": 1,
        },
        Sports: {
            "Participated": 1,
            "Won Competition": null,
        },
        Cultural: {
            "Participated": 1,
            "Won Competition": null,
        },
        Internship: {
            "Technical Internship": 3,
            "Managerial Internship": 2,
            "Field Trip": 1,
        },
    };

    const levelMapping = {
        "Intra-Collegiate": 2,
        "Inter-Collegiate(University-Level)": 2,
        "State Level": 3,
        "National Level": 4,
        "International Level": 5,
    };

    // Calculate the actual points
    let points = pointsMapping[type]?.[subType] || 0;
    if (subType === "Won Competition" && level) {
        points = levelMapping[level] || 0;
    }

    // Update the database (Using the Phase 1 schema columns!)
    await mentorRepo.updateActivity(activity, {
        allocated_points: points,
        status: "Approved"
    });

    // Update the student's total credits
    await mentorRepo.updateStudentCredits(activity.s_id, points);

    return points;
};