import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchStudentCredentials, getClubAdminStatus } from "../api/studentApi";
import { fetchAdminCredentials } from "../api/adminApi";
import { fetchMentorCredentials } from "../api/mentorApi";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft, LogIn, Eye, EyeOff } from "lucide-react"; // Added Eye icons
import "./css/LoginForm.css";


const LoginForm = ({ role }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle state
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            let credentials;
            let isValid = false;


            if (role === "Student" || role === "Club Admin") {
                credentials = await fetchStudentCredentials(username);
                if (role === "Club Admin") {
                    const clubAdminStatus = await getClubAdminStatus(credentials.s_id);
                    if (!clubAdminStatus) throw new Error("Student is not a Club Admin");
                }
                isValid = credentials.s_password === password;
            }
            else if (role === "Admin") {
                credentials = await fetchAdminCredentials(username);
                isValid = credentials.a_password === password;
            }
            else if (role === "Mentor") {
                credentials = await fetchMentorCredentials(username);
                isValid = credentials.m_password === password;
            }
            else {
                throw new Error("Invalid role.");
            }

            if (!isValid) throw new Error("Invalid username or password.");

            sessionStorage.setItem("username", username);
            sessionStorage.setItem("role", role);

            const sessionResponse = await fetch("http://localhost:5000/api/session/generate-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: username, user_type: role.toLowerCase() }),
            });

            const sessionData = await sessionResponse.json();

            if (sessionResponse.ok) {
                if (role === "Club Admin") navigate("/cHomepage");
                else if (role === "Student") navigate("/sHomepage");
                else if (role === "Admin") navigate("/aHomepage");
                else if (role === "Mentor") navigate("/mHomepage");
            } else {
                throw new Error(sessionData.message || "Failed to create session.");
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.message || "Server error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            {/* Hero Section */}
            <div className="login-hero">
                <div className="login-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Welcome Back
                    </motion.h1>
                    <p className="login-subtitle">
                        Access your <strong>{role}</strong> dashboard
                    </p>
                </div>
            </div>

            {/* Material Style Card */}
            <div className="login-card-container">
                <motion.div
                    className="material-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="material-header">
                        <h3>Login</h3>
                    </div>

                    <form onSubmit={handleLogin} className="material-form">

                        {/* Username */}
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="material-input"
                                placeholder="e.g. 2022FHCO045"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password with Eye Icon */}
                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="material-input password-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="error-banner">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="material-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Sign in"}
                        </button>
                    </form>

                    <div className="card-footer">
                        <Link to="/" className="back-link">
                            <ArrowLeft size={16} />
                            <span>Select a different role</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginForm;