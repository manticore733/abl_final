import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // NEW: Add a ref to act as a gatekeeper against React.StrictMode double-firing
  const hasHandledError = useRef(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/protected-route", {
          credentials: "include",
        });

        if (!res.ok) {
          // GATEKEEPER: Stop if we already fired a toast
          if (hasHandledError.current) return;
          hasHandledError.current = true;

          const storedRole = sessionStorage.getItem("role");

          if (storedRole) {
            showToast('error', 'Session Expired', 'Your session timed out. Please log in again.');
          } else {
            showToast('error', 'Access Denied', 'Please log in to view this page.');
          }

          // Move the clear down here so it happens AFTER the check
          sessionStorage.clear();
          navigate("/");
        } else {
          setLoading(false);
        }
      } catch (err) {
        // GATEKEEPER: Stop if we already fired a toast
        if (hasHandledError.current) return;
        hasHandledError.current = true;

        console.error("Session check error:", err);
        showToast('error', 'Connection Error', 'Could not verify session. Please log in again.');
        sessionStorage.clear();
        navigate("/");
      }
    };

    checkSession();
  }, [navigate, showToast]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter', color: '#64748b', fontWeight: 600 }}>Verifying secure session...</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;