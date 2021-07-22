//Importing Modules
const express = require("express");
const userRouter = require("../routes/Users");
require("dotenv").config();
require("../db/db");

//Initializing Server
const app = express();

//Configuring Server to recieve data in json format
app.use(express.json());

//Using userRouter
app.use(userRouter);

app.listen("3000", () => {
  console.log("Listiening");
});
