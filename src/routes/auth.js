const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

// Sign Up Api
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // custom validation function

    const { firstName, lastName, emailId, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object with hashed password
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    // Save user to DB
    await user.save();

    res.send("User Sign Up Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//login Api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user || !user.password) {
      throw new Error("Invalid credentials"); // Don't specify if email or password failed
    }

    const passwordIsValid = await user.getPassValid(password);

    if (passwordIsValid) {
      // create a JWT Token
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({ data: user });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    return res.status(400).send("Error: " + err.message);
  }
});

// logout Api
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Succcessfully");
});

module.exports = authRouter;
