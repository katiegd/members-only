const db = require("../models/queries");

async function newMessageGet(req, res) {
  res.render("newMessage");
}

module.exports = {
  newMessageGet,
};
