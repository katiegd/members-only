const express = require("express");
const route = express();

const loginController = require("../controllers/loginController");

route.get("/", loginController.loginGet).post("/", loginController.loginPost);

module.exports = route;
