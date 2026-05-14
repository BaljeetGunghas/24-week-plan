import axios from "axios";
import config from "../../config";

const {
  BASE_URL,
  apiGateway: { LOGIN, REGISTER },
} = config;

const loginApi = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}${LOGIN}`, {
      email,
      password,
    });

    const responseData = response.data;
    const token = responseData.token;
    sessionStorage.setItem("token", token);
    return responseData;
  } catch (error) {
    console.log("Api failed with error ", error);
    throw error;
  }
};

const registerApi = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}${REGISTER}`, {
      email,
      password,
      name,
    });
    const responseData = response.data;
    const token = responseData.token;
    sessionStorage.setItem("token", token);
    return responseData;
  } catch (error) {
    console.log("Api failed with error ", error);
    throw error;
  }
};

export { loginApi, registerApi };
