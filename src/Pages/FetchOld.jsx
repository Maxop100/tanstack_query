import { useEffect } from "react";
import { fetchPosts } from "../api/api";
import { data } from "react-router-dom";

export const FetchOld = () => {

 
  
const getPostData =async ()=>{
    try{
      const res = await fetchPosts();
      res.status === 200 ? res.data : [];
      
      
    }catch{
      console.error("Error fetching posts");
    }

  }

  useEffect(() => {
    getPostData();
  }, []);

  

  return (
    <>
    <h2>Posts</h2>
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
    </>
  )

};
