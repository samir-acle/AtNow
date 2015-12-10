var express = require("express");
var router = express.Router();
var Preference = require("../models/preference");
var Vote = require("../models/vote");
var User = require("../models/user");
var Location = require("../models/location");
var checkUserVotes = require("../modules/checkUserVotes");

router.get("/", function(req, res){
  // console.log("THIS IS THE CURRENT USER VOTES::: " + global.currentUser.votes );
    res.json(global.currentUser.votes);
});

//TODO: modularize
//TODO: add route to retrive users votes
//TODO: add route to delete user vote
router.post("/", function(req, res){
  var voteInfo = {
    name: req.body.name,
    location_id: req.body.location_id,
    vote: req.body.vote === 'true' ? true : false //converts string to boolean
  };

  // var match, prevVote;
  // var currentUser = global.currentUser;
  // var votesArray = currentUser.votes;
  //
  //   //TODO: use findOne?
  // function findMatch() {
  //   for (var i = 0; i < votesArray.length; i++) {
  //     if (votesArray[i].location_id === voteInfo.location_id){
  //       match = i;
  //       prevVote = votesArray[i].vote;
  //       // console.log('match found');
  //       return;
  //     }
  //   }
  // }
    // var userVote = [];
    var userVote = checkUserVotes(voteInfo.location_id);
    var index = userVote ? userVote[0] : '';
    var prevVote = userVote ? userVote[1] : '';
    // console.log('match', match);
    // console.log('prevvote', prevVote);
    Location.findOne({"location_id": voteInfo.location_id}, function(err, loc){
      if (!userVote) {
        currentUser.votes.push(new Vote(voteInfo));
        currentUser.save().then(function(){
          //TODO: refactor, separate out code into different function
            if (loc){
              loc.count = voteInfo.vote ? loc.count + 1 : loc.count - 1;
            } else {
              loc = new Location({
                "location_id": voteInfo.location_id,
                "count": voteInfo.vote ? 1 : -1  //TODO: -1 or 0? can they have negative votes?
              });
            }
            loc.save();
            // console.log('in create',currentUser.votes.length);
            res.json(loc);
          // });
        });
      } else if (voteInfo.vote === prevVote){
        // console.log('in match same');
        // console.log(currentUser.votes[match]);
        currentUser.votes[index].remove();
        currentUser.save(function(err){
          if(err) throw err;

          loc.count = prevVote ? loc.count - 1 : loc.count + 1;
          loc.save();
          res.json(loc);
        });
      } else {
        currentUser.votes[index].vote = voteInfo.vote;
        currentUser.save(function(){
            loc.count = prevVote ? loc.count - 2 : loc.count + 2;
            loc.save();
            // console.log('in match diff',currentUser.votes.length);
            res.json(loc);
        });
      }
  });
});

module.exports = router;

//TODO: change to use better mongoose methods - findbyandupdate
