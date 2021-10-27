import React, { useState } from "react";
import "./CreatePostLink.css";
import Modal from "./Modal.js"

const CreatePostLink = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="createPostPage">
      <div className="createPost">
        <div className="createPostHeader">
          <h2>Créer un post</h2>
        </div>
        <div className="postInput">
          <button onClick={openModal} className="inputPostArea" type="text">
            Quel sont les news ?
          </button>
          <Modal  showModal={showModal} setShowModal={setShowModal} />
          <div className="inputMedia">
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostLink;
