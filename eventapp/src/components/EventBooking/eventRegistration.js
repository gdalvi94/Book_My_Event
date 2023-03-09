import React, { useState, useEffect } from 'react';//import react
import moment from 'moment';//import moment library for parsing, validating and formatting dates
import { Button, ButtonGroup, Container } from "reactstrap"; //import reactstrap
import "./eventRegistration.scss"; //import styling

export default function EventBooking() {
    const [myEvents, setMyEvents] = useState([]);
    const user = localStorage.getItem("user");

    useEffect(() => {
        getMyEvents();
    }, []);

    //method to fetch existing events
    const getMyEvents = async () => {
        try {
            const request = {
                method: "GET",
                headers: { user: user }
            }
            const response = await fetch('http://localhost:8000/registration', request);
            const result = await response.json();
            setMyEvents(result);
        } catch (error) {
            console.log(error);
        }
    }

    //method to check approval status
    const isApproved = (approved) => approved === true ? "Approved" : "Rejected";

    //method to assign status to event registration
    const eventStatusHandler = async (eventId, status) => {
        try {
            if (status) {
                const request = {
                    method: "POST",
                    headers: { user: user, "Content-Type": "application/json" },
                    body: JSON.stringify({})
                }
                await fetch(`http://localhost:8000/registration/${eventId}/approval`, request);
            }
            else {
                const request = {
                    method: "POST",
                    headers: { user: user, "Content-Type": "application/json" },
                    body: JSON.stringify({})
                }
                await fetch(`http://localhost:8000/registration/${eventId}/rejection`, request);
            }
            //get all events
            getMyEvents();
        } catch (error) {
            console.log(error);
        }
    }

   

    return (
        <Container>
            
            <ul className="listreg">

                {myEvents.map(event => (
                    <li className="li-cardreg">

                    <div className='detailsreg'>
                            <span>Event Date :  {moment(event.eventDate).format('l')}</span><br></br>
                            <span>Event Time :  {event.eventTime}</span><br></br>
                            <span>Event Price :  $ {parseFloat(event.eventPrice).toFixed(2)}</span><br></br>
                            <span>User Email :  {event.userEmail}</span><br></br>
                            <span>Request Status : 
                            <span className={event.approved !== undefined ? isApproved(event.approved) : "Pending"}>
                                    {event.approved !== undefined ? isApproved(event.approved) : "Pending"}
                           </span>
                            </span>
                    </div>
                
                  
  
                    <center>
                    <ButtonGroup>
                            <Button disabled={event.approved === true || event.approved === false ? true : false} className="btn1" onClick={() => { eventStatusHandler(event._id, true) }}>
                                <b>Approve</b>
                        </Button>
                            <Button disabled={event.approved === true || event.approved === false ? true : false} className="btn2" onClick={() => { eventStatusHandler(event._id, false) }}>
                                <b>Deny</b>
                        </Button>
                        </ButtonGroup>
                    </center>
                    
                  </li>

                ))}
            </ul>
        </Container>
    );
}