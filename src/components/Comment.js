import React, { useEffect, useState } from "react";
import { getComment } from "../api/Comment";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [shouldUpdate, setSchouldUpdate] = useState(true);
  useEffect(() => {
    if (shouldUpdate === false) return;
    getComment().then((res) => {
      if (!res) return;
      setComments(res.data);
      setSchouldUpdate(false);
    });
  },[shouldUpdate]);

  return (
    <div className="commentArea">
      {comments.map((comment) => (
        <div className="commentPost" key={comment.id}>
          <p className="content" >{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
