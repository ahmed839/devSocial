const express = require("express");

const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");

// user Connection Api

requestRouter.post("/userconnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(" You are able to connect" + " " + user.firstName);
  } catch (err) {
    throw new Error("Yo are not able to connect this server first login");
  }
});

module.exports = requestRouter;
