import React, { useState, useEffect } from "react";
import Store from "../reducers/index";

import { useParams } from "react-router-dom";
import { deletePost, getOnePost, updatePost } from "../api/Post";
import { postComment, updateComment, deleteComment } from "../api/Comment";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import "./OnePost.css";
import Navbar from "../components/Navbar";
const OnePost = () => {
  const adminData = Store.getState().isAdmin;
  const authData = Store.getState();
  const myUserId = authData.userId;
  const userId = myUserId;
  const [onePost, setOnePost] = useState(null);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");
  const [postIsUpdated, setPostIsUpdated] = useState(false);
  const [postInUpdate, setPostInUpdate] = useState(null);
  const [commentIsUpdated, setCommentIsUpdated] = useState(false);
  const [commentInUpdate, setCommentInUpdate] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (shouldUpdate === false) return;
    getOnePost(id).then((res) => {
      if (!res && !res.data) return;
      setOnePost(res.data.post);
      setComment(res.data.comment);
      setShouldUpdate(false);
    });
  });
  const updateMyPost = async () => {
    updatePost(postInUpdate).then(() => {
      setOnePost({ ...onePost, text: postInUpdate.text });
    });
  };

  const deleteMyPost = async (id) => {
    deletePost({ userid: userId, id: id });
  };

  const createMyComment = async () => {
    const postid = onePost.id;
    postComment({ userid: userId, content: content, postid: postid }).then(
      (comment) => {
        setComment([comment, ...comment]);
      }
    );
  };
  const updateMyComment = async () => {
    updateComment(commentInUpdate).then(() => {
      let comments = comment.filter(
        (comment) => comment.id != commentInUpdate.id
      );
      setComment({ ...comments, commentInUpdate });
    });
  };

  const deleteMyComment = async (id) => {
    deleteComment({
      userid: userId,
      id: id,
    });
  };

  const listComments = comment.map((com) => (
    <div>
      <div className="pseudo">
        {com.User.firstname}
        {com.User.name}{" "}
      </div>

      {commentIsUpdated === false && <p key={com.id}>{com.content}</p>}
      {commentIsUpdated && commentInUpdate?.id !== com.id && (
        <div className="textCom">
          <p>{com.content}</p>
        </div>
      )}
      {commentIsUpdated && commentInUpdate?.id === com.id && (
        <div className="updateCom">
          <textarea
            defaultValue={com.content}
            onChange={(e) =>
              setCommentInUpdate({
                ...commentInUpdate,
                content: e.target.value,
              })
            }
          />
          <div className="buttonContainer">
            <button className="btn" onClick={updateMyComment}>
              Valider modification
            </button>
          </div>
        </div>
      )}
      {userId === com.UserId && (
        <div className="buttonContainer">
          <div
            onClick={() => {
              setCommentIsUpdated(!commentIsUpdated);
              setCommentInUpdate(com);
            }}
          >
            <UpdateIcon className="icnUpdate" />
          </div>
          <DeleteIcon
            className="icnDelete"
            onClick={() => {
              deleteMyComment(com.id);
            }}
          />
        </div>
      )}
    </div>
  ));

  return (
    <div>
      <Navbar />
      <div>
        <div className="showPost">
          <div className="onePostCard">
            <div className="onePostCardHeaders">
              <div className="pseudoPost">
                <span>
                  {onePost?.User.firstname} {onePost?.User.name}
                </span>
              </div>
            </div>
            <div className="imgOnePost">
              <img className="" src={onePost?.images} alt=""></img>
            </div>
            <div className="onePostCardText">
              {postIsUpdated === false && (
                <p className="text">{onePost?.text}</p>
              )}
              {postIsUpdated && postInUpdate?.id !== onePost?.id && (
                <div className="text">
                  <p>{onePost.text}</p>
                </div>
              )}
              {postIsUpdated && postInUpdate?.id === onePost?.id && (
                <div className="updateOnePost">
                  <textarea
                    defaultValue={onePost.text}
                    onChange={(e) =>
                      setPostInUpdate({ ...postInUpdate, text: e.target.value })
                    }
                  />
                  <div className="buttonContainer">
                    <button className="btnPost" onClick={updateMyPost}>
                      Valider modification
                    </button>
                  </div>
                </div>
              )}
              {(adminData === true || userId === onePost.UserId) && (
                <div className="buttonContainer">
                  <div
                    onClick={() => {
                      setPostIsUpdated(!postIsUpdated);
                      setPostInUpdate(onePost);
                    }}
                  >
                    <UpdateIcon className="icnUpdate" />
                  </div>
                  <DeleteIcon
                    className="icnDelete"
                    onClick={() => {
                      deleteMyPost(onePost.id);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="postComment">
              <textarea
                className="postCommentInput"
                value={content}
                placeholder=" écrit un commentaire..."
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button className="btnComment" onClick={createMyComment}>
                Envoyez
              </button>
            </div>
            <div className="OnePostComment">{listComments}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePost;
