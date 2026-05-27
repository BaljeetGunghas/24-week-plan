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
    const { name, email } = req.body;

    console.log("FILE =>", req.file);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
      const updateData = {};

      // only update if provided
      if (name) updateData.name = name;
      if (email) updateData.email = email;

      // Cloudinary file (IMPORTANT FIX)
      const fileUrl = req.file?.path || req.file?.secure_url;

      if (fileUrl) {
        updateData.profile = fileUrl;
      }

      const updatedUser = await User.findByIdAndUpdate(
        _id,
        updateData,
        {
          returnDocument: "after", // modern replacement of "new: true"
          runValidators: true,
        }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Profile updated successfully",
        statusCode: 200,
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
  }
);




module.exports = router;
