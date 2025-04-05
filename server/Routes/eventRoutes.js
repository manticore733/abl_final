import express from "express";
import { addEvent2, addEvent, uploadMiddleware, fetchEvents, fetchEvents2 ,getAllClubEvents} from "../controller/eventController.js";

const router = express.Router();

router.post("/events", uploadMiddleware, addEvent);
router.post("/events2", addEvent2);
router.get("/events", fetchEvents);
router.get("/events22", fetchEvents2);




router.get("/club-events", getAllClubEvents); // New route to fetch all club events


export default router;