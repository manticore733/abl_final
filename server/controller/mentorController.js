
import Session from "../postgres/model/Session.js";
import Student from "../postgres/model/Student.js";
import StudentInfo from "../postgres/model/StudentInfo.js";
import MentorInfo from "../postgres/model/MentorInfo.js";
import StudentActivityParticipation from "../postgres/model/StudentActivityParticipation.js"
import StudentActivitySummary from "../postgres/model/StudentActivitySummary.js";
import StudentDetails from "../postgres/model/StudentDetails.js";

import { Document, Packer, Paragraph, HeadingLevel, Media, Table, TableRow, TableCell, TextRun, AlignmentType,ImageRun  } from "docx";
import fs from "fs";

import path from "path";





// export const getMentorCredentials = async (req, res) => {
//   const { username } = req.params; 
//   try {
//     const mentor = await Mentor.findOne({
//       where: { m_username: username }, // Search by username
//       attributes: ["m_username", "m_password"], // Only retrieve specific fields
//     });
//     if (!mentor) {
//       return res.status(404).json({ error: "Mentor not found" });
//     }
//     res.status(200).json(mentor);
//   } catch (error) {
//     console.error("Error fetching mentor credentials:", error);
//     res.status(500).json({ error: "Failed to fetch mentor credentials" });
//   }
// };



export const getMentorCredentials = async (req, res) => {
  const { username } = req.params;
  try {

    console.log(`Fetching credentials for: ${username}`); // Debug log



    const mentor = await MentorInfo.findOne({
      where: { m_username: username }, // Search by username
      attributes: ["m_username", "m_password"], // Only retrieve specific fields
    });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error fetching mentor credentials:", error);
    res.status(500).json({ error: "Failed to fetch mentor credentials" });
  }
};



















