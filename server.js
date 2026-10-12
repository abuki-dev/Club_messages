require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const { registraionRouter } = require("./auth/signup");
const { singinrouter } = require("./auth/singin");
const { joinRouter } = require("./routes/join.routes");
const { adminRouet } = require("./routes/admin.route");
const { messagesRouter } = require("./routes/messages.route");
const path = require("path");
const morgan = require("morgan");
const { onlyMessage } = require("./models/message.model");
const { logout } = require("./auth/auth.passport");
const app = express();
const PORT = process.env.APP_PORT;
// first let us setup or helmet to the app
app.use(helmet());
app.use(morgan("dev"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); // initilaizing
app.use(passport.session());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));

// after teh setuo letus go to regestration panale
app.get("/", async (req, res) => {
  // sends all messages
  // get title and text onle form the database disppay it
  const messages = await onlyMessage();

  res.render("home", { messages });
  //return res.json({ messages: "welcome" });
});
app.use("/register", registraionRouter);
app.use("/login", singinrouter);

// todo
//
// below this route request must bes autentcated to access the pages
app.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    req.session.messages = ["Pleas login to access this page"];
    return res.redirect("/login");
  }
  //
  next();
});
app.use("/messages", messagesRouter);
app.use("/join", joinRouter);
app.use("/admin", adminRouet);
app.use("/logout", logout);
app.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
});
