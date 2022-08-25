const express = require("express");
const bodyParser = require("body-parser");
const Passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const fs = require("fs");
const session = require("express-session");

const app = new express();
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(Passport.initialize());

app.use(Passport.session());

app.get("/", (req, res) => {
  res.render("index");
});


app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    Passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/loginok",
    })
  );
//cach khac
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post(
//   "/login",
//   Passport.authenticate("local", {
//     failureRedirect: "/login",
//     successRedirect: "/loginok",
//   })
// );

app.get("/private/", (req, res) => {
  // console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
  
    res.send("ban da dang nhap roi");
  } else {
    res.send("ban chua dang nhap");
  }
});

app.get("/loginok", (req, res) => {
  res.send("dang nhap thanh cong");
});

Passport.use(
  new localStrategy((username, password, done) => {
    fs.readFile("./userDB.json", (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find((user) => user.usr == username);
      if (userRecord && userRecord.pwd == password) {
        return done(null, userRecord);
      } else {
        return done(null, false);
      }
    });
  })
);

Passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.usr);
});

Passport.deserializeUser((name, done) => {
  fs.readFile("./userDB.json", (err, data) => {
    const db = JSON.parse(data);
    const userRecord = db.find((user) => user.usr == name);
    // console.log('line 93');
    // console.log(userRecord)
    if (userRecord) {
      return done(null, userRecord);
    } else {
      return done(null, false);
    }
  });
});
const port = 3000;

app.listen(port, () => {
  console.log(`server da khoi dong voi port ${port}`);
});
