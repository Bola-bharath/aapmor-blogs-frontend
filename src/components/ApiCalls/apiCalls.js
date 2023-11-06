import axios from "axios";
import {
  registerApiUrl,
  // updatePassUrl,
  forgetPassUrl,
  loginApiUrl,
  createBlogApiUrl,
  saveBlogsApiUrl,
} from "../Url/configUrls";
import Cookies from "js-cookie";

export const sendOtpApi = async (email) => {
  const response = await axios.post(forgetPassUrl, { email });
  console.log(response);
  return response;
};

/* export const updatePasswordApi = async ({ updatePassword, email }) => {
  const response = await axios.put(updatePassUrl, { updatePassword, email });
  return response;
};
 */
export const loginValidation = async (loginDetails) => {
  const response = await axios.post(loginApiUrl, loginDetails);
  return response;
};
export const submitRegisterApi = async (userDetails) => {
  const response = await axios.post(registerApiUrl, userDetails);
  return response;
};
export const createBlogApi = async (blogDetails) => {
  const jwtToken = Cookies.get("jwt_token");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(blogDetails),
  };
  const response = await fetch(createBlogApi, options);
  return response;
};
export const getBlogsApi = async (category) => {
  const response = await axios.get(
    `http://localhost:3005/blogs/filter/?category=${category}`
  );
  return response;
};
export const getBlogViewApi = async (id) => {
  const response = await axios.get(`http://localhost:3005/blogs/${id}`);
  return response;
};

export const saveBlogsApi = async (saveDetails) => {
  const response = await axios.post(saveBlogsApiUrl, saveDetails);
  return response;
};
