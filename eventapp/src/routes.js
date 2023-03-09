import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/login.js";
import Dashboard from "./components/Dashboard/dashboard.js";
import EventBooking from "./components/EventBooking/eventRegistration.js";
import Register from "./components/Register/register.js";
import Navbar from "./components/NavBar/navbar.js";
import EventsPage from "./components/EventPage/events.js";
import ViewEvent from "./components/EventDescription/viewEvent.js";
import Invitee from "./components/Invitee/invitee.js";

export default function Routes() {
  return (
    <>
      <Navbar />

    <BrowserRouter>
        <Route exact path="/" component={ Dashboard } />
        <Route path="/login" exact component={ Login } />
        <Route path="/register" exact component={ Register } />
        <Route path="/events" exact component={ EventsPage } />
        <Route path="/myregistrations" exact component={ EventBooking } />
        <Route path="/eventdetails" exact component={ ViewEvent } />
        <Route path="/event/participants" exact component={ Invitee } />
=    </BrowserRouter>
    </>
  );
}
