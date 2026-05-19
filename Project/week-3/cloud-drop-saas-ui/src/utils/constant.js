export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const getTokenKey = (key) => {
  const token = getToken();

  if (!token) return null;

  try {
    // JWT format: header.payload.signature
    const payloadBase64 = token.split(".")[1];

    if (!payloadBase64) return null;

    // Handle URL-safe base64
    const base64 = payloadBase64
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    return payload?.[key] ?? null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes <= 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat(
    (bytes / Math.pow(k, i)).toFixed(i > 1 ? 1 : 0)
  )} ${sizes[i]}`;
};

export const getFileTypeStyle = (type = "") => {
  const lowerType = type.toLowerCase();

  if (lowerType.includes("image"))
    return "text-cyan-400 bg-cyan-500/10";

  if (lowerType.includes("video"))
    return "text-purple-400 bg-purple-500/10";

  if (lowerType.includes("pdf"))
    return "text-red-400 bg-red-500/10";

  if (
    lowerType.includes("word") ||
    lowerType.includes("document")
  )
    return "text-blue-400 bg-blue-500/10";

  if (
    lowerType.includes("zip") ||
    lowerType.includes("rar") ||
    lowerType.includes("7z")
  )
    return "text-yellow-400 bg-yellow-500/10";

  return "text-slate-300 bg-white/10";
};