import axios from "axios";

const API = "http://localhost:5000/api/admin/hero";

export const getHeroes = () => axios.get(API);
export const updateHero = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteHero = (id) => axios.delete(`${API}/${id}`);
