var express = require("express");
var router = express.Router();
// var Vote = mongoose.model('Vote');
// var User = mongoose.model('User');
var Preference = require("../models/preference");
var Vote = require("../models/vote");
var User = require("../models/user");
var Location = require("../models/location");
// var VoteCount = require("../models/voteCount");

router.get("/", function(req, res){
    res.json(global.currentUser.votes);
});

//TODO: modularize
//TODO: add route to retrive users votes
//TODO: add route to delete user vote
router.post("/", function(req, res){
  var voteInfo = {
    location_id: req.body.location_id,
    vote: req.body.vote === 'true' ? true : false //converts string to boolean
  };
  // console.log('body', req.body);
  // console.log('body vote',req.body.vote);
  // console.log('voteInfo', voteInfo);
  var match, prevVote;
  var currentUser = global.currentUser;
  var votesArray = currentUser.votes;

    //TODO: use findOne?
    function findMatch() {
      for (var i = 0; i < votesArray.length; i++) {
        if (votesArray[i].location_id === voteInfo.location_id){
          match = i;
          prevVote = votesArray[i].vote;
          console.log('match found');
          return;
        }
      }
    }
    findMatch();
    // console.log('match', match);
    // console.log('prevvote', prevVote);
    Location.findOne({"location_id": voteInfo.location_id}, function(err, loc){
      if (!match) {
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
            console.log('in create',currentUser.votes.length);
            res.json(loc);
          // });
        });
      } else if (voteInfo.vote === prevVote){
        console.log('in match same');
        console.log(currentUser.votes[match]);
        currentUser.votes[match].remove();
        currentUser.save(function(err){
          if(err) throw err;

          loc.count = prevVote ? loc.count - 1 : loc.count + 1;
          loc.save();
          res.json(loc);
        });
      } else {
        currentUser.votes[match].vote = voteInfo.vote;
        currentUser.save(function(){
            loc.count = prevVote ? loc.count - 2 : loc.count + 2;
            loc.save();
            console.log('in match diff',currentUser.votes.length);
            res.json(loc);
        });
      }
  });
  // });
});

module.exports = router;

//TODO: change to use better mongoose methods - findbyandupdate
