var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

var usersController = {
  postRedirect: function(req, res){
    var user = req.user;
    res.json({message: "You have sucessfully logged in", success: true});
  },
  failureRedirectLogin: function(req, res){
    res.json({message: "Incorrect Username or Password", success: false});
  },
  failureRedirectSignup: function(req, res){
    res.json({message: "This User Already Exists", success: false});
  },
  postSignup: function(req, res){
    var signUpStrategy = passport.authenticate('local-signup', {
      successRedirect: '/currentUser',
      failureRedirect: '/failedsignup',
      failureFlash: true
    });
    return signUpStrategy(req, res);
  },
  postLogin: function(req, res) {
    console.log("Route being hit");
    var loginProperty = passport.authenticate('local-login', {
      successRedirect: '/currentUser',
      failureRedirect: '/failedlogin',
      failureFlash: true
    });
    console.log(global.currentUser);
    return loginProperty(req, res);
  },
  getLogout:  function(req, res) {
    req.logout();
    res.json({message: "User is logged out"});
  },
  secret: function (req, res){
    res.render("secret.hbs");
  },
  getUser: function(req, res) {
    var currentUser = req.user;
    User.findOne({"local.email": currentUser.local.email}, function(err, user){
      if(user){
        res.json(user);
      }
      else{
        console.log(err);
        res.json({message: "No user could be found, please login again"});
      }
    });
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
  },

  getFacebook: function(req, res){
    var loginProperty = passport.authenticate('facebook');
    return loginProperty(req, res);
  },
  getUserFacebook: function(req, res){
    var loginProperty = passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    });
    return loginProperty(req, res);
  },
  getGoogle: function(req, res){
    var loginProperty = passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' });
    return loginProperty(req, res);
  },
  getUserGoogle: function(req, res){
    var loginProperty = passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    });
    return loginProperty(req, res);
  }
};

module.exports = usersController;
