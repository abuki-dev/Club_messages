const express = require("express");
const { upgradeUser } = require("../models/user.model");

const joinRouter = express.Router();

//post with secret code if match seucuces message with
// autentcateion
//
//get render form
joinRouter.get("/", (req, res) => {
  res.render("joinform");
});

// post the messages with sanitizations
joinRouter.post("/", async (req, res) => {
  // now let us check the req inputs
  const { secret } = req.body;
  if (secret === process.env.CLUB_SECRET) {
    const result = await upgradeUser(req.user.id, "member");
    //toggle is memeebr "true" from database and redirect
    req.session.messages = ["You are now club memeber"];
    return res.redirect("/messages"); //
    // return res.json({ message: ["u're now a club member"] });
  }

  res.render("joinform", { errors: ["error the secret code is not correct"] });
});

// if some one is memeber --- render him memebr.ejs but router path is /messages
// elese --render him messages.ejs also the path is /messages

module.exports = { joinRouter };
