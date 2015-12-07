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
  //TODO: use next page token at scroll bottom to load more results
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  var options = [
    // ["rankby", "distance"],
    ["types", req.query.type],
    ["opennow", ""],
    ["location", latlong],
    // ["radius", 1600],
    ["key", env.googleKey],
    ["pagetoken", req.query.nextPage || ""]
  ];
  console.log(options);

  options.forEach(function(option){
    url = url + "&"+ option[0] + "=" + option[1];
  });

  console.log(url);

  request(url, function(err, response, body) {
    res.send(body);
  });
});

// router.get("/:id", function(req, res){
//   var locID = req.params.id;
//   var base = "https://api.foursquare.com/v2/venues/" + locID + "/hours";
//   var url = base + "?client_id=" + env.clientID + "&client_secret=" + env.clientSecret + "&v=20151203";
//   request(url, function(err, response, body){
//     res.send(body);
//   });
// });

module.exports = router;

//TODO:function(error, response, body) {
//         var data = JSON.parse(body);
// …}
