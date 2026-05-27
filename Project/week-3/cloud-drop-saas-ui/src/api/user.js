import axiosInstance from "../api/axiosInstance";
import config from "../../config";

const {
  apiGateway: { UPDATE_PROFILE },
} = config;

const updateUserProfileAPI = async (payload) => {
  try {
    if (!payload) throw new Error("Payload is required");

    const response = await axiosInstance.post(UPDATE_PROFILE, payload);

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);

    throw error?.response?.data || error;
  }
};

export { updateUserProfileAPI };
