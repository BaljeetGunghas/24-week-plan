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

export const getFileTypeStyle = (type = "") => {
  if (type.includes("image")) return "text-cyan-400 bg-cyan-500/10";
  if (type.includes("video")) return "text-purple-400 bg-purple-500/10";
  if (type.includes("pdf")) return "text-red-400 bg-red-500/10";
  if (type.includes("word") || type.includes("document"))
    return "text-blue-400 bg-blue-500/10";
  if (type.includes("zip")) return "text-yellow-400 bg-yellow-500/10";

  return "text-slate-300 bg-white/10";
};