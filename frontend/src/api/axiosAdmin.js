import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/admin",
});

/* ======================================================
   ATTACH ADMIN TOKEN AUTOMATICALLY
====================================================== */
axiosAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAdmin;
