const { body } = require("express-validator");

const nameValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Error Name filed is empty")
    .isAlpha()
    .withMessage("name field Only letters are allowed i"),
];

const emailValidations = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Error invalid Email Format")
    .normalizeEmail(),
];
const passwordValidations = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Paasword must be atleas 8 digit"),
];

const passwordConfirmation = [
  body("confirmpassword")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Error the passwords are not same")
];

module.exports = {
  passwordConfirmation,
  passwordValidations,
  emailValidations,
  nameValidations,
};
