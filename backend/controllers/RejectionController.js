
//importing modules
const Registration = require("../models/Registration");
const jwt = require('jsonwebtoken');

module.exports = {
  rejection(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => { //authorization check
      if (err) {
        res.sendStatus(401); //error message 
      } else {
        const { registrationId } = req.params;
        try {
          const registration = await Registration.findById(registrationId);
          registration.approved = false;
          await registration.save(); //saving response
          return res.json(registration);
        } catch (error) {
          return res.status(400).json(error);//error message 
        }
      }
    })
  },
};
