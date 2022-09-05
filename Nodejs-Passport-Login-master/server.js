const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const path = require("path");
const accountRouters = require("./src/routes/account.route");
const personalRoute = require("./src/routes/personal.route");
const initializePassport = require("./src/passport/passport-config");
const checkAuth = require("./src/checkauth/account.checkauth");
var bodyParser = require('body-parser')

initializePassport(passport);
require("dotenv").config({
  path: "./.dev.env",
});

app.set("view-engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(flash());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/account/", accountRouters);

app.get("/:id", checkAuth.checkAuthenticated, (req, res) => {
  res.render("personal.ejs", { name: req.user.name });
});

app.get("/", checkAuth.checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.post("/logout/", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/account/login/");
  });
});

app.listen(8080);
