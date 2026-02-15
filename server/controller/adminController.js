import Admin from "../postgres/model/Admin.js";
import Mentor from "../postgres/model/Mentor.js";
import MentorInfo from "../postgres/model/MentorInfo.js";
import multer from "multer"; // For file uploads
import StudentInfo from "../postgres/model/StudentInfo.js";
import StudentActivityParticipation from "../postgres/model/StudentActivityParticipation.js";
import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";
import StudentDetails from "../postgres/model/StudentDetails.js";
import { Op, fn, col } from "sequelize";
import { Sequelize } from 'sequelize'; // If you're using ES Modules (with "type": "module" in package.json)


import path from "path";
import fs from "fs";

export const getAdminCredentials = async (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
  try {
    const ad = await Admin.findOne({
      where: { a_username: username }, // Search by username
      attributes: ["a_id", "a_username", "a_password"], // Only retrieve specific fields
    });
    if (!ad) {
      return res.status(404).json({ error: "admin not found" });
    }
    res.status(200).json(ad);
  } catch (error) {
    console.error("Error fetching admin credentials:", error);
    res.status(500).json({ error: "Failed to fetch admin credentials" });
  }
};





///og code


// export const addMentor = async (req, res) => {
//   try {
//     const { m_username, m_password, m_name, m_batch, m_sem, m_csec, m_branch } = req.body;

//     if (!m_username || !m_password || !m_name || !m_batch || !m_sem || !m_csec || !m_branch) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // ✅ Insert into `mentors` table without manually setting `m_id`
//     const newMentor = await Mentor.create({
//       m_username,
//       m_password,
//       m_name,
//     });

//     // ✅ Insert into `mentor_info` using the auto-generated `m_id`
//     await MentorInfo.create({
//       m_id: newMentor.m_id, // ✅ Correctly referencing auto-generated ID
//       m_batch,
//       m_sem,
//       m_csec,
//       m_branch,
//     });

//     res.status(201).json({ message: "Mentor added successfully!" });
//   } catch (error) {
//     console.error("Error adding mentor:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };






const uploadDir = "uploads/mentorpfp";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

