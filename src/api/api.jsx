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


export const updatePost = async (id) => {
  return api.patch(`/posts/${id}`,{title:"i have updated"});
}


//infinite scrolling

export const fetchUsers =async ({pageParam=1})=>{
  try{
    const response = await api.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
    console.log(response);
    return response.data;
    
  }catch(error){
    console.log("error fetching users:", error);
  }
}


