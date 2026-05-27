import axiosInstance from "../api/axiosInstance";
import config from "../../config";

const {
  apiGateway: { GET_FILES, UPLOAD_FILE, DELETE_FILE },
} = config;

const getFilesApi = async ({ search, type, page = 1 }) => {
  try {
    const response = await axiosInstance.get(GET_FILES, {
      params: {
        ...(search && { search }),
        ...(type && { type }),
        page,
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
    const response = await axiosInstance.post(UPLOAD_FILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
    const response = await axiosInstance.post(DELETE_FILE, {
      fileId,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export { getFilesApi, uploadFileApi, deleteFileApi };