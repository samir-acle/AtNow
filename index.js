var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

// var mongoose = require("mongoose");
// mongoose.connect("mongdb//localhost/test");

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

app.use("*.json",function (req, res, next) {
  req.headers.accept = 'application/json';
  next();
});

app.get("/", function(req, res){
  res.render("index.html");
});

app.use("/locations/?:format?", require("./controllers/ajaxController"));

app.listen(3000, function(){
  console.log("listening on port 3000");
});
