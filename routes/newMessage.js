const express = require("express");
const route = express();

const newMessageController = require("../controllers/newMessageController");

route.post("/", newMessageController.newMessagePost);

module.exports = route;
