

import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; // Ensure this path is correct

const ClubEvent = sequelize.define(
  "club_events",
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roll_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: "club_admins",
        key: "roll_number",
      },
    },
    club_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    admin_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_type: {
      type: DataTypes.ENUM("Technical", "Cultural", "Sports", "Social"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    entry_fee: {
      type: DataTypes.STRING(50), // Either "Free" or a numeric amount
      allowNull: false,
    },

    event_mode: { 
      type: DataTypes.STRING(50), // Can be "Online", "Offline", or "Hybrid"
      allowNull: true,
    },





    event_link: {
      type: DataTypes.STRING(500), // URL for registration
      allowNull: false,
      validate: {
        isUrl: true, // Ensures it's a valid URL
      },
    },
    poster_image: {
      type: DataTypes.TEXT, // Store longer URLs
      allowNull: true,
    },
    event_status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true, // Enables createdAt & updatedAt automatically
  }
);

export default ClubEvent;
