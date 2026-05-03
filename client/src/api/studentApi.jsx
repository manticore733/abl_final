// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";

// export const fetchStudentCredentials = async (username) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/students/credentials/${username}`);
//     return response.data; 
//   } catch (error) {
//     console.error("Error fetching student credentials:", error);
//     throw error; 
//   }
// };

// export const getClubAdminStatus = async (s_id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/students/verify-role/${s_id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching student credentials:", error);
//     throw error;
//   }

// }

// export const submitStudentEntry = async (formData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/api/student/make-entry`, formData, {
//       withCredentials: true, 
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data; 
//   } catch (error) {
//     console.error("Error submitting student entry:", error);
//     throw error; 
//   }
// };

// export const fetchStudentInfo = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/student/profile", {
//       method: "GET",
//       credentials: "include", // Send cookies
//     });

//     console.log("🔍 API Response Object:", response);

//     const text = await response.text(); // Get raw response
//     console.log("🔍 Response Text (Before JSON Parsing):", text);

//     const data = JSON.parse(text); // Convert to JSON
//     console.log("✅ Parsed JSON Data:", data);

//     return data;
//   } catch (error) {
//     console.error("❌ Error fetching student info:", error);
//     return null;
//   }
// };

// export const fetchStudentActivityInfo = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/student/student-activity", {
//       method: "GET",
//       credentials: "include", // Send cookies
//     });

//     console.log("🔍 API Response Object:", response);

//     const text = await response.text(); // Get raw response
//     console.log("🔍 Response Text (Before JSON Parsing):", text);

//     const data = JSON.parse(text); // Convert to JSON
//     console.log("✅ Parsed JSON Data:", data);

//     return data;
//   } catch (error) {
//     console.error("❌ Error fetching student info:", error);
//     return null;
//   }
// };

import axios from "axios";

// ✅ Master Axios Instance
// Every request sent through this will automatically attach your secure JWT Cookie!
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🗑️ DELETED: fetchStudentCredentials (handled by auth backend)
// 🗑️ DELETED: getClubAdminStatus (handled by auth backend)

export const submitStudentEntry = async (formData) => {
  try {
    const response = await apiClient.post("/api/student/make-entry", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting student entry:", error);
    throw error;
  }
};

export const fetchStudentInfo = async () => {
  try {
    const response = await apiClient.get("/api/student/profile");
    // ✅ Extract the 'data' payload from our new Standardized Backend Response format
    return response.data.data;
  } catch (error) {
    console.error("❌ Error fetching student info:", error);
    return null;
  }
};

export const fetchStudentActivityInfo = async () => {
  try {
    const response = await apiClient.get("/api/student/student-activity");
    // ✅ Extract the 'data' payload
    return response.data.data;
  } catch (error) {
    console.error("❌ Error fetching student activity:", error);
    return null;
  }
};