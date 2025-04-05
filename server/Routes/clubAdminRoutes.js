// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { addClubEvent,getClubAdminDetails } from "../controller/clubAdminController.js";

// const router = express.Router();


// // ✅ Ensure `uploads/` folder exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//     console.log("📁 Creating uploads/ directory...");
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ✅ Configure `multer` (Restrict to Images & Set File Size Limit)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("📂 Storing file in uploads/ folder...");
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
//         console.log("🖼️ Generated filename:", uniqueName);
//         cb(null, uniqueName);
//     },
// });

// // ✅ Filter to allow only images (JPEG, PNG, GIF)
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         console.log("⚠️ Invalid file type:", file.mimetype);
//         cb(new Error("Only images (JPG, PNG, GIF) are allowed!"), false);
//     }
// };

// // ✅ Apply storage, file filter & size limit (2MB max)
// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
//     fileFilter: fileFilter
// });

// // ✅ Log when route is hit
// router.post("/add-event", upload.single("poster_image"), (req, res, next) => {
//     console.log("📌 /add-event API called!");
//     next();
// }, addClubEvent);












// // Route to fetch club admin details by roll number
// router.get("/profile/:rollNumber", getClubAdminDetails);





// export default router;






































import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { addClubEvent, getClubAdminDetails, updateClubAdmin,getClubAdminEvents ,updateEvent,deleteEvent} from "../controller/clubAdminController.js";

const router = express.Router();

// ✅ Ensure `uploads/` folder (for event posters) exists
const eventUploadsDir = "uploads/";
if (!fs.existsSync(eventUploadsDir)) {
    console.log("📁 Creating uploads/ directory for event posters...");
    fs.mkdirSync(eventUploadsDir, { recursive: true });
}

// ✅ Ensure `clubadminpfp/` folder (for profile pictures) exists
const profileUploadsDir = "clubadminpfp/";
if (!fs.existsSync(profileUploadsDir)) {
    console.log("📁 Creating clubadminpfp/ directory for profile pictures...");
    fs.mkdirSync(profileUploadsDir, { recursive: true });
}

// ✅ Configure Multer for Event Posters (Stored in `uploads/`)
const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("📂 Storing event poster in uploads/ folder...");
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        console.log("🖼️ Event Poster Filename:", uniqueName);
        cb(null, uniqueName);
    },
});

// ✅ Configure Multer for Profile Pictures (Stored in `clubadminpfp/`)
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("📂 Storing profile picture in clubadminpfp/ folder...");
        cb(null, "clubadminpfp/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        console.log("👤 Profile Picture Filename:", uniqueName);
        cb(null, uniqueName);
    },
});

// ✅ File Filter for Images (JPEG, PNG, GIF)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log("⚠️ Invalid file type:", file.mimetype);
        cb(new Error("Only images (JPG, PNG, GIF) are allowed!"), false);
    }
};

// ✅ Apply storage, file filter & size limit (2MB max) for both types of uploads
const uploadEvent = multer({ storage: eventStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });
const uploadProfile = multer({ storage: profileStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });

// ✅ Route to add an event (Uses `uploads/` folder)
router.post("/add-event", uploadEvent.single("poster_image"), (req, res, next) => {
    console.log("📌 /add-event API called!");
    next();
}, addClubEvent);

// ✅ Route to fetch club admin details
router.get("/profile/:rollNumber", getClubAdminDetails);

// ✅ Route to update club admin profile (Uses `clubadminpfp/` folder)
router.put("/profile/:rollNumber", uploadProfile.single("profile_picture"), updateClubAdmin);









//get events
router.get("/profile/:rollNumber/events", (req, res, next) => {
    console.log("✅ Route Hit:", req.params.rollNumber);
    next();
}, getClubAdminEvents);






// //edit evnebts

router.put("/events/:eventId", uploadEvent.single("poster_image"), updateEvent);









//delete events
router.delete("/events/:eventId", deleteEvent);





export default router;
