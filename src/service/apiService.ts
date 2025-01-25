import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:3001",
  // headers: { Authorization: "Bearer token" },
});

export default apiService;
