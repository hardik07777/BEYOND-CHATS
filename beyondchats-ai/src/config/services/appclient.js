import axios from "axios";

const api = axios.create({
  baseURL: process.env.LARAVEL_API_BASE, // e.g. http://localhost:8000/api
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: false // 🔥 THIS PREVENTS 419
});

export default api;
