import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchStudentCredentials, getClubAdminStatus } from "../api/studentApi";
import { fetchAdminCredentials } from "../api/adminApi";
import { fetchMentorCredentials } from "../api/mentorApi";
import "./css/LoginForm.css";

const LoginForm = ({ role }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const getRoleIcon = (currentRole) => {
        switch (currentRole) {
            case "Student": return "school";
            case "Admin": return "admin_panel_settings";
            case "Club Admin": return "groups";
            case "Mentor": return "psychology";
            default: return "school";
        }
    };

    const roleIcon = getRoleIcon(role);

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
        <div className="login-portal-wrapper bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
            {/* TopAppBar Navigation */}
            <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
                <div
                    className="flex items-center gap-2 pointer-events-auto cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <span className="material-symbols-outlined text-primary text-3xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="font-headline font-extrabold text-2xl text-primary tracking-tighter">ABL Portal</span>
                </div>
            </header>

            <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 pt-24 pb-12">
                {/* Abstract Editorial Background Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-primary-fixed/20 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-tertiary-fixed/30 blur-[100px]"></div>

                <div className="w-full max-w-md relative z-10">
                    {/* Login Card */}
                    <div className="glass-card rounded-3xl p-8 md:p-10 shadow-[0_40px_60px_-15px_rgba(25,28,30,0.06)]">
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-container text-on-primary mb-5 shadow-xl shadow-primary/10">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {roleIcon}
                                </span>
                            </div>
                            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight mb-2">{role} Login</h1>
                            <p className="text-on-surface-variant font-medium">Access your university portal</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-error-container text-on-error-container text-sm font-semibold rounded-lg text-center border border-error/20">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleLogin}>
                            {/* University ID Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-on-surface tracking-wide ml-1" htmlFor="uid">University ID / Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-outline">badge</span>
                                    </div>
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-outline/60 text-on-surface"
                                        id="uid"
                                        name="uid"
                                        placeholder="Enter your specific ID"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-on-surface tracking-wide ml-1" htmlFor="password">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-outline">lock</span>
                                    </div>
                                    <input
                                        className="w-full pl-12 pr-12 py-3 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-outline/60 text-on-surface"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Auxiliary Actions */}
                            <div className="flex items-center justify-between text-sm py-2">
                                <label className="flex items-center cursor-pointer group">
                                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer" type="checkbox" />
                                    <span className="ml-3 font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                                </label>
                                <Link className="font-semibold text-primary hover:text-primary-container transition-colors" to="#">Forgot Password?</Link>
                            </div>

                            {/* CTA Button */}
                            <button
                                className="w-full py-3 px-6 bg-primary text-on-primary font-headline font-bold text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border-0"
                                type="submit"
                                disabled={isLoading}
                                style={{ background: 'linear-gradient(to right, #3a388b, #5250a4)' }}
                            >
                                <span>{isLoading ? "Verifying..." : `${role} Login`}</span>
                                {!isLoading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-outline-variant/20">
                            <p className="text-center text-on-surface-variant text-sm font-medium">
                                First time here?
                                <Link className="text-primary font-bold ml-1 hover:underline" to="#">Register Account</Link>
                            </p>
                        </div>
                    </div>

                    {/* Supporting Text / Editorial Detail */}
                    <div className="mt-12 flex items-start gap-4 px-6">
                        <div className="h-px w-12 bg-primary/30 mt-3"></div>
                        <div>
                            <p className="font-headline text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Academic Integrity</p>
                            <p className="text-xs text-on-surface-variant/80 leading-relaxed italic m-0">
                                Access to the ABL Portal is restricted to authorized credentials. Secure encryption is active for your protection.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            {/* Footer */}
            <footer className="w-full px-8 py-12 mt-auto border-t border-[#abadaf]/15 bg-[#f5f7f9] dark:bg-[#1a1c1e]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-lg font-bold text-[#2c2f31] dark:text-[#e2e2e6] font-headline m-0">
                        ABL Learning Portal
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Privacy Policy</a>
                        <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Terms of Service</a>
                        <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Accessibility</a>
                        <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Contact</a>
                    </div>
                    <p className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-sm font-body m-0">
                        © 2024 ABL Portal. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LoginForm;