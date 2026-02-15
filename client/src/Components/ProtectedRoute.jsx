// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/protected-route", {
//           credentials: "include",
//         });

//         if (!res.ok) {
//           navigate("/select-role");
//         } else {
//           setLoading(false);
//         }
//       } catch (err) {
//         navigate("/select-role");
//       }
//     };

//     checkSession();
//   }, [navigate]);

//   if (loading) return <div>Loading...</div>;

//   return children;
// };

// export default ProtectedRoute;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/protected-route", {
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/");  // Change this line to navigate to the Select Role page ("/")
        } else {
          setLoading(false);
        }
      } catch (err) {
        navigate("/");  // Change this line as well
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
