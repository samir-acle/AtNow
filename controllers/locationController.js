var express = require("express");
var router = express.Router();
var request = require("request");
var env = require("../env");
var Location = require("../models/location");
var getVoteCount = require("../modules/getVoteCount");


function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/", function(req, res){
  var latlong = req.query.lat ? req.query.lat + "," + req.query.long : 38.9 + "," + -77.0;

  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  var options = [
    ["rankby", "distance"],
    ["types", req.query.type],
    ["opennow", ""],
    ["location", latlong],
    ["key", env.googleKey],
    ["pagetoken", req.query.nextPage || ""]
  ];

  options.forEach(function(option){
    url = url + "&"+ option[0] + "=" + option[1];
  });

  request(url, function(err, response, body) {
    var locations = JSON.parse(body).results;
    getVoteCount(locations, function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
});

module.exports = router;
