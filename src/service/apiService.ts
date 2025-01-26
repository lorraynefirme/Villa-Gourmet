import axios from "axios";

const apiService = axios.create({
  baseURL: "https://api-produtos-one.vercel.app/",
  // headers: { Authorization: "Bearer token" },
});

export default apiService;
