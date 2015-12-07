var LocalStrategy = require("passport-local").Strategy;
// var FacebookStrategy = require("passport-facebook").Strategy;
// the following below will go into env.js file
// var FACEBOOK_APP_ID = "--insert-facebook-app-id-here--"
// var FACEBOOK_APP_SECRET = "--insert-facebook-app-secret-here--";
var User = require("../models/user");

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


  // passport.use(new FacebookStrategy({
  //   // (env) FACEBOOK_APP_ID,
  //   clientID: clientID,
  //   // FACEBOOK_APP_SECRET
  //   clientSecret: clientSecret,
  //   // callbackURL = "http://localhost:3000/auth/facebook/callback"
  //   callbackURL: callbackURL,
  //   enableProof: false
  // },function(accessToken, refreshToken, profile, done){
  //   process.nextTick(function(){
  //     User.findOne({'facebook.id': profile.id }, function(err, user){
  //       if(err){
  //         return done(err);
  //       }
  //       if(user){
  //         return done(null, user);
  //       }
  //       else {
  //         var newUser = new User();
  //         newUser.facebook.id = profile.id;
  //         newUser.facebook.token = token;
  //         newUser.facebook.username = profile.user.username;
  //         newUser.facebook.displayName = profile.displayName;
  //         newuser.save(function(err){
  //           if(err){
  //             throw err;
  //           }
  //           return done(null, newUser);
  //         });
  //       }
  //     });
  //   })
  // }));

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