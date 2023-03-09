import React, { useState, useEffect } from 'react'; //import react
import moment from 'moment'; ////import moment library for parsing, validating and formatting dates
import "../Invitee/invitee.scss"; //import styling
import { Container } from 'reactstrap'; //import reactstrap

export default function Invitee() {
    const [eventInvitee, setEventInvitee] = useState([]);
    const user = localStorage.getItem("user");
    const eventId = localStorage.getItem("eventId");

    useEffect(() => {
        getInvitee();
    }, []);

    //method to fetch invitees/participants for a specific event
    const getInvitee = async () => {
        try {
            const request = {
                method: "GET",
                headers: { user: user }
            }
            const response = await fetch(`http://localhost:8000/event/participants/${eventId}`, request);
            const result = await response.json();
            setEventInvitee(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <Container className='ig' >
            <ul className="invitee">
                <h1><b>Total Invitees:-</b> {(eventInvitee.length)}</h1>
                {eventInvitee.map(invitee => (
                    <li key={invitee._id} className="guestlist">
                        <div className="invitee-name"><b><i>{invitee.user.firstName + " " + invitee.user.lastName}</i></b></div>
                        <div><b>Email: {invitee.userEmail}</b></div>
                        <div><b>Request Time: {moment(invitee.date).format('l')}</b></div>
                    </li>
                ))}
            </ul>
            </Container>
                
       
       
        </div>
        

        
    );
   


}