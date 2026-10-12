const { body } = require("express-validator");

const titleVlidators = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("The titel field can not be empty"),
];

const messagesValidators = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("The body cannot be empty")
    .isLength({ min: 10 })
    .withMessage("Error the body shoud be atleast 20 characters"),
];

module.exports = { messagesValidators, titleVlidators };
