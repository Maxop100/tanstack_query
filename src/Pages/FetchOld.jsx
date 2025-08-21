import { useEffect, useState } from "react";
import { fetchPosts } from "../api/api";


export const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      res.status === 200 ? res.data : [];
      setPosts(res);
      setIsLoading(false);
    }catch{
      console.error("Error fetching posts");
      setIsError(true);
    }

  }

  useEffect(() => {
    getPostData();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error fetching posts</h2>;

  return (
    <>
    <h2>Posts</h2>
    <ul>
      {posts && posts.length > 0 ? (
        posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))
      ) : (
        <li>No posts available</li>
      )}
    </ul>
    </>
  )

};
