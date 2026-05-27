const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // PROFILE IMAGE UPDATE
    const isProfile = req.path.includes("update-profile");

    if (isProfile) {
      return {
        folder: "cloud-drop-saas/profiles",
        resource_type: "image",
        public_id: `profile-${req.user._id}`,
        overwrite: true,
      };
    }

    // DEFAULT FILE UPLOAD
    return {
      folder: "cloud-drop-saas",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
