import axiosInstance from "./axiosInstance";
import config from "../../config";

const {
  apiGateway: { DASHBOARD_STATS },
} = config;

const getDashboardStatsApi = async () => {
  try {
    const response = await axiosInstance.get(DASHBOARD_STATS);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching dashboard stats:",
      error?.response?.data || error.message,
    );

    throw error;
  }
};

export { getDashboardStatsApi };
