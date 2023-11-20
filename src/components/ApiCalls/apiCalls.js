import Cookies from "js-cookie";
import {
  registerApiUrl,
  forgetPassUrl,
  loginApiUrl,
  createBlogApiUrl,
  saveBlogsApiUrl,
  profileUpdateApiUrl,
  publishBlogApiUrl,
  likesApiUrl,
} from "../Url/configUrls";
import axios from "axios";

const token = Cookies.get("jwtToken");

export const sendOtpApi = async (email) => {
  const response = await axios.post(forgetPassUrl, { email });
  console.log(response);
  return response;
};

export const loginValidation = async (loginDetails) => {
  const response = await axios.post(loginApiUrl, loginDetails);
  return response;
};
export const submitRegisterApi = async (userDetails) => {
  const response = await axios.post(registerApiUrl, userDetails);
  return response;
};
export const createBlogApi = async (blogDetails) => {
  const jwtToken = Cookies.get("jwtToken");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(blogDetails),
  };
  const response = await fetch(createBlogApiUrl, options);
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
export const profileUpdateApi = async (profileDetails) => {
  const response = await axios.post(profileUpdateApiUrl, profileDetails);
  return response;
};

export const profileCheckingApi = async (emailObj) => {
  // const response = await axios.post(
  //   "http://192.168.0.103:3005/profile/check",
  //   emailObj
  // );
  // console.log(response);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailObj),
  };

  const response = await fetch("http://localhost:3005/profile/check", options);

  return response;
};
export const commentsApi = async (commentObject) => {
  const config = {
    method: "post",
    url: "http://localhost:3005/comments",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: commentObject,
  };
  const response = await axios(config);
  return response;
};

export const publishBlogApi = async (content) => {
  // const requestData = {
  //   htmlContent: htmlContent,
  // };
  const response = await axios.post(publishBlogApiUrl, content);
  return response;
};

export const likesApi = async (id) => {
  const response = await axios.put(likesApiUrl, id);
  return response;
};
