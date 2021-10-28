import React, { useEffect, useState } from "react";
import "../components/Navbar.css";
import Store from "../reducers/index";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useHistory } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/icon-noir.png";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { DISCONNECT } from "../reducers/user";
const Navbar = () => {
  const [userId, setUserId] = useState(Store.getState().userId);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserId(Store.getState().userId);
  }, [userId]);

  const logout = () => {
    dispatch({ type: DISCONNECT });
    history.push("/login");
  };
  const goHome = () => {
    history.push("/posts");
  };
  return (
    <nav className="navbar">
      <img onClick={goHome} src={logo} alt="logo groupomania"></img>
      <div className="btnNav">
        <AccountBoxIcon
          className="profilIcn"
          onClick={() => {
            history.push(`/profil/${userId}`);
          }}
        />

        <LogoutIcon onClick={logout} className="logoutIcn" />
      </div>
    </nav>
  );
};

export default Navbar;
