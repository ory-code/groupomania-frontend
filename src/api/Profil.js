import axios from "axios";
import Store from "../reducers/index";

export const getOneProfil = async (id) => {
  const tokenData = Store.getState().token;
  console.log(id);
  return await axios
    .get(`${process.env.REACT_APP_API_URL}profil/${id}`, {
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

export const updateProfil = async (id) => {
  return await axios
    .put(`${process.env.REACT_APP_API_URL}profil/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteProfil = async (id) => {
  const tokenData = Store.getState().token;
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}profil/${id}`, {
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
