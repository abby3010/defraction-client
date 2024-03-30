import axios from "axios";

export const baseURL = process.env.REACT_APP_API + "/api";

const API = axios.create({ baseURL: baseURL, withCredentials: true });

/// Login routes
export const currentUser = async (authtoken) => {
  return await API.get(baseURL + "/auth/current_user", { headers: { authtoken } });
};

export const loginUser = async (email, password) => {
  return await API.post(baseURL + "/auth/login", { email, password });
};

export const registerUser = async (data) => {
  return await API.post(baseURL + "/auth/register", data);
};

export const addNFT = (data) => axios({
  method: "post",
  url: baseURL + "/nft/add-nft",
  body: data,
  headers: { 'Content-Type': 'multipart/form-data' },
  data: data
});
// End login routes

