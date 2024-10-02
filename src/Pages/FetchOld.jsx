import axios from "axios";
import { useEffect, useState } from "react";
// import { fetchPosts } from "../API/api";

export const FetchOld = () => {
  // States for loading, error, and posts data
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch posts data function
  const getPostsData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3"
      );
      if (res.status === 200) {
        setPosts(res.data); // Set the fetched posts data
        setIsLoading(false); // Turn off loading state
      }
    } catch (error) {
      console.error(error);
      setIsError(true); // Set error state
      setIsLoading(false); // Turn off loading state
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  // Conditional rendering based on loading, error, and posts data
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
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
