var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var User = require("../models/user");

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}
router.route('/signup')
.get(usersController.getSignup)
.post(usersController.postSignup);

router.route('/login')
.get(usersController.getLogin)
.post(usersController.postLogin);

router.route('/logout')
.get(usersController.getLogout);

module.exports = router;
