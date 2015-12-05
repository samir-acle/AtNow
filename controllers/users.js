var passport = require("passport");

var userRoutes = {
  getSignup: function(req, res){
    res.render("signup.hbs");
  },
  postSignup: function(req, res){
    var signUpStrategy = passport.authenticate('local-signup', {
      sucessRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    });
    return signUpStrategy(req, res);
  }
};

module.exports = userRoutes;
