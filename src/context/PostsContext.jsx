import React, { createContext, useState } from "react";
import postsData from "../data/postsData"; // Import mock data

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(postsData); // Initialize with mock data

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
