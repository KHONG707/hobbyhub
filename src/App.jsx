import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import PostPage from "./components/PostPage";
import CreatePost from "./components/CreatePost";
import { PostsProvider } from "./context/PostsContext";

const App = () => {
  return (
    <PostsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </PostsProvider>
  );
};

export default App;
