var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var hbs = require("hbs");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express();

mongoose.connect("mongodb://localhost/test")

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'hbs');
app.set("views","./views");
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'session' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./config/passport');

// comes up with error object is not a function, have not set up config passport yet
// (passport);

app.listen(3000, function(){
  console.log("listening on port 3000");
});

app.get("/", function(req, res){
  res.render("index.html");
});

var routes = require("./config/routes");
app.use(routes);
