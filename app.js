const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");

const app = express();

// Set up routers
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const newMessageRouter = require("./routes/newMessage");
const deleteRouter = require("./routes/delete");

// Set up views path and ejs view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Session config
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false })); // For form data

// Current user middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/newMessage", newMessageRouter);
app.use("/delete", deleteRouter);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`listening on port ${PORT}.`));
