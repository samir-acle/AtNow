var passport = require("passport");

var usersController = {
  getSignup: function(req, res){
    res.render("signup.hbs", { message: req.flash('signupMessage')});
  },
  postSignup: function(req, res){
    var signUpStrategy = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    });
    return signUpStrategy(req, res);
  },
  getLogin: function(req, res) {
    res.render('login.hbs', {message: req.flash('loginMessage')});
  },
  postLogin: function(req, res) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
    });
    return loginProperty(req, res);
  },
  getLogout:  function(req, res) {
    req.logout();
    res.redirect('/');
  },
  secret: function (req, res){
    res.render("secret.hbs");
  },
  getUser: function(req, res) {
    res.json(global.currentUser);
  },
  getTwitter: function(req, res){
    var loginProperty = passport.authenticate('twitter');
    return loginProperty(req, res);
  },
  getUserTwitter: function(req, res){
    var loginProperty = passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    });
    return loginProperty(req, res);
  }
};

module.exports = usersController;
