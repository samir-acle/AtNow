var express = require('express');
var router = express.Router();
var userRoutes = require('../controllers/users');

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}
router.route('/signup')
  .get(userRoutes.getSignup)
  .post(userRoutes.postSignup);

module.exports = router;
