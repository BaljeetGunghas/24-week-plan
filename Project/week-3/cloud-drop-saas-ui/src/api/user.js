import axios from "axios";
import config from "../../config";
import { getToken } from "../utils/constant";

const {
  BASE_URL,
  apiGateway: { UPDATE_PROFILE },
} = config;

const updateUserProfileAPI = async (payload) => {
  try {
    const token = getToken();

    const response = await axios.post(`${BASE_URL}${UPDATE_PROFILE}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export { updateUserProfileAPI };
