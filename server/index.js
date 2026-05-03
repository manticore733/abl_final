import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import { sequelize, connection } from "./postgres/postgresmodel.js";

import eventRoutes from "./Routes/eventRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import sessionRoutes from "./Routes/sessionRoutes.js"; // You can likely delete this file later!
import studentRoutes from "./Routes/studentRoutes.js";
import mentorRoutes from "./Routes/mentorRoutes.js";
import clubAdminRoutes from "./Routes/clubAdminRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { validateSession } from "./middleware/authMiddleware.js";

// Import all models to register them with Sequelize
import Admin from "./postgres/model/Admin.js";

import Mentor from "./postgres/model/Mentor.js";
import MentorInfo from "./postgres/model/MentorInfo.js";
import Student from "./postgres/model/Student.js";

import ClubAdmin from "./postgres/model/ClubAdmin.js";
import ClubEvent from "./postgres/model/ClubEvent.js";
import StudentDetails from "./postgres/model/StudentDetails.js";
import StudentActivitySummary from "./postgres/model/StudentActivitySummary.js";
import { setupAssociations } from "./postgres/model/associations.js";

const app = express();

// 1. CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Body Parser Middleware (50MB LIMIT)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Prevent caching for all responses (important after logout)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register Routes
app.use("/api/auth", authRoutes);  // ✅ The new JWT Auth
app.use("/api/session", sessionRoutes); // (Legacy, keep if you haven't deleted the file yet)
app.use("/api/mentor", mentorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/clubadmin", clubAdminRoutes);
app.use("/api", eventRoutes); // ✅ FIXED: Now it matches the frontend's /api/events call!

console.log("Club Admin Routes Loaded...");

app.use("/uploads", express.static("uploads"));
app.use('/clubadminpfp', express.static(path.join(__dirname, 'clubadminpfp')));

// 🔹 Protected Route Check (Used by ProtectedRoute.jsx)
app.get("/api/protected-route", validateSession, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

const PORT = 5000;

setupAssociations();

// Sync models and start the server
sequelize
  .sync()
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