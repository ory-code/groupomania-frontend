import React, { useState } from "react";
import { signUp } from "../api/Auth";
import "./Signup.css";
import logo from "../assets/icon-noir.png";
import { useHistory } from "react-router";
const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    signUp({
      firstname: firstname,
      name: name,
      email: email,
      password: password,
    })
    history.push("/login");
  };

  return (
    <section>
      <div className="header">
        <img src={logo} alt="logo groupomania"></img>
        <h1 className="signupH1"> Inscription </h1>
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          Vous avez déjà un compte ?
        </button>
      </div>
      <form className="signup" onSubmit={onSubmit}>
        <input
          className="inputForm"
          type="text"
          placeholder="Prénom"
          value={firstname}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="inputForm"
          type="text"
          placeholder="Nom"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="inputForm"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputForm"
          type="password"
          placeholder="Mots de passe"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="btnSign" type="submit" />
      </form>
    </section>
  );
};

export default Signup;
