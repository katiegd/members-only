const express = require("express");
const route = express();

const newMessageController = require("../controllers/newMessageController");

route.get("/", newMessageController.newMessageGet);

module.exports = route;
