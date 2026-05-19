const config = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5500/",
  apiGateway: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",

    //user
    UPDATE_PROFILE: "/api/user/update-profile",
    //Dashboard
    DASHBOARD_STATS: "/api/dashboard/stats",

    //File
    GET_FILES: "/api/files/all",
    UPLOAD_FILE: "/api/files/upload",
    DELETE_FILE: "/api/files/delete",
  },
};

export default config;
