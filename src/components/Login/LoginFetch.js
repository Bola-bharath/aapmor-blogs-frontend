import axios from "axios";

export const loginValidation = async (loginDetails) => {
  const url = "http://192.168.0.106:3005/api/login";
  const response = await axios.post(url, loginDetails);
  return response;
};
