export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const getTokenKey = (key) => {
  // this fun return the key from token
  const token = getToken();
  if (!token) return null;
  // here we have to decode the token and get the key from payload

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload[key];
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};


export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  // Use toFixed(1) for MB/GB, but no decimals for Bytes/KB for a cleaner look
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(i > 1 ? 1 : 0)) + " " + sizes[i]
  );
};