export const addMentor = async (req, res) => {
  try {
    upload.single("profile_pic")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "File upload failed." });
      }

      const {
        m_username,
        m_password,
        m_name,
        m_email,
        m_phone,
        m_designation,
        year_of_joining,
        m_batch,
        m_sem, // Ignored for uniqueness check
        m_csec,
        m_branch,
      } = req.body;

      if (!m_username || !m_password || !m_name || !m_batch || !m_csec || !m_branch || !year_of_joining) {
        return res.status(400).json({ error: "Mandatory fields are missing." });
      }

      // ✅ Check if a mentor is already assigned
      const existingMentor = await MentorInfo.findOne({
        where: { m_batch, m_csec, m_branch, year_of_joining },
        attributes: ["m_name", "m_email", "m_phone"], // Fetch details of assigned mentor
      });

      if (existingMentor) {
        return res.status(400).json({
          error: `Mentor already assigned: ${existingMentor.m_name} (Email: ${existingMentor.m_email}, Phone: ${existingMentor.m_phone})`,
        });
      }

      // ✅ Store the file path (if uploaded)
      const profilePicPath = req.file ? `uploads/mentorpfp/${req.file.filename}` : null;

      // ✅ Insert mentor details
      await MentorInfo.create({
        m_username,
        m_password,
        m_name,
        m_email,
        m_phone,
        m_designation,
        year_of_joining,
        m_batch,
        m_sem,
        m_csec,
        m_branch,
        profile_pic: profilePicPath,
      });

      res.status(201).json({ message: "Mentor added successfully!" });
    });
  } catch (error) {
    console.error("🔥 Error adding mentor:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};























































export const getMentorsByBranch = async (req, res) => {
  try {
    const { branch } = req.params;

    let mentors;
    if (!branch || branch === "all") {
      // ✅ Fetch all mentors if branch is not provided or is "all"
      mentors = await MentorInfo.findAll();
    } else {
      // ✅ Fetch mentors for the specific branch
      mentors = await MentorInfo.findAll({
        where: { m_branch: branch },
      });
    }

    if (!mentors.length) {
      return res.status(404).json({ error: "No mentors found" });
    }

    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};









// ✅ Delete Mentor
export const deleteMentor = async (req, res) => {
  try {
    const { m_id } = req.params;

    // Delete mentor from both tables
    await Mentor.destroy({ where: { m_id } });
    await MentorInfo.destroy({ where: { m_id } });

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ error: "Failed to delete mentor" });
  }
};

// ✅ Increment Semester
export const incrementSemester = async (req, res) => {
  try {
    const { m_id } = req.params;

    // Find mentor and increment semester
    const mentor = await MentorInfo.findOne({ where: { m_id } });
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    if (mentor.m_sem >= 8) {
      return res.status(400).json({ error: "Cannot increment beyond semester 8" });
    }

    mentor.m_sem += 1;
    await mentor.save();

    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error incrementing semester:", error);
    res.status(500).json({ error: "Failed to increment semester" });
  }
};



export const getStudentsWithPoints = async (req, res) => {
  try {
    const { section, branch, semester } = req.query;

    if (!section || !branch || !semester) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // ✅ Fetch Students Matching Criteria
    const students = await StudentInfo.findAll({
      where: {
        s_csec: section,
        s_branch: branch,
        s_sem: semester,
      },
      attributes: ["s_id", "s_name", "s_batch", "s_sem", "s_csec", "s_branch"],
      raw: true, // ✅ Flatten results
    });

    if (!students.length) {
      return res.status(404).json({ message: "No students found." });
    }

    // ✅ Fetch & Calculate Total Activity Points Per Student
    for (let student of students) {
      const totalPoints = await StudentActivityParticipation.sum("a_points_scored", {
        where: {
          s_id: student.s_id,
          a_status: "Approved", // ✅ Only count approved activities
        },
      });

      student.total_points = totalPoints || 0; // Default to 0 if no activities found
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

















export const getRemainingPointsSummary = async (req, res) => {
  try {
    const { department, batch, division, year, mentorId, studentRollNumber } = req.query;

    console.log("Received filter params:", { department, batch, division, year, mentorId, studentRollNumber });

    // Step 1: Get students (apply filters if present)
    const whereStudent = {};
    if (department) whereStudent.department = department;
    if (batch) whereStudent.batch = batch;
    if (division) whereStudent.division = division;
    if (studentRollNumber) whereStudent.s_username = studentRollNumber;

    const students = await StudentDetails.findAll({
      where: whereStudent,
      attributes: ['s_id', 's_username', 'name', 'department', 'division', 'batch', 'total_credits']
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // If year filter is applied, filter students based on roll number pattern
    let filteredStudents = students;
    if (year) {
      const yearSuffix = year.slice(-2); // Get last two digits (e.g., '21' from '2021')
      filteredStudents = students.filter(student => {
        const rollNum = student.s_username.toString();
        // Check if the roll number contains the year pattern in the correct position
        return rollNum.length >= 4 && rollNum.substring(2, 4) === yearSuffix;
      });
    }

    // Initialize data structures for response
    const groupedData = {}; // For remaining points
    const progressData = {}; // For completed points
    const targetPoints = 100; // Total points goal
    let totalStudents = filteredStudents.length;
    let totalEarnedPointsAll = 0;
    let studentsAtRisk = 0;
    
    // Get current year for at-risk calculation
    const currentYear = new Date().getFullYear();

    // Step 2: For each student, calculate earned points
    for (const student of filteredStudents) {
      const earnedPoints = await StudentActivitySummary.sum('allocated_points', {
        where: {
          roll_number: student.s_username,
          status: 'Approved',
        },
      });

      const totalEarned = earnedPoints || 0;
      totalEarnedPointsAll += totalEarned;
      
      // Calculate remaining points
      const remainingPoints = Math.max(student.total_credits - totalEarned, 0); // Prevent negative
      const completedPoints = Math.min(totalEarned, student.total_credits); // Cap at total required

      // Group for remaining points (0-10, 10-20, etc.)
      const remainingBucket = Math.floor(remainingPoints / 10) * 10;
      if (!groupedData[remainingBucket]) groupedData[remainingBucket] = 0;
      groupedData[remainingBucket]++;

      // Group for completed points (0-10, 10-20, etc.)
      const completedBucket = Math.floor(completedPoints / 10) * 10;
      if (!progressData[completedBucket]) progressData[completedBucket] = 0;
      progressData[completedBucket]++;
      
      // Calculate if student is at risk
      // Extract enrollment year from roll number
      if (student.s_username) {
        const rollNum = student.s_username.toString();
        if (rollNum.length >= 4) {
          const enrollmentYear = 2000 + parseInt(rollNum.substring(2, 4));
          const yearsEnrolled = currentYear - enrollmentYear;
          
          // Expected progress: Should have completed at least (years enrolled * 25) points
          // Assuming 4-year program with 25 points per year average pace
          const expectedProgress = Math.min(yearsEnrolled * 25, 100);
          
          if (totalEarned < expectedProgress && yearsEnrolled > 0) {
            studentsAtRisk++;
          }
        }
      }
    }

    const averagePointsEarned = totalStudents > 0 ? totalEarnedPointsAll / totalStudents : 0;
    
    return res.json({ 
      groupedData,
      progressData,
      summary: {
        totalStudents,
        averagePointsEarned: Math.round(averagePointsEarned * 10) / 10, // Round to 1 decimal
        studentsAtRisk,
        atRiskPercentage: totalStudents > 0 ? Math.round((studentsAtRisk / totalStudents) * 100) : 0
      }
    });

  } catch (error) {
    console.error("Error in getRemainingPointsSummary:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};











/**
 * Get student by roll number with remaining points calculation
 */




export const getStudentByRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.query;
    
    if (!rollNumber) {
      return res.status(400).send({
        success: false,
        message: "Roll number is required"
      });
    }
    
    // Find the student
    const student = await StudentDetails.findOne({
      where: { s_username: rollNumber },
      attributes: [
        's_id', 's_username', 'name', 'department', 
        'division', 'batch', 'year', 'total_credits'
      ]
    });
    
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found"
      });
    }
    
    // Calculate earned credits
    const earnedCreditsResult = await StudentActivitySummary.findOne({
      where: { 
        s_id: student.s_id,
        status: 'Approved'
      },
      attributes: [
        [fn('COALESCE', fn('SUM', col('allocated_points')), 0), 'earned_credits']
      ],
      raw: true
    });
    
    const earnedCredits = earnedCreditsResult ? 
      Number(earnedCreditsResult.earned_credits) : 0;
    
    const studentData = student.toJSON();
    
    // Return the student with calculated credits
    res.status(200).send({
      success: true,
      data: {
        id: studentData.s_id,
        rollNumber: studentData.s_username,
        name: studentData.name,
        department: studentData.department,
        division: studentData.division,
        batch: studentData.batch,
        year: studentData.year,
        totalCredits: studentData.total_credits,
        earnedCredits: earnedCredits,
        remainingCredits: Math.max(0, studentData.total_credits - earnedCredits)
      }
    });
    
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching student data",
      error: error.message
    });
  }
};

/**
 * Get group histogram data showing students by remaining points
 * with flexible filtering options
 */




export const getStudentRemainingPointsHistogram = async (req, res) => {
  try {
    const { department, batch, division, year } = req.query;
    
    // Build filters
    const where = {};
    
    if (department) {
      where.department = department;
    }
    
    if (batch) {
      where.batch = batch;
    }
    
    if (division) {
      where.division = division;
    }
    
    if (year) {
      where.year = year;
    }
    
    // Get students matching filters
    const students = await StudentDetails.findAll({
      where,
      attributes: [
        's_id', 's_username', 'name', 'department', 
        'division', 'batch', 'year', 'total_credits'
      ]
    });
    
    if (students.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No students found matching the criteria",
        data: {
          histogramData: [],
          filterSummary: { department, batch, division, year }
        }
      });
    }
    
    // Calculate earned credits for each student
    const studentsWithCredits = await Promise.all(students.map(async (student) => {
      const studentData = student.toJSON();
      
      const earnedCreditsResult = await StudentActivitySummary.findOne({
        where: { 
          s_id: studentData.s_id,
          status: 'Approved'
        },
        attributes: [
          [fn('COALESCE', fn('SUM', col('allocated_points')), 0), 'earned_credits']
        ],
        raw: true
      });
      
      const earnedCredits = earnedCreditsResult ? 
        Number(earnedCreditsResult.earned_credits) : 0;
      
      // Calculate remaining credits to reach 100
      const remainingCreditsTo100 = Math.max(0, 100 - earnedCredits);
      
      return {
        ...studentData,
        earned_credits: earnedCredits,
        remaining_credits_to_100: remainingCreditsTo100
      };
    }));
    
    // Create histogram bins based on remaining credits to 100
    const bins = [
      { min: 0, max: 10, label: '0-10' },
      { min: 10, max: 20, label: '10-20' },
      { min: 20, max: 30, label: '20-30' },
      { min: 30, max: 40, label: '30-40' },
      { min: 40, max: 50, label: '40-50' },
      { min: 50, max: 60, label: '50-60' },
      { min: 60, max: 70, label: '60-70' },
      { min: 70, max: 80, label: '70-80' },
      { min: 80, max: 90, label: '80-90' },
      { min: 90, max: Infinity, label: '90+' }
    ];
    
    // Group students by bins based on their remaining credits to reach 100
    const histogramData = bins.map(bin => {
      const studentsInBin = studentsWithCredits.filter(s => 
        s.remaining_credits_to_100 >= bin.min && 
        s.remaining_credits_to_100 < bin.max
      );
      
      return {
        range: bin.label,
        count: studentsInBin.length,
        students: studentsInBin.map(s => ({
          id: s.s_id,
          rollNumber: s.s_username,
          name: s.name,
          remainingCreditsTo100: s.remaining_credits_to_100
        }))
      };
    });
    
    // Create summary info
    const summaryStats = {
      totalStudents: studentsWithCredits.length,
      averageRemainingCreditsTo100: Math.round(
        studentsWithCredits.reduce((sum, s) => sum + s.remaining_credits_to_100, 0) / 
        studentsWithCredits.length * 10
      ) / 10, // Round to 1 decimal place
      studentsWithZeroRemaining: studentsWithCredits.filter(s => s.remaining_credits_to_100 === 0).length
    };
    
    res.status(200).send({
      success: true,
      data: {
        histogramData,
        summaryStats,
        filterSummary: { department, batch, division, year }
      }
    });
    
  } catch (error) {
    console.error("Error fetching remaining points histogram:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching remaining points histogram",
      error: error.message
    });
  }
};
















