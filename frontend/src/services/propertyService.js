import { axiosPublic } from "./api";

// Get all properties (public)
export const getAllProperties = async () => {
  return await axiosPublic.get("/properties");
};

// Get single property
export const getPropertyById = async (id) => {
  return await axiosPublic.get(`/properties/${id}`);
};

// Featured properties (for now same as all, sliced in frontend)
export const getFeaturedProperties = async () => {
  const res = await axiosPublic.get("/properties");
  return res;
};
