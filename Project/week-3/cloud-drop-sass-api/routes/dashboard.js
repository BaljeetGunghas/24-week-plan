const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth"); // Import the guard
const File = require("../models/File");
const { default: mongoose } = require("mongoose");
const { getUsedBytes } = require("../helper/constant");
const User = require("../models/User");

router.get("/stats", auth, async (req, res) => {
  const { _id } = req.user;

  // 1. Validation: Ensure we have a valid user ID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const maxBytes = parseInt(process.env.USER_STORAGE_LIMIT) || 104857600;

    const usedBytes = await getUsedBytes(_id, res);
    const user = await User.findById({_id}).select("profile")
    res.json({
      message: "stats fetched successfully",
      data: {
        user:{
          profile:user.profile
        },
        storage: {
          usedBytes,
          maxBytes,
          percentage:
            maxBytes > 0 ? ((usedBytes / maxBytes) * 100).toFixed(2) : 0,
        },
      },
    });
  } catch (error) {
    // Log the actual error on the server for debugging
    console.error("Stats Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
