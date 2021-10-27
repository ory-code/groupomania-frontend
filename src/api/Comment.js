import axios from "axios";
import Store from "../reducers/index";

export const getComment = async (id) => {
  const tokenData = Store.getState().user.token;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}posts/${id}/comments`, {
      headers: {
        authorization: `Bearer ${tokenData}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const postComment = async (post) => {
  const tokenData = Store.getState().token;

  return await axios
    .post(
      `${process.env.REACT_APP_API_URL}posts/${post.postid}/comments`,
      post,
      {
        headers: {
          authorization: `Bearer ${tokenData}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getOneComment = () => {};

export const updateComment = async (post) => {
  const tokenData = Store.getState().token;

  return await axios
    .put(
      `${process.env.REACT_APP_API_URL}posts/${post.postid}/comments/${post.id}`,
      post,
      {
        headers: {
          authorization: `Bearer ${tokenData}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteComment = async (post) => {
  const tokenData = Store.getState().token;
  return await axios
    .delete(
      `${process.env.REACT_APP_API_URL}posts/${post.postid}/comments/${post.id}`,

      {
        headers: {
          authorization: `Bearer ${tokenData}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
