var express = require("express");
var router = express.Router();
var Preference = require("../models/preference");
var Vote = require("../models/vote");
var VoteCount = require("../models/voteCount");

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/", function(req, res){
  Preference.find({}).populate("preferences").then(function(Preferences){
    res.json(Preferences);
  });
});

router.post("/", function(req, res){
  new Preference(req.body).save().then(function(Preference){
    res.json(Preference);
  });
});

router.get("/:location_id", function(req, res){
  Preference.findById(req.params.id).populate("preferences").then(function(Preference){
    res.json(Preference);
  });
});

router.get("/:id/preferences", function(req, res){
  Preference.findById(req.params.id).populate("preferences").then(function(Preference){
    res.json(Preference.songs);
  });
});

router.patch("/:id", function(req, res){
  Preference.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(function(Preference){
    res.json(Preference);
  })
});

router.delete("/:id", function(req, res){
  Preference.findByIdAndRemove(req.params.id).then(function(){
    res.json({success: true});
  });
});

module.exports = router;