/**
 * Get metadata for filter dropdowns
 */
export const getVisualizationMetadata = async (req, res) => {
  try {
    // Get unique departments
    const departments = await StudentDetails.findAll({
      attributes: [[fn('DISTINCT', col('department')), 'department']],
      where: {
        department: {
          [Op.not]: null,
          [Op.ne]: ''
        }
      },
      raw: true,
      order: [['department', 'ASC']]
    });
    
    // Get unique batches
// Fix this line in your controller
      const batches = await StudentDetails.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('batch')), 'batch']],
        where: {
          batch: {
            [Sequelize.Op.not]: null  // Only filter nulls, skip checking ''
          }
        },
        order: [['batch', 'ASC']]
      });
    
    // Get unique divisions
    const divisions = await StudentDetails.findAll({
      attributes: [[fn('DISTINCT', col('division')), 'division']],
      where: {
        division: {
          [Op.not]: null,
          [Op.ne]: ''
        }
      },
      raw: true,
      order: [['division', 'ASC']]
    });
    
    // Get unique years
    const years = await StudentDetails.findAll({
      attributes: [[fn('DISTINCT', col('year')), 'year']],
      where: {
        year: {
          [Op.not]: null,
          [Op.ne]: ''
        }
      },
      raw: true,
      order: [['year', 'ASC']]
    });
    
    res.status(200).send({
      success: true,
      data: {
        departments: departments.map(d => d.department),
        batches: batches.map(b => b.batch),
        divisions: divisions.map(d => d.division),
        years: years.map(y => y.year)
      }
    });
    
  } catch (error) {
    console.error("Error fetching visualization metadata:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching visualization metadata",
      error: error.message
    });
  }
};
















































