var express = require("express");
var router = express.Router();
var Preference = require("../models/preference");
var Vote = require("../models/vote");
var User = require("../models/user");
var Location = require("../models/location");
var checkUserVotes = require("../modules/checkUserVotes");

router.get("/", function(req, res){
    res.json(global.currentUser.votes);
});

router.post("/", function(req, res){
  var voteInfo = {
    name: req.body.name,
    location_id: req.body.location_id,
    vote: req.body.vote === 'true' ? true : false //converts string to boolean
  };

  var userVote = checkUserVotes(voteInfo.location_id);
  var index = userVote ? userVote[0] : '';
  var prevVote = userVote ? userVote[1] : '';


  Location.findOne({"location_id": voteInfo.location_id}, function(err, loc){
    //add new vote if user has not already voted for this location
    if (!userVote) {
      currentUser.votes.push(new Vote(voteInfo));
      currentUser.save().then(function(){
        if (loc){
          loc.count = voteInfo.vote ? loc.count + 1 : loc.count - 1;
        } else {
          loc = new Location({
            "location_id": voteInfo.location_id,
            "count": voteInfo.vote ? 1 : -1  //TODO: -1 or 0? can they have negative votes?
          });
        }

      loc.save();
      res.json(loc);
      });
    }
    //if user has already voted and they press the same vote button, remove the original vote
    //and update total accordingly
    else if (voteInfo.vote === prevVote){
      currentUser.votes[index].remove();
      currentUser.save(function(err){
        if(err) throw err;

        loc.count = prevVote ? loc.count - 1 : loc.count + 1;
        loc.save();
        res.json(loc);
      });
    }
    //if user has already voted and press a different vote button, change original vote to
    //new one and update total accordingly
    else {
      currentUser.votes[index].vote = voteInfo.vote;
      currentUser.save(function(){
        loc.count = prevVote ? loc.count - 2 : loc.count + 2;
        loc.save();
        res.json(loc);
      });
    }
  });
});

module.exports = router;
