import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage, allPages);
        return allPages.length !== 10 ? lastPage + 1 : undefined;
      },
    });

  console.log(data);

  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 1;

  //     if (bottom && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   };

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Infinite Scroll with React Query v5</h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      </div>
    </div>
  );
};
