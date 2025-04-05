import express from "express";
import session from "express-session";
import cors from "cors"; // Import CORS middleware
import cookieParser from "cookie-parser";

import { sequelize, connection } from "./postgres/postgresmodel.js";

import eventRoutes from "./Routes/eventRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import sessionRoutes from "./Routes/sessionRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import mentorRoutes from "./Routes/mentorRoutes.js"; // 🔹 Registering mentor routes here
import clubAdminRoutes from "./Routes/clubAdminRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { validateSession } from "./middleware/authMiddleware.js";

import {
  getStudentCredentials,
  verifyStudentRole,
} from "./controller/studentController.js";
import { getAdminCredentials } from "./controller/adminController.js";
import { getMentorCredentials } from "./controller/mentorController.js";



// Import all models to register them with Sequelize

import Admin from "./postgres/model/Admin.js";
import Events from "./postgres/model/Events.js";
import Mentor from "./postgres/model/Mentor.js";
import MentorInfo from "./postgres/model/MentorInfo.js";
import Session from "./postgres/model/Session.js";
import Student from "./postgres/model/Student.js";
import StudentActivityParticipation from "./postgres/model/StudentActivityParticipation.js";
import StudentInfo from "./postgres/model/StudentInfo.js";
import StudentRoleMap from "./postgres/model/StudentRoleMap.js";
import ClubAdmin from "./postgres/model/ClubAdmin.js";
import ClubEvent from "./postgres/model/ClubEvent.js";
import StudentDetails from "./postgres/model/StudentDetails.js";
import StudentActivitySummary from "./postgres/model/StudentActivitySummary.js";


const app = express();

app.use(express.json());
app.use(cookieParser()); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Register Routes
app.use("/api/session", sessionRoutes);
app.use("/api/mentor", mentorRoutes); // 🔹 This automatically includes all mentor-related routes
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

console.log("Club Admin Routes Loaded...");

app.use("/api/clubadmin",clubAdminRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/clubadminpfp', express.static(path.join(__dirname, 'clubadminpfp')));




// 🔹 Add Protected Route Here (After Session Routes)
app.get("/api/protected-route", validateSession, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

// Routes
app.get("/students/credentials/:username", getStudentCredentials);
app.get("/students/verify-role/:s_id", verifyStudentRole);
app.get("/admin/credentials/:username", getAdminCredentials);
app.get("/mentor/credentials/:username", getMentorCredentials);

// Session Check Route
app.get("/session", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.use("/", eventRoutes);

const PORT = 5000;




// app.listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`);
// });

//// Sync models and start the server

sequelize
  .sync() // 🔹 Use { force: true } to drop tables and recreate them (only for development)
  .then(() => {
    console.log("Database & tables synced!");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });




connection();
