import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";

export const FetchRQ = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], // useState
    queryFn: fetchPosts, // useEffect
  });

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
