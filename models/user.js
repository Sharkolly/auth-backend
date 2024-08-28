const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, "Email exists !!!"],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
});

const UserAuth = mongoose.model("userAuth", userModel);

module.exports = UserAuth ;
