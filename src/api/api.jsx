import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

export default api;

export const fetchPosts = async () => {
 try{
   const response = await api.get("/posts");
  return response.status === 200 ? response.data : [];
 }catch(error){
  console.log('Error fetching posts:', error);
 }
};

export const fetchPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.log('Error fetching post by ID:', error);
  }
};
