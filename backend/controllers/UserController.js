//controller for user registration page
const bcrypt = require("bcrypt");//brcypt for password hashing
const User = require("../models/User.js"); //import user schema
const jwt = require('jsonwebtoken'); //to maintain login and logout session management

module.exports = {
    //create new user
  async createUser(req, res) {
    try {
        //fetch data from registration form
      const { email, firstName, lastName, password } = req.body;
      console.log(email);
      console.log(req.body);
      const existentUser = await User.findOne({ email });

        //creates unique user
      if (!existentUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        const userResponse = await User.create({
          email,
          firstName,
          lastName,
          password: hashPassword,
        });


        return jwt.sign({ user: userResponse }, "secret", (err, token) => {
          return res.json({
            user: token,
            user_id: userResponse._id,
          });
        });
      } else {
        return res.status(400).json({
          message: "Email already exists, please login.", 
        });
      }
    } catch (err) {
      throw Error(`Error while registering new user :  ${err}`); //error message 
    }
  },

  //fetch user using id
  async getUserById(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: "Couldn't find any account with this user id, please register.", //error message 
      });
    }
  },
};
