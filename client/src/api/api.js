import axios from "axios";

export const baseURL = process.env.REACT_APP_API + "/api";
export const baseURL2 = process.env.REACT_APP_API;

const API = axios.create({
  baseURL: baseURL,
  baseURL2: baseURL2,
  withCredentials: true,
});

/// Authentication routes
/**
 * This function will return the current user's information from the database, if the user is logged
 * in.
 * @param authtoken - the token that is returned from the login function
 * @returns The response from the API.
 */
export const currentUser = async (authtoken) => {
  return await API.get(baseURL + "/auth/current_user", {
    headers: { authtoken },
  });
};

/**
 * It takes an email and password, and sends them to the server to be authenticated.
 * @param email - string
 * @param password - "password"
 * @returns The response from the API.
 */
export const loginUser = async (email, password) => {
  return await API.post(baseURL + "/auth/login", { email, password });
};

/**
 * It takes in a data object, and then it makes a post request to the API, and then it returns the
 * response.
 * @param data - {
 * @returns The response from the API call.
 */
export const registerUser = async (data) => {
  return await API.post(baseURL + "/auth/register", data);
};
// End login routes

//NFT Routes
/**
 * It takes a formData object and sends it to the server.
 * @param data - {
 */
export const addNFT = (data) =>
  axios({
    method: "post",
    url: baseURL + "/nft/add-nft",
    body: data,
    headers: { "Content-Type": "multipart/form-data" },
    data: data,
  });

/**
 * This function will return a promise that will resolve to an array of approved NFTs.
 */
export const getApprovedNFTS = () => API.get(baseURL + "/nft/apporved-nfts");

/**
 * This function will return a promise that will resolve to an array of objects that contain the user's
 * NFTs.
 * @param walletAddress - The wallet address of the user
 * @returns A promise
 */
export const getUserNftsByWalletAddress = (walletAddress) => {
  return API.get(baseURL + "/nft/user-nfts/" + walletAddress);
};

/**
 * This function will return the balance of the account passed to it.
 * @param account - the account address
 * @param caller - the caller address
 * @returns The response from the API call.
 */
export const getAcoinBalance = (account) => {
  return API.post(baseURL2 + "/acoin/balanceOf", { account });
};

export const getInr = (numACoins) => {
  return API.post(baseURL2 + "/acoin/exchange/inr-to-acoin", { numACoins });
};

export const acoinToInr = (account, numACoins, caller, email) => {
  return API.post(baseURL2 + "/acoin/buy/inr", { account, numACoins, caller, email });
};

/**
 * This function will take the account and numACoins parameters and send them to the API endpoint at
 * baseURL2/acoin/burn.
 * @param account - the account address
 * @param numACoins - The number of ACoins to burn
 * @returns The return value is the result of the API.post() function.
 */
export const burnCoin = (account, numACoins) => {
  return API.post(baseURL2 + "/acoin/burn", {
    account,
    numACoins,
    caller: account,
  });
};

export const widthdrawInr = (account, numACoins, caller) => {
  return API.post(baseURL2 + "/acoin/burn/inr", { account, numACoins, caller });
};

/**
 * It takes a totalAmount as an argument and sends it to the backend to be processed by Stripe.
 * @param totalAmount - The amount to be charged in cents.
 * @returns The response from the server.
 */
export const payWithStripe = (totalAmount) => {
  return API.post(baseURL + "/stripe/buy-with-stripe", { totalAmount });
};
