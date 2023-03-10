const Registration = require("../models/Registration");
const jwt = require("jsonwebtoken"); //jwt  for session maintaine

//approval for verifying req
module.exports = {
  approval(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { registrationId } = req.params;

        try {
          const registration = await Registration.findById(registrationId); 

          if(registration) {
            registration.approved = true;
            await registration.save(); //saving status
            return res.json(registration); 
          }

        } catch (error) {
          return res.status(400).json(error);  //error message 
        }
      }
    })
  }
};
