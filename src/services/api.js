import axios from "axios";

const api = axios.create({
  baseURL: "https://medring-backend.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const d = localStorage.getItem("doctorToken");
  const a = localStorage.getItem("adminToken");

  if (a) config.headers.authorization = a;
  else if (d) config.headers.authorization = d;

  return config;
});

export default api;