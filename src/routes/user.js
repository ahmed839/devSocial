const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectioRequest");
const User = require("../models/user");
// Get all the pending request for the loggedin user
const USER_SAFE_DATA = "firstName lastName photoUrl age about";
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({ message: "data fetch Suceesfully", data: connectionRequest });
  } catch (err) {
    throw new Error("Error:" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser.id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      messege: "Connection request successfully fetch",
      data,
    });
  } catch (err) {
    res.status(400).json({ message: "the request connection faild" });
  }
  const loggedinUser = req.user;
});

// Get feed Api -> Users
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // check login user
    // user should not see his own card
    // check user should not be add in your connections

    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId._id.toString());
      hideUserFromFeed.add(req.toUserId._id.toString());
    });
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ user });
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = userRouter;
