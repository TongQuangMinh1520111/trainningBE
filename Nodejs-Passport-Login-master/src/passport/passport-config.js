const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const fs = require("fs");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    fs.readFile("./src/database/userDB.json", async (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find((user) => user.email === email);
      
      if (userRecord == null) {
        return done(null, false, { message: "No user with that email" });
      }
      try {
        return done(null, userRecord);
        if (await bcrypt.compare(password, userRecord.password)) {
          return done(null, userRecord);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    fs.readFile("./src/database/userDB.json", (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find((user) => user.id == id);
      if (userRecord) {
        return done(null, userRecord);
      } else {
        return done(null, false);
      }
    });
  });
}

module.exports = initialize;
