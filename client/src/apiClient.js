import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // 🍪 Automatically sends the JWT Cookie
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;