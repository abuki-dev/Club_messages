const { body } = require("express-validator");

const titleVlidators = [
  body("title")
    .trim()
    .isEmpty()
    .withMessage("The titel field can not be empty"),
];

const messagesValidators = [
  body("message")
    .trim()
    .isEmpty()
    .withMessage("The body cannot be empty")
    .isLength({ min: 20 })
    .withMessage("Error the body shoud be atleast 20 characters"),
];

module.exports = { messagesValidators, titleVlidators };
