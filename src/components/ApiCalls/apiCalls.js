import axios from "axios";
import {
  registerApiUrl,
  updatePassUrl,
  forgetPassUrl,
  loginApiUrl,
} from "../Url/configUrls";

export const forgetPasswordApi = async ({ email }) => {
  const response = await axios.post(forgetPassUrl, { email });
  console.log(response);
  return response;
};

export const updatePasswordApi = async ({ updatePassword, email }) => {
  const response = await axios.put(updatePassUrl, { updatePassword, email });
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
