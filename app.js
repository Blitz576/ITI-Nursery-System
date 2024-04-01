//setup enviroment
require("dotenv").config();

//import modules
const express = require("express"); //express
const logger = require("morgan"); //logging in middle ware
const multiDomain = require("cors");
const mongoose = require("mongoose"); //dataBase ODM

//import Routes
const registRoute = require("./Routes/regestration"); //register route object
const loginRoute = require("./Routes/authentication"); //login route object
const autherization = require("./Middlewares/authentication"); //authentication middle ware
const teacherRoute = require("./Routes/teachersRoute"); //teacher route object
const childRoute = require("./Routes/childRoute"); //child toure object
const classRoute = require("./Routes/classRoute"); //class route object
const morgan = require("morgan");
const uploads = require("./Middlewares/imageBuffer")
/***********Configration */
//setting default port number
const portNubmer = process.env.PORT || 8080; //short circut

//create server
const server = express();

mongoose
  .connect(process.env.URL)
  .then(() => {
    //run server
    console.log("Connected to nurserySystem");
    server.listen(portNubmer, () => {
      console.log(`Server is running on port ${portNubmer}`);
    });
  })
  .catch((error) => {
    console.log("connection Failed", error);
  });

/*********MiddleWare************/

//server.use(multiDomain); //multiable domains
server.use(logger("tiny")); //logger with tiny format

/***********EndPoints***********/
server.use(express.json()); //parse to json if data was sended by json
server.use(express.urlencoded({extended: false}))
server.use(uploads);
// //registeration
// server.use(registRoute);

// //authentication
// server.use(loginRoute);

// //autherization
// server.use(autherization);

//teacher
server.use(teacherRoute);

//children
server.use(childRoute);

//class
server.use(classRoute);

/****DEFAULT*******/

server.use((request, response) => {
  //NO Matches
  response.status(404).json({ error: "Page Not Found" });
});

/********ERROR*********/
server.use((error, request, response, next) => {
  //Error Found
  response.status(500).json({ error: `${error}` });
});
