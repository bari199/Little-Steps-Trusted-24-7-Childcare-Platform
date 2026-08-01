import api from "./api";

// Get All Centers
export const getCenters = async (params = {}) => {
  const response = await api.get("/centers", {
    params,
  });

  return response.data;
};

// Get Single Center
export const getCenterBySlug = async (slug) => {
  const response = await api.get(`/centers/slug/${slug}`);

  return response.data;
};
