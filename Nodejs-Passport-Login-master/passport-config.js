const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const bcrypt = require("bcrypt");

function initialize(passport ) {
  // getUserByEmail
  //getUserById
  // const authenticateUser = async (email, password, done) => {
  //   const user = getUserByEmail(email);
  //   if (user == null) {
  //     return done(null, false, { message: "No user with that email" });
  //   }

  //   try {
  //     if (await bcrypt.compare(password, user.password)) {
  //       return done(null, user);
  //     } else {
  //       return done(null, false, { message: "Password incorrect" });
  //     }
  //   } catch (e) {
  //     return done(e);
  //   }
  // };
  const authenticateUser = (email, password, done) => {
    fs.readFile("./userDB.json", async (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find((user) => user.email === email);
      if (userRecord == null) {
        return done(null, false, {
          message: "No user with that email"
        });
      }
      try {
        if (await bcrypt.compare(password, userRecord.password)) {
          console.log({password});
          console.log(userRecord.password)
          return done(null, userRecord);
        } else {
          return done(null, false, {
            message: "Password incorrect"
          });
        }
      } catch (e) {
        return done(e);
      }
    });
  };

  passport.use(new LocalStrategy({
    usernameField: "email"
  }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    // return done(null, getUserById(id));
    fs.readFile("./userDB.json", (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find((user) => user.id === id);
      if (userRecord) {
        return done(null, userRecord);
      } else {
        return done(null, false);
      }
    });
  });
}

module.exports = initialize;