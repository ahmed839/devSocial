const express = require("express");
const requestRouter = express.Router();

const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectioRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignore", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: `Invalid status type: ${status}`,
        });
      }

      // Check if toUser exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User is not found" });
      }

      // Check if request already exists in either direction
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(409).json({
          message: "Connection request already exists between these users",
        });
      }

      // Create new request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      return res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      console.error("Error in sending connection request:", err);
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // usr Logged In
      // validate the status only the allow ["accepted" ,"rejected"]
      // loggedInuser  = toUserId
      // only acepted and rejected when sender send to u interested
      const loggedInUserId = req.user;
      const { status, requestId } = req.params;
      const allowStatus = ["accepted", "rejected"];

      if (!allowStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not Valid" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId._id,
        status: "interested",
      });
      if (!connectionRequest) {
        res.status(404).json({ message: "Connection Request is not Valid" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      return res.json(
        { messege: "connection Request SuccessFully Done" },
        data
      );
      return res.json({ message: " Data Send Sucefully" }, data);
    } catch (err) {
      throw new Error(err);
    }
  }
);

module.exports = requestRouter;
