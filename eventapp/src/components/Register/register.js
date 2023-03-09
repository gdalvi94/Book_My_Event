import React, { useState, useContext } from "react"; //import react
import { Button, Form, FormGroup, Alert } from "reactstrap"; //import reactstrap
import { UserContext } from '../../user-context';//import context wrapping
import '../../resources/LoginRegister/styles/style.scss';//import styling
import SignUp from '../../resources/LoginRegister/images/UserRegistration.png';//import images
import '../Register/register.scss';//import scss

import { MdLock, MdEmail, MdPerson } from "react-icons/md";//import icons

//register function to check if user aready exists and if not, create new user
function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //function for form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    //check for empty fields
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const request = {
        method: "POST", //post method to send data from form to mongodb
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
        headers: {"Content-Type": "application/json"}
      }
      const response = await fetch("http://localhost:8000/user/register", request); //fetch call to server, store response
      const result = await response.json(); //convert in json format
      const user = result.user || false;
      const user_id = result.user_id || false;
      
      if (user && user_id) { //if call to server returns user and userid, set state as logged in
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);//user_item
        setIsLoggedIn(true);
        history.push("/");
      } else { //if user and userid is not returned in server call, return error
        const { message } = result;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } else { //if fields are empty, throw error and display error message
      setError(true);
      setErrorMessage("Please enter all the fields");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    }
  };

  //Add onsubmit functions
  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              {/* call function on form submit */}
              <Form onSubmit={handleSubmit} className="register-form" id="register-form">
                <div className="form-group">
                  <label for="name">
                    <MdPerson fontSize="large" />
                  </label>
                  <input onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                    type="text"
                    name="firstName"
                    id="examplefirstName"
                    placeholder="Enter first name" />
                </div>
                <div className="form-group">
                  <label for="name"><MdPerson fontSize="large" /></label>
                  <input onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                    type="text"
                    name="lastName"
                    id="examplelastName"
                    placeholder="Enter last name" />
                </div>
                <div className="form-group">
                  <label for="email"><MdEmail fontSize="large" /></label>
                  <input onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label for="pass"><MdLock fontSize="large" /></label>
                  <input onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter password" />
                </div>
                <FormGroup>
                  <Button color="success" className="submit-btn" size="lg">Register</Button>
                </FormGroup>

              </Form>
              {errorMessage ? (
                <Alert color="danger" className="event-validation">
                  Missing required information
                </Alert>
              ) : (
                  ""
                )}
            </div>
            <div className="signup-image">
            <figure><img src={SignUp} alt="sign up image" /></figure>
              <a onClick={() => {
                history.push("/login");
              }} className="signup-image-link"><b>My Account Exists, Login!!</b></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
