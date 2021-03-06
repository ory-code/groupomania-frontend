import axios from "axios";
import Store from "../reducers/index";
export const getAllPost = async () => {
  const tokenData = Store.getState().token;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}posts`, {
      headers: {
        authorization: `Bearer ${tokenData}`,
      },
    })
    .then((res) => {
      return res;
    })

    .catch((error) => {
      console.log(error);
    });
};

export const newPost = async (data) => {
  const tokenData = Store.getState().token;
  console.log(data);
  return await axios
    .post(`${process.env.REACT_APP_API_URL}posts`, data, {
      headers: {
        authorization: `Bearer ${tokenData}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err));
};

export const getOnePost = async (id) => {
  const tokenData = Store.getState().token;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}posts/${id}`, {
      headers: {
        authorization: `Bearer ${tokenData}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updatePost = async (post) => {
  const tokenData = Store.getState().token;

  return await axios
    .put(`${process.env.REACT_APP_API_URL}posts/${post.id}`, post, {
      headers: {
        authorization: `Bearer ${tokenData}`,
      },
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deletePost = async (post) => {
  const tokenData = Store.getState().token;

  return await axios
    .delete(`${process.env.REACT_APP_API_URL}posts/${post.id}`, {
      headers: {
        authorization: `Bearer ${tokenData}`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
