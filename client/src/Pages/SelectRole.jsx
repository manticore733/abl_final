import React from "react";
import "./css/SelectRole.css";
import Topbar from "../Components/Topbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Users, Lightbulb, ChevronRight } from "lucide-react";

const SelectRole = () => {
  const roles = [
    {
      title: "Student",
      desc: "Coursework & Grades",
      path: "/student-login",
      icon: <GraduationCap size={32} />
    },
    {
      title: "Faculty",
      desc: "Mentorship & Review",
      path: "/mentor-login",
      icon: <Lightbulb size={32} />
    },
    {
      title: "Club Admin",
      desc: "Events & Management",
      path: "/club-admin-login",
      icon: <Users size={32} />
    },
    {
      title: "Admin",
      desc: "System Control",
      path: "/admin-login",
      icon: <ShieldCheck size={32} />
    },
  ];

  return (
    <div className="page-wrapper">

      {/* 1. The Hero Section: Branding & Background */}
      <div className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ABL Learning Portal
          </motion.h1>
          <p className="hero-instruction">Select your access role to continue</p>
        </div>

        {/* Decorative background shapes */}
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </div>

      {/* 2. The Overlapping Cards Section */}
      <div className="cards-container">
        <div className="cards-row">
          {roles.map((role, index) => (
            <Link to={role.path} key={index} className="card-link">
              <motion.div
                className="pro-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="icon-box">
                  {role.icon}
                </div>
                <div className="text-content">
                  <h3>{role.title}</h3>
                  <p>{role.desc}</p>
                </div>
                <div className="hover-indicator">
                  <span>Login</span>
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectRole;