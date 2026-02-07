import axios from "axios";

/**
 * VITE_API_BASE_URL should be:
 * http://localhost:5000/api
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* Public Axios (NO /api duplication) */
export const axiosPublic = axios.create({
  baseURL: API_BASE,
});

/* Admin Axios */
export const axiosAdmin = axios.create({
  baseURL: API_BASE,
});

export default axiosPublic;
