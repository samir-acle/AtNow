var express = require("express");
var router = express.Router();
// var Vote = mongoose.model('Vote');
var Preference = require("../models/preference");
var Vote = require("../models/vote");
// var VoteCount = require("../models/voteCount");

router.get("/", function(req, res){
  Vote.find({}).populate("user").then(function(votes){
    res.json(votes);
  });
});

router.post("/", function(req, res){
  var voteInfo = req.body;
  var currentUser = global.currentUser;
  voteInfo.votes = true;
  // var currentUser = User.findOne({"local.email": "sammehta88@gmail.com"}, function(err, user){
  currentUser.votes.push(new Vote(voteInfo));
  currentUser.save().then(function(votes){
      //call function to update locations table
      res.json(votes);
  });
  // });
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
