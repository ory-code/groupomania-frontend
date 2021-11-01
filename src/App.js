import { BrowserRouter as Router, Route } from "react-router-dom";
import OnePost from "./OnePost/OnePost";
import Home from "./Home/Home";
import {GuardRoutes} from "./components/GuardRoutes";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Profil from "./Profil/Profil";
import "./App.css";
import React from "react";
function App() {


  return (
    <Router>
      <GuardRoutes path="/posts" exact auth={false} component={() => <Home />}></GuardRoutes>
      <Route path="/signup" exact render={() => <Signup />}></Route>
      <Route path="/login" exact render={() => <Login />}></Route>
      <GuardRoutes path="/profil/:id" exact auth={false} component={() => <Profil />}></GuardRoutes>
      <GuardRoutes path="/posts/:id" auth={false}  component={() => <OnePost />}></GuardRoutes>
      <GuardRoutes path="/" exact auth={false} component={() => <Home />}></GuardRoutes>
    </Router>
  );
}
export default App;
