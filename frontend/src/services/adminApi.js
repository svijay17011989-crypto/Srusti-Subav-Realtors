import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* Attach admin token */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* Admin login */
export const adminLogin = async (email, password) => {
  const res = await API.post("/auth/admin/login", { email, password });
  if (res.data?.token) {
    localStorage.setItem("adminToken", res.data.token);
  }
  return res.data;
};

export default API;
