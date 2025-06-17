const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khanahmedm1995:gFjr2SBnbkbWuc4y@socialdev.i4gqjzb.mongodb.net/SocialDev"
    );
  } catch (error) {
    return error;
  }
};

module.exports = connectDb;
