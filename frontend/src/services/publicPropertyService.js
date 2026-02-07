import { axiosPublic } from "./api";

export const getPublicProperties = () =>
  axiosPublic.get("/api/properties");

export const getPublicPropertyById = (id) =>
  axiosPublic.get(`/api/properties/${id}`);
