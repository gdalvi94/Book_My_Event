import React, { useEffect, useState, useMemo } from "react"; //import react
import moment from "moment";//import moment library for parsing, validating and formatting dates
import { Container } from 'reactstrap'; //import reactstrap
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"; //import specific components from reactstrap
import { Link } from 'react-router-dom'; //for dynamic routing
import './dashboard.scss'; //import styling

export default function Dashboard({ history }) {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");

  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageHandler, setMessageHandler] = useState('');
  const [eventRequests, setEventRequests] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [eventRequestMessage, setEventRequestMessage] = useState('');
  const [eventRequestSuccess, setEventRequestSuccess] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    getEvents();
  }, []);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  //method to view user specific events
  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
      const request = {
        method: "GET",
        headers: { user: user}
      }
      const response = await fetch("http://localhost:8000/user/events", request);//fetch call to the server
      const result = await response.json();//convert response to json format
      console.log(result);
      setEvents(result.events);
    } catch (error) {
      history.push("/login");
    }
  };

  //method for deleting an event
  const deleteEventHandler = async (eventId) => {
    try {
      const request = {
        method: "DELETE",
        headers: { user: user}
      }
      await fetch(`http://localhost:8000/event/${eventId}`, request);
      setSuccess(true);
      setMessageHandler('The event was deleted successfully!');
      setTimeout(() => {
        setSuccess(false);
        filterHandler(null);
        setMessageHandler('');
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler('Error while deleting event!');
      setTimeout(() => {
        setError(false);
        setMessageHandler('');
      }, 2000);
    }
  };

  //method to fetch all existing events along with filters
  const getEvents = async (filter) => {
    try {
      const url = filter ? `http://localhost:8000/dashboard/${filter}` : "http://localhost:8000/dashboard";
      const request = {
        method: "GET",
        headers: { user: user }
      }
      const response = await fetch(url, request);
      const result = await response.json();
      result.events.sort((a, b) => { return new Date(a.date) - new Date(b.date); });
      setEvents(result.events);
    } catch (error) {
      history.push("/login");
    }
  };

  //method to register for an event
  const registrationRequestHandler = async (event) => {
    try {
      const request = {
        method: "POST",
        headers: { user: user, "Content-Type": "application/json" },
        body: JSON.stringify({})
      }
      await fetch(`http://localhost:8000/registration/${event.id}`, request);
      setSuccess(true);
      setMessageHandler(`The registration request for the event ${event.title} made successfully!`);
      alert(`The registration request for the event ${event.title} made successfully!`);
      setTimeout(() => {
        setSuccess(false);
        filterHandler(null);
        setMessageHandler('');
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler('Error while registering for event!');
      setTimeout(() => {
        setError(false);
        setMessageHandler('');
      }, 2000);
    }
  }

  //method to view registered participants for an event
  const viewParticipantsHandler = async (event) => {
    try {
      localStorage.setItem("eventId", event);
      history.push('/event/participants')
    } catch (error) {
      console.log(error);
    }
  }

  //method to approve a participant for an event
  const acceptEventHandler = async (eventId) => {
    try {
      const request = {
        method: "POST",
        headers: { user: user, "Content-Type": "application/json" },
        body: JSON.stringify({})
      }
      await fetch(`http://localhost:8000/registration/${eventId}/approval`, request);

      setEventRequestSuccess(true);
      setEventRequestMessage("Event approved successfully!");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        setEventRequestSuccess(false);
        setEventRequestMessage('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  //method to deny a participant for an event
  const rejectEventHandler = async (eventId) => {
    try {
      const request = {
        method: "POST",
        headers: { user: user, "Content-Type": "application/json" },
        body: JSON.stringify({})
      }
      await fetch(`http://localhost:8000/registration/${eventId}/rejection`, request);

      setEventRequestSuccess(true);
      setEventRequestMessage("Event rejected!");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        setEventRequestSuccess(false);
        setEventRequestMessage('');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  //method for removing an event
  const removeNotificationFromDashboard = (eventId) => {
    const newEvent = eventRequests.filter((event) => event._id !== eventId);
    console.log(newEvent);
    setEventRequests(newEvent);
  }
  const redirectHandler = (e) => {
    history.push("/events");
  }

  //method to redirect after registration
  const redirectHandlerRegistration = (e) => {
    history.push("/myregistrations");
  }

  //method to view event details
  const linkToEvent = (_id) => {
    localStorage.setItem("eventId", _id)
    history.push('/eventdetails')
    
  }
   
  return (
    <>
      <section id="sec1" className="sec1">
        <div className="divv1">
          <h1 className="titlee"><b>Book My Event</b><br /> 
          <span><b>Events around you</b></span></h1>
          <ul className="listt1">
            <Button className="bttn1"  onClick={redirectHandler}>
              Create Your Event
            </Button>

            <Button className="bttn2"  
              onClick={redirectHandlerRegistration}>
              Registration Requests
            </Button>
          </ul>
        </div>
      </section>
      <ul className="listt2">
        {eventRequests.map(request => {
          return (
            <li key={request._id}>
              <div>
                <strong>{request.user.email}</strong> is requesting to register to your event
                <strong>{request.event.title}</strong>
                <ButtonGroup>
                  <Button className="btnn1"  color="secondary" onClick={() => acceptEventHandler(request._id)}>
                    Accept
                  </Button>
                  <Button className="btnn2" color="danger" onClick={() => rejectEventHandler(request._id)}>
                    Reject
                  </Button>
                </ButtonGroup>
              </div>
            </li>
          )
        })}
      </ul>
      {eventRequestSuccess ?
        <Alert className="alert-class" color="success">{eventRequestMessage}</Alert>
        : ""}
      <Container className="c1">
        <div className="divv3">
          <div className="divv4">
            
                <button className="b1" onClick={() => filterHandler(null)} active={rSelected === null}>All Events</button>
                <button className="b2" onClick={() => filterHandler("concert")} active={rSelected === "concert"}>Concert</button>
                <button className="b3"onClick={() => filterHandler("reunion")} active={rSelected === "reunion"}>Reunion</button>
                <button className="b4" onClick={() => filterHandler("farewell")} active={rSelected === "farewell"}>Farewell</button>
                <button className="b5" onClick={() => filterHandler("other")} active={rSelected === "other"}>Other</button>
                <button className="b6" onClick={myEventsHandler} active={rSelected === "myEvents"}>My Events</button>
              
          </div>
          <ul className="listt3">
            {events.map((event) => (
              <li key={event._id}>
                
                <li className="li-card">
                  <div className="li-picture" />
                  <div className="cardless">
                    <h2 className="h-class" >{event.title}</h2>
                    <p className="p1"><b>Date:</b> {moment(event.date).format("LL")}</p>
                    <p className="p2"><b>Price:</b> ${event.price}</p>
                    <Link className="linkk" onClick={() => { linkToEvent(event._id) }} >View Ticket</Link>
                  </div>
                

                  <center>
                    {event.user !== user_id ? (
                      <div>
                        <Button className="bbtn1"  color="primary" onClick={() => registrationRequestHandler(event)}>Registration Request</Button>
                      </div>
                    ) : (
                        <div>
                          <Button className="bbtn2"  color="info" onClick={() => viewParticipantsHandler(event._id)}>View Guests
                    </Button>

                    <header>
                  {event.user === user_id ? (
                    <div>
                      <Button className="deleteButton"
                        color="danger"
                        
                        onClick={() => deleteEventHandler(event._id)}
                      >
                        Delete Event
                    </Button>
                    </div>
                  ) : (
                      ""
                    )}
                </header>
                        </div>
                      )}
                  </center>
                </li>
              </li>
            ))}
          </ul>
          {error ? (
            <Alert className="event-validation" color="danger">
              {messageHandler}
            </Alert>
          ) : (
              ""
            )}
          {success ? (
            <Alert className="event-validation" color="success">
              {messageHandler}
            </Alert>
          ) : (
              ""
            )}
        </div>

       

      </Container>
      <div>
        <footer className="ff">
        <p className="copyright-text"> <b> Copyright &copy; 2022 All Rights Reserved by </b>
       <a className="aa" href="#"> <b>BookMyEvent</b> </a>.
       </p>
       </footer>
      
      </div>

    </>
  );
}
