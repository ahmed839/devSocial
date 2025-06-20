const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");

// profile Api call

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Does not exits");
    }
    res.send(user);
  } catch (err) {
    throw new Error("Error:" + err);
  }
});

module.exports = profileRouter;
