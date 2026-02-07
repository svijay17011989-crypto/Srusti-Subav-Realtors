import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* =========================================
   ATTACH ADMIN TOKEN AUTOMATICALLY
========================================= */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* =========================================
   ADMIN LOGIN (✅ FIXED ENDPOINT)
========================================= */
export const adminLogin = async (email, password) => {
  const res = await API.post("/auth/admin/login", {
    email,
    password,
  });

  /* Save token */
  if (res.data?.token) {
    localStorage.setItem("adminToken", res.data.token);
  }

  return res.data;
};

export default API;
