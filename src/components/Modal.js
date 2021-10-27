import React, { useState } from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import { newPost } from "../api/Post";

const Modal = ({ showModal, setShowModal }) => {
  const authData = JSON.parse(localStorage.getItem("persist:authData"));
  const myUserId = authData.userId;
  const userId = myUserId;
  const [text, setText] = useState("");
  const [img, setImage] = useState("");

  const createPost = () => {
    const formData = new FormData()

    formData.append("userid", userId)

    newPost({ userid: userId, text: text, img: img });
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <div className="modal">
          <form onSubmit={createPost} className="modalForm">
            <div className="modalHeader">
              <button
                onClick={() => setShowModal(false)}
                className="buttonModale"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modalText">
              <textarea
                className="modalInput"
                value={text}
                placeholder="De quoi souhaite-tu discuter ?"
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <div className="modalMedia">
              <input className="submitPost" name="img"  type="submit"></input>
              <input
                className="mediaInput"
                type="file"
                value={img}
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
