import React from "react";
import Navbar from "../components/Navbar";
import CreatePostLink from "../components/CreatePostLink";
import ScrollTop from "../components/ScrollTop";
import "./Home.css"
import Post from "../components/Posts";
function Home() {
  return (
    <div className="homePage">
      <Navbar />
      <header className="homeHeader"><h1 className="homeH1">Accueil</h1></header>
      <CreatePostLink />
      <Post/>
      <ScrollTop showBelow={250}/>

    </div>
  );
}

export default Home;
