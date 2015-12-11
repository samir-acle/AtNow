var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var passport = require("passport");
var env = require("./env");
var LocalStrategy = require("passport-local").Strategy;
var hbs = require("hbs");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash");
var port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/test");
var app = express();

app.set('view engine', 'hbs');
app.set("views",__dirname + "/views");

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('foo'));
app.use(session({
  secret : 'foo',
  cookie : {
    expires: false,
  },
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function (req, res, next) {
  global.currentUser = req.user;
  res.locals.currentUser = req.user;
  next();
});

app.use(function(req, res, next) {
  res.locals.message = {
    signupMessage: req.flash('signupMessage'),
    loginMessage: req.flash('loginMessage')
  };
  next();
});

app.use("/locations", require("./controllers/locationController"));
app.use("/votes", require("./controllers/votes"));
app.use("/movies", require("./controllers/moviesController"));
var staticsController = require("./controllers/staticsController");


var routes = require("./config/routes");
app.use(routes);

app.listen(3000);
