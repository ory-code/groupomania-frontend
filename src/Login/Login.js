import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api/Auth";
import { useDispatch } from "react-redux";
import "./Login.css";
import logo from "../assets/icon-noir.png";
import { CONNECT } from "../reducers/user";
const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    })
      .then((res) => {
        if (!res.token) {
          alert("Email ou mots de passe incorrect");
          history.push("/login");
        } else {
          dispatch({
            type: CONNECT,
            payload: {
              token: res.token,
              userId: res.userId,
              isAdmin: res.isAdmin,
            },
          });
          history.push("/posts");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <header>
        <img src={logo} alt="logo groupomania"></img>
        <h1 className="loginH1">Connexion</h1>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          Vous n'avez pas de compte ?
        </button>
      </header>

      <form className="loginForm" onSubmit={onSubmit}>
        <label>Email</label>
        <input
          className="inputForm"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mots de passe</label>
        <input
          className="inputForm"
          type="password"
          value={password}
          placeholder="Mots de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="btnSign" type="submit" />
      </form>
    </div>
  );
};

export default Login;
