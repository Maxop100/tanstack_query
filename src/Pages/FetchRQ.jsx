import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

export const FetchRQ = () => {
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    //gcTime: 1000, // 1 second
    //staleTime: 10000, // 10 seconds
    refetchInterval:1000,//1 seconds
    refetchIntervalInBackground: true,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message || " error fetching posts!"}</h2>;

  // check the structure of data
  console.log("Query data:", data);

  // if API returns { data: [...] }
  const posts = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <>
    
      <h2>Posts</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))
        ) :+ (
          <li>No posts available</li>
        )}
      </ul>
    </>
  );
};
