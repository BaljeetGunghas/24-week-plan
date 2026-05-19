const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const upload = require("../middleware/upload");
const { default: mongoose } = require("mongoose");
router.post(
  "/update-profile",
  auth,
  upload.single("file"),
  async (req, res) => {
    const { _id } = req.user;
    const { name = req.user.name, email = req.user.email } = req.body;

    const fileUrl = req.file?.path;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
      const updateData = {
        name,
        email,
      };

      if (fileUrl) {
        updateData.profile = fileUrl;
      }

      const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
        new: true,
      });

      res.json({
        message: "Profile updated successfully",
        statusCode:200,
        data: {
          profile: updatedUser.profile,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

module.exports = router;
