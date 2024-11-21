import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";

const HomeFeed = () => {
  const { posts, setPosts } = useContext(PostsContext); // Access and update posts
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [sortOption, setSortOption] = useState("createdAt"); // Sorting option state

  // Sort posts based on selected option
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    }
    if (sortOption === "upvotes") {
      return b.upvotes - a.upvotes; // Most upvotes first
    }
    return 0;
  });

  // Filter posts by search query
  const filteredPosts = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle upvote click
  const handleUpvote = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  return (
    <div>
      <h1>Home Feed</h1>

      {/* Create Post Button */}
      <button
        onClick={() => navigate("/create")}
        style={{
          padding: "10px 15px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Create New Post
      </button>

      {/* Search Bar */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Sorting Options */}
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="createdAt">Time Created</option>
          <option value="upvotes">Upvotes</option>
        </select>
      </div>

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <p>No posts match your search.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          >
            {/* Post Title (clickable to navigate to PostPage) */}
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              {post.title}
            </h3>
            <p>
              <strong>Created:</strong> {new Date(post.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Upvotes:</strong> {post.upvotes}
            </p>
            {/* Upvote Button */}
            <button
              onClick={() => handleUpvote(post.id)} // Increase upvotes
              style={{
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upvote
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeFeed;
