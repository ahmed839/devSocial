// middlewares/auth.js

const adminAuth = (req, res, next) => {
  console.log("Admin Auth is Checked!!!");
  const token = "xyz"; // Ideally this should come from req.headers
  const adminIsAuthorized = token === "xyz";

  if (!adminIsAuthorized) {
    return res.status(401).send("Unauthorized Connection");
  }

  next();
};

const userAuth = (req, res, next) => {
  console.log("Admin Auth is Checked!!!");
  const token = "xyz"; // Ideally this should come from req.headers
  const adminIsAuthorized = token === "xyz";

  if (!adminIsAuthorized) {
    return res.status(401).send("Unauthorized Connection");
  }

  next();
};
module.exports = {adminAuth,userAuth};
