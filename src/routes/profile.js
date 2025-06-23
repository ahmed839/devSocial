const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validEditProfileData } = require("../utils/validation");

// profile view Api call

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

// profile Edit Api call

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validEditProfileData(req)) {
      throw new Error(" Please Validate Proper Data for Edit");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send({
      message: `${loggedInUser.firstName}, your profile was updated successfully.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err);
  }
});

module.exports = profileRouter;
