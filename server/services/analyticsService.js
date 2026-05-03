// services/analyticsService.js
import * as adminRepo from "../repositories/adminRepository.js";

export const getCategoryDistribution = async (filters) => {
    // 1. Fetch ALL matching students (1 Query)
    const students = await adminRepo.getFilteredStudents(filters);
    if (!students.length) throw new Error("NO_STUDENTS");

    const rollNumbers = students.map(s => s.s_username);

    // 2. Fetch ALL activities for these students (1 Query)
    const activities = await adminRepo.getApprovedActivitiesForStudents(rollNumbers);

    // 3. Fetch ALL Mentors (1 Query) - FIXING THE N+1 CRASH!
    const allMentors = await adminRepo.getAllMentors();

    // Create a fast lookup map for mentors: "batch_branch_division" -> mentor name
    const mentorMap = {};
    allMentors.forEach(m => {
        const key = `${m.m_batch}_${m.m_branch}_${m.m_csec}_${m.year_of_joining}`.toLowerCase();
        mentorMap[key] = m.m_name;
    });

    const categoryMap = {
        Technical: "technical", Cultural: "cultural", Sports: "sports",
        Social: "socialservice", Internship: "academic"
    };

    // 4. Build the UI response purely in memory (Blazing Fast)
    return students.map(student => {
        const studentActivities = activities.filter(a => a.roll_number === student.s_username);

        const credits = { technical: 0, cultural: 0, sports: 0, academic: 0, socialservice: 0, other: 0 };
        studentActivities.forEach(a => {
            const key = categoryMap[a.event_type] || "other";
            credits[key] += (a.allocated_points || 0);
        });

        // Fast lookup!
        const mentorKey = `${student.batch}_${student.department}_${student.division}_${student.year}`.toLowerCase();
        const mentorName = mentorMap[mentorKey] || "N/A";

        return {
            rollNumber: student.s_username,
            name: student.name,
            department: student.department,
            batch: student.batch,
            division: student.division,
            yearOfJoining: student.year,
            mentor: mentorName,
            ...credits
        };
    });
};

export const getMetadata = async () => {
    const [depts, batches, divs, years] = await Promise.all([
        adminRepo.getDistinctValues('department'),
        adminRepo.getDistinctValues('batch'),
        adminRepo.getDistinctValues('division'),
        adminRepo.getDistinctValues('year')
    ]);

    return {
        departments: depts.map(d => d.department),
        batches: batches.map(b => b.batch),
        divisions: divs.map(d => d.division),
        years: years.map(y => y.year)
    };
};