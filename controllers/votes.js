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
  Vote.find({}).populate("user").then(function(votes){
    res.json(votes);
  });
});

router.post("/", function(req, res){
  var voteInfo = req.body;
  // var currentUser = global.currentUser;
  voteInfo.votes = true;
  User.findOne({"local.email": "sammehta88@gmail.com"}, function(err, currentUser){
    currentUser.votes.push(new Vote(voteInfo));
    currentUser.save().then(function(){
      //TODO: refactor, separate out code into different function
      Location.findOne({"location_id": req.body.location_id}, function(err, loc){
        if (loc){
          console.log('in exists');
          loc.count = req.body.vote ? loc.count + 1 : loc.count - 1;
        } else {
          console.log('in doesnt exist');
          loc = new Location({
            "location_id": req.body.location_id,
            "count": req.body.vote ? 1 : 0  //TODO: -1 or 0? can they have negative votes?
          });
        }
        loc.save();
        res.json(loc);
      });
    });
  });
});

// module.exports = (function() {
// 	return {
//           update: function(req, res){
//           			User.findOne({id: req.body.user})
//           				.populate('votes')
//           				.exec(function(err, post){
//           				if(err){
//           					console.log(err);
//           				} else {
//           					if(req.vote > 0){
//           						post.upvotes += 1;
//           					} else {
//           						post.downvotes += 1;
//           					}
//           					post.save(function(err){
//           						if(err){
//           							console.log(err);
//           						} else {
//           							res.json({message: 'Vote updated'});
//           						}
//           					});
//           				}
//           			});
//           		}
//             }
module.exports = router;
