import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Store from "../reducers/index";
import { getAllPost, newPost, deletePost } from "../api/Post";
import CreatePostLink from "../components/CreatePostLink";
import ScrollTop from "../components/ScrollTop";
import "./Home.css";
import Post from "../components/Posts";
function Home() {
  const userId = Store.getState().userId;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const addPosts = (post) => {
    newPost(post).then((createdPost) => {
      setPosts([createdPost, ...posts]);
    });
  };
  const deleteMyPost = (id) => {
    deletePost({
      userid: userId,
      id: id,
    }).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };
  useEffect(() => {
    if (!shouldUpdate) return;
    getAllPost().then((res) => {
      if (!res) return;
      setShouldUpdate(false);
      setLoading(false);
      setPosts(res.data);
    });
  }, [posts]);

  return (
    <div className="homePage">
      <Navbar />
      <header className="homeHeader">
        <h1 className="homeH1">Accueil</h1>
      </header>
      <CreatePostLink addPosts={addPosts} />
      <Post posts={posts} deleteAPost={deleteMyPost} />
      <ScrollTop showBelow={250} />
    </div>
  );
}

export default Home;
