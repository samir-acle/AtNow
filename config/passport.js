var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
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


//   passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function(){
//
//     });
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       if(err){
//         return done(err);
//       }
//       if(user){
//         return done(null, user);
//       }
//       else{
//         var newUser = new User
//       }
//       return done(err, user);
//     });
//   }
// ));

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
