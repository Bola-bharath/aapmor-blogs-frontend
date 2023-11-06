import axios from "axios";
import {
  registerApiUrl,
  // updatePassUrl,
  forgetPassUrl,
  loginApiUrl,
  createBlogApiUrl,
} from "../Url/configUrls";

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
  const response = await axios.post(createBlogApiUrl, blogDetails);
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
