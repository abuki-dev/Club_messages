const passportjs = require("passport");
const Localstrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
passportjs.use(
  new Localstrategy(async (username, password, done) => {
    try {
      // find uer by the username from teh database
      const isUserfounded = "find teh user bythe email";

      if (!isUserfounded) {
        return done(null, false, { message: ["username Not found Try agan"] });
      }

      // if the user name founded we can go ti compare the password
      const ismMatch = await bcrypt.compare(passport, isUserfounded.password);
      if (ismMatch) {
        return done(null, isUserfounded);
      }

      done(null, false, {
        message: "Error the password is not correct try agan ",
      });
    } catch (error) {
      return done(null, false, { message: error.message });
    }
  }),
);

passportjs.serializeUser((user, done) => {
  done(null, user.id);
});
passportjs.deserializeUser((id, done) => {
  // check the user from the database
  const realUser = "Find from the database";
  done(null, realUser);
});

module.exports = { passportjs };
