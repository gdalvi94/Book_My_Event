//importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes.js");
const path = require("path");
const PORT = 8000; //choosing port 8000
const http = require('http');
const app = express();
const server = http.Server(app);

try {
  mongoose.connect('mongodb://localhost:27017/eventsdb'); //connection to db
  console.log("MongoDb connected successfully!"); //success message for db connection
} catch (error) {
  console.log(error);
}

app.use((req, res, next) => {
  return next();
})
app.use(cors());
app.use(express.json());

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});