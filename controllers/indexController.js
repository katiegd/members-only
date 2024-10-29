const db = require("../models/queries");

async function indexGet(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages });
}

module.exports = {
  indexGet,
};
