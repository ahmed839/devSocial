const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Invalid Token Please Login first");
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
