var Vote = require("../models/vote");
var User = require("../models/user");
var Location = require("../models/location");
var checkUserVotes = require("./checkUserVotes");

module.exports = function(array, callback){
  console.log('in getvotecount');
  var oldArray = array;
  var newArray = [];

  function getCount() {
    if (oldArray.length === 0) {
      console.log('get vote count done');
      return callback(null, newArray);
    }

    var location = oldArray.pop();
    var userVotes = checkUserVotes(location.place_id);
    var userUpvote = false;
    var userDownvote = false;

    if (userVotes) {
      userUpvote = userVotes[1] ? true : false;
      userDownvote = userVotes[1] ? false : true;
    }

    location.userUpvote = userUpvote;
    location.userDownvote = userDownvote;

    Location.findOne({"location_id" : location.place_id}, function(err, loc){
      var voteCount = loc ? loc.count : 0;
      location.count = voteCount;
      newArray.push(location);
      getCount();
    });
  }

  getCount();
};
