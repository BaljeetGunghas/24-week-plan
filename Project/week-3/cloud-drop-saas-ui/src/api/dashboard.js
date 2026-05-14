import axios from "axios";
import config from "../../config";
import { getToken } from "../utils/constant";

const {
  BASE_URL,
  apiGateway: { DASHBOARD_STATS },
} = config;

const getDashboardStatsApi = async () => {
  try {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}${DASHBOARD_STATS}`, {
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

export { getDashboardStatsApi };
