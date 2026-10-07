require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const { registraionRouter } = require("./auth/signup");
const { singinrouter } = require("./auth/singin");
const app = express();

// first let us setup or helmet to the app
app.use(helmet());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); // initilaizing
app.use(passport.session());

// after teh setuo letus go to regestration panale
app.get("/", (req, res) => {
  // sends all messages
  // get title and text onle form the database disppay it

  res.render("landing", { message: [], errors });
});
app.use("/register", registraionRouter);
app.use("/login", singinrouter);

// todo
//
// below this route request must bes autentcated to access the pages
app.use((req, res, next) => {
  if (req.isUnauthenticated) {
    res.redirect("/login");
  }
  //
  next();
});
app.use("/join", joinRouter);
app.use("/messages", messagesRouter);
app.use("/admin", adminRouet);
