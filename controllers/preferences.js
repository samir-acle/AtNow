var express = require("express");
var router = express.Router();
var Preference = require("../models/preference");
var Vote = require("../models/vote");
var VoteCount = require("../models/voteCount");

function error(response, message){
  response.status(500);
  response.json({error: message})
}



module.exports = router;
