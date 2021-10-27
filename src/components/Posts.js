import React, { useState, useEffect } from "react";
import Store from "../reducers/index";
import { getAllPost, deletePost, updatePost, getOnePost } from "../api/Post";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Post.css";
import { useHistory } from "react-router";
import Loading from "./Loading";

const Posts = () => {
  const adminData = Store.getState().isAdmin;

  const userId = Store.getState().userId;
  console.log(adminData);
  const History = useHistory();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [onePost, setOnePost] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [postInUpdate, SetPostInUpdate] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    if (shouldUpdate === false) return;
    getAllPost().then((res) => {
      if (!res) return;
      setLoading(false);
      setPosts(res.data);
      setShouldUpdate(false);
    });
  }, []);

 
  const updateItem = async () => {
    updatePost(postInUpdate);
  };
  const deleteItem = async (id) => {
    deletePost({
      userid: userId,
      id: id,
    }).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return loading ? (
    <Loading />
  ) : (
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
            {isUpdated == false && <p className="text">{post.text}</p>}
            {isUpdated && postInUpdate?.id != post.id && (
              <div className="text">
                <p>{post.text}</p>
              </div>
            )}
            {isUpdated && postInUpdate?.id == post.id && (
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
            {(adminData === true || userId === post.userid) && (
              <div className="buttonContainer">
                <div
                  onClick={() => {
                    setIsUpdated(!isUpdated);
                    SetPostInUpdate(post);
                  }}
                >
                  <UpdateIcon className="icnUpdate" />
                </div>
                <DeleteIcon
                  className="icnDelete"
                  onClick={() => {
                    deleteItem(post.id);
                  }}
                />
              </div>
            )}
            <img className="img" src={post.img} alt=""></img>
            <div
              className="footerPost"
              onClick={() => {
                setOnePost(post.id);
                History.push(`/posts/${post.id}`);
              }}
            >
              voir plus
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
