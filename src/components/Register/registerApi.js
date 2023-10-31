import axios from "axios";

const registerApiUrl = "http://192.168.0.106:3005/api/register";

export const submitRegisterApi = async (userDetails) => {
  const response = await axios.post(registerApiUrl, userDetails);
  return response;
};
