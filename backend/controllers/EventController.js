// Imported events and User models
const Event = require("../models/Events");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


module.exports = {
// Created Event
  createEvent(req, res) {
    console.log(req.body);
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.statusCode(401);
      } else {
        const { title, description, price, eventType, date, time } = req.body;

        const user = await User.findById(authData.user._id);

        if (!user) {
          return res.status(400).json({ message: "User does not exist!" }); //error message 
        }

        try {
          const event = await Event.create({
            title,
            description,
            eventType,
            price: parseFloat(price),
            user: authData.user._id,
            date,
            time
          });

          return res.json(event);
        } catch (error) {
          return res.status(400).json({ message: error }); //error message 
        }
      }
    });
  },
// Fetched Event Details
  getEventDetails(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);//error message 
      } else {
        try {
          const { eventId } = req.params;
          const eventObj = await Event.findById(eventId)
          if (eventObj) {
            // console.log(eventObj)
            return res.json(eventObj);
          } else {
            console.log("Event not found")
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  },
  // Delete call
  delete(req, res) {
    jwt.verify(req.token, "secret", async (err) => {
      if (err) {
        res.statusCode(401);//error message 
      } else {
        const { eventId } = req.params;
        try {
          await Event.findByIdAndDelete(eventId);
          return res.status(204).send();
        } catch (error) {
          return res
            .status(400)
            .json({ message: "We do have any event with the ID" }); //error message 
        }
      }
    });
  }

};
