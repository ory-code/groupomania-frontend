import React, { useState } from "react";
import Store from "../reducers/index";

import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ showModal, setShowModal, addPosts }) => {
  const userId = Store.getState().userId;
  const [text, setText] = useState("");
  const [images, setImage] = useState(null);

  const createPost = () => {
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("text", text);
    formData.append("images", images);
    addPosts(formData);
    setText("")
    setImage(null)
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
              <input className="submitPost" name="img" type="submit"></input>
              <input
                id="img"
                className="mediaInput"
                type="file"
                name={images}
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
