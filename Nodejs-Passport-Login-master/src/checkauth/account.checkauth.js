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
};

module.exports = checkAuth;
