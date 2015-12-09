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

// router.use(function(req, res, next) {
//   next();
// });

router.get("/", function(req, res){
  var latlong = req.query.lat ? req.query.lat + "," + req.query.long : 38.9 + "," + -77.0;
  //TODO: use next page token at scroll bottom to load more results
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  var options = [
    // ["rankby", "distance"],
    ["types", req.query.type],
    ["opennow", ""],
    ["location", latlong],
    ["radius", 1600],
    ["key", env.googleKey],
    ["pagetoken", req.query.nextPage || ""]
  ];
  // console.log(options);

  options.forEach(function(option){
    url = url + "&"+ option[0] + "=" + option[1];
  });

  console.log(url);

  request(url, function(err, response, body) {
    var locations = JSON.parse(body).results;
    getVoteCount(locations, function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
});

// router.get("/:id", function(req, res){
//   var locID = req.params.id;
//   // console.log('licid', locID);
//   // console.log('params', req.params);
//   Location.findOne({"location_id": locID}, function(err, location){
//     // console.log('location',location);
//     var voteCount = location ? location.count : 0;
//     res.json(voteCount);
//   });
// });

module.exports = router;

//TODO:function(error, response, body) {
//         var data = JSON.parse(body);
// …}
