import axios from "axios";

export const signUp = (data) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}auth/signup`, data)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const login = async (data) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}auth/login`, data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
