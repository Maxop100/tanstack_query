import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../api/api";
import { NavLink, useParams } from "react-router-dom";

export const FetchIndv = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message || "Error fetching post!"}</h2>;

  return (
    <div>
      {console.log(id)}
      <h2 className="text-4xl font-bold text-gray-800 m-4">Post Details</h2>
      {data ? (
        <div className="p-4 rounded-2xl w-[700px] bg-gray-700 shadow-sm border border-gray-100">
          <p className="text-white">ID: {data.id}</p>
          <h3 className="text-lg font-medium text-white">{data.title}</h3>
          <p className="text-white">{data.body}</p>
          <NavLink to="/rq">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                go back</button>
          </NavLink>
        </div>
      ) : (
        <p className="text-gray-500 italic">Post not found</p>
      )}
    </div>
  );
};