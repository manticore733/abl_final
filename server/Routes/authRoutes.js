// Routes/authRoutes.js
import express from "express";
import { login, logout } from "../controller/authController.js";
import { validateSession } from "../middleware/authMiddleware.js";

const router = express.Router();

// Notice standard naming: No "generate-token", just /login
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", validateSession, (req, res) => {
    res.status(200).json({ success: true, message: "Valid Session", user: req.user });
});

export default router;