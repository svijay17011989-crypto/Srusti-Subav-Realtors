const API_BASE = import.meta.env.VITE_API_BASE_URL.replace("/api/properties", "");

export const getImageUrl = (path) => {
  if (!path) return "/no-image.png";

  if (path.startsWith("http")) return path;

  return `${API_BASE}/${path.replace(/^\//, "")}`;
};
