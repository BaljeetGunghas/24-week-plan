const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth"); // Import the guard
const File = require("../models/File");
const upload = require("../middleware/upload");
const deleteCloudinaryFile = require("../middleware/deleteCloudinaryFile");
const { default: mongoose } = require("mongoose");
const { getUsedBytes } = require("../helper/constant");

const getCategory = (mimetype) => {
  if (mimetype.startsWith("image/")) return "Image";
  if (mimetype.startsWith("video/")) return "Video";
  if (
    mimetype.includes("pdf") ||
    mimetype.includes("word") ||
    mimetype.includes("text")
  ) {
    return "Document";
  }
  return "Other";
};

router.get("/all", auth, async (req, res) => {
  try {
    const { search, type, page = 1 } = req.query; // Default to page 1
    const userId = req.user._id; // Standard naming is req.user
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    // Parse limit to a Number, default to 20 if env is missing
    const limit = Number(process.env.FILE_LIMIT) || 10;
    const skip = (Number(page) - 1) * limit;

    const query = { user: userId };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (type) {
      query.type = { $regex: type, $options: "i" };
    }

    // Execute with skip and limit for proper pagination
    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // For a "Senior" response, include total count for the frontend
    const totalFiles = await File.countDocuments(query);

    res.status(200).json({
      message: "Files fetched successfully",
      statusCode: 200,
      data: {
        files,
        totalFiles,
        currentPage: Number(page),
        totalPages: Math.ceil(totalFiles / limit),
      },
    });
  } catch (error) {
    console.error(error); // Always log the actual error for debugging
    res.status(500).json({ message: "Server Error: Unable to fetch files" });
  }
});

// PROTECTED ROUTE: Upload a file
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newFile = new File({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      fileUrl: req.file.path,
      cloudinaryId: req.file.filename,
      category: getCategory(req.file.mimetype),
      user: req.user._id,
    });

    const savedFile = await newFile.save();
    const maxBytes = parseInt(process.env.USER_STORAGE_LIMIT) || 104857600;

    const usedBytes = await getUsedBytes(req.user._id, res);

    return res.status(201).json({
      message: "File uploaded successfully",
      statusCode: 201,
      data: {
        file: savedFile,
        storage: {
          usedBytes,
          maxBytes,
          percentage:
            maxBytes > 0 ? ((usedBytes / maxBytes) * 100).toFixed(2) : 0,
        },
      },
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/delete", auth, deleteCloudinaryFile, async (req, res) => {
  try {
    // req.fileToDelete was passed from the middleware
    await File.findByIdAndDelete(req.fileToDelete);
    const maxBytes = parseInt(process.env.USER_STORAGE_LIMIT) || 104857600;

    const usedBytes = await getUsedBytes(req.user._id, res);
    return res.status(200).json({
      message: "File and cloud asset deleted successfully",
      statusCode: 200,
      data: {
        storage: {
          usedBytes,
          maxBytes,
          percentage:
            maxBytes > 0 ? ((usedBytes / maxBytes) * 100).toFixed(2) : 0,
        },
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, statusCode: 500, data: null });
  }
});
module.exports = router;
