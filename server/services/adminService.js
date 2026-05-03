// services/adminService.js
import * as adminRepo from "../repositories/adminRepository.js";
import Mentor from "../postgres/model/Mentor.js";

export const createMentor = async (mentorData, filename) => {
    const existing = await adminRepo.getMentorByUsername(mentorData.m_username);
    if (existing) throw new Error("USERNAME_EXISTS");

    // Transaction ensures both Auth and Profile are created safely
    return await Mentor.sequelize.transaction(async (t) => {
        const auth = await adminRepo.createMentorAuth({
            m_username: mentorData.m_username,
            m_password: mentorData.m_password,
            m_name: mentorData.m_name
        }, t);

        await adminRepo.createMentorProfile({
            m_id: auth.m_id,
            m_email: mentorData.m_email,
            m_phone: mentorData.m_phone,
            m_designation: mentorData.m_designation,
            year_of_joining: mentorData.year_of_joining,
            m_batch: mentorData.m_batch,
            m_sem: 1, // Default to 1
            m_csec: mentorData.m_csec,
            m_branch: mentorData.m_branch,
            profile_pic: filename ? `uploads/mentorpfp/${filename}` : null
        }, t);

        return auth;
    });
};

export const deleteMentor = async (mentorId) => {
    const mentor = await adminRepo.getMentorById(mentorId);
    if (!mentor) throw new Error("NOT_FOUND");
    await adminRepo.deleteMentorById(mentorId);
};

export const getDashboardMetrics = async () => {
    const totalMentors = await adminRepo.countMentors();
    const totalStudents = await adminRepo.countStudents();
    const engagedStudents = await adminRepo.countEngagedStudents();

    const engagementRate = totalStudents > 0
        ? Math.round((engagedStudents / totalStudents) * 100)
        : 0;

    return { totalMentors, totalStudents, engagementRate };
};

export const getMentorsList = async (branch) => {
    const whereCondition = (branch && branch !== "all") ? { m_branch: branch } : {};
    const mentors = await adminRepo.getMentorsWithProfile(whereCondition);

    if (!mentors || mentors.length === 0) return [];

    // Formatting moved out of controller!
    return mentors.map(m => ({
        m_id: m.m_id,
        m_username: m.m_username,
        name: m.m_name || m.m_username,
        department: m?.profile?.m_branch || "N/A",
        designation: m?.profile?.m_designation || "Faculty",
        efficiency: 85,
        studentCount: 0
    }));
};

export const incrementMentorSemester = async (m_id) => {
    const profile = await adminRepo.getMentorProfileById(m_id);
    if (!profile) throw new Error("NOT_FOUND");
    if (profile.m_sem >= 8) throw new Error("MAX_SEMESTER");

    return await adminRepo.updateMentorProfile(profile, { m_sem: profile.m_sem + 1 });
};

export const getStudentsWithPointsList = async (section, branch, semester) => {
    const students = await adminRepo.getStudentsByFilter({ division: section, department: branch, semester: semester });
    if (!students.length) throw new Error("NO_STUDENTS");

    for (let student of students) {
        const points = await adminRepo.getApprovedPointsForStudent(student.s_id);
        student.total_points = points || 0;
    }
    return students;
};

export const getStudentStatsByRoll = async (rollNumber) => {
    const student = await adminRepo.getStudentByRoll(rollNumber);
    if (!student) throw new Error("NOT_FOUND");

    const earnedCredits = await adminRepo.getApprovedPointsForStudent(student.s_id) || 0;
    const studentData = student.toJSON();

    return {
        ...studentData,
        earnedCredits,
        remainingCredits: Math.max(0, studentData.total_credits - earnedCredits)
    };
};