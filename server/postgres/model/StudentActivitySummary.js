// import { DataTypes } from "sequelize";
// import { sequelize } from "../postgresmodel.js";

// const StudentActivitySummary = sequelize.define(
//   "student_activity_summary",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     s_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     roll_number: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     department: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     division: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     semester: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     event_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     event_type: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isIn: [["Technical", "Cultural", "Sports", "Social", "Other"]],
//       },
//     },
//     organised_by: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     participation_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     venue: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isIn: [["Approved", "Rejected", "Pending"]],
//       },
//       defaultValue: "Pending",
//     },
//     credits_earned: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     remarks: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true, // to keep createdAt & updatedAt columns
//   }
// );

// export default StudentActivitySummary;





















import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js";

const StudentActivitySummary = sequelize.define(
  "student_activity_summary",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    s_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roll_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    division: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Technical", "Cultural", "Sports", "Social", "Other"]],
      },
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false, // New column for activity subcategory
    },
    sub_activity_type: {
      type: DataTypes.STRING,
      allowNull: true, // New column for further classification
    },
    organised_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    participation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Approved", "Rejected", "Pending"]],
      },
      defaultValue: "Pending",
    },
    allocated_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Renamed from `credits_earned`
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Keeps track of createdAt & updatedAt
  }
);

export default StudentActivitySummary;
