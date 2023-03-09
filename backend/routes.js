const express = require("express"); //importing express
// importing the path for each controller
const UserController = require("../backend/controllers/UserController.js");
const EventController = require("../backend/controllers/EventController.js");
const DashboardController = require("../backend/controllers/DashboardController.js");
const verifyToken = require("../backend/config/verifyToken.js");
const LoginController = require("../backend/controllers/LoginController.js");
const RegistrationController = require("../backend/controllers/RegistrationController.js");
const AcceptController = require("../backend/controllers/ApprovalController.js");
const DeclineController = require("../backend/controllers/RejectionController.js");

//create routes
const routes = express.Router();

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});
//Endpoints:

//Registration(for events)
routes.post("/registration/:eventId", verifyToken, RegistrationController.create);


routes.get(
  "/registration",
  verifyToken,
  RegistrationController.getMyRegistrations
);

routes.get(
  "/event/participants/:eventId",
  verifyToken,
  RegistrationController.getEventParticipants
);
routes.get(
  "/registration/:registrationId",
  verifyToken,
  RegistrationController.getRegistration
);
//Approve request
routes.post(
  "/registration/:registrationId/approval",
  verifyToken,
  AcceptController.approval
);
//Reject request
routes.post(
  "/registration/:registrationId/rejection",
  verifyToken,
  DeclineController.rejection
);

//Login Controller
routes.post("/login", LoginController.store);

//Dashboard
routes.get("/dashboard", verifyToken, DashboardController.getAllEvents);
routes.get(
  "/dashboard/:eventType",
  verifyToken,
  DashboardController.getAllEvents
);
routes.get("/user/events", verifyToken, DashboardController.getEventsByUserId);
routes.get("/event/:eventId", verifyToken, DashboardController.getEventById);

//Event
routes.post(
  "/event",
  verifyToken,
  EventController.createEvent
);
routes.delete("/event/:eventId", verifyToken, EventController.delete); //delete event


routes.post("/user/register", UserController.createUser); //post event
routes.get("/user/:userId", UserController.getUserById); //get event


routes.get(
  "/events/details/:eventId",
  verifyToken,
  EventController.getEventDetails //get event details
);
module.exports = routes; //exporting routes
