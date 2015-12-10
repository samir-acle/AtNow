var express = require("express");
var router = express.Router();
var request = require("request");
var env = require("../env");
var Location = require("../models/location");
var getVoteCount = require("../modules/getVoteCount");
var projection = require('projection');
var p = projection();
var filterMovies = require("../modules/filterMovies");

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/", function(req, res){
  var latlong = req.query.lat ? req.query.lat + "," + req.query.long : 38.9 + "," + -77.0;

  p.findTheaters(latlong, {'date': 2}, function(err, theaters) {
    filterMovies(theaters, function(err, showtimes){
      if (err) throw err;
      res.json(showtimes);
    });
  });
});

module.exports = router;
