var LocalStrategy = require("passport-local").Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require("../models/user");
var env = require("../env");
module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    console.log("id:", id)
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, callback){

    User.findOne({'local.email' : email}, function(err, user){
      // if there is an err will return a callback with that err from server
      if(err){
        return callback(err);
      }
      // if it finds a user with the same email address
      if(user){
        return callback(null, false, req.flash('signupMessage', "This email is already in use."));
      }
      else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err){
          if(err){
            throw err;
          }
          return callback(null, newUser);
        });
      }
    });
  }));

  passport.use(new FacebookStrategy({

          clientID        : env.facebookAuth.clientID,
          clientSecret    : env.facebookAuth.clientSecret,
          callbackURL     : env.facebookAuth.callbackURL
      },

      function(token, refreshToken, profile, done) {
          process.nextTick(function() {
              User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                  if (err)
                      return done(err);
                  if (user) {
                      return done(null, user);
                  } else {
                      var newUser            = new User();
                      newUser.facebook.id    = profile.id;
                      newUser.facebook.token = token;
                      newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                      newUser.facebook.email = profile.emails[0].value;
                      newUser.save(function(err) {
                          if (err)
                              throw err;
                          return done(null, newUser);
                      });
                  }
              });
          });
      }));

  passport.use('twitter', new TwitterStrategy({
  consumerKey: env.twitter.consumerKey,
  consumerSecret: env.twitter.consumerSecret,
  callbackUrl: env.twitter.callbackUrl
}, function(token, secret, profile, done){
  process.nextTick(function(){
    User.findOne({'twitter.id': profile.id}, function(err, user){
      if(err) return done(err);
      // If the user already exists, just return that user.
      if(user){
        return done(null, user);
      } else {
        // Otherwise, create a brand new user using information passed from Twitter.
        var newUser = new User();
        // Here we're saving information passed to us from Twitter.
        newUser.twitter.id = profile.id;
        newUser.twitter.token = token;
        newUser.twitter.username = profile.username;
        newUser.twitter.displayName = profile.displayName;

        newUser.save(function(err){
          if(err) throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));


  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }
      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user, req.flash('loginMessage', "You have signed in sucessfully!"));
    });
  }));

};
