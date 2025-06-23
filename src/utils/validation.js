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

const validEditProfileData = (req) => {
  const isAllowdProfileEdit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const validEdit = Object.keys(req.body).every((field) => {
    return isAllowdProfileEdit.includes(field);
  });
  return validEdit;
};
module.exports = { validateSignUpData, validEditProfileData };
