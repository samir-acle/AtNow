var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var staticsController = require("../controllers/staticsController");
var User = require("../models/user");
var passport = require("passport");

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.route("/currentuser")
.get(usersController.postRedirect);

router.route('/signup')
.post(usersController.postSignup);

router.route('/login')
.post(usersController.postLogin);

router.route('/logout')
.get(usersController.getLogout);

router.route("/secret")
.get(authenticatedUser, usersController.secret);

router.route("/user")
.get(usersController.getUser);

router.route('/auth/twitter')
.get(usersController.getTwitter);

router.route('/auth/twitter/callback')
.get(usersController.getUserTwitter);


router.route('/auth/facebook')
.get(usersController.getFacebook);

router.route('/auth/facebook/callback')
.get(usersController.getUserFacebook);

// router.route('/auth/google')
// .get(usersController.getGoogle);
//
// router.route('/auth/google/callback')
// .get(usersController.getUserGoogle);

router.route('/auth/google')
  .get(passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.route('/auth/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;
