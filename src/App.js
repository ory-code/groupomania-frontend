import { BrowserRouter as Router, Route } from "react-router-dom";
import OnePost from "./OnePost/OnePost";
import Home from "./Home/Home";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Profil from "./Profil/Profil";
import "./App.css";
import React from "react";
function App() {


  return (
    <Router>
      <Route path="/posts" exact render={() => <Home />}></Route>
      <Route path="/signup" exact render={() => <Signup />}></Route>
      <Route path="/login" exact render={() => <Login />}></Route>
      <Route path="/profil/:id" exact render={() => <Profil />}></Route>
      <Route path="/posts/:id" render={() => <OnePost />}></Route>
    </Router>
  );
}
export default App;
