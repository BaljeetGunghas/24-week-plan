import axios from "axios";
import config from "../../config";
import { getToken } from "../utils/constant";

const {
  BASE_URL,
  apiGateway: { GET_FILES, UPLOAD_FILE, DELETE_FILE },
} = config;

const getFilesApi = async ({ search, type, page = 1 }) => {
  try {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}${GET_FILES}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        ...(search && { search }),
        ...(type && { type }),
        ...(page && { page }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

const uploadFileApi = async (formData) => {
  try {
    const token = getToken();

    const response = await axios.post(`${BASE_URL}${UPLOAD_FILE}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const deleteFileApi = async (fileId) => {
  try {
    const token = getToken();

    const response = await axios.post(
      `${BASE_URL}${DELETE_FILE}`,
      { fileId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export { getFilesApi, uploadFileApi, deleteFileApi };
