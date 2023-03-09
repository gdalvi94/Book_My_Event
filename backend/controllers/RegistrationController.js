//controller for registration
const { json } = require("express");
const Registration = require("../models/Registration");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Event = require("../models/Events");

module.exports = {
  create(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const user_id = authData.user._id;
        const { eventId } = req.params;
        var date = new Date();
        date = date.toDateString();

        const eventObj = await Event.findById(eventId);
        const user = await User.findById(authData.user._id);

        //defining variables for creating event
        const registration = await Registration.create({
          date: date,
          user: user_id,
          event: eventId,
          owner: eventObj.user,
          eventTitle: eventObj.title,
          eventPrice: eventObj.price,
          eventDate: eventObj.date,
          userEmail: user.email,
          eventTime: eventObj.time
        });

        return res.json(registration); //returning json with all parameters
      }
    })
  },

//function for my event
  getMyRegistrations(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const registrationArr = await Registration.find({ "owner": authData.user._id });
          if (registrationArr) {
            return res.json(registrationArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  },
  async getRegistration(req, res) {
    const { registrationId } = req.params;
    console.log(req.params);
    try {
      const registration = await Registration.findById(registrationId);
      await registration
        .populate("event")
        .populate("user", "-password")
        .execPopulate();
      return res.json(registration);
    } catch (error) {
      return res.send(400).send(json({ message: "Registration not found" }));
    }
  },


  //function for getting participant list
  getEventParticipants(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const { eventId } = req.params;
          const participantsArr = await Registration
            .find({ "owner": authData.user._id, "event": eventId, "approved": true })
            .populate("user");
          if (participantsArr) {
            return res.json(participantsArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
};