const express = require("express");
const route = express();
const db = require("../models/queries");

route.get("/:id", (req, res) => {
  res.redirect("/");
});

route.post("/:id", async (req, res) => {
  const messageId = req.params.id;
  console.log(messageId);
  try {
    await db.deleteMessage(messageId);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete message." });
  }
});

module.exports = route;
