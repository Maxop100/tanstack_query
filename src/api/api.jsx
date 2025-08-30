import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

export default api;

export const fetchPosts = async (pageNumber) => {
 try{
   const response = await api.get(`/posts?_start=${pageNumber}&_limit=4`);
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

export const deletePost = async (id) => {
  return api.delete(`/posts/${id}`);
}

