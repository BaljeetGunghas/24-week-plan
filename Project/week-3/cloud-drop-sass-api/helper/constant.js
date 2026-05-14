const { default: mongoose } = require("mongoose");
const File = require("../models/File");

const getUsedBytes = async (id, res) => {
  try {
    const storageData = await File.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, totalSize: { $sum: "$size" } } },
    ]);
    const usedBytes = storageData[0]?.totalSize || 0;
    return usedBytes;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsedBytes };
