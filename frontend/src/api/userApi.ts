import axiosClient from "./axiosClient";

export const userApi = {
getAll: async (params?: {
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}) => {
  const res = await axiosClient.get("/users", { params });
  return res.data;
},


  create: async (user: any) => {
    const res = await axiosClient.post("/users", user);
    return res.data;
  },

  update: async (id: number, user: any) => {
    const res = await axiosClient.put(`/users/${id}`, user);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data;
  },
};
