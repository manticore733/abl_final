// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000"; 

// // Function to add an event
// export const addEvent = async (formData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/events`, formData); 
//     return response.data; 
//   } catch (error) {
//     console.error("Error adding event:", error);
//     throw error; 
//   }
// };

// export const addEvent2 = async (formData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/events2`, formData); 
//     return response.data; 
//   } catch (error) {
//     console.error("Error adding event:", error);
//     throw error; 
//   }
// };

// // Fetch events from the backend
// export const fetchEvents = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/events");
//     console.log("API Response:", response.data);
//     return response.data.map((event) => ({
//       title: event.e_name, 
//       date: event.e_date,  
//       url: event.e_link,   
//     }));
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };

// export const fetchEvents2 = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/events22");
//     console.log("API Response:", response.data);
//     return response.data.map((event) => ({
//       image: event.e_img,
//       title: event.e_name, 
//       type: event.e_type,
//       category: event.e_category,
//       date: event.e_date,  
//       organizer: event.e_org,
//       url: event.e_link,   
//     }));
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };



















// // ✅ Function to add an event (Using Club Admin API)
// export const addClubEvent = async (formData) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/api/clubadmin/add-event`, 
//       formData, 
//       {
//         headers: { "Content-Type": "multipart/form-data" }, // Since we are uploading an image
//         withCredentials: true, // Include cookies if using sessions
//       }
//     );
//     return response.data; 
//   } catch (error) {
//     console.error("❌ Error adding event:", error);
//     throw error; 
//   }
// };













// export const fetchAllClubEvents = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/club-events`); // Match the backend route
//     console.log("All Club Events API Response:", response.data);
//     return response.data; // Return all fields as received from the backend
//   } catch (error) {
//     console.error("Error fetching all club events:", error);
//     throw error;
//   }
// };



import apiClient from "../apiClient";

// Public route: Does not strictly need JWT but carries it if available
export const fetchAllClubEvents = async () => {
  const response = await apiClient.get("/api/events");
  return response.data;
};

// Private route: Requires Club Admin role
export const addClubEvent = async (formData) => {
  const response = await apiClient.post("/api/clubadmin/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteClubEvent = async (eventId) => {
  return await apiClient.delete(`/api/clubadmin/events/${eventId}`);
};