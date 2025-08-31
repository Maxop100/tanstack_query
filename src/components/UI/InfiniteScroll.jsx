import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["Users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Infinite Scroll
      </h1>

      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
        {data?.pages.map((page, index) => (
          <div key={index} className="space-y-3">
            {page.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-8 p-8 bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:bg-blue-50 transition"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-14 h-14 rounded-full border border-gray-300 shadow"
                />
                <p className="text-lg font-medium text-gray-800 hover:text-blue-600 transition">
                  {user.login}
                </p>
              </div>
            ))}
          </div>
        ))}

        {/* 👇 Sentinel div for triggering fetchNextPage */}
        <div ref={ref} className="h-12 flex items-center justify-center">
          {isFetchingNextPage ? (
            <p className="text-gray-500">Loading more users...</p>
          ) : !hasNextPage ? (
            <p className="text-gray-400">No more users to load</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
