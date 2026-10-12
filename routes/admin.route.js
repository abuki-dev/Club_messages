const express = require("express");
const { upgradeUser } = require("../models/user.model");
const { deleteBody } = require("../models/message.model");

const adminRouet = express.Router();

//post with secret code if match seucuces message with
// autentcateion
//
//get reder form
adminRouet.get("/", (req, res) => {
  res.render("adminform", { message: [] });
});
// post the messages with sanitizations
adminRouet.post("/", async (req, res) => {
  // now let us check the req inputs
  const { secret } = req.body;
  if (secret === process.env.ADMIN_SECRET) {
    //toggle is memeebr "true" from database and redirect
    req.session.messages = ["You are now Admin"];
    const result = await upgradeUser(req.user.id, "admin");
    return res.redirect("/messages"); //
    //return res.json({ message: ["u're now an  admin"] });
  }

  res.render("adminform", { message: "error the secret code is not correct" });
});



// if some one is memeber --- render him memebr.ejs but router path is /messages
// elese --render him messages.ejs also the path is /messages

module.exports = { adminRouet };
