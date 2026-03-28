import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Topbar from "./Components/Topbar";
import { ToastProvider } from "./Components/ToastContext";

// Login Pages
import SelectRole from "./Pages/SelectRole";
import StudentLogin from "./Pages/Student/studentLogin";
import AdminLogin from "./Pages/Admin/adLogin";
import ClubAdLogin from "./Pages/Club Admin/clubadLogin";
import MentorLogin from "./Pages/Mentor/mentorLogin";

// Mentor Pages
import MHomepage from "./Pages/Mentor/mHomepage";
import ViewStudents from "./Pages/Mentor/ViewStudents";
import StudentDetails from "./Pages/Mentor/StudentDetails";
import MProfile from "./Pages/Mentor/MProfile";

// Student Pages
import SHomepage from "./Pages/Student/sHomepage";
import SMakeEntry from "./Pages/Student/SMakeEntry";
import SCalendar from "./Pages/Student/SCalendar";
import SProfile from "./Pages/Student/SProfile";

// Club Admin Pages
import CHomepage from "./Pages/Club Admin/cHomepage";
import CAddEvents from "./Pages/Club Admin/CAddEvents";
import CAdCalendar from "./Pages/Club Admin/CAdCalendar";
import CProfile from "./Pages/Club Admin/CProfile";

// Admin Pages
import AHomepage from "./Pages/Admin/aHomepage";
import AddMentor from "./Pages/Admin/AddMentor";
import AddEvents from "./Pages/Admin/AddEvents";
import AdViewStudents from "./Pages/Admin/AdViewStudents";
import AdViewMentor from "./Pages/Admin/AdViewMentor";
import Adprofile from "./Pages/Admin/Adprofile";

const InnerApp = () => {
  const location = useLocation();

  return (
    <>
      <Topbar />
      <ToastProvider>
        <Routes key={location.pathname}>
          {/* Role Selection */}
          <Route path="/" element={<SelectRole />} />

          {/* Login Pages */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/club-admin-login" element={<ClubAdLogin />} />
          <Route path="/mentor-login" element={<MentorLogin />} />

          {/* Mentor Pages */}
          <Route path="/mHomepage" element={<ProtectedRoute><MHomepage /></ProtectedRoute>} />
          <Route path="/view-students" element={<ProtectedRoute><ViewStudents /></ProtectedRoute>} />
          <Route path="/get-student" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
          <Route path="/get-student/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
          <Route path="/mprofile" element={<ProtectedRoute><MProfile /></ProtectedRoute>} />

          {/* Student Pages */}
          <Route path="/sHomepage" element={<ProtectedRoute><SHomepage /></ProtectedRoute>} />
          <Route path="/make-entry" element={<ProtectedRoute><SMakeEntry /></ProtectedRoute>} />
          <Route path="/student-calendar" element={<ProtectedRoute><SCalendar /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><SProfile /></ProtectedRoute>} />

          {/* Admin Pages */}
          <Route path="/aHomepage" element={<ProtectedRoute><AHomepage /></ProtectedRoute>} />
          <Route path="/add-mentor" element={<ProtectedRoute><AddMentor /></ProtectedRoute>} />
          <Route path="/add-events" element={<ProtectedRoute><AddEvents /></ProtectedRoute>} />
          <Route path="/ad-view-students" element={<ProtectedRoute><AdViewStudents /></ProtectedRoute>} />
          <Route path="/ad-view-mentor" element={<ProtectedRoute><AdViewMentor /></ProtectedRoute>} />
          <Route path="/adprofile" element={<ProtectedRoute><Adprofile /></ProtectedRoute>} />

          {/* Club Admin Pages */}
          <Route path="/cHomepage" element={<ProtectedRoute><CHomepage /></ProtectedRoute>} />
          <Route path="/cadd-events" element={<ProtectedRoute><CAddEvents /></ProtectedRoute>} />
          <Route path="/cadmin-calendar" element={<ProtectedRoute><CAdCalendar /></ProtectedRoute>} />
          <Route path="/cprofile" element={<ProtectedRoute><CProfile /></ProtectedRoute>} />
        </Routes>
      </ToastProvider>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
};

export default App;
