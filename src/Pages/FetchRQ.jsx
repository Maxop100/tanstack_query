import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";
import { NavLink } from "react-router-dom";

export const FetchRQ = () => {
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    //gcTime: 1000, // 1 second
    //staleTime: 10000, // 10 seconds
    //refetchInterval:1000,//1 seconds
    //refetchIntervalInBackground: true,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message || " error fetching posts!"}</h2>;

  // check the structure of data
  console.log("Query data:", data);

  // if API returns { data: [...] }
  const posts = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <>

   <h2 className="text-4xl font-bold  text-gray-800 pl-[600px] m-[40px]">Posts</h2>
<ul className="space-y-3 flex flex-col items-center ">
  {posts.length > 0 ? (
    posts.map((post) => (
      <li
        key={post.id}
        className="p-4 rounded-2xl w-[700px]  align-middle bg-gray-700 shadow-sm  item-center hover:shadow-md transition duration-200 border border-gray-100"
      >
        <NavLink to={`/rq/${post.id}`}>
        <p className="text-white">{post.id}</p>
        <span className="text-lg font-medium text-white">{post.title}</span>
        <p className="text-white">{post.body}</p>
        </NavLink>
      </li>
    ))
  ) : (
    <li className="text-gray-500 italic">No posts available</li>
  )}
</ul>

    </>
  );
};
