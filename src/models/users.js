const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  fullname: String,
  email: String,
  password: String,
  username: String,
});
module.exports = mongoose.model("user", userSchema);
