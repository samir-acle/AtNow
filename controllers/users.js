var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// if(currentUser) {
//   res.json(currentUser);
// } else {
//   res.status(401); //Authorization required
//   res.json({message: "You are already signed up!"});
// }
// app.post("/signup", function(req, res){
//   var user = new User(req.body.user);
//   user.save(function(err, user){
//     if(err){
//       return res.status(401).send({message:err.errmsg});
//     }else{
//       return res.status(200).send({message:"user created"});
//     }
//   })
// })
// app.post("/signin", function(req,res){
//   var userParams = req.body.user;
//   User.findOne({email: userParams.email}, function(err, user){
//     user.authenticate(userParams.password, function(err, isMatch){
//       if(err) throw err;
//       if(isMatch){
// 	return res.status(200).send({message: "Valid Credentials !"});
//       }else{
// 	return res.status(401).send({message: "Invalid Credentials !"});
//       }
//     })
//   })
// })


var usersController = {

  postRedirect: function(req, res){
    var user = global.currentUser;
    console.log("In this route, I am sending json!!!!" + user);
    res.json(global.currentUser);
  },
  postSignup: function(req, res){
    var signUpStrategy = passport.authenticate('local-signup', {
      successRedirect: '/currentUser',
      failureRedirect: '/',
      failureFlash: true
    });
    return signUpStrategy(req, res);
  },
  postLogin: function(req, res) {
    console.log("Route being hit");
    var loginProperty = passport.authenticate('local-login', {
      successRedirect: '/currentUser',
      failureRedirect: '/',
      failureFlash: true
    });
    console.log(global.currentUser);
    return loginProperty(req, res);
  },
  getLogout:  function(req, res) {
    req.logout();
    res.json({message: "User is logged out"});
    // res.redirect('/');
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
