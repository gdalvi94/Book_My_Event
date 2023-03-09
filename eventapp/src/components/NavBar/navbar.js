import React, { useState, useContext } from 'react';//import react
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
  } from 'reactstrap'; //import reactstrap components
import { UserContext } from '../../user-context'; //import context wrapper
import "../NavBar/navbar.scss";//import styling

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const user = localStorage.getItem("user");
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
  
    //method to logout
    const logoutHandler = () => {
        console.log(user);
        console.log(userId);
        console.log(userName);
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            setIsLoggedIn(false);
        }, 500);
    }
    
//check login status
    return isLoggedIn ?
    <div  className="dashNav" >
    <Navbar className='navbarevent'>
      <NavbarBrand>
        <a href="/" className="navbarLogodash"><h1>Book My Event</h1></a>
      </NavbarBrand>
        <Nav className="link" navbar>
          <NavItem>
            <NavLink href="/" className='dash'>Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <a href="/"  onClick={logoutHandler}>                         
            <Button color="danger" className="logoutbtn">Logout</Button><span><p className='userName'>{userName}</p>
            </span></a>
          </NavItem>
        </Nav>
    </Navbar>
  </div>
    :
    <div className="navLogin" >
      <Navbar dark expand="md">
        <NavbarBrand>
        <a href="/" className="navbarLogo">Book My Event</a>
        </NavbarBrand>
        </Navbar>
    </div>
}

export default NavBar;