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
  var latlong = req.query.lat ? req.query.lat + "," + req.query.long : 38.9 + "," + -77.0;
  var base = "https://api.foursquare.com/v2/venues/search";
  var options = [
    ["intent", "browse"],
    ["radius", 1600],
    ["limit", 50],
    ["ll", latlong],
    ["categoryId", "4d4b7105d754a06374d81259,4d4b7104d754a06370d81259,4d4b7105d754a06376d81259"]
    //Food = 4d4b7105d754a06374d81259
    //Arts & Entertainment = 4d4b7104d754a06370d81259
    //nightlife spot = 4d4b7105d754a06376d81259
    //shops = 4d4b7105d754a06378d81259
    // ["section", "food"]
    // ["openNow", 1]
  ];
  var url = base + "?client_id=" + env.clientID + "&client_secret=" + env.clientSecret + "&v=20151203";

  options.forEach(function(option){
    url = url + "&"+ option[0] + "=" + option[1];
  });

  request(url, function(err, response, body) {
    res.send(body); //res.json did not work, bc already json??
  });
});

router.get("/:id", function(req, res){
  var locID = req.params.id;
  var base = "https://api.foursquare.com/v2/venues/" + locID + "/hours";
  var url = base + "?client_id=" + env.clientID + "&client_secret=" + env.clientSecret + "&v=20151203";
  request(url, function(err, response, body){
    res.send(body);
  });
});

module.exports = router;
