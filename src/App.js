import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector} from "react-redux"
import OnePost from "./OnePost/OnePost";
import Home from "./Home/Home";

import {GuardRoutes} from "./components/GuardRoutes";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Profil from "./Profil/Profil";
import "./App.css";
import React from "react";
function App() {

const auth = useSelector(state => state)





  return (
    <Router>
      <GuardRoutes path="/posts" exact auth={auth.userId != null} component={() => <Home />}></GuardRoutes>
      <Route path="/signup" exact render={() => <Signup />}></Route>
      <Route path="/login" exact render={() => <Login />}></Route>
      <GuardRoutes path="/profil/:id" exact auth={auth.userId != null} component={() => <Profil />}></GuardRoutes>
      <GuardRoutes path="/posts/:id" auth={auth.userId != null}  component={() => <OnePost />}></GuardRoutes>
      <GuardRoutes path="/" exact auth={auth.userId != null} component={() => <Home />}></GuardRoutes>
    </Router>
  );
}
export default App;
