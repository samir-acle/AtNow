var express = require("express");
var router = express.Router();
var request = require("request");
var env = require("../env");

function error(response, message){
  response.status(500);
  response.json({error: message});
}

// router.use(function(req, res, next) {
//   next();
// });

router.get("/", function(req, res){
  var base = "https://api.foursquare.com/v2/venues/search";
  var options = [
    // ["intent", "checkin"],
    // ["radius", 800], //meters of specified location
    ["ll", 38.9 + "," + -77.0],
    ["openNow", 1]
  ];
  var url = base + "?client_id=" + env.clientID + "&client_secret=" + env.clientSecret + "&v=20151203";

  options.forEach(function(option){
    url = url + "&"+ option[0] + "=" + option[1];
  });

  request(url, function(err, response, body) {
    res.send(body); //res.json did not work, bc already json??
  });
});

module.exports = router;
