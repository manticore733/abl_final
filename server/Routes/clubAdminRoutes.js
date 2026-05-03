// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { addClubEvent, getClubAdminDetails, updateClubAdmin, getClubAdminEvents, updateEvent, deleteEvent } from "../controller/clubAdminController.js";

// const router = express.Router();

// // ✅ Ensure `uploads/` folder (for event posters) exists
// const eventUploadsDir = "uploads/";
// if (!fs.existsSync(eventUploadsDir)) {
//     console.log("📁 Creating uploads/ directory for event posters...");
//     fs.mkdirSync(eventUploadsDir, { recursive: true });
// }

// // ✅ Ensure `clubadminpfp/` folder (for profile pictures) exists
// const profileUploadsDir = "clubadminpfp/";
// if (!fs.existsSync(profileUploadsDir)) {
//     console.log("📁 Creating clubadminpfp/ directory for profile pictures...");
//     fs.mkdirSync(profileUploadsDir, { recursive: true });
// }

// // ✅ Configure Multer for Event Posters (Stored in `uploads/`)
// const eventStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("📂 Storing event poster in uploads/ folder...");
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
//         console.log("🖼️ Event Poster Filename:", uniqueName);
//         cb(null, uniqueName);
//     },
// });

// // ✅ Configure Multer for Profile Pictures (Stored in `clubadminpfp/`)
// const profileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("📂 Storing profile picture in clubadminpfp/ folder...");
//         cb(null, "clubadminpfp/");
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + path.extname(file.originalname);
//         console.log("👤 Profile Picture Filename:", uniqueName);
//         cb(null, uniqueName);
//     },
// });

// // ✅ File Filter for Images (JPEG, PNG, GIF)
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         console.log("⚠️ Invalid file type:", file.mimetype);
//         cb(new Error("Only images (JPG, PNG, GIF) are allowed!"), false);
//     }
// };

// // ✅ Apply storage, file filter & size limit (2MB max) for both types of uploads
// const uploadEvent = multer({ storage: eventStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });
// const uploadProfile = multer({ storage: profileStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });

// // ✅ Route to add an event (Uses `uploads/` folder)
// router.post("/add-event", uploadEvent.single("poster_image"), (req, res, next) => {
//     console.log("📌 /add-event API called!");
//     next();
// }, addClubEvent);

// // ✅ Route to fetch club admin details
// router.get("/profile/:rollNumber", getClubAdminDetails);

// // ✅ Route to update club admin profile (Uses `clubadminpfp/` folder)
// router.put("/profile/:rollNumber", uploadProfile.single("profile_picture"), updateClubAdmin);









// //get events
// router.get("/profile/:rollNumber/events", (req, res, next) => {
//     console.log("✅ Route Hit:", req.params.rollNumber);
//     next();
// }, getClubAdminEvents);






// // //edit evnebts

// router.put("/events/:eventId", uploadEvent.single("poster_image"), updateEvent);









// //delete events
// router.delete("/events/:eventId", deleteEvent);





// export default router;



// Routes/clubAdminRoutes.js
import express from "express";
import { validateSession, requireRole } from "../middleware/authMiddleware.js";
import { uploadEvent, uploadProfile } from "../middleware/uploadMiddleware.js";
import {
    addClubEvent,
    getClubAdminDetails,
    updateClubAdmin,
    getClubAdminEvents,
    updateEvent,
    deleteEvent
} from "../controller/clubAdminController.js";

const router = express.Router();

// ==========================================
// 🛡️ SECURITY BARRIER
// All routes below require a valid login and the 'clubadmin' role!
// ==========================================
router.use(validateSession);
router.use(requireRole(["clubadmin"])); // Admins might need access too

// ==========================================
// 🧑‍💼 CLUB ADMIN PROFILE
// ==========================================
router.get("/profile/:rollNumber", getClubAdminDetails);
router.put("/profile/:rollNumber", uploadProfile.single("profile_picture"), updateClubAdmin);
router.get("/profile/:rollNumber/events", getClubAdminEvents);

// ==========================================
// 📅 EVENT MANAGEMENT
// Note: Changed /add-event to standard REST POST /events
// ==========================================
router.post("/events", uploadEvent.single("poster_image"), addClubEvent);
router.put("/events/:eventId", uploadEvent.single("poster_image"), updateEvent);
router.delete("/events/:eventId", deleteEvent);

export default router;