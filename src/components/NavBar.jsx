import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(PostsContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="navbar">
      <div>
        <h1 onClick={() => navigate("/")}>HistoryHub</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          onChange={handleSearch}
        />
      </div>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/create")}>Create New Post</button>
      </div>
    </nav>
  );
};

export default NavBar;
