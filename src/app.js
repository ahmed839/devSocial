const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();
// Middleware to parse JSON
app.use(express.json());
// Sign Up Api
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save(); // wait for user to be saved
    res.send("User Sign Up Successfully");
  } catch (err) {
    res.status(400).send(err.message); // send proper error
  }
});

// users Api / GET the user from the database by using my emailId

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong" + err.message);
  }
});

// feed Api / GET all the user from th database

app.get("/feed", async (req, res) => {
  const user = await User.find({});
  try {
    res.send(user);
  } catch (err) {
    res.status(400).send("Something Went Wrong" + err.message);
  }
});

// delete api / delet the user from database

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Delete Successfully");
  } catch (err) {
    res.status(400).send("something Went Wrong" + err.message);
  }
});

// update api/ update the Api from Database

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      new: true,
    });
    res.send("user Updated Successsfully");
  } catch (err) {
    res.status(400).send("Update Failed:" + err.message);
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
