import React, { useState } from "react";
import Store from "../reducers/index";
import { updatePost } from "../api/Post";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Post.css";
import { useHistory } from "react-router";
//import Loading from "./Loading";

const Posts = (props) => {
  const adminData = Store.getState().isAdmin;
  const userId = Store.getState().userId;
  const History = useHistory();
  //const [loading, setLoading] = useState(false);
  const posts = props.posts;
  const [isUpdated, setIsUpdated] = useState(false);
  const [postInUpdate, SetPostInUpdate] = useState(null);

  const updateItem = async () => {
    updatePost(postInUpdate).then(() => {
      props.updatePost(postInUpdate);
      SetPostInUpdate(null);
    });
  };

  return (
    <section className="post-list">
      <h2>Posts</h2>
      <div className="allPost">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="headerPost">
              <span className="pseudo">
                {post.User.firstname} {post.User.name}
              </span>
            </div>
            <div className="impPost">
              <img className="" src={post.images} alt=""></img>
            </div>
            {isUpdated === false && <p className="text">{post.text}</p>}
            {isUpdated && postInUpdate?.id !== post.id && (
              <div className="text">
                <p>{post.text}</p>
              </div>
            )}
            {isUpdated && postInUpdate?.id === post.id && (
              <div className="updatePost">
                <textarea
                  defaultValue={post.text}
                  onChange={(e) =>
                    SetPostInUpdate({ ...postInUpdate, text: e.target.value })
                  }
                />
                <div className="buttonContainer">
                  <button className="btnPost" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {(adminData === true || userId === post.UserId) && (
              <div className="buttonContainer">
                <button className="btnWCAG"
                  onClick={() => {
                    setIsUpdated(!isUpdated);
                    SetPostInUpdate(post);
                  }}
                >
                  <UpdateIcon className="icnUpdate" />
                </button>
                <button className="btnWCAG"
                  onClick={() => {
                    props.deleteAPost(post.id);
                  }}
                >
                  <DeleteIcon className="icnDelete" />
                </button>
              </div>
            )}

            <button className="btnWCAG"
              // className="footerPost"
              onClick={() => {
                History.push(`/posts/${post.id}`);
              }}
            >
              voir plus
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
