var express = require("express");
var router = express.Router();
var staticsController = {
  index: function(req, res){
    res.render("index.html");
  }
};

module.exports = staticsController;
