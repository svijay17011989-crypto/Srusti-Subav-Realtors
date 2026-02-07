import { axiosAdmin } from "./api";

export const getAdminProperties = async () => {
  const res = await axiosAdmin.get("/properties");
  return res.data;
};

export const deleteProperty = async (id) => {
  return axiosAdmin.delete(`/properties/${id}`);
};

export const updatePropertyStatus = async (id, status) => {
  const res = await fetch(`/api/admin/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ status })
  });

  return res.json();
};
