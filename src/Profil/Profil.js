import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { deleteProfil, getOneProfil } from "../api/Profil";
import "./Profil.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import { DISCONNECT } from "../reducers/user";

const Profil = () => {
  const dispatch = useDispatch()
  const [profil, setProfil] = useState(null);
  const { id } = useParams();
  const History = useHistory();
  const [shouldUpdate, setShouldUpdate] = useState(true);
  useEffect(() => {
    if (shouldUpdate === false) return;
    getOneProfil(id).then((res) => {
      setProfil(res.data);
      setShouldUpdate(false);
    });
  });

  const deleteMyProfil = async (id) => {
    
    deleteProfil(id)
    .then(()=>{
      alert("Votre profil est supprimer")
      dispatch({ type: DISCONNECT})
      History.push("/login")
    })
  };

  return (
    <>
      <Navbar className="nav" />
      <div className="profilPage">
        <h1 className="profilH1">Salut {profil?.firstname} </h1>
        <div className="deleteProfil">
          <button
            className="deleteProfilBtn"
            onClick={deleteMyProfil(id)}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </>
  );
};

export default Profil;
