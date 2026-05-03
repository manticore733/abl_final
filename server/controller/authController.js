import jwt from "jsonwebtoken";
import Student from "../postgres/model/Student.js";
import Admin from "../postgres/model/Admin.js";
import Mentor from "../postgres/model/Mentor.js";
import ClubAdmin from "../postgres/model/ClubAdmin.js";

// Standardized Response
const sendResponse = (res, statusCode, success, data, message = null) => {
    return res.status(statusCode).json({ success, data, message });
};

export const login = async (req, res) => {
    try {
        const { username, password, role } = req.body; // role can be: 'student', 'admin', 'mentor', 'clubadmin'

        if (!username || !password || !role) {
            return sendResponse(res, 400, false, null, "Username, password, and role are required.");
        }

        let user = null;
        let userId = null;

        // 1. Find the user based on their role
        if (role === "student") {
            user = await Student.findOne({ where: { s_username: username } });
            userId = user?.s_id;
        } else if (role === "admin") {
            user = await Admin.findOne({ where: { a_username: username } });
            userId = user?.a_id;
        } else if (role === "mentor") {
            user = await Mentor.findOne({ where: { m_username: username } });
            userId = user?.m_id;
        } else if (role === "clubadmin") {
            user = await ClubAdmin.findOne({ where: { roll_number: username } });
            userId = user?.roll_number; // ClubAdmins use roll_number as ID
        } else {
            return sendResponse(res, 400, false, null, "Invalid role specified.");
        }

        // 2. Check if user exists and password matches
        // WARNING: Plain text comparison. Upgrade to bcrypt later!
        const passwordField = role === 'clubadmin' ? user?.phone_number : user?.[`${role.charAt(0)}_password`] || user?.a_password;
        // Note: You might need to adjust the exact password field name based on your ClubAdmin logic

        if (!user || password !== (user.s_password || user.a_password || user.m_password)) {
            return sendResponse(res, 401, false, null, "Invalid credentials.");
        }

        // 3. Generate the JWT Token (Embed the ID and Role)
        const token = jwt.sign(
            { id: userId, role: role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 1 day
        );

        // 4. Send the token in an HTTP-Only cookie
        res.cookie("sessionToken", token, {
            httpOnly: true, // Prevents JavaScript XSS attacks
            secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });

        return sendResponse(res, 200, true, { id: userId, role }, "Login successful.");

    } catch (error) {
        console.error("Login Error:", error);
        return sendResponse(res, 500, false, null, "Internal server error during login.");
    }
};

export const logout = (req, res) => {
    res.clearCookie("sessionToken");
    return sendResponse(res, 200, true, null, "Logged out successfully.");
};