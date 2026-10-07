const express = require("express");
const { passportjs } = require("./passport");
const { rateLimit } = require("express-rate-limit");
const singinrouter = express.Router();

const loginlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // time fro the next req after ban blockage
  limit: 5, // attempt
});

singinrouter.post(
  "/",
  loginlimiter,
  passportjs.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureMessage: true,
  }),
);

singinrouter.get("/", (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("signin", { errors: [""] });
});

module.exports = { singinrouter };
