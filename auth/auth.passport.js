const passportjs = require("passport");
const Localstrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const {
  findByemail,
  findById,
  findByemailorUsername,
} = require("../models/user.model");
passportjs.use(
  new Localstrategy(
    { usernameField: "login" },
    async (username, password, done) => {
      try {
        // find uer by the username from teh database
        const isUserfounded = await findByemailorUsername(username);

        if (!isUserfounded) {
          return done(null, false, {
            message: ["username Not found Try agan"],
          });
        }

        // if the user name founded we can go ti compare the password
        const isMatch = await bcrypt.compare(
          password,
          isUserfounded[0].password,
        );
        if (isMatch) {
          return done(null, isUserfounded);
        }
        console.log("after compare");
        done(null, false, {
          message: "Error the password is not correct try agan ",
        });
      } catch (error) {
        console.log("insode the error");
        return done(null, false, { message: error.message });
      }
    },
  ),
);

passportjs.serializeUser((user, done) => {
  console.log(user);
  done(null, user[0].id);
});
passportjs.deserializeUser(async (id, done) => {
  try {
    const findUser = await findById(id);
    done(null, findUser[0]);
  } catch (error) {
    done(error);
  }
});

module.exports = { passportjs };