//testing



export const getStudentCategoryDistribution = async (req, res) => {
  try {
    const {
      rollNumber,
      department,
      batch,
      division,
      yearOfJoining
    } = req.query;

    const filters = {};

    // Apply filters from dropdown selection
    if (rollNumber) filters.s_username = { [Op.iLike]: `%${rollNumber}%` };
    if (department && department !== "All") filters.department = department;
    if (batch && batch !== "All") filters.batch = batch;
    if (division && division !== "All") filters.division = division;
    if (yearOfJoining && yearOfJoining !== "All") filters.year = yearOfJoining;

    const students = await StudentDetails.findAll({ where: filters });

    if (!students.length) {
      return res.status(404).json({ message: "No students found." });
    }

    const studentIds = students.map((s) => s.s_username);

    const summaries = await StudentActivitySummary.findAll({
      where: {
        roll_number: { [Op.in]: studentIds },
        status: "Approved"
      }
    });

    const categoryMap = {
      Technical: "technical",
      Cultural: "cultural",
      Sports: "sports",
      Social: "socialservice",
      Internship: "academic"
    };

    // Build the final result
    const result = await Promise.all(
      students.map(async (student) => {
        const studentActivities = summaries.filter(
          (a) => a.roll_number === student.s_username
        );

        const categoryCredits = {
          technical: 0,
          cultural: 0,
          sports: 0,
          academic: 0,
          socialservice: 0,
          other: 0
        };

        studentActivities.forEach((a) => {
          const key = categoryMap[a.event_type] || "other";
          categoryCredits[key] += a.allocated_points || 0;
        });

        // 🔍 Match mentor from MentorInfo
        const mentor = await MentorInfo.findOne({
          where: {
            m_batch: student.batch.toString(),
            m_csec: student.division.trim(),
            m_branch: student.department.trim(),
            year_of_joining: student.year
          },
          attributes: ["m_name"]
        });

        return {
          rollNumber: student.s_username,
          name: student.s_name,
          department: student.department,
          batch: student.batch,
          division: student.division,
          yearOfJoining: student.year,
          mentor: mentor?.m_name || "N/A",
          ...categoryCredits
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("🔥 Error in category distribution:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};








































































































