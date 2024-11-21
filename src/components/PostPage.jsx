import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";

const PostPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const { posts, setPosts } = useContext(PostsContext); // Access and update posts

  // Find the post by ID
  const post = posts.find((p) => p.id === parseInt(id));

  const [isEditing, setIsEditing] = useState(false); // Track if the post is being edited
  const [editedTitle, setEditedTitle] = useState(post?.title || "");
  const [editedContent, setEditedContent] = useState(post?.content || "");
  const [editedImageUrl, setEditedImageUrl] = useState(post?.imageUrl || "");
  const [newComment, setNewComment] = useState(""); // Track the new comment input

  if (!post) {
    return <h1>Post Not Found</h1>;
  }

  // Handle saving the edited post
  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    const updatedPosts = posts.map((p) =>
      p.id === post.id
        ? { ...p, title: editedTitle, content: editedContent, imageUrl: editedImageUrl }
        : p
    );

    setPosts(updatedPosts); // Update the posts context
    setIsEditing(false); // Exit editing mode
  };

  // Handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const updatedPosts = posts.map((p) =>
      p.id === post.id
        ? { ...p, comments: [...p.comments, newComment.trim()] }
        : p
    );

    setPosts(updatedPosts); // Update the posts context
    setNewComment(""); // Clear the input field
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h1>Edit Post</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {/* Title Input */}
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Content Input */}
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows="4"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              ></textarea>
            </div>

            {/* Image URL Input */}
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="url"
                id="imageUrl"
                value={editedImageUrl}
                onChange={(e) => setEditedImageUrl(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Save
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                padding: "10px 15px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>
            <strong>Created:</strong> {new Date(post.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Upvotes:</strong> {post.upvotes}
          </p>
          <p>{post.content}</p>

          {/* Render the image if it exists */}
          {post.imageUrl && (
            <div>
              <h3>Image:</h3>
              <img
                src={post.imageUrl}
                alt="Post"
                style={{ maxWidth: "100%", borderRadius: "5px", marginTop: "15px" }}
              />
            </div>
          )}

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Edit Post
          </button>

          {/* Comments Section */}
          <div style={{ marginTop: "20px" }}>
            <h2>Comments</h2>

            {/* Display Comments */}
            {post.comments.length > 0 ? (
              <ul>
                {post.comments.map((comment, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} style={{ marginTop: "20px" }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              ></textarea>
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
                Add Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
