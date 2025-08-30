import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {

const [pageNumber, setPageNumber] = useState(0);

const queryClient = useQueryClient();

  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    //gcTime: 1000, // 1 second
    //staleTime: 10000, // 10 seconds
    //refetchInterval:1000,//1 seconds
    //refetchIntervalInBackground: true,
    placeholderData:keepPreviousData,


  });


 const deleteMutation =useMutation({
  mutationFn:(id)=>deletePost(id),
  onSuccess:(data,id)=>{
    queryClient.setQueryData(["posts", pageNumber], (oldData) => {
      return oldData.filter((post) => post.id !== id);
    });
  }
 })

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message || " error fetching posts!"}</h2>;

  // check the structure of data
 

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
        <button onClick={() => deleteMutation.mutate(post.id)} className="px-4 m-2 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">Delete</button>
      </li>
    ))
  ) : (
    <li className="text-gray-500 italic">No posts available</li>
  )}
</ul>

<div className="flex items-center justify-center gap-4 mt-6">
  <button disabled={pageNumber === 0?true:false} onClick={() => setPageNumber((prev) => prev - 4)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition">
    Previous
  </button>

  <h2 className="text-lg font-semibold text-gray-800">{pageNumber / 4 + 1}</h2>

  <button onClick={() => setPageNumber((prev) => prev + 4)} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
    Next
  </button>
</div>


    </>
  );
};
