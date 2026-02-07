import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend port differs
  withCredentials: true,
});

export default instance;
