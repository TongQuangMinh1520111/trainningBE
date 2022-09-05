var jwt = require('jsonwebtoken');




const checkAuth = {
  checkAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/account/login");
  },
  checkNotAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    next();
  },

  checkJWTAuthenticated: (req, res, next) => {
    // return next();
    // get token
    try {
      let token = req.get('Authorization');
      token = token.split('Bearer ')[1];
      console.log(token);
      var decoded = jwt.verify(token, 'keyahihi');
      if( decoded && decoded.id ) {
        next();
      } else {
        res.status(201);
        res.json({"msg": "layj mas"});
      }
    } catch(err) {
      res.status(201);
      res.json({"msg": "layj mas"});
    }
  },
};

module.exports = checkAuth;
