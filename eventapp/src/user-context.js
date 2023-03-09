import React, { useState, createContext } from 'react'; //import react

export const UserContext = createContext(); //to read current contect value from closed matching provider above ir in tree

export const ContextWrapper = (props) => {

    //set value for default state handling
    const defaultValueHandler = () => {
        const user = localStorage.getItem('user');
        if(user) return true;
        return false;
    } 

    const [isLoggedIn, setIsLoggedIn] = useState(defaultValueHandler());
    const user = {
        isLoggedIn,
        setIsLoggedIn
    }
    
    return(
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}