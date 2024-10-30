const db = require("../models/queries");

async function newMessagePost(req, res, next) {
  if (!req.user) {
    return res.redirect("/login");
  }

  const { title, message } = req.body;
  const userId = req.user.id;

  await db.addNewMessage(userId, title, message);

  res.redirect("/");
}

module.exports = {
  newMessagePost,
};
