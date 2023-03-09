import React, { useState, useEffect } from 'react'; //import react
import moment from 'moment'; //import moment library for parsing, validating and formatting dates
import { Button } from "reactstrap"; //import reactstrap components
import './viewEvent.scss' //import styling

export default function EventDescription({ history }) {
    const user = localStorage.getItem("user");
    const user_id = localStorage.getItem("user_id");
    const eventId = localStorage.getItem("eventId");
    const [eventSelected, setEventSelected] = useState({});
    const [isRequested, setIsRequested] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState('Request Registration');

    useEffect(() => {
        getEventDetails();
    }, []);

    //method to fetch particular event details
    const getEventDetails = async () => {
        try {
            const request = {
                method: "GET",
                headers: { user: user }
            }
            const response = await fetch(`http://localhost:8000/events/details/${eventId}`, request);
            const result = await response.json();
            setEventSelected(result);
        } catch (error) {
            console.log(error);
        }
    }

    //method to register for an event
    const registrationRequestHandler = async (event) => {
        try {
            const request = {
                method: "POST",
                body: JSON.stringify({}),
                headers: { user: user, "Content-Type": "application/json" },
            }
            await fetch(`http://localhost:8000/registration/${event.id}`, request);
            setRegistrationStatus('Requested');
            setIsRequested(true);
        } catch (error) {
        }
    }

    //method to view registered participants
    const viewParticipantsHandler = async (event) => {
        try {
            localStorage.setItem("eventId", event);
            history.push('/event/participants')
        } catch (error) {
            console.log(error);
        }
    }

    //method to delete an event
    const deleteEventHandler = async (eventId) => {
        try {
            const request = {
                method: "DELETE",
                headers: { user: user }
            }
            await request(`http://localhost:8000/event/${eventId}`, request);
            history.push('/')
        } catch (error) {
        }
    };

    return (
        
        <div className="info-container" width="100%">
            <div className="header-image"></div>
            <center><h1 className="title">{eventSelected.title}</h1></center>
            <div className="des">
                <b>Event description: </b> {eventSelected.description} <br />
                <b>Event type: </b> {eventSelected.eventType} <br />
                <b>Event Time: </b> {eventSelected.time} <br />
                <b>Event Date: </b> {moment(eventSelected.date).format('l')} <br />
                <b>Event Price: </b> {" $ " + eventSelected.price}

            </div>
            { eventSelected.user !== user_id ? (
                <div>
                    <Button disabled={isRequested} className="registerr" onClick={() => registrationRequestHandler(eventSelected)}>{registrationStatus}</Button>
                </div>
            ) : (
                    <div className="outer-div">
                        <div className="btn-outer">
                            <Button className="guest" onClick={() => viewParticipantsHandler(eventSelected._id)}>Participants Details
                            </Button>
                        </div>
                        <div>
                        </div>
                    </div>
                )}
        </div>
    );
}