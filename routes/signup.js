const express = require("express");
const route = express();

const signUpController = require("../controllers/signUpController");

route
  .get("/", signUpController.signUpGet)
  .post("/", signUpController.validateSignUp, signUpController.signUpPost);

module.exports = route;
