// middleware/uploadMiddleware.js
import multer from "multer";
import fs from "fs";
import path from "path";

// 📁 Ensure directories exist
const eventUploadsDir = "uploads/";
if (!fs.existsSync(eventUploadsDir)) {
    fs.mkdirSync(eventUploadsDir, { recursive: true });
}

const profileUploadsDir = "clubadminpfp/";
if (!fs.existsSync(profileUploadsDir)) {
    fs.mkdirSync(profileUploadsDir, { recursive: true });
}

// 🖼️ Storage for Event Posters
const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, uniqueName);
    },
});

// 👤 Storage for Profile Pictures
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "clubadminpfp/"),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// 🛡️ File Filter (Only Images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images (JPG, PNG, GIF) are allowed!"), false);
    }
};

// 📦 Export the configured middleware
export const uploadEvent = multer({
    storage: eventStorage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});

export const uploadProfile = multer({
    storage: profileStorage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});