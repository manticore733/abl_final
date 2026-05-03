// import Session from "../postgres/model/Session.js";

// export const validateSession = async (req, res, next) => {
//     try {
//         console.log("🔹 Checking session...");

//         // 1️⃣ Get session token from cookies
//         const sessionToken = req.cookies?.sessionToken; 
//         console.log("🔹 Received Session Token:", sessionToken);

//         if (!sessionToken) {
//             console.log("⛔ No session token found.");
//             return res.status(401).json({ message: "Unauthorized: No session token found." });
//         }

//         // 2️⃣ Check if session exists in the database
//         const session = await Session.findOne({ where: { session_token: sessionToken } });

//         if (!session) {
//             console.log("⛔ Invalid session: Not found in database.");
//             return res.status(401).json({ message: "Unauthorized: Invalid session." });
//         }

//         // 3️⃣ Check if session has expired
//         const sessionExpiry = new Date(session.expires_at);
//         console.log("🔹 Session Expires At:", sessionExpiry);

//         if (sessionExpiry < new Date()) {
//             console.log("⛔ Session expired.");
//             return res.status(401).json({ message: "Session expired. Please log in again." });
//         }

//         // 4️⃣ If session is valid, proceed
//         console.log("✅ Session is valid. Allowing access.");
//         req.user = { user_id: session.user_id, user_type: session.user_type };
//         next();
//     } catch (error) {
//         console.error("❌ Error validating session:", error);
//         res.status(500).json({ message: "Server error", error: error.toString() });
//     }
// };


import jwt from "jsonwebtoken";

export const validateSession = (req, res, next) => {
    try {
        // 1. Check if the token exists in the cookies
        const token = req.cookies?.sessionToken;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
        }

        // 2. Verify the token using your secret key
        // If it's expired or tampered with, this will throw an error automatically
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach the decrypted user payload (id, role) to the request
        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired session." });
    }
};

// Bonus: Role-Based Access Control (RBAC) Middleware
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Forbidden: You do not have permission to access this resource." });
        }
        next();
    };
};