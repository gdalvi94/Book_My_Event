import React, { useEffect, useMemo, useState } from "react";//import react


import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  
  InputGroupText,
  Label
} from 'reactstrap'; //import specific components from reactstrap
// Event Page

import "./events.scss"; //import styling

function EventsPage({ history }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [eventType, setEventType] = useState("Event Type");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so add 1
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }//make double digit date
    if (mm < 10) {
      mm = '0' + mm
    }//make double digit month
    today = yyyy + '-' + mm + '-' + dd; //date format
    document.getElementById("date").setAttribute("min", today);

    //if user does not exist, redirect to login page
    if (!user) {
      history.push("/login");
    }
  }, []);

  // Submit call
  const handleEventSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      "eventType": eventType,
      "title": title,
      "price": price,
      "description": description,
      "date": date,
      "time": time
    };

    console.log(eventData);

    try {
      if ( //check for empty fields
        title !== "" &&
        description !== "" &&
        price !== null &&
        eventType !== "" &&
        date !== "" &&
        time !== ""
      ) {
        const request = { //post form data to database
          method: "POST",
          body: JSON.stringify(eventData),
          headers: { user: user, "Content-Type": "application/json" }
        }
        await fetch("http://localhost:8000/event", request); //fetch all events after event creation
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/");
        }, 2000);
      } else { //timeout if event creation fails
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (er) {
      Promise.reject(er);
      console.log(er.message);
    }

    return "";
  };
  // Event form
  return (
    <Container className="events">

      <center ><h2 className="page">Create your events</h2></center><hr></hr><br></br><br></br>
      

      <Form onSubmit={handleEventSubmit}>

        <FormGroup row>
          <Label for="eventtitle" className= "titlelbl" sm={2}>Event Title : </Label>
          <Col sm={10}>
            <Input placeholder="Enter event title"
              bsSize="lg"
              id="title"
              type="text"
              className= "titletext" 
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }} />
          </Col>
        </FormGroup><br></br>
        <FormGroup row>
          <Label className="lbldesc" for="desc" sm={2}>Event Description : </Label>
          <Col sm={10}>
            <Input placeholder="Enter event description"
              bsSize="lg"
              id="description"
              type="textarea"
              value={description}
              className="desc"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Col>
        </FormGroup><br></br>
        <FormGroup row>
          <Label className="lbltype" for="type" sm={2}>Event Type</Label>
          <Col sm={10}>
            <Input type="select" name="select" id="type"
              onChange={(event) => {
                setEventType(event.target.value);
              }}
              className="type"
            >
              <option disabled selected>Select Event Type</option>
              <option value="concert">Concert</option>
              <option value="reunion" >Reunion</option>
              <option value="farewell">Farewell</option>
              <option value="other">Other</option>
            </Input>
          </Col>
        </FormGroup><br></br>
        <FormGroup row>
          <Label className="price" for="price" sm={2}>Event Price : </Label>
          <Col sm={10}>
            <InputGroup>
              <Input
                placeholder="Enter price of event in $"
                id="price"
                type="number"
                min="0"
                step="any"
                className="inputprice"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </FormGroup><br></br>

        <FormGroup row>
          <Label className="lbldate" for="date" sm={2}>Select Date : </Label>
          <Col sm={10}>
            <Input
              placeholder="Enter date of event"
              id="date"
              type="date"
              className="inputdate"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </Col>
        </FormGroup><br></br>

        <FormGroup row>
          <Label className="lbltime" for="time" sm={2}>Select Time : </Label>
          <Col sm={10}>
            <Input
              placeholder="Enter time of event"
              id="time"
              className="time"
              type="time"
              value={time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </Col>
        </FormGroup><br></br>

        <br />
        <FormGroup>
          <Button className="createbtn"><b>Create Event</b></Button>
          <Button
            className="cancelbtn"
            onClick={() => {
              history.push("/");
            }}
            color="danger"
            size="lg"
          >
            <b>Cancel</b>
          </Button>
        </FormGroup><br></br>
      </Form>

      {error ? (
        <Alert color="danger" className="alertdanger">
           All fields are required
        </Alert>
      ) : (
          ""
        )}

      {success ? (
        <Alert className="alertsuccess" color="success">
          Event created successfully
        </Alert>
      ) : (
          ""
        )}
    </Container>
  );
}

export default EventsPage;
