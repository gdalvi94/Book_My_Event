const mongoose = require("mongoose");//importing mongoose
//defining schema for user
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("User", UserSchema);//exporting the model
