const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }
    const decodeData = jwt.verify(token, "S141117400265");
    const { _id } = decodeData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error(" Invalid User");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
};
module.exports = userAuth;
