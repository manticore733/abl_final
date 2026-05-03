// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000"; // Backend URL

// // Function to fetch student credentials by username
// export const fetchAdminCredentials = async (username) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/admin/credentials/${username}`);
//     return response.data; // Return the student credentials
//   } catch (error) {
//     console.error("Error fetching admin credentials:", error);
//     throw error; // Re-throw the error for the caller to handle
//   }
// };

// export const getMentorsByBranch = async (branch) => {
//   try {
//     // If no branch is selected, pass "all" to fetch all mentors
//     const branchToFetch = branch ? branch : "all";
//     const response = await axios.get(`${API_BASE_URL}/api/admin/getMentors/${branchToFetch}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching mentors:", error);
//     return [];
//   }
// };

// // ✅ Delete Mentor API Call
// export const deleteMentor = async (m_id) => {
//   await axios.delete(`${API_BASE_URL}/api/admin/deleteMentor/${m_id}`);
// };

// // ✅ Increment Semester API Call
// export const incrementSemester = async (m_id) => {
//   const response = await axios.put(`${API_BASE_URL}/api/admin/incrementSemester/${m_id}`);
//   return response.data;
// };

// export const fetchStudentsByFilters = async (section, branch, semester) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/admin/getStudents`, {
//       params: { section, branch, semester }, // ✅ Send filters as query params
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     return [];
//   }
// };


import apiClient from "../apiClient";

// 🧑‍🏫 Mentor Management
export const addMentor = async (formData) => {
  const response = await apiClient.post("/api/admin/add-mentor", formData, {
    headers: { "Content-Type": "multipart/form-data" }, // Handles profile pic
  });
  return response.data;
};

export const getMentorsByBranch = async (branch = "all") => {
  const response = await apiClient.get(`/api/admin/mentors/branch/${branch}`);
  return response.data; // Backend returns the mentor array directly
};

export const deleteMentor = async (m_id) => {
  await apiClient.delete(`/api/admin/mentors/${m_id}`);
};

export const incrementSemester = async (m_id) => {
  const response = await apiClient.put(`/api/admin/mentors/${m_id}/increment`);
  return response.data;
};

// 🎓 Student Analytics
export const fetchStudentsByFilters = async (section, branch, semester) => {
  const response = await apiClient.get("/api/admin/students-points", {
    params: { section, branch, semester },
  });
  return response.data;
};

export const getVisualizationMetadata = async () => {
  const response = await apiClient.get("/api/admin/metadata");
  return response.data.data;
};