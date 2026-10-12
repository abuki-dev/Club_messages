const express = require("express");
const {
  messagesValidators,
  titleVlidators,
} = require("../validators/message.validator");
const { validationResult } = require("express-validator");
const { findByemail } = require("../models/user.model");
const {
  selecrtAllMessages,
  onlyMessage,
  insertBody,
  deleteBody,
} = require("../models/message.model");
const messagesRouter = express.Router();

// get the messagse get all messages from the database
messagesRouter.get("/", async (req, res) => {
  const user = req.user;
  //check the user form the databse if he is memeber
  const userFromdabase = await findByemail(user.email);
  if (userFromdabase.length === 0) {
    req.session.messages = [" regester to access this page"];
    return res.redirect("/login");
  }
  const message = req.session.messages || null;
  req.session.messages = [];

  if (userFromdabase[0].is_admin) {
    // select all messages dee
    const allMessages = await selecrtAllMessages();
    return res.render("admin", { messages: allMessages, message });
    //return res.json({ allMessages });
  }
  if (userFromdabase[0].is_member) {
    // select all message and cannt dellete messages
    const allMessages = await selecrtAllMessages();

    return res.render("members", { messages: allMessages, message });
    //  return res.json({ allMessages });
  }
  const onlyMessages = await onlyMessage();
  console.log(onlyMessages);
  // select messages tite and body only
  res.render("messages", { messages: onlyMessages });
  // res.json({ onlyMessages });
});

messagesRouter.get("/new", (req, res) => {
  res.render("newmessage", { message: null });
});

messagesRouter.post(
  "/new",
  messagesValidators,
  titleVlidators,
  async (req, res) => {
    console.log("inide new ");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array();
      return res.render("newmessage", { errors: messages });
      // return res.json({ messages });
    }

    const { title, message } = req.body;
    const user = req.user.id;
    const result = await insertBody([title, message, user, req.user.fullname]);
    // insert into databse the tite message and the user as aouthor
    res.render("newmessage", { message: ["sucussfuly created new message"] });
    // res.json({
    //   message: [`new message got added with title '${result[0].title}'`],
    // });
  },
);

messagesRouter.post("/:id", async (req, res) => {
  try {
    console.log("inide deleete");

    const id = req.params.id;
    const result = await deleteBody(id);
    req.session.messages = [`successfully deleted the message with id '${id}'`];
    res.redirect("/messages");
    //  res.json({
    //     message: [`successfully deleted the message with id '${messsageId}'`],
    //   });
  } catch (err) {
    res.render({ errors: ["message not found"] });
    // res.json({ message: ["message not found"], err: err.message });
  }
});

module.exports = { messagesRouter };
