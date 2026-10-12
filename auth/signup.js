const express = require("express");
const registraionRouter = express.Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const {
  nameValidations,
  emailValidations,
  passwordValidations,
  passwordConfirmation,
} = require("../validators/user.validator");
const { findByemail, insertNewuser } = require("../models/user.model");

registraionRouter.post(
  "/",
  nameValidations,
  emailValidations,
  passwordValidations,
  passwordConfirmation,
  async (req, res) => {
    // passing it to the validator to returrn errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("registration", {
        errors: errors.array(),
        message: [],
      });
      //return res.json({ errors: errors.array() });
    }
    // we passed and sanitized all datas so we cam perform regestarion
    const { name, email, password } = req.body;

    //?database cheking operation
    const ueserExists = await findByemail(email);
    //?
    if (ueserExists.length === 1) {
      return res.render("registration", {
        errors: ["Email alady in use try login "],
        message: [],
      });
      // return res.json({
      //   message: "email already used",
      //   ueserExists: ueserExists,
      // });
    }
    // if user doesnt exists
    const username = email.split("@")[0];
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await insertNewuser([name, username, email, passwordHash]);

    res.render("registration", {
      errors: [],
      message: ["Account Creataed login using " + result[0].username],
    });
    // res.json({
    //   message: `"Account Creataed login using ${result[0].username}`,
    // });
  },
);
registraionRouter.get("/", (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("registration", { messages: null, errors: messages });
});

module.exports = { registraionRouter };
