const express = require("express");
const personalRoute = express.Router();

personalRoute.get("/", (req, res) => {
  console.log(res.user.id)
  res.render("personal.ejs");
  console.log('testtttttt')
});

module.exports = personalRoute;
