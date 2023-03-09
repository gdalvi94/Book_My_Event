import React, { useState, useContext } from "react"; //import react
import { Button, Form, FormGroup, Alert } from "reactstrap"; //import reactstrap
import { UserContext } from '../../user-context'; //import context wrapper
import { MdLock, MdEmail } from "react-icons/md"; //import icons
import SignIn from '../../resources/LoginRegister/images/login.png'; //import images
import '../Login/login.scss'; //import scss

//function 
function  Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  //function for handling login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    //post request call to server
    const request = {
      method: "POST",
      body: JSON.stringify({
        email: email, 
        password: password}),
      headers: { "Content-Type": "application/json" }
    }
    console.log(request);
    const response = await fetch("http://localhost:8000/login", request); //fetch call to server, store response
    const result = await response.json();//convert in json format
    const user_id = result.user_id || false;
    const user = result.user || false;
    const user_name = result.user_name || false;

    try {
      if (user && user_id) { //if server call returns user and userid, set state to logged in
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user_name", user_name);

        setIsLoggedIn(true);
        history.push("/");
      } else { //if no user and userid returned by server, throw error
        const { message } = result;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } catch (err) { //error handling
      setError(true);
      setErrorMessage("Error is " + err);
    }
  };

  return (

    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={SignIn} alt="sing up image" /></figure>
              <a className="signup-image-link"
                onClick={() => {
                  history.push("/register");
                }}><b>Create an Account</b></a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Log In</h2>
              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="your_name"><MdEmail fontSize="large" /></label>
                  <input
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your email here"
                  />
                </div>
                <div className="form-group">
                  <label for="your_pass"><MdLock fontSize="large" /></label>
                  <input
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter your password here"
                  />
                </div>
                <FormGroup>
                  <Button  color="success" className="submit-btn" size="lg"><b>Submit</b></Button>
                </FormGroup>

              </Form>
              {errorMessage ? (
                <Alert color="danger" className="event-validation">
                  {errorMessage}
                </Alert>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Login;
