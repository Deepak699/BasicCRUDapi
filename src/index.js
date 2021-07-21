const express = require("express");
const userRouter = require("../routes/Users");
require("dotenv").config();
require("../db/db");
const app = express();
app.use(express.json())
app.use(userRouter);
app.listen("3000", () => {
  console.log("Listiening");
});
