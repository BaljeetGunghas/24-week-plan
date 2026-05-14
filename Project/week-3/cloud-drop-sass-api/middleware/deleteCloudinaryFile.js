const cloudinary = require("cloudinary").v2;
const File = require("../models/File");

const deleteCloudinaryFile = async (req, res, next) => {
  try {
    const { fileId } = req.body;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Determine Resource Type for Cloudinary
    let resourceType = "image";
    if (file.type.includes("video")) resourceType = "video";
    if (
      file.type.includes("pdf") ||
      file.type.includes("word") ||
      file.type.includes("text")
    ) {
      resourceType = "raw";
    }

    // Attempt to delete from Cloudinary
    const result = await cloudinary.uploader.destroy(file.cloudinaryId, {
      resource_type: resourceType,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(400).json({ message: "Cloudinary cleanup failed" });
    }

    // Attach the fileId to the request object so the next controller knows what to delete
    req.fileToDelete = fileId;
    next();
  } catch (error) {
    res.status(500).json({ message: "Middleware Error", error: error.message });
  }
};

module.exports = deleteCloudinaryFile;
