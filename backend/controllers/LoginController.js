
//importing requirement
const bcrypt = require("bcrypt");//bcrypt for password hashing
const User = require("../models/User");
const jwt = require("jsonwebtoken");
module.exports = {
  async store(req, res) {
    console.log(req.body);
    try {
      console.log(req.body);
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(200).json({ message: "All fields are required!" }); //data validation
      }

      //if user not found
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({
          message: "User not found! Sign Up!", //error message 
        }); 
      }
      //if user and password matches
      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        return jwt.sign({ user: userResponse }, "secret", (err, token) => {
          return res.json({
            user: token,
            user_id: userResponse._id,
            user_name: user.firstName + " " + user.lastName
          });
        });
      } else {
        return res
          .status(200)
          .json({ message: "Email or Password does not match!" }); //error message 
      }
    } catch (error) {
      throw Error(`Error while Authenticating a User ${error}`);//error message 
    }
  },
};