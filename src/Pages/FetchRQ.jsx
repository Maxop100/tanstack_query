import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

export const FetchRQ = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error fetching posts</h2>;

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
