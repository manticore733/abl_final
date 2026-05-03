import express from "express";
import { getAllClubEvents } from "../controller/eventController.js";

const router = express.Router();

// ==========================================
// 📢 PUBLIC EVENT ROUTES
// ==========================================
// Anyone can view the events, so we do NOT apply the JWT validateSession here!

router.get("/events", getAllClubEvents);
router.get("/club-events", getAllClubEvents); // Keeping this for UI compatibility

export default router;