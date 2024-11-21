import React, { useState, useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl: imageUrl.trim() ? imageUrl : null, // Save imageUrl if provided
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    navigate("/"); // Navigate back to the Home Feed
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <label htmlFor="title">Title (required):</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />

        <label htmlFor="content">Content (optional):</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        ></textarea>

        <label htmlFor="imageUrl">Image URL (optional):</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