export const fetchStudentDetails = async (req, res) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    // m_id in req convert to int✅
    // fetch m_id and m_batch, m_sem, m_csec, m_branch from m_info✅
    // fetch s_id and s_names rows in s_info whose s_batch, s_sem, s_csec, s_branch correspond to m_info✅
    // fetch s_username using s_id in students table
    // send s_username and s_names corres s_id

    // Find session in the database
    const session = await Session.findOne({ where: { session_token: sessionToken } });
    if (!session) {
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    //1. Get `user_id` from session, which should match `m_id` in mentor_info table
    const sessionUserId = session.user_id;
    const mentorIdConv = parseInt(sessionUserId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    //2. fetch m_info
    const mentorDetails = await MentorInfo.findOne({
      where: { m_id: mentorIdConv },
      attributes: ["m_id", "m_batch", "m_sem", "m_csec", "m_branch"], // Select only required fields
    });

    if (!mentorDetails) {
      return res.status(404).json({ error: "Mentor not found." });
    }

    //3. find matching student info
    const students = await StudentInfo.findAll({
      where: {
        s_batch: mentorDetails.m_batch,
        s_sem: mentorDetails.m_sem,
        s_csec: mentorDetails.m_csec,
        s_branch: mentorDetails.m_branch,
      },
      attributes: ["s_id", "s_name"], // Fetch only s_id and s_name
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this mentor." });
    }

    //4. Fetch `s_username` from `students` table using `s_id`
    const studentIds = students.map(student => student.s_id); // Extract student IDs
    const studentUsernames = await Student.findAll({
      where: { s_id: studentIds },
      attributes: ["s_id", "s_username"], // Fetch corresponding usernames
    });

    //5. Merge `s_username` with `s_name`
    const studentData = students.map(student => {
      const usernameRecord = studentUsernames.find(user => user.s_id === student.s_id);
      return {
        s_id: student.s_id,
        s_name: student.s_name,
        s_username: usernameRecord ? usernameRecord.s_username : null, // Ensure null if not found
      };
    });

    //6. Send final response
    res.status(200).json(studentData);

  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getStudent = async (req, res) => {
  const { student_id } = req.params;

  // Convert student_id to integer and validate
  const studentId = parseInt(student_id, 10);
  if (isNaN(studentId)) {
    return res.status(400).json({ error: "Invalid student_id" });
  }

  try {
    const studentDetails = await StudentActivityParticipation.findAll({
      where: { s_id: studentId }, // Use parsed integer
      attributes: [
        "a_id",
        "a_name",
        "a_status",
        "a_type",
        "a_sub_type",
        "a_start_date",
        "a_end_date",
        "a_venue",
        "a_level",
        "a_points_scored",
      ],
    });

    if (!studentDetails || studentDetails.length === 0) {
      return res.status(404).json({ error: "Student activities not found" });
    }

    res.status(200).json(studentDetails);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};

export const assignPoints = async (req, res) => {
  const { a_id } = req.params;
  const { a_type, a_sub_type, a_level } = req.body;

  if (!a_id || !a_type || !a_sub_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // ✅ **Points Mapping**
    const pointsMapping = {
      Technical: {
        "Attended/Organised Seminar": 1,
        "Delivering Seminar": 2,
        "Attended Workshop": 2,
        "Organized Workshop": 1,
        "Delivered Workshop": 3,
        "Attended/Organized Competition": 1,
        "Won Competition": null, // Special case handled below
      },
      Social: {
        "Donated Blood": 2,
        "Other Social Work": 1,
      },
      Sports: {
        "Participated": 1,
        "Won Competition": null, // Special case handled below
      },
      Cultural: {
        "Participated": 1,
        "Won Competition": null, // Special case handled below
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

    // ✅ **Assign Points**
    let points = pointsMapping[a_type]?.[a_sub_type] || 0;

    // If "Won Competition", add points based on a_level
    if (a_sub_type === "Won Competition" && a_level) {
      points = levelMapping[a_level] || 0;
    }

    // ✅ **Update Database**
    const updatedActivity = await StudentActivityParticipation.update(
      { a_points_scored: points, a_status: "Approved" },
      { where: { a_id } }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    return res.status(200).json({ message: "Points assigned successfully!", points });
  } catch (error) {
    console.error("❌ Error assigning points:", error);
    return res.status(500).json({ error: "Failed to assign points" });
  }
};




































// export const fetchStudentsUnderMentor = async (req, res) => {
//   try {
//     const sessionToken = req.cookies.sessionToken;
//     if (!sessionToken) {
//       console.log("⛔ Session token missing.");
//       return res.status(401).json({ error: "Session token missing. Please log in again." });
//     }

//     // Find session in the database
//     const session = await Session.findOne({ where: { session_token: sessionToken } });
//     if (!session) {
//       console.log("⛔ Invalid session.");
//       return res.status(401).json({ error: "Invalid session. Please log in again." });
//     }

//     const sessionUserId = session.user_id;
//     const mentorIdConv = parseInt(sessionUserId.replace(/[^0-9]+/g, ""), 10);
//     console.log("✅ Mentor ID:", mentorIdConv);

//     // Fetch mentor details
//     const mentorDetails = await MentorInfo.findOne({
//       where: { m_id: mentorIdConv },
//       attributes: ["m_batch", "m_sem", "m_csec", "m_branch"],
//     });

//     if (!mentorDetails) {
//       console.log("⛔ Mentor not found in mentor_info table.");
//       return res.status(404).json({ error: "Mentor not found." });
//     }

//     console.log("✅ Mentor Details:", mentorDetails.dataValues);

//     // Fetch students matching the mentor's batch, sem, csec, and branch
//     const students = await StudentDetails.findAll({
//       where: {
//         batch: mentorDetails.m_batch.trim(),
//         semester: mentorDetails.m_sem.trim(),
//         division: mentorDetails.m_csec.trim(),
//         department: mentorDetails.m_branch.trim(),
//       },
//     });

//     console.log("✅ Students Found:", students.length);

//     if (students.length === 0) {
//       return res.status(404).json({ message: "No students found for this mentor." });
//     }

//     // res.status(200).json(students);
//     res.status(200).json({
//       mentorId: mentorIdConv, // Include mentor ID in the response
//       students: students.length > 0 ? students : [],
//     });



//   } catch (error) {
//     console.error("🔥 Error fetching students under mentor:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };




export const fetchStudentsUnderMentor = async (req, res) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      console.log("⛔ Session token missing.");
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({ where: { session_token: sessionToken } });
    if (!session) {
      console.log("⛔ Invalid session.");
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    const sessionUserId = session.user_id;
    const mentorIdConv = parseInt(sessionUserId.replace(/[^0-9]+/g, ""), 10);
    console.log("✅ Mentor ID:", mentorIdConv);

    // Fetch mentor details
    const mentorDetails = await MentorInfo.findOne({
      where: { m_id: mentorIdConv },
      attributes: ["m_batch", "m_sem", "m_csec", "m_branch","year_of_joining"],
    });

    if (!mentorDetails) {
      console.log("⛔ Mentor not found in mentor_info table.");
      return res.status(404).json({ error: "Mentor not found." });
    }

    console.log("✅ Mentor Details:", mentorDetails.dataValues);

    // Fetch students matching the mentor's batch, sem, csec, and branch
    const students = await StudentDetails.findAll({
      where: {
        batch: mentorDetails.m_batch.trim(),
        // semester: mentorDetails.m_sem.trim(),
        year: mentorDetails.year_of_joining,
        division: mentorDetails.m_csec.trim(),
        department: mentorDetails.m_branch.trim(),
      },
    });

    console.log("✅ Students Found:", students.length);

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this mentor." });
    }

    // res.status(200).json(students);
    res.status(200).json({
      mentorId: mentorIdConv, // Include mentor ID in the response
      students: students.length > 0 ? students : [],
    });



  } catch (error) {
    console.error("🔥 Error fetching students under mentor:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

















































export const fetchPendingActivities = async (req, res) => {
  try {
    const { studentId } = req.params; // Extract student ID from URL

    // Fetch activities with "pending" status for the given student
    const activities = await StudentActivitySummary.findAll({
      where: {
        s_id: studentId,
        status: "Pending",
      },
    });

    if (activities.length === 0) {
      return res.status(404).json({ message: "No pending activities found." });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("🔥 Error fetching pending activities:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};






export const approveActivity = async (req, res) => {
  try {
    const { activityId } = req.params;  

    // Find the activity using the correct primary key
    const activity = await StudentActivitySummary.findOne({
      where: { id: activityId, status: "Pending" },  // 🔄 Changed a_id → id
    });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found or already processed." });
    }

    // Approve the activity (update status)
    activity.status = "Approved";
    await activity.save();

    // Add points to student's total credits
    const student = await StudentDetails.findOne({ where: { s_id: activity.s_id } });
    if (student) {
      student.total_credits += activity.allocated_points; // 🔄 Fixed points field name
      await student.save();
    }

    res.status(200).json({ message: "Activity approved successfully!" });
  } catch (error) {
    console.error("🔥 Error approving activity:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};






export const rejectActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const { rejectionReason } = req.body;

    // Find the activity using the correct primary key
    const activity = await StudentActivitySummary.findOne({
      where: { id: activityId, status: "Pending" },  // 🔄 Changed a_id → id
    });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found or already processed." });
    }

    // Reject the activity (update status & add reason)
    activity.status = "Rejected";
    activity.remarks = rejectionReason; // 🔄 Changed rejection_reason → remarks (as per schema)
    await activity.save();

    res.status(200).json({ message: "Activity rejected successfully!" });
  } catch (error) {
    console.error("🔥 Error rejecting activity:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};












export const undoActivityAction = async (req, res) => {
  try {
    const { activityId } = req.params;

    // Find the activity
    const activity = await StudentActivitySummary.findOne({ where: { id: activityId } });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found." });
    }

    if (activity.status === "Pending") {
      return res.status(400).json({ error: "Activity is already pending." });
    }

    // Undo approval: subtract allocated points
    if (activity.status === "Approved") {
      const student = await StudentDetails.findOne({ where: { s_id: activity.s_id } });
      if (student) {
        student.total_credits -= activity.allocated_points; // Reduce the points
        await student.save();
      }
    }

    // Undo rejection: clear remarks
    if (activity.status === "Rejected") {
      activity.remarks = null;
    }

    // Reset status to Pending
    activity.status = "Pending";
    await activity.save();

    res.status(200).json({ message: "Activity status reverted to Pending." });
  } catch (error) {
    console.error("🔥 Error undoing activity:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};








export const fetchProcessedActivities = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch activities with status Approved or Rejected
    const activities = await StudentActivitySummary.findAll({
      where: {
        s_id: studentId,
        status: ["Approved", "Rejected"], // Fetch both statuses
      },
    });

    if (activities.length === 0) {
      return res.status(404).json({ message: "No approved or rejected activities found." });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("🔥 Error fetching processed activities:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};







export const getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params; // Extract student ID from URL

    // Fetch all student details
    const student = await StudentDetails.findOne({
      where: { s_id: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("🔥 Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

















export const fetchMentorProfile = async (req, res) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      console.log("⛔ Mentor ID is missing in request.");
      return res.status(400).json({ error: "Mentor ID is required." });
    }

    // Fetch mentor details
    const mentorDetails = await MentorInfo.findOne({
      where: { m_id: mentorId },
      attributes: ["m_id", "m_batch", "m_sem", "m_csec", "m_branch"],
    });

    if (!mentorDetails) {
      console.log("⛔ Mentor not found.");
      return res.status(404).json({ error: "Mentor not found." });
    }

    console.log("✅ Mentor Details Fetched:", mentorDetails.dataValues);
    res.status(200).json(mentorDetails);
  } catch (error) {
    console.error("🔥 Error fetching mentor profile:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};















































export const fetchAllStudentsForMentor = async (req, res) => {
  try {
    const { mentorId } = req.params; // Get mentorId from request params

    if (!mentorId) {
      console.log("⛔ Mentor ID missing.");
      return res.status(400).json({ error: "Mentor ID is required." });
    }

    console.log("✅ Fetching all students for Mentor ID:", mentorId);

    // Fetch mentor details
    const mentorDetails = await MentorInfo.findOne({
      where: { m_id: mentorId },
      attributes: ["m_batch", "m_sem", "m_csec", "m_branch","year_of_joining"],
    });

    if (!mentorDetails) {
      console.log("⛔ Mentor not found.");
      return res.status(404).json({ error: "Mentor not found." });
    }

    console.log("✅ Mentor Details:", mentorDetails.dataValues);

    // Fetch all student details (returning all fields)
    const students = await StudentDetails.findAll({
      where: {
        batch: mentorDetails.m_batch.trim(),
        // semester: mentorDetails.m_sem.trim(),
        year : mentorDetails.year_of_joining,
        division: mentorDetails.m_csec.trim(),
        department: mentorDetails.m_branch.trim(),
      },
    });

    console.log("✅ Total Students Found:", students.length);

    res.status(200).json({
      mentorId,
      students,
    });

  } catch (error) {
    console.error("🔥 Error fetching all students for mentor:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};



























export const fetchStudentStatistics = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required." });
    }

    console.log("✅ Fetching statistics for Student ID:", studentId);

    // Fetch activities for the student
    const activities = await StudentActivitySummary.findAll({
      where: { s_id: studentId },
      attributes: ["semester", "event_type", "participation_date", "status"],
    });

    if (!activities.length) {
      return res.status(404).json({ message: "No activities found for this student." });
    }

    // 📊 Process Data for Graphs
    let eventCounts = { Technical: 0, Cultural: 0, Sports: 0, Social: 0, Internship: 0 };
    let statusCounts = { Approved: 0, Pending: 0, Rejected: 0 };
    let semesterWiseEvents = {};

    activities.forEach(({ semester, event_type, participation_date, status }) => {
      // Count activities per event type
      if (event_type in eventCounts) eventCounts[event_type]++;

      // Count status distribution
      if (status in statusCounts) statusCounts[status]++;

      // Semester-wise breakdown
      if (!semesterWiseEvents[semester]) {
        semesterWiseEvents[semester] = { Technical: 0, Cultural: 0, Sports: 0, Social: 0, Internship: 0 };
      }
      semesterWiseEvents[semester][event_type]++;
    });

    res.status(200).json({ eventCounts, statusCounts, semesterWiseEvents });

  } catch (error) {
    console.error("🔥 Error fetching student statistics:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
































export const fetchMentorCreds = async (req, res) => { 
  try {
    const sessionToken = req.cookies.sessionToken;

    if (!sessionToken) {
      console.log("⛔ Session token missing.");
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    const session = await Session.findOne({ where: { session_token: sessionToken } });

    if (!session) {
      console.log("⛔ Invalid session.");
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    const mentorIdConv = parseInt(session.user_id.replace(/[^0-9]+/g, ""), 10);

    const mentorDetails = await MentorInfo.findOne({
      where: { m_id: mentorIdConv },
      attributes: ["m_id","m_batch", "m_sem", "m_csec", "m_branch"],
    });

    if (!mentorDetails) {
      console.log("⛔ Mentor not found.");
      return res.status(404).json({ error: "Mentor not found." });
    }

    console.log("✅ Mentor Details Fetched:", mentorDetails.dataValues);
    res.status(200).json({
      mentorId: mentorDetails.m_id,
    
      m_branch: mentorDetails.m_branch,
      m_batch: mentorDetails.m_batch,
      m_csec: mentorDetails.m_csec,
      m_sem: mentorDetails.m_sem,
    });
  } catch (error) {
    console.error("🔥 Error fetching mentor profile:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};





















// Your function to generate the mentor report




export const generateMentorReport = async (req, res) => {
  try {
    const { rollNumber, barChartBase64 } = req.body;

    console.log("Fetching student details and activities...");

    const studentDetails = await StudentDetails.findOne({ where: { s_username: rollNumber } });
    const activities = await StudentActivitySummary.findAll({
      where: { roll_number: rollNumber, status: "Approved" },
    });

    console.log("Student details:", studentDetails);
    console.log("Activities:", activities);

    // ✅ Step 1: Create document with empty sections to avoid creator error
    const doc = new Document({ sections: [] });

    // ✅ Step 2: Convert base64 image and embed it using ImageRun
    let chartImageParagraph;
    if (barChartBase64 && barChartBase64.startsWith("data:image/png;base64,")) {
      const base64Data = barChartBase64.split(",")[1];
      const imageBuffer = Buffer.from(base64Data, "base64");

      console.log("Embedding the base64 chart...");

      chartImageParagraph = new Paragraph({
        children: [
          new ImageRun({
            data: imageBuffer,
            transformation: {
              width: 500,
              height: 300,
            },
          }),
        ],
        alignment: AlignmentType.CENTER,
      });

      console.log("Chart image added.");
    } else {
      console.log("No valid base64 chart provided.");
      chartImageParagraph = new Paragraph("No chart provided.");
    }

    // ✅ Step 3: Add all report content to the document
    doc.addSection({
      children: [
        new Paragraph({
          text: `Mentor Report`,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph(" "),
        new Paragraph({ text: `Student Name: ${studentDetails.name}` }),
        new Paragraph({ text: `Roll Number: ${studentDetails.s_username}` }),
        new Paragraph({ text: `Department: ${studentDetails.department}` }),
        new Paragraph({ text: `Division: ${studentDetails.division}` }),
        new Paragraph({ text: `Batch: ${studentDetails.batch}` }),
        new Paragraph({ text: `Year of Joining: ${studentDetails.year}` }),
        new Paragraph({ text: `Total Credits Earned: ${studentDetails.total_credits} / 100` }),
        new Paragraph(" "),
        new Paragraph({
          text: `Approved Activities:`,
          heading: HeadingLevel.HEADING_2,
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Event Name")] }),
                new TableCell({ children: [new Paragraph("Event Type")] }),
                new TableCell({ children: [new Paragraph("Points")] }),
                new TableCell({ children: [new Paragraph("Date")] }),
              ],
            }),
            ...activities.map((act) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(act?.event_name || "N/A")] }),
                  new TableCell({ children: [new Paragraph(act?.event_type || "N/A")] }),
                  new TableCell({ children: [new Paragraph(`${act?.allocated_points ?? "N/A"}`)] }), // updated to allocated_points
                  new TableCell({ children: [new Paragraph(act?.participation_date || "N/A")] }), // updated to participation_date
                ],
              })




            ),
            
          ],
        }),
        new Paragraph(" "),
        new Paragraph({
          text: "Event Type-wise Participation:",
          heading: HeadingLevel.HEADING_2,
        }),
        // chartImageParagraph,
        new Paragraph(" "),
        new Paragraph({
          text: "Signatures:",
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph("HOD: ___________________"),
        new Paragraph("Principal: _______________"),
      ],
    });

    // ✅ Step 4: Generate and send the .docx file
    const buffer = await Packer.toBuffer(doc);
    res.setHeader("Content-Disposition", `attachment; filename=${studentDetails.name}_Report.docx`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(buffer);
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Failed to generate report." });
  }
};



































