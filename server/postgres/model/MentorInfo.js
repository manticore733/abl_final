// import { DataTypes } from "sequelize";
// import { sequelize } from "../postgresmodel.js"; // Ensure this path is correct

// const MentorInfo = sequelize.define(
//   "mentor_info",
//   {
//     m_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     m_batch: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     m_sem: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     m_csec: {
//         type: DataTypes.CHAR,
//         allowNull: false,
//       },
//       m_branch: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//   },
//   { tableName: "mentor_info", timestamps: false }
// );

// export default MentorInfo;



































import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js";

const MentorInfo = sequelize.define(
  "mentor_info",
  {
    m_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    m_username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    m_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    m_phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    m_designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year_of_joining: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    m_batch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_sem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_csec: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "mentor_info", timestamps: false }
);

export default MentorInfo;
