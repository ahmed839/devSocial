const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
      index: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Id Is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Enter  strong Password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} Gender is not valid`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20240611/ourmid/pngtree-user-profile-icon-image-vector-png-image_12640450.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("this is not a valid URL");
        }
      },
    },
    about: {
      type: String,
      default: "I am Software Engineer",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "S141117400265", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.getPassValid = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const passwordIsValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return passwordIsValid;
};

module.exports = mongoose.model("User", userSchema);
