const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");

const app = express();
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Sign Up Api
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
      res.cookie("token", token);
      console.log(token);
      res.send("Login is Successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// profile Api call

app.get("/profile", userAuth, async (req, res) => {
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

// user Connection Api

app.post("/userconnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(" You are able to connect" + " " + user.firstName);
  } catch (err) {
    throw new Error("Yo are not able to connect this server first login");
  }
});
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
