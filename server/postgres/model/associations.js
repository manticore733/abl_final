// postgres/model/associations.js
import Student from "./Student.js";
import StudentDetails from "./StudentDetails.js";
import StudentActivitySummary from "./StudentActivitySummary.js";
import Mentor from "./Mentor.js";
import MentorInfo from "./MentorInfo.js";
import ClubAdmin from "./ClubAdmin.js";
import ClubEvent from "./ClubEvent.js";

export const setupAssociations = () => {
    // --- 1. STUDENT ASSOCIATIONS ---
    // A Student has exactly ONE profile (StudentDetails)
    Student.hasOne(StudentDetails, { foreignKey: 's_id', as: 'details' });
    StudentDetails.belongsTo(Student, { foreignKey: 's_id' });

    // A Student has MANY activity summaries
    Student.hasMany(StudentActivitySummary, { foreignKey: 's_id', as: 'activity_summaries' });
    StudentActivitySummary.belongsTo(Student, { foreignKey: 's_id' });

    // --- 2. MENTOR ASSOCIATIONS ---
    // A Mentor has exactly ONE profile (MentorInfo)
    Mentor.hasOne(MentorInfo, { foreignKey: 'm_id', as: 'profile' });
    MentorInfo.belongsTo(Mentor, { foreignKey: 'm_id' });

    // --- 3. CLUB ADMIN ASSOCIATIONS ---
    ClubAdmin.hasMany(ClubEvent, { foreignKey: 'roll_number', sourceKey: 'roll_number', as: 'events' });
    ClubEvent.belongsTo(ClubAdmin, { foreignKey: 'roll_number', targetKey: 'roll_number' });

    console.log("✅ Database Associations Setup Successfully!");
};