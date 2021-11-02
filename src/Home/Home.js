import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Store from "../reducers/index";
import { getAllPost, newPost, deletePost } from "../api/Post";
import CreatePostLink from "../components/CreatePostLink";
import ScrollTop from "../components/ScrollTop";
import "./Home.css";
import Post from "../components/Posts";
import Loading from "../components/Loading";

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

const updatePosts = (post) => {
  setPosts([post, ...posts.filter(p => post.id !== p.id)]);
  
}





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
  }, [shouldUpdate]);

  return loading ? (<Loading/>) : (
    <div className="homePage">
      <Navbar />
      <header className="homeHeader">
        <h1 className="homeH1">Accueil</h1>
      </header>
      <CreatePostLink addPosts={addPosts} />
      <Post posts={posts} deleteAPost={deleteMyPost} updatePost={updatePosts} />
      <ScrollTop showBelow={250} />
    </div>
  );
}

export default Home;
