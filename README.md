# final-project-gryffindor
final-project-gryffindor created by GitHub Classroom

### Book My Event 

###  Team Members
Pratiksha Patil (NUID: 002762706) patil.pratik@northeastern.edu

Gayatri Dalvi (NUID : 002711803) dalvi.ga@northeastern.edu

Aniket Bhore (NUID: 002756183) bhore.a@northeastern.edu

Neha Shende (NUID : 002783740) shende.n@northeastern.edu


### Description:

The project is Event Management System Model having following functionalities-

1)Dashboard - 

  User can see all the events created by other users.
  
  User can  register to any event and send request to them.
  
  User create own event.

  User can delete own event.

  User can accept or deny the registration requests.



 3) Sign Up-

  User will be able to register the site with first name,last name, email and password.



 2) Login-

  User will be able to login with email and password given.


### Technologies Used
  Backend: Express.js, Node.js, MongoDB, Mongoose

  Frontend: Reactjs,scss

  API- Rest API

  Methods used- POST,GET,PUT,DELETE


### Steps to run the project locally:

1. Clone the github repository.

  "https://github.com/neu-mis-info6150-fall-2022/final-project-gryffindor.git"

2. Change directory to eventapp 

    "cd eventapp"

3. Install node modules

    "npm install"

4. Build the project

    "npm run build"

5. Start the frontend

   " npm start"

 6. Open other terminal ,change directory to backend

    "cd backend"  

 7. Connect to Mongodb and name db collection  as "eventsdb"


 8. Install node modules in backend

    "npm install" 

9. start the project

    "npm run start"


### Features:


1) Register/Login security via password hashing.

2) Using tokens and verifying for protecting routes using npm package "jsonwebtoken"

2) Protecting routes using npm package "jsonwebtoken" and using tokens and verifying.

3) Creating event with proper validations

4) Storing images locally and using timestamp for unique identification of image using npm package "multer"

5) Displaying events ascendingly sorted with base of Date

6) Filtering events based on event-type(farewell,concert,reunion,other)

7) Deleting events that you have created.

8) Requesting registration for event as an attendee.

9) Accepting/Rejecting participant request as an organizer of event.

10) Viewing number of particpants and all details of particpants.





 ### Structure

 1. eventapp - react application.

 2. /eventapp/src/components- folder with all js files including dashboard,event Booking, Event Description ,event Page, Invitee ,Login , navbar ,registration page including their scss files.

 3. resources/LoginRegister/images - added images .

 4. backend - folder containing backend.

 5. backend/controllers- Folder having all the controllers defined in it.

 6. backend/models -Folder having all the model schema defined in it.

 7. config/verifyToken - token for authorization.

 8. backend/server.js - Connection to db.

 9. backend/routes.js -file having routes.



### References

https://fonts.google.com/

https://reactjs.org/

https://sass-lang.com/

https://developer.mozilla.org/en-US/

https://www.w3schools.com/w3css/defaulT.asp
