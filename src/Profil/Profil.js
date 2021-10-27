import React, { useState, useEffect } from "react";
import { deleteProfil, getOneProfil, updateProfil } from "../api/Profil";
import "./Profil.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";

const Profil = () => {
  
  const [profil, setProfil] = useState(null);
  const { id } = useParams();
  const [shouldUpdate, setShouldUpdate] = useState(true);
  console.log( {"toto": profil});
  useEffect(() => {
    if (shouldUpdate === false) return;
    getOneProfil(id).then((res) => {
      setProfil(res.data);
      setShouldUpdate(false);
    });
  });

  const deleteMyProfil = async (id) => {
    deleteProfil(id);
  };

  return (
    <>
      <Navbar className="nav" />
      <div className="profilPage">
        <h1>Salut {profil?.firstname} </h1>
        <div className="firstName">
          <p>test</p>
        </div>
        <div className="name">
          <p>lala</p>
        </div>
        <div className="deleteProfil">
          <button
            className="deleteProfilBtn"
            onClick={() => {
              deleteMyProfil(id);
            }}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </>
  );
};

export default Profil;