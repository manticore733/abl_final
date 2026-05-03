// services/reportService.js
import { Document, Packer, Paragraph, HeadingLevel, Table, TableRow, TableCell, AlignmentType, ImageRun } from "docx";
import * as mentorRepo from "../repositories/mentorRepository.js";

export const generateStudentDocxReport = async (rollNumber, barChartBase64) => {
    const studentDetails = await mentorRepo.getStudentByRollNumber(rollNumber);
    const activities = await mentorRepo.getApprovedActivities(rollNumber);

    if (!studentDetails) {
        throw new Error("STUDENT_NOT_FOUND");
    }

    const doc = new Document({ sections: [] });

    // Handle the Chart Image
    let chartImageParagraph = new Paragraph("No chart provided.");
    if (barChartBase64 && barChartBase64.startsWith("data:image/png;base64,")) {
        const base64Data = barChartBase64.split(",")[1];
        const imageBuffer = Buffer.from(base64Data, "base64");

        chartImageParagraph = new Paragraph({
            children: [
                new ImageRun({
                    data: imageBuffer,
                    transformation: { width: 500, height: 300 },
                }),
            ],
            alignment: AlignmentType.CENTER,
        });
    }

    // Build the Document Structure
    doc.addSection({
        children: [
            new Paragraph({ text: `Mentor Report`, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
            new Paragraph(" "),
            new Paragraph({ text: `Student Name: ${studentDetails.name}` }),
            new Paragraph({ text: `Roll Number: ${studentDetails.s_username}` }),
            new Paragraph({ text: `Department: ${studentDetails.department}` }),
            new Paragraph({ text: `Division: ${studentDetails.division}` }),
            new Paragraph({ text: `Batch: ${studentDetails.batch}` }),
            new Paragraph({ text: `Year of Joining: ${studentDetails.year}` }),
            new Paragraph({ text: `Total Credits Earned: ${studentDetails.total_credits} / 100` }),
            new Paragraph(" "),
            new Paragraph({ text: `Approved Activities:`, heading: HeadingLevel.HEADING_2 }),

            // Build the Table dynamically
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
                                new TableCell({ children: [new Paragraph(act.event_name || "N/A")] }),
                                new TableCell({ children: [new Paragraph(act.event_type || "N/A")] }),
                                new TableCell({ children: [new Paragraph(`${act.allocated_points || 0}`)] }),
                                new TableCell({ children: [new Paragraph(act.participation_date || "N/A")] }),
                            ],
                        })
                    ),
                ],
            }),
            new Paragraph(" "),
            new Paragraph({ text: "Event Type-wise Participation:", heading: HeadingLevel.HEADING_2 }),
            chartImageParagraph,
            new Paragraph(" "),
            new Paragraph({ text: "Signatures:", heading: HeadingLevel.HEADING_2 }),
            new Paragraph("HOD: ___________________"),
            new Paragraph("Principal: _______________"),
        ],
    });

    // Generate the buffer
    const buffer = await Packer.toBuffer(doc);
    const filename = `${studentDetails.name.replace(/\s+/g, '_')}_Report.docx`;

    return { buffer, filename };
};