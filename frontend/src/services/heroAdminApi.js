import axiosAdmin from "../api/axiosAdmin";

export const getHeroes = () => axiosAdmin.get("/hero");
export const updateHero = (id, data) =>
  axiosAdmin.put(`/hero/${id}`, data);
export const deleteHero = (id) =>
  axiosAdmin.delete(`/hero/${id}`);
