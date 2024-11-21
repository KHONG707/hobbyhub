import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostsContext);

  const post = posts.find((p) => p.id === parseInt(id));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    setPosts(
      posts.map((p) =>
        p.id === post.id ? { ...p, title, content, imageUrl } : p
      )
    );
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="update-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;
