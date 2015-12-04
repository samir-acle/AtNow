var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongdb//localhost/test")
var path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

app.listen(3000, function(){
  console.log("listening on port 3000");
});

app.get("/", function(res, req){
  res.render("index.html");
});
