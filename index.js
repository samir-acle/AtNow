var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require("express-flash");
var hbs = require("hbs");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");


mongoose.connect("mongodb://localhost/test");
var app = express();

app.set('view engine', 'hbs');
app.set("views",__dirname + "/views");

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'session',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
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

app.listen(3000);


var routes = require("./config/routes");
app.use(routes);
