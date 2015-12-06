var express = require("express");
var router = express.Router();

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.use(function(req, res, next) {
  next();
});

router.get("/locations", function(req, res){
  res.send("this is with locs");
});

module.exports = router;
