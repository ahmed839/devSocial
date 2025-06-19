const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("please Enter A valid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email Id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a strong Password");
  }
};

module.exports = { validateSignUpData };
