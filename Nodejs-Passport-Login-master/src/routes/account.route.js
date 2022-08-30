const express = require("express");
const accountRouters = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const passport = require("passport");
const AccountController = require("../controllers/account.controller");
const checkAuth = require("../checkauth/account.checkauth");
accountRouters.get(
  "/login/",
  checkAuth.checkNotAuthenticated,
  AccountController.getLogin
);

accountRouters.post(
  "/login",
  checkAuth.checkNotAuthenticated,
  passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "./login",
    failureFlash: true,
  }),
  function (req, res, next) {
    return res.redirect(`/${req.user.id}`);
  }
);

accountRouters.get("/register", checkAuth.checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

accountRouters.post("/register", checkAuth.checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    fs.readFile("./src/database/userDB.json", (err, data) => {
      if (err) {
        console.log("have some err");
      }
      db = JSON.parse(data);
      db.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      newdb = JSON.stringify(db);
      fs.writeFile("./src/database/userDB.json", newdb, (err) => {
        if (err) {
          console.log("some err");
        }
      });
    });

    res.redirect("./login");
  } catch {
    res.redirect("./register");
  }
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}


module.exports = accountRouters;
