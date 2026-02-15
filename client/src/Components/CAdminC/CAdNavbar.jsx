// import React from "react";
// import { useNavigate } from "react-router-dom";
// import './css/CAdNavbar.css';

// // ✅ Step 1: Check if AdNavbar is being imported & rendered
// console.log("✅ AdNavbar component is being rendered.");

// const CAdNavbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       console.log("🛑 Logging out..."); // ✅ Step 2: Check if Logout Function 
//       const response = await fetch("http://localhost:5000/api/session/logout", {
//         method: "POST",
//         credentials: "include", // Ensures cookies are cleared
//       });

//       const data = await response.json();
//       console.log("✅ Logout response:", data); // ✅ Step 3: Check Response

//       if (response.ok) {
//         console.log("✅ Logout successful. Navigating to /");
//         navigate("/");
//       } else {
//         console.error("❌ Logout failed:", data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error during logout:", error);
//     }
//   };

//   console.log("✅ Navbar JSX is being returned."); // ✅ Step 4: Check if JSX is being returned

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg">
//         <div className="admin-role-button">
//           <button>
//             club admin
//           </button>
//         </div>
//         <div className="container-fluid">
//           {/* ✅ Step 5: Check if Navbar Container Renders */}
//           {console.log("✅ Navbar container \\\\\\ being rendered.")}

//           {/* Navbar Toggler for Collapse */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavAltMarkup"
//             aria-controls="navbarNavAltMarkup"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNavAltMarkup-s">
//             <div className="navbar-nav">
//               <div className="links-adnav">
//                 <a className="nav-link" href="/cHomepage">Home</a>
//                 <a className="nav-link" href="/cadd-events">Add Events</a>
//                 <a className="nav-link" href="/cadmin-calendar">View Calendar</a>

//               </div>
//               <div className="logout profile">
//                 <a href="/cprofile">
//                   <i className="bi bi-person-circle admin-profile-icon fs-4"></i>
//                 </a>
//                 {/* 🔹 Logout Button */}
//                 <button className="logout-btn" onClick={handleLogout}>
//                   <i className="bi bi-box-arrow-right fs-4"></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default CAdNavbar;































import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/CAdNavbar.css";

const CAdNavbar = () => {
  const navigate = useNavigate();
  const rollNumber = sessionStorage.getItem("username"); // Fetch roll number from sessionStorage

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
         // Redirect and replace history
      navigate("/", { replace: true });
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      {/* Club Admin Text (Now Plain Text Instead of Button) */}
      <div className="admin-role-text">
        Logged in as <strong>Club Admin: {rollNumber}</strong>
      </div>

      {/* Navigation Tabs Centered */}
      <div className="nav-center">
        <a className="nav-link" href="/cHomepage">Home</a>
        <a className="nav-link" href="/cadd-events">Add Events</a>
        <a className="nav-link" href="/cadmin-calendar">View Calendar</a>
      </div>

      {/* Profile Icon & Logout (Right-Aligned) */}
      <div className="logout-profile">
        <a href="/cprofile">
          <i className="bi bi-person-circle admin-profile-icon fs-4"></i>
        </a>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right fs-4"></i>
        </button>
      </div>
    </nav>
  );
};

export default CAdNavbar;
