var LocalStrategy = require("passport-local").Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require("../models/user");
var env = require("../env");

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
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

//
//   passport.use('twitter', new TwitterStrategy({
//   consumerKey: env.twitter.consumerKey,
//   consumerSecret: env.twitter.consumerSecret,
//   callbackUrl: env.twitter.callbackUrl
// }, function(token, secret, profile, done){
//   process.nextTick(function(){
//     User.findOne({'twitter.id': profile.id}, function(err, user){
//       if(err) return done(err);
//       // If the user already exists, just return that user.
//       if(user){
//         return done(null, user);
//       } else {
//         // Otherwise, create a brand new user using information passed from Twitter.
//         var newUser = new User();
//         // Here we're saving information passed to us from Twitter.
//         newUser.twitter.id = profile.id;
//         newUser.twitter.token = token;
//         newUser.twitter.username = profile.username;
//         newUser.twitter.displayName = profile.displayName;
//
//         newUser.save(function(err){
//           if(err) throw err;
//           return done(null, newUser);
//         });
//       }
//     });
//   });
// }));

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

  passport.use('google', new GoogleStrategy({
    clientID: env.google.clientID,
    clientSecret: env.google.clientSecret,
    callbackURL: env.google.callbackURL
  },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        User.findOne({'google.id': profile.id}, function(err, user){
          if(err) return done(err);
          // If the user already exists, just return that user.
          if(user){
            return done(null, user);
          } else {
            // Otherwise, create a brand new user using information passed from Twitter.
            var newUser = new User();
            // Here we're saving information passed to us from Twitter.
            console.log('A token', accessToken);
            console.log('R token', refreshToken);
            console.log('profiel', profile);
            newUser.google.id = profile.id;
            // newUser.google.token = token;
            // newUser.google.username = profile.username;
            // newUser.google.displayName = profile.displayName;

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
        console.log("This is passport middleware error: " + err);
        return callback(err);
      }
      // If no user is found
      if (!user) {
        console.log("This is passport middleware error no User found");
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        console.log("This is passport middleware, wrong password!");
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
        console.log("This is being returned from passport:" + user);
      return callback(null, user, req.flash('loginMessage', "You have signed in sucessfully!"));
    });
  }));

};
