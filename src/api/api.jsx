import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

export default api;

export const fetchPosts = async () => {
  const response = await api.get("/posts");
  return response.status === 200 ? response.data : [];
};
